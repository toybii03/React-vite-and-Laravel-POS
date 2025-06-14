import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '../context/AuthContext';
import axios from '../lib/axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/icons.css";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!captchaValue) {
      setError('Please complete the CAPTCHA verification');
      return;
    }

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
        recaptcha_token: captchaValue,
      });

      const { token, user } = response.data;
      login(token, user);

      // Navigate to the return url or dashboard
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <i className="bi bi-shop text-primary display-1 mb-3"></i>
                  <h1 className="display-6 fw-bold text-primary mb-3">POS System</h1>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="form-floating mb-4">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="email">
                      <i className="bi bi-envelope me-2"></i>
                      Email address
                    </label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password">
                      <i className="bi bi-lock me-2"></i>
                      Password
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mb-4">
                    <ReCAPTCHA
                      sitekey="6LdpDFwrAAAAAFGHJHgwn3ksCTGh-koeC2uYFZlG"
                      onChange={setCaptchaValue}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3 mb-4 fw-bold"
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </button>

                  <p className="text-center text-muted small mb-0">
                    <i className="bi bi-question-circle me-2"></i>
                    Having trouble logging in? Contact your system administrator
                  </p>
                </form>
              </div>
            </div>

            <div className="text-center mt-4 small text-muted">
              <p className="mb-0">© 2024 POS System. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
