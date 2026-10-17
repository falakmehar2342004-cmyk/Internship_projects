import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const verified = location.state?.verified;

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    // Frontend demo only: password is not saved to a server.
    console.log("Demo reset requested for:", email);
    setSuccess(true);
  };

  if (!email || !verified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-100 p-4">
        <p className="text-slate-700">
          Please verify your OTP first.
        </p>
        <Link
          to="/forgot-password"
          className="font-semibold text-blue-600 hover:underline"
        >
          Start password reset
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {success ? (
          <div className="text-center">
            <div className="mb-4 text-4xl text-green-600">✓</div>

            <h1 className="text-2xl font-bold text-slate-900">
              Demo Completed
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              Password validation succeeded. No password was saved or
              changed on the server.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login", { replace: true })}
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-center text-2xl font-bold text-slate-900">
              Reset Password
            </h1>

            <p className="mb-6 mt-2 text-center text-sm text-slate-500">
              Account: {email}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  New Password
                </label>

                <input
                  type="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;