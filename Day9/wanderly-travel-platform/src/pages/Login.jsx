import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Compass, Mail, Lock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  authStart,
  authSuccess,
  authFailure,
  clearAuthError,
} from "../features/auth/authSlice";
import { isSupabaseConfigured, supabase } from "../services/supabase";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

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
    dispatch(clearAuthError());

    if (!isSupabaseConfigured || !supabase) {
      dispatch(authFailure("Supabase configuration is missing. Check your .env file."));
      return;
    }

    dispatch(authStart());

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: values.email.trim(),
          password: values.password,
        });

      if (loginError) throw loginError;

      dispatch(authSuccess(data.user));
      navigate(location.state?.from?.pathname || "/favorites", {
        replace: true,
      });
    } catch (err) {
      dispatch(authFailure(err.message || "Login failed. Please try again."));
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon"><Compass size={26} /></span>
          <h1>Welcome back</h1>
          <p>Sign in to continue exploring with Wanderly.</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="form-input"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address.",
                  },
                })}
              />
            </div>
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="form-input"
                {...register("password", {
                  required: "Password is required.",
                })}
              />
            </div>
            {errors.password && (
              <p className="field-error">{errors.password.message}</p>
            )}
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <Loader text="Signing in..." /> : "Sign in"}
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/signup">Create one</Link>
        </p>
        <Link className="auth-back-link" to="/">Back to Explore</Link>
      </div>
    </section>
  );
}
