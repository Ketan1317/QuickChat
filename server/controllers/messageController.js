import Message from "../Models/message.js";
import User from "../Models/user.js";
import cloudinary from "../Services/cloudinary.js";
import { io, userSocketMap } from "../server.js"

export const getAllUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        // Get All the Members Except for the User itself
        const filteredUser = await User.find({ _id: { $ne: userId } }).select("-password");  // The $ne operator stands for "not equal."

        // Now Count The number of messages that has not be SEEN
        const unseenMessages = {}
        const promises = filteredUser.map(async (user) => {
            const messsages = await Message.find({ senderId: user._id, recieverId: userId, seen: false })
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
                { senderId: myId, recieverId: selectedUserId },
                { senderId: selectedUserId, recieverId: myId }
            ]
        })
        await Message.updateMany(
            { senderId: selectedUserId, recieverId: myId, seen: false },
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

// Send message to Selected User 
export const sendMessage = (async (req, res) => {
    try {
        const { text, image } = req.body;
        const senderId = req.params.id;
        const receiverId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadRespose = await cloudinary.uploader.upload(image);
            imageUrl = uploadRespose.secure_url;
        }

        const newMessage = await Message.create({
            senderId, recieverId, text, image: imageUrl
        });

        // emit the new message to the recievers socket
        const recieverSocketId = userSocketMap[receiverId];
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }
        res.json({ success: true, newMessage })



    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }


})