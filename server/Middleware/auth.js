import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    console.log("Received Token:", token);
    console.log("JWT Secret verify krte time:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.userId)
    req.user = decoded.userId

    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
