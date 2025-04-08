// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user, token } = useAuthStore();
  const location = useLocation();

  // Not logged in - redirect to login
  if (!token || !user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Check role access
  if (allowedRoles && !allowedRoles.includes(user.roleRelation.role)) {
    // Save attempted location for potential redirect back after proper login
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
