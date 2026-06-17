import { Router } from "express";

const router = Router();

// Placeholder for processed-docs route
router.get("/", (req, res) => {
  res.json({ message: "Processed documents placeholder route." });
});

export default router;
