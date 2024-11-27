import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

// Axios instance for base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization token to each request (if available)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get("api/admin/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

// Update user role
export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await axiosInstance.put(`api/admin/users/${userId}/role`, {
      role: newRole,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user role", error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`api/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};

// Fetch system statistics
export const getSystemStats = async () => {
  try {
    const response = await axiosInstance.get("api/admin/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching system stats", error);
    throw error;
  }
};
