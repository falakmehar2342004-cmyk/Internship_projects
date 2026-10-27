import { ArrowLeft, Compass, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  authFailure,
  authStart,
} from "../features/auth/authSlice";
import ErrorMessage from "../components/common/ErrorMessage";

export default function Signup() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(values) {
    dispatch(authStart());

    // Real account creation Supabase integration ke baad hogi.
    dispatch(
      authFailure(
        "Registration service is not connected yet. Supabase setup is coming next."
      )
    );
  }

  const password = watch("password");

  return (
    <div className="auth-page">
      <section className="auth-card">
        <Link to="/" className="back-link">
          <ArrowLeft size={17} /> Back to explore
        </Link>

        <div className="auth-brand-icon">
          <Compass size={28} />
        </div>

        <p className="section-kicker">START YOUR JOURNEY</p>
        <h1>Create your account</h1>
        <p className="auth-description">
          Create your Wanderly account to keep your discoveries together.
        </p>

        <ErrorMessage message={error} />

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="signup-name">Full name</label>

          <div className="input-with-icon">
            <UserRound size={18} />
            <input
              id="signup-name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              {...register("name", {
                required: "Name is required.",
                minLength: {
                  value: 2,
                  message: "Name must have at least 2 characters.",
                },
              })}
            />
          </div>

          {errors.name && (
            <p className="field-error">{errors.name.message}</p>
          )}

          <label htmlFor="signup-email">Email address</label>

          <div className="input-with-icon">
            <Mail size={18} />
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address.",
                },
              })}
            />
          </div>

          {errors.email && (
            <p className="field-error">{errors.email.message}</p>
          )}

          <label htmlFor="signup-password">Password</label>

          <div className="input-with-icon">
            <LockKeyhole size={18} />
            <input
              id="signup-password"
              type="password"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters.",
                },
              })}
            />
          </div>

          {errors.password && (
            <p className="field-error">{errors.password.message}</p>
          )}

          <label htmlFor="signup-confirm-password">Confirm password</label>

          <div className="input-with-icon">
            <LockKeyhole size={18} />
            <input
              id="signup-confirm-password"
              type="password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Please confirm your password.",
                validate: (value) =>
                  value === password || "Passwords do not match.",
              })}
            />
          </div>

          {errors.confirmPassword && (
            <p className="field-error">{errors.confirmPassword.message}</p>
          )}

          <button
            className="primary-button auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </div>
  );
}