import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const Backend_url = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = Backend_url;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [authUser, setAuthUser] = useState(null);  // current user
  const [onlineUser, setOnlineUser] = useState([]);  // all the online users
  const [socket, setSocket] = useState(null);  // socket connection

  // Check authentication status and reconnect socket on refresh
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;  // Setting the token to req.headers.authorization for all http requests 
      //                                                                   ==> Authorization: Bearer <your-token>

      checkAuth();
    } else {
      setAuthUser(null);
      setOnlineUser([]);
      if (socket) socket.disconnect();
    }
  }, [token]);

  // Verify authentication status
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      } else {
        handleAuthFailure("Session expired. Please log in again.");
      }
    } catch (error) {
      handleAuthFailure(
        `Authentication failed: ${error.message || "Unknown error"}`
      );
    }
  };

  // Handle authentication failure
  const handleAuthFailure = (message) => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUser([]);
    if (socket) socket.disconnect();
    toast.error(message);
  };

  // Login function
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        connectSocket(data.userData);
        toast.success(data.message || "Logged in successfully");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during login");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      localStorage.removeItem("token");
      setToken(null);
      setAuthUser(null);
      setOnlineUser([]);
      delete axios.defaults.headers.common["Authorization"];
      if (socket) socket.disconnect();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message || "An error occurred during logout");
    }
  };

  // Update profile function
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while updating profile");
    }
  };

  // Connect to socket and fetch online users
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(Backend_url, {
      query: { userId: userData._id },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      setSocket(newSocket);
      newSocket.emit("getOnlineUsersRequest"); // Request current online users
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUser(userIds || []);
    });

    newSocket.on("connect_error", (error) => {
      toast.error("Socket connection failed: " + error.message);
    });

    newSocket.connect();
  };

  const value = {
    axios,
    authUser,
    onlineUser,
    socket,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};