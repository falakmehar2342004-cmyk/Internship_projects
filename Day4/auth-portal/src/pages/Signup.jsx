
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearApiError,
} from "../features/auth/authSlice.js";

import { registerUser } from "../services/authService";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, apiError } = useAppSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    dispatch(loginStart());

    try {
      const data = await registerUser({
         name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      dispatch(
        loginSuccess({
          user: {
            name: formData.name,
            email: formData.email,
          },
          token: data.token,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      dispatch(
        loginFailure(
          error.message || "Signup failed. Please try again."
        )
      );
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join us and get started in just a moment."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        {apiError && (
          <ErrorMessage
            message={apiError}
            onClose={() => dispatch(clearApiError())}
          />
        )}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Full name
          </label>

          <div className="relative">
            <UserRound
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              aria-invalid={Boolean(errors.name)}
              {...register("name", {
                required: "Full name is required.",
                minLength: {
                  value: 2,
                  message: "Name must contain at least 2 characters.",
                },
              })}
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {errors.name && (
            <p className="mt-2 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              aria-invalid={Boolean(errors.password)}
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 characters.",
                },
              })}
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((value) => !value)
              }
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isLoading ? (
            <Loader text="Creating account..." />
          ) : (
            <>
              Create account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
