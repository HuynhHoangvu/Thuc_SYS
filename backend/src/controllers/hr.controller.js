import { asyncHandler } from "../middlewares/asyncHandler.js";
import { prisma } from "../../lib/prisma.js";

export const getBasicEmployees = asyncHandler(async (_req, res) => {
  try {
    const uniqueNames = await prisma.task.findMany({
      select: { assignedTo: true },
      distinct: ["assignedTo"],
      orderBy: { assignedTo: "asc" },
    });

    const employees = uniqueNames
      .map((item) => item.assignedTo)
      .filter(Boolean)
      .map((name, index) => ({
        id: `${name}-${index}`,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, ".")}@local.dev`,
        department: "CRM",
        role: "Nhân viên",
      }));

    if (employees.length === 0) {
      employees.push(
        {
          id: "administrator",
          name: "Administrator",
          email: "administrator@local.dev",
          department: "CRM",
          role: "Quản trị",
        },
        {
          id: "hoangvu",
          name: "HoangVu",
          email: "hoangvu@local.dev",
          department: "CRM",
          role: "Nhân viên",
        },
      );
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error("Lỗi getBasicEmployees:", error);
    res.status(500).json({ error: "Không thể tải danh sách nhân viên" });
  }
});
