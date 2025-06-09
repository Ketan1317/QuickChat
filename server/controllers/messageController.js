import Message from "../Models/message.js";
import User from "../Models/user.js";
import cloudinary from "../Services/cloudinary.js";
import { io, userSocketMap } from "../server.js"
import { upload } from "../server.js";

export const getAllUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        // Get All the Members Except for the User itself
        const filteredUser = await User.find({ _id: { $ne: userId } }).select("-password");  // The $ne operator stands for "not equal."

        // Now Count The number of messages that has not be SEEN
        const unseenMessages = {}
        const promises = filteredUser.map(async (user) => {
            const messsages = await Message.find({ senderId: user._id, receiverId: userId, seen: false })
            if (messsages.length > 0) {
                unseenMessages[user._id] = messsages.length;
            }
        })
        await Promise.all(promises);
        res.json({ success: true, unseenMessages, users: filteredUser })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}

// Get all messages for selected User
export const getMessages = (async (req, res) => {
    try {
        const { id: selectedUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId }
            ]
        })
        await Message.updateMany(
            { senderId: selectedUserId, receiverId: myId, seen: false },
            { seen: true }
        );

        res.json({ success: true, messages })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
})

export const markMessageSeen = (async (req, res) => {
    try {

        const { id } = req.params;
        await Message.findByIdAndUpdate(id, { seen: true });
        res.json({ success: true })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
})


export const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if (req.file) {
            try {
                const uploadResponse = await cloudinary.uploader.upload_stream(
                    { folder: "messages" },
                    (error, result) => {
                        if (error) {
                            throw new Error("Cloudinary upload failed: " + error.message);
                        }
                        return result;
                    }
                );

                const bufferStream = require("stream").PassThrough();
                bufferStream.end(req.file.buffer);
                bufferStream.pipe(uploadResponse);

                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error("Image upload failed:", uploadError.message);
                return res.json({ success: false, message: "Image upload failed" });
            }
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.json({ success: true, newMessage });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};