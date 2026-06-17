import { Router } from "express";
import { getBoardData, createColumn, updateColumn, deleteColumn, reorderColumns } from "../controllers/board.controller.js";

const router = Router();

router.get("/", getBoardData);
router.post("/columns", createColumn);
router.put("/columns/:id", updateColumn);
router.delete("/columns/:id", deleteColumn);
router.put("/columns-reorder", reorderColumns);

export default router;
