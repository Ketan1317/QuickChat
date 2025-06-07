// Middleware to protect Routes
import User from "../Models/user.js";
import {verifyToken} from "../Services/utils.js"

export const protectRoute = async(req,res,next) => {
    try{
        const token = req.headers.token;
        const decoded = verifyToken(token);

        const user = await User.findById(decoded.userId).select("-password");
        // The .select("-password") ensures the password is not included in the returned user object for security reasons.

        if(!user){
            return res.json({success:false,message:"User Not Found"})
        }
        req.user = user;
        next();

    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})

    }
}