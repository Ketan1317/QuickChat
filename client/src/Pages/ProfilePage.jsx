import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Garvit Gandu");
  const [bio, setBio] = useState(
    "Mujhse Bhardwaj kabhi nahi Pategi.....Mujhe Sirf Be faltu ka bajna aata hai 💦"
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Save logic here
    navigate("/");
  };

  return (
    <div className="h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        {/* Form Section */}
        <form
          className="flex flex-col gap-5 p-10 flex-1"
          onSubmit={onSubmitHandler}
        >
          <h3 className="text-lg font-semibold">Profile Details</h3>

          {/* Profile Image Upload */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              className={`h-12 w-12 ${
                selectedImage && "rounded-full"
              } object-cover`}
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : assets.avatar_icon
              }
              alt="Profile"
            />
            <span>Upload Profile Image</span>
          </label>

          {/* Name Input */}
          <input
            placeholder="Your Name..."
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {/* Bio Textarea */}
          <textarea
            rows={4}
            onChange={(e) => setBio(e.target.value)}
            required
            value={bio}
            placeholder="Write a short bio..."
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          ></textarea>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>

        {/* Logo Section */}
        <img
          className="w-36 h-36 rounded-full mx-10 max-sm:mt-10 object-cover shadow-lg"
          src={assets.logo_big}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
