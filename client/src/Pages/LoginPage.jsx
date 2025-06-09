import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currentState === "Sign Up" && !isSubmitted) {
      setIsSubmitted(true);
      return;
    }
    login(currentState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* Left Section */}
        <img
          src={assets.logo_big}
          alt="Logo"
          className="pb-10 w-[min(30vw,350px)]"
        />

      {/* Right Section */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white/8 backdrop-blur-2xl text-white border border-gray-500 p-6 flex flex-col rounded-lg shadow-lg animate-fadeIn"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}
          {isSubmitted && (
            <img
              onClick={() => setIsSubmitted(false)}
              src={assets.arrow_icon}
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currentState === "Sign Up" && !isSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            value={fullName}
            required
            placeholder="Full Name..."
            className="p-2 mt-4 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        )}

        {!isSubmitted && (
          <div className="mt-4 flex flex-col gap-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              required
              placeholder="Email..."
              className="p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              required
              placeholder="Password..."
              className="p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        )}

        {currentState === "Sign Up" && isSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            required
            value={bio}
            placeholder="Add a short bio..."
            className="p-2 mt-4 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 mt-6 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer hover:opacity-90 transition-opacity"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-800 mt-4">
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {currentState === "Sign Up" ? (
            <p className="text-sm text-gray-800">
              Already have an account?{" "}
              <span
                className="font-medium text-violet-700 cursor-pointer hover:underline"
                onClick={() => {
                  setCurrentState("Login");
                  setIsSubmitted(false);
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-800">
              Create an account{" "}
              <span
                className="font-medium text-violet-700 cursor-pointer hover:underline"
                onClick={() => setCurrentState("Sign Up")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
