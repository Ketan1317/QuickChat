import React, { useContext, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import ChatContainer from '../Components/ChatContainer';
import RightSidebar from '../Components/RightSidebar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const {selectedUser} = useContext(ChatContext)
  return (
    <div
      className="w-full px-[15%] py-[5%] h-screen bg-center">
        <div className={`backdrop-blur-2xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? `md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]` : `md:grid-cols-2`} `}>
            <Sidebar/>
            <ChatContainer/>
            <RightSidebar/>
        </div>
        
    </div>
  );
};

export default HomePage;
