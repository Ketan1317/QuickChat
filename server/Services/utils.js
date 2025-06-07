// Import the default export from jsonwebtoken
import jwt from "jsonwebtoken";

// Generate a token
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    return token;
};

// Verify the token
const verifyToken = (token) => {
    try {
        if (!token) {
            throw new Error("Token not provided");
        }
        // Verify the token and return the decoded payload
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        return decodedUser;
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return null; // Return null in case of error
    }
};

// Exporting as ES Modules
export { generateToken, verifyToken };
