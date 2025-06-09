import express from "express";
import http from "http";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import "dotenv/config";
import { connectDB } from "./Models/db.js";
import messageRouter from "./Routes/message.Router.js";
import { Server } from "socket.io";
import { error } from "console";

// Create Express App and HTTP Server
const app = express();
const httpServer = http.createServer(app);

// Initialize the Socket.IO server
export const io = new Server(httpServer, {
    cors: { origin: "*" },
});

// Store Online Users
export const userSocketMap = {}; // { userId: SocketId }

// Socket.IO connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId; // Extract userId from query parameters
    console.log("User connected: ", userId);


    if (userId) {
        userSocketMap[userId] = socket.id;
    }

//  creates a hashmap in which every user has assinged a unique socket id ==> userSocketMap[userId] = socket.id;

    socket.on("getOnlineUsersRequest", () => {
        const onlineUserIds = Object.keys(userSocketMap); // Get all online user IDs
        socket.emit("getOnlineUsers", onlineUserIds); // Send online users back to the requesting client
    });

    // Emit online users to all connected users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    io.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message); // Log error on the server
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

// Middleware and Routes
app.use(express.json({ limit: "20mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Server is Live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Database Connection
await connectDB();

// Start the HTTP server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log("Server started at: " + PORT));
