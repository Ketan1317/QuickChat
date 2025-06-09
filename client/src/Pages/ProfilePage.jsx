import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(authUser?.fullname || "");
  const [bio, setBio] = useState(authUser?.bio || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      return () => URL.revokeObjectURL(objectUrl); 
    }
  }, [selectedImage]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!name || !bio) {
      toast.error("Name and Bio are required.");
      return;
    }

    try {
      if (!selectedImage) {
        await updateProfile({ fullname: name, bio });
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
        reader.onload = async () => {
          const base64Image = reader.result;
          await updateProfile({ fullname: name, bio, profilePic: base64Image });
        };
        reader.onerror = () => {
          throw new Error("Failed to read the selected image.");
        };
      }

      toast.success("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form
          className="flex flex-col gap-5 p-10 flex-1"
          onSubmit={onSubmitHandler}
        >
          <h3 className="text-lg font-semibold">Profile Details</h3>

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

          <input
            placeholder="Your Name..."
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            rows={4}
            onChange={(e) => setBio(e.target.value)}
            required
            value={bio}
            placeholder="Write a short bio..."
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>

        <img
          className={`w-36 h-36 rounded-full mx-10 max-sm:mt-10 object-cover ${
            selectedImage && "rounded-full"
          } shadow-lg`}
          src={authUser.profilePic || assets.avatar_icon}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
