import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return selectedUser ? (
    <div className="h-full overflow-hidden relative backdrop-blur-lg">
      {/* Header Section */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500">
        <img
          className="w-8 rounded-full"
          src={assets.profile_martin}
          alt="User Profile"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        {/* Back Button for Small Screens */}
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          className="md:hidden max-w-7 cursor-pointer"
          alt="Back"
        />
        {/* Help Icon for Larger Screens */}
        <img
          src={assets.help_icon}
          className="max-md:hidden max-w-5 cursor-pointer"
          alt="Help"
        />
      </div>
      {/* Chat Area */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((message, index) => (
          <div
            key={index}
            className={`flex items-end w-full gap-2 ${
              message.senderId !== "680f50e4f10f3cd28382ecf9"
                ? "flex-row-reverse"
                : "justify-start"
            }`}
          >
            {/* Message Content */}
            {message.image ? (
              <img onClick={()=> window.open(message.image,"_blank")}
                className={`max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8 ${
                  message.senderId === "680f50e4f10f3cd28382ecf9"
                    ? "rounded-br-none text-right ml-auto"
                    : "rounded-bl-none text-left mr-auto"
                } `}
                src={message.image}
              />
            ) : (
              <p
                className={`p-3 max-w-[70%] md:text-sm font-light rounded-lg mb-8 break-words text-white ${
                  message.senderId === "680f50e4f10f3cd28382ecf9"
                    ? "bg-violet-500/30 rounded-br-none text-right ml-auto"
                    : "bg-gray-500/30 rounded-bl-none text-left mr-auto"
                }`}
              >
                {message.text}
              </p>
            )}

            {/* Sender Info */}
            <div className="text-center text-xs">
              <img
                src={
                  message.senderId === "680f50e4f10f3cd28382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt="Sender Profile"
                className="w-7 rounded-full"
              />
              <p className="text-gray-500">
                {formatMessageTime(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom Area */}

      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex flex-1 items-center bg-gray-100/12 px-3 rounded-full">
          <input
            type="text"
            placeholder="Send a message..."
            className="flex-1 text-sm p-3 border-none outline-none rounded-lg text-white placeholder-gray-400 "
          />
          <input
            type="file"
            id="image"
            accept="image/png , image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img src={assets.send_button} className="w-7 cursor-pointer" />
      </div>
    </div>
  ) : (
    /* Fallback View */
    <div className="flex flex-col items-center gap-3 text-gray-500 bg-white/10 max-md:hidden h-full justify-center">
      <img src={assets.logo_big} className="max-w-36" alt="App Logo" />
      <p className="text-lg font-medium text-white">
        Chat Anytime⌚, Anywhere💬
      </p>
    </div>
  );
};

export default ChatContainer;
