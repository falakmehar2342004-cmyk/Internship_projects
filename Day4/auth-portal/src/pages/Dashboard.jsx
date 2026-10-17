
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, RefreshCw, UserRound } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import {
  logout,
  clearApiError,
  dashboardStart,
  dashboardSuccess,
  dashboardFailure,
} from "../features/auth/authSlice";

import api from "../services/Api";
import ThemeToggle from "../components/common/ThemeToggle";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    user,
    dashboardUser,
    dashboardLoading,
    apiError,
  } = useAppSelector((state) => state.auth);

  const fetchDashboardData = async () => {
    dispatch(dashboardStart());

    try {
      // Request interceptor automatically attaches the token.
      const response = await api.get("/users/2");

      dispatch(dashboardSuccess(response.data.data));
    } catch (error) {
      dispatch(
        dashboardFailure(
          error.message || "Unable to load dashboard data."
        )
      );
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Welcome back, {user?.name || user?.email || "User"}!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </header>

        {apiError && (
          <div className="mb-6">
            <ErrorMessage
              message={apiError}
              onClose={() => dispatch(clearApiError())}
            />
          </div>
        )}

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
              <UserRound size={24} />
            </div>

            <h2 className="text-lg font-semibold">
              Your Account
            </h2>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Name: {user?.name || "Not provided"}
            </p>

            <p className="mt-2 break-all text-sm text-slate-500 dark:text-slate-400">
              Email: {user?.email || "Not provided"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold">
              API User Data
            </h2>

            {dashboardLoading ? (
              <div className="mt-5">
                <Loader text="Loading dashboard data..." />
              </div>
            ) : dashboardUser ? (
              <div className="mt-4">
                <p className="font-medium">
                  {dashboardUser.first_name}{" "}
                  {dashboardUser.last_name}
                </p>

                <p className="mt-2 break-all text-sm text-slate-500 dark:text-slate-400">
                  {dashboardUser.email}
                </p>

                <p className="mt-3 text-xs text-slate-400">
                  User ID: {dashboardUser.id}
                </p>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Dashboard data is not available.
                </p>

                <button
                  type="button"
                  onClick={fetchDashboardData}
                  className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                >
                  <RefreshCw size={16} />
                  Try again
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
