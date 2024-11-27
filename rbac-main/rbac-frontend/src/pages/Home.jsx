import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="text-center bg-white p-10 rounded-xl shadow-2xl max-w-lg w-full transform transition-all hover:scale-105 hover:shadow-2xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8 leading-tight">
          Welcome to the RBAC System
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Easily manage roles and permissions with a user-friendly interface.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
