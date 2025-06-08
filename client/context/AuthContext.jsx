import React , { Children, createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const Backend_url = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = Backend_url;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [socket, setSocket] = useState(null);

  // Check If the User is Authenticated or Not, If so then set the User Data and connect the Socket
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user); 
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  // Login Function to Handle User Authentication and Socket Connection
  const login = async (state, credentials) => {
  try {
    const { data } = await axios.post(`/api/auth/${state}`, credentials);

    if (data.success) {
      setAuthUser(data.userData);
      connectSocket(data.userData);

      axios.defaults.headers.common["token"] = data.token;
      setToken(data.token);
      localStorage.setItem("token", data.token);

      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  // Logout Function to handle user Logout and Socket Disconnection
  const logout = async () => {
    localStorage.removeItem("token");

    setToken(null);
    setAuthUser(null);
    setOnlineUser([])
    axios.defaults.headers.common["token"] = null
    toast.success("Logged Out Successfully")
    socket.disconnect();

  }



// Update profile function to handle User Profile Updates
    const updateProfile = async (body) => {
      try { 
        const {data} = await axios.put("/api/auth/update-profile",body)
          if(data.success){
            setAuthUser(data.user)
            toast.success("Profile Updated successfully")

          
        }
      } catch (error) {
        toast.error(error.message)
        
      }
    }



  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  }, []);

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(Backend_url, {
      query: {
        userId: userData._id, //  Adds the user's ID (userData._id) as a query parameter to the connection URL. The backend can access this query data to identify the connected user.
      },
    });
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("getOnlineUsers",(userIds) => {
      setOnlineUser(userIds)
    })
  };

  const value = {
    axios,
    authUser,
    onlineUser,
    socket,
    login,logout,updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
