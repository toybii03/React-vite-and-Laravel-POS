import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!captchaValue) {
      setError("Please verify that you're not a robot.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
        recaptcha_token: captchaValue, // Send captcha value to backend
      });
      const { token, user } = response.data;

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_role", user.role);

      navigate("/dashboard");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <h2>Welcome Back</h2>
        </div>
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <ReCAPTCHA
              sitekey="6Lees1YrAAAAAIWO1Al1HjT7-d3-Rgvw6pX_-gfF"
              onChange={setCaptchaValue}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
