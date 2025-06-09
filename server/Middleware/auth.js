import jwt from "jsonwebtoken";
import User from "../Models/user.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token) return res.status(401).json({ success: false, message: "Token not provided" });

    const { userId } = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(userId); // Fetch user
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    const message = error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    res.status(401).json({ success: false, message });
  }
};
