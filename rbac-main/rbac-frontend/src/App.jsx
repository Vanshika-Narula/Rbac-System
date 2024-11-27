import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import ModeratorDashboard from "./pages/ModeratorDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "moderator"]} />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Admin-only Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Route>

          {/* Moderator Routes */}
          <Route
            element={<ProtectedRoute allowedRoles={["moderator", "admin"]} />}
          >
            <Route
              path="/moderator-dashboard"
              element={<ModeratorDashboard />}
            />
          </Route>

          {/* Redirect */}
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
