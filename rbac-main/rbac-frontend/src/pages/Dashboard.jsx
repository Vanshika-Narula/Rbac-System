import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-md shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-medium text-gray-800 mb-10">
          Welcome, {user.username}!
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Role:</p>
            <p className="text-lg text-gray-500">{user.role}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Email:</p>
            <p className="text-lg text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1.5 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
