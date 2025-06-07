import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Transactions from "./pages/Transaction";
import Dashboard from "./pages/Dashboard";
import FeedbackAnalytics from "./pages/FeedbackAnalytics";
import Reports from "./pages/Reports";
import Survey from "./pages/Survey";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import UserManagement from "./pages/UserManagement";
import FarewellMessages from "./pages/FarewellMessages";

function AppRoutes() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Logout handler that logs out and redirects to login
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid px-4 position-relative">
          <Link className="navbar-brand" to="/">
            POS System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            {/* Centered nav links */}
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transactions">
                  Transactions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feedback">
                  Feedback
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reports">
                  Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/survey">
                  Survey
                </Link>
              </li>
              {user?.role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">
                      User Management
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/farewell-messages">
                      Farewell Messages
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logout button aligned top right */}
          <div className="position-absolute end-0 me-3">
            <button className="btn btn-sm btn-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <FeedbackAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey"
            element={
              <ProtectedRoute>
                <Survey />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserManagement setLoading={() => {}} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farewell-messages"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <FarewellMessages setLoading={() => {}} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
