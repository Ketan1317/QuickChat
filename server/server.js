import express from "express";
import http from "http";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js"
import "dotenv/config";
import { connectDB } from "./Models/db.js";

const app = express();
const server = http.createServer(app);

app.use(express.json({limit:"4mb"}))
app.use(cors());

app.use("/api/status",(req,res) => res.send("Server is Live"))
app.use("/api/auth",userRouter);

await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT,() => console.log("Server started at: " +PORT));


