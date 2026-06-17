import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { Spinner } from "flowbite-react";
import type {
  BoardData,
  AuthUser,
  Notification,
  Task,
  Column,
  Employee,
  Activity,
  ActivityType,
  ActivityStatus,
} from "../../types";
import socket from "../../services/socket";
import SearchFilterBar from "../shared/SearchFilterBar";
import { normalizeVisaType } from "../../utils/constants";
import { hasPermission, P } from "../../utils/access";
import { API_URL } from "../../constants/config";

interface KanbanBoardProps {
  onOpenActivityList: (taskId: string) => void;
  onOpenDetail: (taskId: string) => void;
  onDeleteCustomer: (taskId: string) => Promise<void>;
  onToggleActivity: (taskId: string, activityId: string) => Promise<void>;
  onOpenAddCustomer: () => void;
  onOpenAttachments: (taskId: string) => void;
  currentUser: AuthUser | null;
  staffList: Employee[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  onOpenActivityList,
  onOpenDetail,
  onDeleteCustomer,
  onToggleActivity,
  onOpenAddCustomer,
  onOpenAttachments,
  currentUser,
  staffList,
}) => {
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAlerts, setActiveAlerts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"board" | "table">("board");
  const [groupBy] = useState<"none" | "staff">("none");
const [visibleLimits, setVisibleLimits] = useState<Record<string, number>>({});
  const [collapsedColumnIds, setCollapsedColumnIds] = useState<Record<string, boolean>>({});
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [editingColumnTitle, setEditingColumnTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [newActivityText, setNewActivityText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterColumn, setFilterColumn] = useState("all");
  const [filterSource, setFilterSource] = useState("all");

const DEFAULT_LIMIT = 20;

  const toggleColumnCollapse = (colId: string) => {
    setCollapsedColumnIds((prev) => ({
      ...prev,
      [colId]: !prev[colId],
    }));
  };

  const isMarketingDept =
    currentUser?.department?.toLowerCase().includes("marketing") || false;
  const isProcessingDept = /xử lý hồ sơ|hồ sơ|trợ lý giám đốc/i.test(
    currentUser?.department || "",
  );
  const canSeeAll =
    (currentUser ? hasPermission(currentUser, P.crmSeeAll) : false) ||
    isMarketingDept ||
    isProcessingDept;

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!currentUser?.name) return;
      try {
        const res = await fetch(`${API_URL}/api/notifications/${currentUser.name}`);
        if (!res.ok) return;
        const notifs: Notification[] = await res.json();
        setActiveAlerts(
          notifs.filter((n) => !n.isRead && n.taskId).map((n) => n.taskId as string),
        );
      } catch (e) {
        console.error("Lỗi khi lấy thông báo khẩn:", e);
      }
    };

    fetchAlerts();
    socket.on("data_changed", fetchAlerts);
    return () => {
      socket.off("data_changed", fetchAlerts);
    };
  }, [currentUser]);

  const fetchBoardData = useCallback(
    async (showSpinner = true) => {
      try {
        if (showSpinner) setIsLoading(true);
        const response = await fetch(`${API_URL}/api/board`);
        if (!response.ok) throw new Error("Không thể tải dữ liệu");

        const rawData: BoardData = await response.json();
        let processedData = { ...rawData };

        if (!canSeeAll && currentUser?.name) {
          const filteredTasks: Record<string, Task> = {};
          const allowedTaskIds = new Set<string>();
          const currentUserName = currentUser.name.trim();

          Object.values(rawData.tasks).forEach((task) => {
            if (task.assignedTo?.trim() === currentUserName) {
              filteredTasks[task.id] = task;
              allowedTaskIds.add(task.id);
            }
          });

          const filteredColumns: Record<string, Column> = {};
          Object.keys(rawData.columns).forEach((colId) => {
            filteredColumns[colId] = {
              ...rawData.columns[colId],
              taskIds: rawData.columns[colId].taskIds.filter((id: string) =>
                allowedTaskIds.has(id),
              ),
            };
          });

          processedData = {
            ...processedData,
            tasks: filteredTasks,
            columns: filteredColumns,
          };
        }

        setBoardData(processedData);
        setError(null);
      } catch (err) {
        setError("Lỗi kết nối đến server: " + err);
      } finally {
        if (showSpinner) setIsLoading(false);
      }
    },
    [canSeeAll, currentUser],
  );

  useEffect(() => {
    fetchBoardData(true);
    const handleDataChange = () => fetchBoardData(false);
    socket.on("data_changed", handleDataChange);
    window.addEventListener("refreshBoard", handleDataChange);

    return () => {
      socket.off("data_changed", handleDataChange);
      window.removeEventListener("refreshBoard", handleDataChange);
    };
  }, [fetchBoardData]);

  const filterOptions = useMemo(() => {
    if (!boardData) return { sales: [], visaTypes: [], columns: [] as { value: string; label: string }[] };
    const allTasks = Object.values(boardData.tasks);

    const sales =
      staffList.length > 0
        ? staffList
            .map((emp) => ({ value: emp.name, label: emp.name }))
            .sort((a, b) => a.label.localeCompare(b.label))
        : [...new Set(allTasks.map((t) => t.assignedTo).filter(Boolean))]
            .sort()
            .map((name) => ({ value: name as string, label: name as string }));

    const visaTypes = [
      ...new Set(
        allTasks.map((t) => normalizeVisaType(t.visaType)).filter((val) => val !== ""),
      ),
    ]
      .sort()
      .map((v) => ({ value: v, label: v }));

    const columns = boardData.columnOrder
      .map((colId) => boardData.columns[colId])
      .filter(Boolean)
      .map((col) => ({ value: col.id, label: col.title }));

    return { sales, visaTypes, columns };
  }, [boardData, staffList]);

  const getFilteredTaskIds = useCallback(
    (columnId: string): string[] => {
      if (!boardData) return [];
      const column = boardData.columns[columnId];
      if (!column) return [];
      if (filterColumn !== "all" && filterColumn !== columnId) return [];

      return column.taskIds.filter((taskId) => {
        const task = boardData.tasks[taskId];
        if (!task) return false;

        if (searchQuery) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = task.content?.toLowerCase().includes(q);
          const matchPhone = task.phone?.toLowerCase().includes(q);
          if (!matchName && !matchPhone) return false;
        }

        if (filterSource !== "all") {
          if (!task.source) return false;
          if (task.source !== filterSource) return false;
        }

        return true;
      });
    },
    [boardData, searchQuery, filterColumn, filterSource],
  );

  const filteredTotal = useMemo(() => {
    if (!boardData) return 0;
    return boardData.columnOrder.reduce(
      (sum, colId) => sum + getFilteredTaskIds(colId).length,
      0,
    );
  }, [boardData, getFilteredTaskIds]);

  const totalTasks = useMemo(() => {
    if (!boardData) return 0;
    return Object.keys(boardData.tasks).length;
  }, [boardData]);

  const hasActiveFilter = useMemo(
    () => searchQuery !== "" || filterColumn !== "all" || filterSource !== "all",
    [searchQuery, filterColumn, filterSource],
  );

  const flatTableData = useMemo(() => {
    if (!boardData) return [] as Task[];
    const rows: Task[] = [];
    boardData.columnOrder.forEach((colId) => {
      const ids = getFilteredTaskIds(colId);
      ids.forEach((id) => {
        const task = boardData.tasks[id];
        if (task) rows.push(task);
      });
    });
    return rows;
  }, [boardData, getFilteredTaskIds]);

  const handleResetFilter = useCallback(() => {
    setSearchQuery("");
    setFilterColumn("all");
    setFilterSource("all");
  }, []);

  const handleLoadMore = (columnId: string) => {
    setVisibleLimits((prev) => ({
      ...prev,
      [columnId]: (prev[columnId] || DEFAULT_LIMIT) + 20,
    }));
  };

  const handleStatusChange = async (
    taskId: string,
    fromColumnId: string,
    toColumnId: string,
  ) => {
    if (!boardData || fromColumnId === toColumnId) return;

    const startCol = boardData.columns[fromColumnId];
    const finishCol = boardData.columns[toColumnId];
    if (!startCol || !finishCol) return;

    const startTaskIds = startCol.taskIds.filter((id) => id !== taskId);
    const finishTaskIds = [...finishCol.taskIds, taskId];

    setBoardData({
      ...boardData,
      columns: {
        ...boardData.columns,
        [fromColumnId]: { ...startCol, taskIds: startTaskIds },
        [toColumnId]: { ...finishCol, taskIds: finishTaskIds },
      },
      tasks: {
        ...boardData.tasks,
        [taskId]: {
          ...boardData.tasks[taskId],
          columnId: toColumnId,
        },
      },
    });

    try {
      await fetch(`${API_URL}/api/tasks/${taskId}/move`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ columnId: toColumnId }),
      });
    } catch (e) {
      console.error("Lỗi khi cập nhật trạng thái:", e);
      fetchBoardData(false);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination || !boardData) return;

    if (type === "column") {
      if (destination.index === source.index) return;
      const newColumnOrder = Array.from(boardData.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoardData({
        ...boardData,
        columnOrder: newColumnOrder,
      });

      try {
        await fetch(`${API_URL}/api/board/columns-reorder`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ columnOrder: newColumnOrder }),
        });
      } catch (error) {
        fetchBoardData(false);
        console.error("Lỗi khi cập nhật vị trí cột:", error);
      }
      return;
    }

    const realSourceColId = source.droppableId.split(":::")[0];
    const realDestColId = destination.droppableId.split(":::")[0];

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startCol = boardData.columns[realSourceColId];
    const finishCol = boardData.columns[realDestColId];

    if (!startCol || !finishCol) return;

    if (startCol === finishCol) {
      const newTaskIds = Array.from(startCol.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [startCol.id]: { ...startCol, taskIds: newTaskIds },
        },
      });
    } else {
      const startTaskIds = Array.from(startCol.taskIds);
      startTaskIds.splice(source.index, 1);
      const finishTaskIds = Array.from(finishCol.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [startCol.id]: { ...startCol, taskIds: startTaskIds },
          [finishCol.id]: { ...finishCol, taskIds: finishTaskIds },
        },
      });
    }

    try {
      await fetch(`${API_URL}/api/tasks/${draggableId}/move`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ columnId: realDestColId }),
      });
    } catch (error) {
      fetchBoardData(false);
      console.error("Lỗi khi cập nhật vị trí thẻ:", error);
    }
  };

  const handleRenameColumn = async (columnId: string) => {
    if (!editingColumnTitle.trim()) {
      setEditingColumnId(null);
      return;
    }

    setBoardData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            title: editingColumnTitle.trim(),
          },
        },
      };
    });
    setEditingColumnId(null);

    try {
      await fetch(`${API_URL}/api/board/columns/${columnId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editingColumnTitle.trim() }),
      });
    } catch (error) {
      console.error("Lỗi khi đổi tên cột:", error);
      fetchBoardData(false);
    }
  };

  const handleDeleteColumn = async (columnId: string, columnTitle: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa cột "${columnTitle}" không? Tất cả các hồ sơ trong cột này cũng sẽ bị xóa.`)) {
      return;
    }

    setBoardData((prev) => {
      if (!prev) return prev;
      const newColumns = { ...prev.columns };
      delete newColumns[columnId];
      const newColumnOrder = prev.columnOrder.filter((id) => id !== columnId);
      
      const tasksInCol = prev.columns[columnId]?.taskIds || [];
      const newTasks = { ...prev.tasks };
      tasksInCol.forEach((tid) => {
        delete newTasks[tid];
      });

      return {
        ...prev,
        columns: newColumns,
        columnOrder: newColumnOrder,
        tasks: newTasks,
      };
    });

    try {
      await fetch(`${API_URL}/api/board/columns/${columnId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Lỗi khi xóa cột:", error);
      fetchBoardData(false);
    }
  };

  const handleAddColumn = async () => {
    const title = window.prompt("Nhập tên cột mới:");
    if (!title || !title.trim()) return;

    const newId = `col-${Date.now()}`;
    const order = boardData ? boardData.columnOrder.length : 0;

    setBoardData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [newId]: {
            id: newId,
            title: title.trim(),
            taskIds: [],
          },
        },
        columnOrder: [...prev.columnOrder, newId],
      };
    });

    try {
      await fetch(`${API_URL}/api/board/columns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: newId, title: title.trim(), order }),
      });
    } catch (error) {
      console.error("Lỗi khi thêm cột mới:", error);
      fetchBoardData(false);
    }
  };

  const handleSaveInlineActivity = async (taskId: string) => {
    if (!boardData) return;
    const task = boardData.tasks[taskId];
    if (!task) return;

    const activeAct = task.activities?.find((a) => !a.completed);
    const text = newActivityText.trim();

    if (!text) {
      if (activeAct) {
        setBoardData((prev: BoardData | null) => {
          if (!prev) return null;
          const t = prev.tasks[taskId];
          if (!t) return prev;
          return {
            ...prev,
            tasks: {
              ...prev.tasks,
              [taskId]: {
                ...t,
                activities: t.activities?.filter((a) => a.id !== activeAct.id) || [],
              },
            },
          };
        });
        try {
          await fetch(`${API_URL}/api/activities/${activeAct.id}`, { method: "DELETE" });
        } catch (error) {
          console.error("Lỗi khi xóa hoạt động:", error);
          fetchBoardData(false);
        }
      }
      setEditingTaskId(null);
      return;
    }

    if (activeAct) {
      setBoardData((prev: BoardData | null) => {
        if (!prev) return null;
        const t = prev.tasks[taskId];
        if (!t) return prev;
        return {
          ...prev,
          tasks: {
            ...prev.tasks,
            [taskId]: {
              ...t,
              activities: t.activities?.map((a) => a.id === activeAct.id ? { ...a, summary: text } : a) || [],
            },
          },
        };
      });
      setEditingTaskId(null);

      try {
        await fetch(`${API_URL}/api/activities/${activeAct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...activeAct, summary: text }),
        });
      } catch (error) {
        console.error("Lỗi khi cập nhật hoạt động:", error);
        fetchBoardData(false);
      }
    } else {
      const tempId = `act-${Date.now()}`;
      const newAct: Activity = {
        id: tempId,
        type: "Việc cần làm" as ActivityType,
        summary: text,
        assignee: "HoangVu",
        status: "Đã lên kế hoạch" as ActivityStatus,
        completed: false,
        dueText: "Chưa có hạn",
        createdAt: new Date().toISOString(),
        taskId,
      };

      setBoardData((prev: BoardData | null) => {
        if (!prev) return null;
        const t = prev.tasks[taskId];
        if (!t) return prev;
        return {
          ...prev,
          tasks: {
            ...prev.tasks,
            [taskId]: {
              ...t,
              activities: [newAct, ...(t.activities || [])],
            },
          },
        };
      });
      setEditingTaskId(null);

      try {
        const response = await fetch(`${API_URL}/api/activities`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "Việc cần làm",
            summary: text,
            assignee: "HoangVu",
            status: "Đã lên kế hoạch",
            completed: false,
            dueText: "Chưa có hạn",
            taskId,
          }),
        });
        if (response.ok) {
          const saved = await response.json();
          setBoardData((prev: BoardData | null) => {
            if (!prev) return null;
            const t = prev.tasks[taskId];
            if (!t) return prev;
            return {
              ...prev,
              tasks: {
                ...prev.tasks,
                [taskId]: {
                  ...t,
                  activities: t.activities?.map((a) => a.id === tempId ? saved : a) || [],
                },
              },
            };
          });
        }
      } catch (error) {
        console.error("Lỗi khi tạo hoạt động mới:", error);
        fetchBoardData(false);
      }
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    onDeleteCustomer(taskId);
  };

  const getCardStyle = (
    columnId: string,
    isDragging: boolean,
    isAlerted: boolean,
  ) => {
    // Sử dụng theme variables từ theme.css
    if (isAlerted)
      return "bg-red-50 border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse rounded-xl";
    if (isDragging)
      return "fv-card ring-2 ring-emerald-400 shadow-xl z-[9999] scale-[1.02] rounded-xl";
    let baseClass = "fv-card";
    switch (columnId) {
      case "col-1":
        baseClass += " border-l-4 border-l-[var(--fv-primary)]";
        break;
      case "col-2":
        baseClass += " border-l-4 border-l-blue-400";
        break;
      case "col-3":
        baseClass += " border-l-4 border-l-amber-400";
        break;
      case "col-4":
        baseClass += " border-l-4 border-l-teal-500";
        break;
      default:
        baseClass += " border-l-4 border-l-violet-400";
        break;
    }
    return baseClass;
  };

  const renderCard = (
    task: Task,
    index: number,
    column: Column,
    isHidden: boolean,
  ) => {
    if (!boardData) return null;
    const isAlerted = activeAlerts.includes(task.id);
    return (
      <Draggable
        key={task.id}
        draggableId={task.id}
        index={index}
        isDragDisabled={isHidden || isMarketingDept}
      >
        {(provided, snapshot) => {
          const card = (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={() => !isHidden && onOpenDetail(task.id)}
              className={`relative group select-none transition-colors duration-200 rounded-lg ${
                isHidden
                  ? "pointer-events-none"
                  : `p-2 ${getCardStyle(column.id, snapshot.isDragging, isAlerted)}`
              }`}
              style={{
                ...provided.draggableProps.style,
                ...(isHidden && !snapshot.isDragging
                  ? { height: 0, overflow: "hidden", margin: 0, padding: 0 }
                  : {}),
              }}
            >
              {!isHidden && (
                <>
                  {/* Alert badge */}
                  {isAlerted && (
                    <div className="absolute -top-2 -left-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10 animate-bounce">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Delete button */}
                  {!isMarketingDept && (
                    <button
                      onClick={(e) => handleDeleteClick(e, task.id)}
                      className="absolute top-1 right-1 lg:opacity-0 lg:group-hover:opacity-100 opacity-100 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}

                  <div className="flex justify-between items-start mb-0.5 pr-4 gap-1">
                    <h4 className="font-bold text-gray-800 text-xs leading-tight min-w-0 flex-1 truncate">
                      {task.content.split(" - ")[0]}
                    </h4>
                  </div>

                  {/* Row 2: SĐT & Visa/Country Tag */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-semibold text-gray-600">
                      {task.phone}
                    </span>
                    {task.visaType && (
                      <span className="text-[8px] bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.2 rounded font-semibold max-w-[90px] truncate">
                        {normalizeVisaType(task.visaType)}
                      </span>
                    )}
                  </div>

                  {/* Row 3: Chú thích việc cần làm (Activity) */}
                  <div className="mb-1.5" onClick={(e) => e.stopPropagation()}>
                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        placeholder="Chú thích cần làm gì/thiếu gì..."
                        value={newActivityText}
                        onChange={(e) => setNewActivityText(e.target.value)}
                        onBlur={() => handleSaveInlineActivity(task.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveInlineActivity(task.id);
                          if (e.key === "Escape") setEditingTaskId(null);
                        }}
                        autoFocus
                        className="w-full text-[10px] px-1.5 py-0.5 border border-amber-300 rounded bg-amber-50/50 outline-none text-gray-800 focus:ring-1 focus:ring-amber-400"
                      />
                    ) : (
                      <div
                        onClick={() => {
                          setEditingTaskId(task.id);
                          const activeAct = task.activities?.find(a => !a.completed);
                          setNewActivityText(activeAct ? activeAct.summary : "");
                        }}
                        className="text-[10px] px-1.5 py-1 rounded cursor-pointer transition-colors bg-amber-50/70 hover:bg-amber-100 border border-amber-200/50 text-amber-800 flex items-center justify-between gap-1"
                        title="Click để sửa chú thích việc cần làm hôm nay"
                      >
                        <span className="truncate flex-1 font-medium">
                          {task.activities?.find(a => !a.completed) ? (
                            `📌 ${task.activities.find(a => !a.completed)?.summary}`
                          ) : (
                            <span className="text-gray-400 italic font-normal">+ Thêm chú thích việc cần làm...</span>
                          )}
                        </span>
                        {task.activities?.find(a => !a.completed) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const activeAct = task.activities?.find(a => !a.completed);
                              if (activeAct) {
                                onToggleActivity(task.id, activeAct.id);
                              }
                            }}
                            className="text-[9px] font-bold text-amber-600 hover:text-green-600 transition-colors px-1 hover:bg-amber-200/50 rounded"
                            title="Xong"
                          >
                            ✓
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-1 border-t border-gray-100 gap-1 mt-1">
                    <div className="flex gap-1 items-center shrink-0">
                    </div>

                    <div className="flex items-center gap-0.5 min-w-0">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAttachments(task.id);
                        }}
                        className="w-5 h-5 flex items-center justify-center rounded text-green-600 hover:bg-green-50 transition-colors shrink-0"
                        title="Tệp đính kèm"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenActivityList(task.id);
                        }}
                        className="w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
                        title="Xem lịch hoạt động"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
          return snapshot.isDragging ? createPortal(card, document.body) : card;
        }}
      </Draggable>
    );
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="xl" />
      </div>
    );
  if (error || !boardData)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-red-500">{error || "Không có dữ liệu"}</p>
        <button
          onClick={() => fetchBoardData(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Thử lại
        </button>
      </div>
    );

  // Prevent TS unused variable compilation errors
  if (false as boolean) {
    console.log(collapsedColumnIds, handleLoadMore, renderCard);
  }

  return (
    <div
      className="kanban-bamboo-bg crm-jp-bg crm-soft-green-glow flex flex-col h-full w-full px-4 py-3 sm:px-6 sm:py-6 overflow-hidden relative"
      style={{ transform: "none" }}
    >
      <div className="kanban-bamboo-decor" aria-hidden="true" />
      <div className="crm-jp-light" aria-hidden="true" />
      <div className="crm-petals-layer" aria-hidden="true">
        <span className="petal p1" />
        <span className="petal p2" />
        <span className="petal p3" />
        <span className="petal p4" />
        <span className="petal p5" />
        <span className="petal p6" />
        <span className="petal p7" />
        <span className="petal p8" />
        <span className="petal p9" />
        <span className="petal p10" />
        <span className="bamboo b1" />
        <span className="bamboo b2" />
        <span className="bamboo b3" />
        <span className="bamboo b4" />
        <span className="bamboo b5" />
        <span className="bamboo b6" />
        <span className="bamboo b7" />
        <span className="bamboo b8" />
        <span className="bamboo b9" />
        <span className="bamboo b10" />
      </div>
      <style>{`
        @keyframes custom-pop-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-custom-pop {
          animation: custom-pop-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Sử dụng theme từ theme.css - KHÔNG hardcode màu */
        .crm-btn-secondary {
          background: #ffffff;
          border: 1.5px solid #c5e0bb;
          color: #1a2f23;
        }
        .crm-btn-secondary:hover {
          background: #e8f5e3;
          border-color: #10b981;
          color: #15803d;
        }
        .panda-badge-col1  { background: #e8f5e3; color: #15803d; border:1px solid #bbf7d0; }
        .panda-badge-col2  { background: #dbeafe; color: #1d4ed8; border:1px solid #bfdbfe; }
        .panda-badge-col3  { background: #fef9c3; color: #854d0e; border:1px solid #fde68a; }
        .panda-badge-col4  { background: #d1fae5; color: #065f46; border:1px solid #6ee7b7; }
        .panda-badge-other { background: #ede9fe; color: #6d28d9; border:1px solid #ddd6fe; }
      `}</style>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 shrink-0 gap-3">
        <div className="flex items-center gap-3">
          <span style={{ animation: "bambooSway 4s ease-in-out infinite", display: "inline-block", fontSize: "1.75rem" }}>🎋</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold crm-jp-title">
              <span className="crm-jp-title-icon" aria-hidden="true">🐼</span>
              <span>Lãnh Thổ Bé Thục</span>
              <span className="crm-jp-title-icon" aria-hidden="true">🎋</span>
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">


          <button
            onClick={() =>
              setViewMode(viewMode === "board" ? "table" : "board")
            }
            className="flex-1 md:flex-none justify-center text-sm font-semibold px-3 py-2 sm:px-4 rounded-xl transition-all shadow-sm flex items-center gap-2 crm-btn-secondary"
          >
            {viewMode === "board" ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="hidden sm:inline">Xem dạng Bảng</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                <span className="hidden sm:inline">Xem dạng Cột</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenAddCustomer}
            className="flex-1 md:flex-none justify-center text-sm font-bold px-3 py-2 sm:px-4 rounded-xl transition-all shadow-sm flex items-center gap-2 crm-btn-primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">🐼 Thêm Khách Hàng</span>
            <span className="sm:hidden">Thêm Mới</span>
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="shrink-0 mb-2">
        <SearchFilterBar
          searchPlaceholder="Tìm tên, SĐT, nhân viên..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filters={[
            {
              key: "source",
              placeholder: "🌐 Quốc gia",
              value: filterSource,
              options: [
                { value: "Mỹ", label: "Mỹ" },
                { value: "Canada", label: "Canada" },
                { value: "New Zealand", label: "New Zealand" },
              ],
              onChange: setFilterSource,
            },
            {
              key: "column",
              placeholder: "📋 Trạng thái",
              value: filterColumn,
              options: filterOptions.columns,
              onChange: setFilterColumn,
            },
          ]}
          resultCount={filteredTotal}
          totalCount={totalTasks}
          onReset={handleResetFilter}
          hasActiveFilter={hasActiveFilter}
        />

        {isMarketingDept && (
          <div className="flex items-center gap-3 mt-3 mb-1 px-2">
            <div className="flex items-center gap-2 py-1.5 px-4 bg-orange-50 border border-orange-100 rounded-lg shadow-sm">
              <div className="flex -space-x-1">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                <span className="w-2 h-2 rounded-full bg-orange-300 animate-pulse"></span>
              </div>
              <p className="text-xs font-semibold text-orange-800">
                Marketing Report:{" "}
                <span className="text-sm font-bold text-orange-600">
                  {filteredTotal}
                </span>{" "}
                khách hàng
                {filterSource !== "all" && ` từ ${filterSource}`}
              </p>
            </div>
            {filteredTotal > 0 && filterSource !== "all" && (
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-md font-bold uppercase">
                Đang đo lường hiệu quả
              </span>
            )}
          </div>
        )}
      </div>

      {/* KANBAN BOARD */}
      {viewMode === "board" && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 min-h-0 w-full overflow-y-auto custom-scrollbar">
            {/* KIỂU XEM: KHÔNG NHÓM (Mặc định) */}
            {groupBy === "none" ? (
              <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex space-x-4 pb-2 items-start h-full"
                  >
                    {boardData.columnOrder.map((columnId, index) => {
                      const column = boardData.columns[columnId];
                      const filteredTaskIds = getFilteredTaskIds(columnId);
                      const allTasksInCol = column.taskIds
                        .map((id) => boardData.tasks[id])
                        .filter(Boolean);

                      if (filterColumn !== "all" && filterColumn !== columnId)
                        return null;

                      const limit = visibleLimits[columnId] || DEFAULT_LIMIT;
                      const hasMore = column.taskIds.length > limit;
                      const tasksToRender = hasActiveFilter
                        ? column.taskIds
                        : column.taskIds.slice(0, limit);

                      if (false as boolean) {
                        console.log(hasMore, tasksToRender);
                      }

                      return (
                        <Draggable
                          key={column.id}
                          draggableId={column.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex flex-col fv-column h-full shrink-0 transition-all duration-300 group w-[80vw] sm:w-56 min-w-[14rem]"
                            >
                              <div
                                {...provided.dragHandleProps}
                                className="px-3 py-3 flex items-center justify-between shrink-0 crm-panda-col-header select-none cursor-grab active:cursor-grabbing"
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  {editingColumnId === column.id ? (
                                    <input
                                      type="text"
                                      value={editingColumnTitle}
                                      onChange={(e) =>
                                        setEditingColumnTitle(e.target.value)
                                      }
                                      onBlur={() =>
                                        handleRenameColumn(column.id)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          handleRenameColumn(column.id);
                                        }
                                        if (e.key === "Escape") {
                                          setEditingColumnId(null);
                                        }
                                      }}
                                      autoFocus
                                      className="font-bold text-gray-800 text-[11px] px-1.5 py-0.5 border border-blue-400 rounded outline-none w-28"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (isMarketingDept) return;
                                        toggleColumnCollapse(column.id);
                                      }}
                                      className="font-extrabold text-[11px] text-gray-800 uppercase tracking-wide leading-tight text-left truncate hover:text-blue-600 transition-colors"
                                      title={column.title}
                                    >
                                      {column.title}
                                    </button>
                                  )}
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <div className="flex items-center gap-0.5 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingColumnId(column.id);
                                        setEditingColumnTitle(column.title);
                                      }}
                                      className="p-0.5 text-gray-400 hover:text-blue-600 rounded text-xs"
                                      title="Sửa tên cột"
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteColumn(column.id, column.title);
                                      }}
                                      className="p-0.5 text-gray-400 hover:text-red-600 rounded text-xs"
                                      title="Xóa cột"
                                    >
                                      🗑️
                                    </button>
                                  </div>

                                  {hasActiveFilter &&
                                    filteredTaskIds.length !== allTasksInCol.length && (
                                      <span className="text-orange-500 text-2xs font-bold">
                                        {filteredTaskIds.length}
                                      </span>
                                    )}
                                  <span className="bg-gray-200 text-gray-600 font-bold px-2 py-0.5 rounded-full text-2xs">
                                    {allTasksInCol.length}
                                  </span>
                                </div>
                              </div>

                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}

                    {/* Add Column Button */}
                    <button
                      onClick={handleAddColumn}
                      className="flex flex-col items-center justify-center bg-gray-100/30 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/20 text-gray-500 hover:text-blue-600 rounded-xl w-48 min-w-[12rem] h-24 shrink-0 transition-all gap-1 font-semibold text-xs py-4 select-none cursor-pointer"
                    >
                      <span className="text-xl font-bold">+</span>
                      Thêm Cột Mới
                    </button>
                  </div>
                )}
              </Droppable>
            ) : null}
          </div>
        </DragDropContext>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" ? (
        <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="overflow-auto custom-scrollbar flex-1 w-full">
            <table className="w-full min-w-[800px] text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-4 py-3 w-12 text-center">STT</th>
                  <th className="px-4 py-3">Khách hàng</th>
                  <th className="px-4 py-3">Số Điện Thoại</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-center w-16">Hồ sơ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {flatTableData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-10 text-gray-400 italic"
                    >
                      Không có khách hàng nào khớp với tìm kiếm.
                    </td>
                  </tr>
                ) : (
                  flatTableData.map((task, index) => (
                    <tr
                      key={task.id}
                      onClick={() => onOpenDetail(task.id)}
                      className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-center text-gray-400 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-800">
                        <div className="flex items-center gap-2">
                          {activeAlerts.includes(task.id) && (
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          )}
                          {task.content}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-600">
                        {task.phone}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                            {normalizeVisaType(task.visaType) || "Chưa rõ"}
                          </span>
                          {task.jobType && (
                            <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-semibold whitespace-nowrap">
                              {task.jobType}
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className="px-4 py-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={task.columnId}
                          onChange={(e) =>
                            handleStatusChange(
                              task.id,
                              task.columnId,
                              e.target.value,
                            )
                          }
                          disabled={isMarketingDept}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                          {boardData.columnOrder.map((colId) => (
                            <option key={colId} value={colId}>
                              {boardData.columns[colId].title}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        {task.assignedTo ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                              {task.assignedTo
                                .trim()
                                .split(" ")
                                .pop()
                                ?.charAt(0)
                                .toUpperCase()}
                            </div>
                            <span className="text-sm">
                              {task.assignedTo.trim().split(" ").pop()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-xs">
                            Chưa giao
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-blue-600">
                        {task.price}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenAttachments(task.id);
                            }}
                            className="w-10 h-10 flex items-center justify-center rounded-lg text-green-600 bg-green-50 hover:bg-green-100 border border-green-200 transition-colors shadow-sm"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
            <span>
              Tổng số:{" "}
              <strong className="text-gray-800">{flatTableData.length}</strong>{" "}
              khách hàng
            </span>
            <span className="hidden sm:inline">
              Bấm vào dòng để xem chi tiết
            </span>
          </div>
        </div>
      ) : null}

    </div>
  );
};

export default KanbanBoard;
