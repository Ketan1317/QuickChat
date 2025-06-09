import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import assets from "../assets/assets";

const Sidebar = () => {
  const { logout, onlineUser } = useContext(AuthContext);
  const { selectedUser, setSelectedUser, unseenMessages, users, getUsers } =
    useContext(ChatContext);
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  // Filter users based on search input
  const filteredUsers = input
    ? users.filter((user) =>
        user?.fullName?.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  // Fetch users when component mounts or onlineUser changes
  useEffect(() => {
    getUsers();
  }, [getUsers, onlineUser]);

  return (
    <div
      className={`h-full overflow-y-auto rounded-r-xl bg-[#8185B2]/10 p-5 text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* Logo and Menu */}
      <div className="pb-5">
        <div className="flex items-center justify-between">
          <img src={assets.logo_icon} className="max-w-40" alt="Logo" />

          {/* Menu Icon with Dropdown */}
          <div className="group relative py-2">
            <img
              src={assets.menu_icon}
              className="max-w-5 cursor-pointer"
              alt="Menu"
            />
            <div className="absolute right-0 top-full z-20 hidden w-32 rounded-md border border-gray-600 bg-[#282142] p-5 text-gray-100 group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm hover:text-gray-300"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p
                onClick={logout}
                className="cursor-pointer text-sm hover:text-gray-300"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-5 flex items-center gap-2 rounded-full bg-[#282142] px-4 py-3">
        <img src={assets.search_icon} className="w-3" alt="Search" />
        <input
          type="text"
          placeholder="Search User..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border-none bg-transparent text-xs text-white placeholder-[#c8c8c8] outline-none"
        />
      </div>

      {/* User List */}
      <div className="mt-4 flex flex-col">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`relative flex cursor-pointer items-center gap-2 rounded p-2 pl-4 hover:bg-[#282142]/30 max-sm:text-sm ${
                selectedUser?._id === user._id ? "bg-[#282142]/50" : ""
              }`}
            >
              {/* User Profile Picture */}
              <img
                className="aspect-square w-[35px] rounded-full"
                src={user.profilePic || assets.avatar_icon}
                alt={`${user.fullName || "User"}'s avatar`}
              />

              {/* User Details */}
              <div className="flex flex-col leading-5">
                <p className="truncate">{user.fullName || "Unknown User"}</p>
                <span
                  className={
                    onlineUser.includes(user._id)
                      ? "text-green-400 text-xs"
                      : "text-xs text-neutral-400"
                  }
                >
                  {onlineUser.includes(user._id) ? "Online" : "Offline"}
                </span>
              </div>

              {/* Unseen Messages Indicator */}
              {unseenMessages[user._id] > 0 && (
                <p className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/50 text-xs">
                  {unseenMessages[user._id]}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;