import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is authenticated, redirect to the intended page or dashboard
  if (user) {
    // Get the redirect path from location state or default to dashboard
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  // If user is not authenticated, show the public route (login page)
  return children;
};

export default PublicRouter;
