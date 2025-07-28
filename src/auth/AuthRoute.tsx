import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

type AuthRouteProps = {
  children: ReactNode;
};

export default function AuthRoute({ children }: AuthRouteProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}