// src/socket.ts
import { Server } from "socket.io";
import { getCorsOrigins } from "../config/env.js";
let io;
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: (origin, cb) => {
                const allowed = getCorsOrigins();
                if (!origin || allowed.includes(origin)) {
                    cb(null, true);
                } else {
                    console.warn(`⚠️ Socket.io CORS blocked for origin: ${origin}. Allowed origins: ${allowed.join(", ")}`);
                    cb(null, false);
                }
            },
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            credentials: true,
        },
    });
    return io;
};
export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io chưa được khởi tạo!");
    }
    return io;
};
