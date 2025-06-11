import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const { socket, axios } = useContext(AuthContext);

  // Fetch all users for the sidebar
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users || []);
        setUnseenMessages(data.unseenMessages || {});
      } else {
        toast.error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching users");
    }
  };

  // Fetch messages for the selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages || []);
      } else {
        toast.error(data.message || "Failed to fetch messages");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching messages");
    }
  };

  // Send a message to the selected user
  const sendMessage = async (messageData) => {
  if (!selectedUser?._id) {
    toast.error("No user selected");
    return;
  }
  try {
    const { data } = await axios.post(
      `/api/messages/send/${selectedUser._id}`, // Include receiverId in the URL
      messageData // Send only messageData (text or image)
    );
    if (data.success) {
      setMessages((prev) => [...prev, data.newMessage]);
    } else {
      toast.error(data.message || "Failed to send message");
    }
  } catch (error) {
    toast.error(error.message || "An error occurred while sending the message");
  }
};


const subscribeToMessages = () => {
  if (!socket) return;

  socket.on("newMessage", (newMessage) => {
    if (selectedUser && newMessage.senderId === selectedUser._id) {
      setMessages((prev) => [...prev, { ...newMessage, seen: true }]);
      axios
        .put(`/api/messages/mark/${newMessage._id}`)
        .catch(() => toast.error("Failed to mark message as seen"));
    } else {
      setUnseenMessages((prev) => ({
        ...prev,
        [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
      }));
    }
  });
};

// Unsubscribe from messages
const unsubscribeToMessages = () => {
  if (socket) socket.off("newMessage");
};

// Set up socket listeners and cleanup
useEffect(() => {
  if (socket) {
    subscribeToMessages();
    return () => unsubscribeToMessages();
  }
}, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    setUsers,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    getMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};