import { Route, Routes } from "react-router-dom";

import Explore from "../pages/Explore";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/favorites" element={<Favorites />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}