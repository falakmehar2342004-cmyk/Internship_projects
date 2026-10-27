import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Compass, User, Mail, Lock } from "lucide-react";
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

export default function Signup() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(values) {
    dispatch(clearAuthError());
    setSuccessMessage("");

    if (!isSupabaseConfigured || !supabase) {
      dispatch(authFailure("Supabase configuration is missing. Check your .env file."));
      return;
    }

    dispatch(authStart());

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: values.email.trim(),
        password: values.password,
        options: {
          data: { full_name: values.name.trim() },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (signupError) throw signupError;

      if (data.session && data.user) {
        dispatch(authSuccess(data.user));
        navigate("/", { replace: true });
      } else {
        dispatch(authSuccess(null));
        setSuccessMessage(
          "Your registration was submitted. Check your email for the verification link, then sign in."
        );
      }
    } catch (err) {
      dispatch(authFailure(err.message || "Signup failed. Please try again."));
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon"><Compass size={26} /></span>
          <h1>Create your account</h1>
          <p>Save places and plan your next adventure with Wanderly.</p>
        </div>

        {error && <ErrorMessage message={error} />}

        {successMessage && (
          <div className="success-message" role="status">
            {successMessage}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full name</label>
            <div className="input-with-icon">
              <User size={18} />
              <input
                id="name"
                autoComplete="name"
                placeholder="Your name"
                className="form-input"
                {...register("name", {
                  required: "Name is required.",
                  minLength: {
                    value: 2,
                    message: "Name must contain at least 2 characters.",
                  },
                })}
              />
            </div>
            {errors.name && <p className="field-error">{errors.name.message}</p>}
          </div>

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
                autoComplete="new-password"
                placeholder="At least 6 characters"
                className="form-input"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must contain at least 6 characters.",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="field-error">{errors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat your password"
                className="form-input"
                {...register("confirmPassword", {
                  required: "Please confirm your password.",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match.",
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="field-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <Loader text="Creating account..." /> : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <Link className="auth-back-link" to="/">Back to Explore</Link>
      </div>
    </section>
  );
}
