import { ArrowLeft, Compass, LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  authFailure,
  authStart,
} from "../features/auth/authSlice";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";

export default function Login() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(values) {
    dispatch(authStart());

    // Supabase connection agle part mein add hogi.
    // Filhaal fake login ko success nahi dikhate.
    dispatch(
      authFailure(
        "Login service is not connected yet. Supabase setup is coming next."
      )
    );
  }

  return (
    <div className="auth-page">
      <section className="auth-card">
        <Link to="/" className="back-link">
          <ArrowLeft size={17} /> Back to explore
        </Link>

        <div className="auth-brand-icon">
          <Compass size={28} />
        </div>

        <p className="section-kicker">WELCOME BACK</p>
        <h1>Sign in to Wanderly</h1>
        <p className="auth-description">
          Sign in to access your saved destinations and travel favourites.
        </p>

        <ErrorMessage message={error} />

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="login-email">Email address</label>

          <div className="input-with-icon">
            <Mail size={18} />
            <input
              id="login-email"
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

          <label htmlFor="login-password">Password</label>

          <div className="input-with-icon">
            <LockKeyhole size={18} />
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required.",
              })}
            />
          </div>

          {errors.password && (
            <p className="field-error">{errors.password.message}</p>
          )}

          <button className="primary-button auth-submit" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {loading && <Loader text="Connecting..." />}

        <p className="auth-switch">
          New to Wanderly? <Link to="/signup">Create an account</Link>
        </p>
      </section>
    </div>
  );
}