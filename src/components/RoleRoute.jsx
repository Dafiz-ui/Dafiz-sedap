import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../contexts/useAuth";

export default function RoleRoute({ roles }) {
  const { profile, loading } = useAuth();

  if (loading) return <Loading />;
  if (!roles.includes(profile?.role)) return <Navigate to="/error/403" replace />;

  return <Outlet />;
}
