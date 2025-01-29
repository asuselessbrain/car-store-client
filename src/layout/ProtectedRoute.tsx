import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { currentToken } from "../redux/fetchers/auth/authSlice";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    const location = useLocation();

  const token = useAppSelector(currentToken);
  if (!token) {
    return <Navigate to="/login"  state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
