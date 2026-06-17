import { asyncHandler } from "../middlewares/asyncHandler.js";
import { getBoardDataService } from "../services/board.service.js";
import { prisma } from "../../lib/prisma.js";
import { getIO } from "../socket.js";

export const getBoardData = asyncHandler(async (_req, res) => {
  try {
    const data = await getBoardDataService();
    res.status(200).json(data);
  } catch (error) {
    console.error("Lỗi getBoardData:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
});

export const createColumn = asyncHandler(async (req, res) => {
  try {
    const { id, title, order } = req.body;
    const newCol = await prisma.column.create({
      data: { id, title, order: Number(order) || 0 }
    });
    try { getIO().emit("data_changed"); } catch {}
    res.status(201).json(newCol);
  } catch (error) {
    console.error("Lỗi createColumn:", error);
    res.status(500).json({ error: "Lỗi khi tạo cột mới" });
  }
});

export const updateColumn = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedCol = await prisma.column.update({
      where: { id },
      data: { title }
    });
    try { getIO().emit("data_changed"); } catch {}
    res.status(200).json(updatedCol);
  } catch (error) {
    console.error("Lỗi updateColumn:", error);
    res.status(500).json({ error: "Lỗi khi sửa tên cột" });
  }
});

export const deleteColumn = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // 1. Delete all tasks and their activities in this column first to prevent foreign key violations
    const tasksInCol = await prisma.task.findMany({ where: { columnId: id } });
    const taskIds = tasksInCol.map(t => t.id);
    
    await prisma.activity.deleteMany({
      where: { taskId: { in: taskIds } }
    });
    await prisma.task.deleteMany({
      where: { columnId: id }
    });

    // 2. Delete the column
    await prisma.column.delete({
      where: { id }
    });
    try { getIO().emit("data_changed"); } catch {}
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Lỗi deleteColumn:", error);
    res.status(500).json({ error: "Lỗi khi xóa cột" });
  }
});

export const reorderColumns = asyncHandler(async (req, res) => {
  try {
    const { columnOrder } = req.body; // Array of IDs in the new order
    if (Array.isArray(columnOrder)) {
      for (let i = 0; i < columnOrder.length; i++) {
        await prisma.column.update({
          where: { id: columnOrder[i] },
          data: { order: i }
        });
      }
    }
    try { getIO().emit("data_changed"); } catch {}
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Lỗi reorderColumns:", error);
    res.status(500).json({ error: "Lỗi khi sắp xếp lại cột" });
  }
});
