import { getUserLevel } from "../Authentication/Auth";
import { Navigate } from "react-router-dom";

export function RequireAdmin({ children, redirectTo }) {
  let isAuth = getUserLevel();
  console.log(isAuth)
  return isAuth == "Admin" ? children : <Navigate to={redirectTo} />;
}
