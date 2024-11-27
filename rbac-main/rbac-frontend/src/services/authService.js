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

// User registration
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// User login
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("api/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("api/auth/logout");
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    throw error;
  }
};
