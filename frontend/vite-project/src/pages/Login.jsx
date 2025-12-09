import { useState } from "react";
import api from "../api/apiInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogIn, Sparkles, Mail, Lock } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const { data } = await api.post("/login", { email, password });
      login(data);
      nav("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo/Brand Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={26} color="white" />
          </div>
          <h2 className="login-title" style={{ marginBottom: 0 }}>
            ShiftBoard
          </h2>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: 600, 
            color: 'var(--text-heading)',
            marginBottom: '8px'
          }}>
            Welcome Back
          </h3>
          <p className="login-subtext">
            Sign in to manage your shifts and schedule
          </p>
        </div>

        {err && <div className="alert alert-error">{err}</div>}

        <form onSubmit={submit} className="login-form">
          <div className="form-group">
            <label className="form-label">
              <Mail size={14} style={{ display: 'inline-block', marginRight: '6px' }} />
              Email Address
            </label>
            <input
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={14} style={{ display: 'inline-block', marginRight: '6px' }} />
              Password
            </label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full" 
            disabled={loading}
            style={{ marginTop: '24px', height: '48px', fontSize: '16px' }}
          >
            {loading ? (
              <>
                <div className="spinner" /> Signing in...
              </>
            ) : (
              <>
                <LogIn size={20} /> Sign In
              </>
            )}
          </button>
        </form>

        <div className="divider-text" style={{ marginTop: '24px', fontSize: '12px' }}>
          Secure authentication
        </div>
      </div>
    </div>
  );
}
