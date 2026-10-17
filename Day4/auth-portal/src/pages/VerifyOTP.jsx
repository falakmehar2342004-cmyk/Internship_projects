import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const DEMO_OTP = "123456";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [seconds, setSeconds] = useState(60);
  const [resendMessage, setResendMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const onSubmit = ({ otp }) => {
    if (otp !== DEMO_OTP) {
      setError("otp", {
        type: "manual",
        message: "Incorrect OTP. Try 123456.",
      });
      return;
    }

    navigate("/reset-password", {
      state: { email, verified: true },
    });
  };

  const handleResend = () => {
    setSeconds(60);
    setResendMessage("Demo OTP is 123456.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-2xl font-bold text-slate-900">
          Verify OTP
        </h1>

        <p className="mt-3 text-center text-sm text-slate-500">
          Password reset demo for:
        </p>

        <p className="mb-6 text-center font-medium text-blue-600">
          {email}
        </p>

        <div className="mb-5 rounded-lg bg-blue-50 p-3 text-center text-sm text-blue-800">
          Demo OTP: <strong>123456</strong>
          <br />
          No email will actually be sent.
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Enter 6-digit OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              placeholder="123456"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Enter exactly 6 digits",
                },
              })}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-blue-500"
            />

            {errors.otp && (
              <p className="mt-1 text-sm text-red-500">
                {errors.otp.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Verify OTP
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-slate-600">
          {seconds > 0 ? (
            <p>
              Resend available in{" "}
              <strong>
                00:{String(seconds).padStart(2, "0")}
              </strong>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          )}

          {resendMessage && (
            <p className="mt-2 text-green-600">{resendMessage}</p>
          )}
        </div>

        <p className="mt-5 text-center text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;