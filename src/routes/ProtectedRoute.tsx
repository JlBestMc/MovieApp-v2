import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" />;

  return children;
}
