import User from "../Models/user.js";
import cloudinary from "../Services/cloudinary.js";
import { generateToken } from "../Services/utils.js";
import bcrypt from "bcryptjs";

// Controller to Sign Up page
export const signup = async (req, res) => {
    const { fullName, password, email, bio } = req.body;

    try {
        if (!fullName || !password || !email || !bio) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.json({ success: false, message: "Account already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            password: hashedPassword,
            email,
            bio,
        });

        const token = generateToken(newUser._id);

        res.json({ success: true, userData: newUser, token, message: "Account Created Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Controller User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Insufficient Details" });
        }
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = generateToken(userData._id);
        res.json({ success: true, userData, token, message: "Login Successful" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Controller to check whether User is Authenticated
export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user });
};

// Controller to Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, fullName, bio } = req.body;
        const userId = req.user._id;
        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { fullName, bio }, { new: true });
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { new: true });
        }

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
