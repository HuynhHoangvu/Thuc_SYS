import { prisma } from "../../lib/prisma.js";
export const createTaskService = async (taskData, createdAt) => {
    const newTaskId = `task-${Date.now()}`;
    
    // Find the first column ordered by 'order' ascending
    let firstColumnId = "col-1";
    try {
        const columns = await prisma.column.findMany({
            orderBy: { order: "asc" }
        });
        if (columns && columns.length > 0) {
            firstColumnId = columns[0].id;
        }
    } catch (err) {
        console.error("Lỗi khi tìm cột đầu tiên:", err);
    }

    return prisma.task.create({
        data: {
            ...taskData,
            id: newTaskId,
            columnId: firstColumnId,
            createdAt: createdAt ? new Date(createdAt) : new Date(),
        },
    });
};
export const updateTaskService = async (id, updateData) => {
    return prisma.task.update({
        where: { id },
        data: updateData,
    });
};
export const deleteTaskService = async (id) => {
    return prisma.task.delete({
        where: { id },
    });
};
export const moveTaskService = async (id, columnId) => {
    const oldTask = await prisma.task.findUnique({ where: { id } });
    if (!oldTask)
        throw new Error("Không tìm thấy thẻ khách hàng");
    const updatedTask = await prisma.task.update({
        where: { id },
        data: { columnId },
    });
    if (columnId === "col-4" && oldTask.columnId !== "col-4" && oldTask.assignedTo && !oldTask.commissionPaid) {
        await prisma.task.update({
            where: { id },
            data: { commissionPaid: true }
        });
    }
    return updatedTask;
};
export const moveProcessingTaskService = async (id, processingColId) => {
    return prisma.task.update({
        where: { id },
        data: { processingColId },
    });
};
export const sendNotificationService = async (saleName, sender, customMessage, taskId) => {
    return prisma.notification.create({
        data: {
            sender: sender,
            message: customMessage,
            receiver: [saleName],
            taskId: taskId
        }
    });
};
