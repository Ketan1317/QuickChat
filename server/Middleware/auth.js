import jwt from "jsonwebtoken";
import User from "../Models/user.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Token not provided or malformed" });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }
    // console.log("userId:"+decoded.userId)
    // console.log("decoded:"+decoded)


    // Fetch user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // console.log("user:"+user)

    req.user = user; 
    // console.log("user2:"+req.user) // Set req.user to the user object
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
  