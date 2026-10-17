import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    navigate("/verify-otp", {
      state: { email: data.email },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-5 flex justify-center">
          <div className="rounded-full bg-blue-100 p-4 text-blue-600">
            <Mail size={30} />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold text-slate-900">
          Forgot Password?
        </h1>

        <p className="mb-6 mt-2 text-center text-sm text-slate-500">
          Enter your email to start the password reset demo.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Continue
          </button>
        </form>

        <p className="mt-5 text-center text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;