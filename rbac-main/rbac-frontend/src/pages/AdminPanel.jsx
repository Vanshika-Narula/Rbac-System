import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  fetchAllUsers,
  updateUserRole,
  deleteUser,
} from "../services/adminService";

const AdminPanel = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    moderatorUsers: 0,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchAllUsers();
        setUsers(userData);

        // Calculate system stats
        setSystemStats({
          totalUsers: userData.length,
          adminUsers: userData.filter((u) => u.role === "admin").length,
          moderatorUsers: userData.filter((u) => u.role === "moderator").length,
        });
      } catch (err) {
        setError("Failed to load users");
      }
    };

    loadUsers();
  }, []);

  // Change user role
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);

      // Update local state
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      setError("Failed to update user role");
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);

      // Remove user from local state
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-4">
        Admin Control Panel
      </h1>
      <p className="text-center text-lg mb-8">
        <span>username : </span>
        <span className="font-medium text-blue-600">{user?.username}</span>
        <br />
        <span>email : </span>
        <span className="font-medium text-blue-600">{user?.email}</span>
      </p>
      {/* System Statistics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">System Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-xl font-medium">Total Users</h3>
            <p className="text-2xl font-semibold">{systemStats.totalUsers}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-xl font-medium">Admin Users</h3>
            <p className="text-2xl font-semibold">{systemStats.adminUsers}</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-xl font-medium">Moderator Users</h3>
            <p className="text-2xl font-semibold">
              {systemStats.moderatorUsers}
            </p>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>

        {/* Error Handling */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* User Table */}
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="p-4 text-left border-b">Username</th>
              <th className="p-4 text-left border-b">Email</th>
              <th className="p-4 text-left border-b">Role</th>
              <th className="p-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u._id}>
                <td className="p-4 border-b">{u.username}</td>
                <td className="p-4 border-b">{u.email}</td>
                {u?.username == user?.username ? (
                  <>
                    <td className="p-3 border-b uppercase">
                      <span className="p-3">--- {u.role} ---</span>
                    </td>
                    <td className="p-4 border-b"></td>
                  </>
                ) : (
                  <>
                    <td className="p-4 border-b">
                      <select
                        value={u.role}
                        onChange={(e) =>
                          handleRoleChange(u._id, e.target.value)
                        }
                        className="p-2 border rounded-md"
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-4 border-b">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({
            length: Math.ceil(users.length / usersPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="bg-slate-300 text-black py-2 px-4 rounded-md hover:bg-slate-400 hover:text-white transition duration-150"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
