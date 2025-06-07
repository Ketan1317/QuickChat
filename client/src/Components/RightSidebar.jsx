import React from 'react';
import assets, { imagesDummyData } from '../assets/assets';

const RightSidebar = ({ selectedUser }) => {
  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
          selectedUser ? 'max-md:hidden' : ''
        }`}
      >
        {/* User Info Section */}
        <div className="pt-16 text-center flex flex-col items-center gap-3 text-sm font-medium">
          <img
            className="w-24 h-24 rounded-full border-4 border-violet-500 shadow-lg"
            src={selectedUser?.profilePic || assets.avatar_icon}
          />
          <h1 className="text-lg font-bold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            {selectedUser.fullName}
          </h1>
          <p className="px-5 text-center text-gray-300 italic">
            {selectedUser.bio}
          </p>
        </div>

        <hr className="border-[#ffffff50] my-5 mx-5" />

        {/* Media Section */}
        <div className="px-5 text-sm">
          <p className="font-semibold text-gray-400">Media</p>
          <div className="mt-3 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-3">
            {imagesDummyData.map((pic, index) => (
              <div
                key={index}
                onClick={() => window.open(pic, '_blank')}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src={pic}
                  className="rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white font-medium py-2 px-16 rounded-full shadow-lg hover:scale-105 transition-transform">
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
