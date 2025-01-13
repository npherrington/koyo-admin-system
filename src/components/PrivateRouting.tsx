import React from "react";
import { Route, Navigate } from "react-router-dom"; // Use Navigate instead of Redirect
import { isAuthenticated } from "../utils/auth"; // Import your authentication function

// Type the props to accept a component
interface PrivateRouteProps {
  element: React.ReactNode; // The element to render if authenticated
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }
  return <>{element}</>; // Render the passed element if authenticated
};

export default PrivateRoute;
