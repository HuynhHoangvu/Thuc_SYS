import { Router } from "express";
import { prisma } from "../../lib/prisma.js";

const router = Router();

// GET notifications for a user
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const notifications = await prisma.notification.findMany({
      where: {
        receiver: {
          has: username
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    res.json(notifications);
  } catch (error) {
    console.error("Lỗi khi lấy thông báo:", error);
    res.status(500).json({ error: "Không thể lấy danh sách thông báo" });
  }
});

export default router;
