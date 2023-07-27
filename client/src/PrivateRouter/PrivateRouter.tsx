import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const UserLocal = JSON.parse(localStorage.getItem("user") || "null");

  const user = true;

  return UserLocal.roles === 0 ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
