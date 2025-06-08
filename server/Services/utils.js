import jwt from "jsonwebtoken";

// Generate a token
export const generateToken = (userId) => {
  console.log("JWT Secret during generation:", process.env.JWT_SECRET); 
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};





