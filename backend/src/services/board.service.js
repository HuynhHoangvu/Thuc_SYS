import { prisma } from "../../lib/prisma.js";
export const getBoardDataService = async () => {
    try {
        let columnsData = await prisma.column.findMany({
            orderBy: { order: "asc" },
            include: {
                tasks: {
                    include: {
                        activities: {
                            orderBy: { createdAt: "desc" },
                        },
                    },
                },
            },
        });
        if (columnsData.length === 0) {
            const defaults = [
                { id: "col-1", title: "Khách hàng mới", order: 0 },
                { id: "col-2", title: "Đang tư vấn", order: 1 },
                { id: "col-3", title: "Chờ xử lý", order: 2 },
                { id: "col-4", title: "Thành công", order: 3 }
            ];
            for (const col of defaults) {
                await prisma.column.create({
                    data: col
                });
            }
            columnsData = await prisma.column.findMany({
                orderBy: { order: "asc" },
                include: {
                    tasks: {
                        include: {
                            activities: {
                                orderBy: { createdAt: "desc" },
                            },
                        },
                    },
                },
            });
        }
        const tasks = {};
        const columns = {};
        const columnOrder = [];
        columnsData.forEach((col) => {
            columnOrder.push(col.id);
            const taskIds = col.tasks.map((t) => t.id);
            columns[col.id] = {
                id: col.id,
                title: col.title,
                taskIds: taskIds,
            };
            col.tasks.forEach((task) => {
                tasks[task.id] = {
                    ...task,
                    columnId: undefined,
                };
            });
        });
        return { tasks, columns, columnOrder };
    }
    catch (error) {
        console.warn("⚠️ Không thể kết nối cơ sở dữ liệu Postgres. Trả về bảng Kanban trống mặc định.", error);
        // Default fallback columns to allow front-end to render properly without a database
        const columns = {
            "col-1": { id: "col-1", title: "Khách hàng mới", taskIds: [] },
            "col-2": { id: "col-2", title: "Đang tư vấn", taskIds: [] },
            "col-3": { id: "col-3", title: "Chờ xử lý", taskIds: [] },
            "col-4": { id: "col-4", title: "Thành công", taskIds: [] }
        };
        return {
            tasks: {},
            columns,
            columnOrder: ["col-1", "col-2", "col-3", "col-4"]
        };
    }
};
