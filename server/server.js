import express from "express";
import http from "http";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import "dotenv/config";
import { connectDB } from "./Models/db.js";
import messageRouter from "./Routes/message.Router.js";
import { Server } from "socket.io";
import multer from "multer";

const app = express();
const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
    cors: { origin: "*" },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected: ", userId);

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    socket.on("getOnlineUsersRequest", () => {
        const onlineUserIds = Object.keys(userSocketMap);
        socket.emit("getOnlineUsers", onlineUserIds);
    });

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    io.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
        io.emit("connection_error", {
            message: "Unable to connect. Please try again later.",
        });
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected: ", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

app.use(express.json({ limit: "20mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Server is Live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

export { upload };

await connectDB();

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log("Server started at: " + PORT));