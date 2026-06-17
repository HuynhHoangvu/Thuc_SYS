import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import boardRoutes from "./routes/board.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import taskRoutes from "./routes/task.routes.js";
import docsRoutes from "./routes/docs.routes.js";
import processedDocsRoutes from "./routes/processedDocs.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { getCorsOrigins } from "../config/env.js";
const app = express();
app.set("trust proxy", 1);
app.get("/health", (_req, res) => {
    res.status(200).type("text/plain").send("ok");
});
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000, // increased for standalone deployment stability
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Quá nhiều request, vui lòng thử lại sau." }
});
app.use("/api/", apiLimiter);
const corsOriginValidator = (origin, callback) => {
    const allowed = getCorsOrigins();
    if (!origin || allowed.includes(origin)) {
        callback(null, true);
    } else {
        console.warn(`⚠️ CORS blocked for origin: ${origin}. Allowed origins: ${allowed.join(", ")}`);
        callback(null, false);
    }
};
app.use(cors({
    origin: corsOriginValidator,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
}));
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
// Routes
app.use("/api/board", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/docs", docsRoutes);
app.use("/api/processed-docs", processedDocsRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.get("/", (_req, res) => {
    res.json({
        message: "🚀 standalone CRM & Documents API Server is running!",
        status: "online",
        time: new Date().toISOString(),
    });
});
app.use(errorHandler);
export default app;
