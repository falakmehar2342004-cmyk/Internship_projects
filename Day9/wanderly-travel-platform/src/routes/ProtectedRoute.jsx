import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Loader from "../components/common/Loader";

export default function ProtectedRoute() {
  const { isAuthenticated, initializing } = useAppSelector(
    (state) => state.auth
  );
  const location = useLocation();

  if (initializing) {
    return <Loader text="Restoring your session..." />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
