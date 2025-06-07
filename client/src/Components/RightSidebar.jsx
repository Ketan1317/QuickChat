import React from 'react'
import assets from '../assets/assets'

const RightSidebar = (selectedUser,setSelectedUser) => {
  return selectedUser && (
    <div>
        <div>
            <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" />
        </div>

      
    </div>
  )
}

export default RightSidebar
