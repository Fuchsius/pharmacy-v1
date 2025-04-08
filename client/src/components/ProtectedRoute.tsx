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

  if (!token || !user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.roleRelation.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
