import React from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* Logo and Menu */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo_icon} className="max-w-40" alt="logo" />

          {/* Menu Icon with Dropdown */}
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              className="max-w-5 cursor-pointer"
              alt="menu"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm hover:text-gray-300"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={() => navigate("/login")} className="cursor-pointer text-sm hover:text-gray-300">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#282142] px-4 py-3 mt-5 flex items-center gap-2 rounded-full">
        <img src={assets.search_icon} className="w-3" alt="search" />
        <input
          type="text"
          placeholder="Search User..."
          className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
        />
      </div>

      {/* User List */}
      <div className="flex flex-col mt-4">
        {userDummyData.map((user, index) => (
          <div
            key={index}
            onClick={() => setSelectedUser(user)}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
              selectedUser?._id === user._id ? "bg-[#282142]/50" : ""
            } hover:bg-[#282142]/30`}
          >
            {/* User Profile Picture */}
            <img
              className="w-[35px] aspect-[1/1] rounded-full"
              src={user?.profilePic || assets.avatar_icon}
            />

            {/* User Details */}
            <div className="flex flex-col leading-5">
              <p className="truncate">{user.fullName}</p>
              {index < 3 ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-xs text-neutral-400">Offline</span>
              )}
            </div>

            {/* Index Indicator */}
            {index > 2 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex items-center justify-center rounded-full bg-violet-500/50">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
