import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  // If still loading, show nothing or a loading spinner
  if (loading) {
    return <div className="grid place-items-center h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user doesn't have required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to unauthorized or dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated and role is allowed, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
