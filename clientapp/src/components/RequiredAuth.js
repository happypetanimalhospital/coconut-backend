import { isAuthenticated } from "../Authentication/Auth";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children, redirectTo }) {
    let isAuth = isAuthenticated();
    return isAuth ? children : <Navigate to={redirectTo} />;
  }