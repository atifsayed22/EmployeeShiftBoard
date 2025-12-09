import { useAuth } from "../context/AuthContext";
import AdminShiftForm from "./AdminShiftForm";
import ShiftsTable from "./ShiftsTable";
import { Calendar, LayoutDashboard, LogOut } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          {/* Brand */}
          <a href="/" className="nav-brand" style={{ fontSize: '24px', fontWeight: 700 }}>
            ShiftBoard
          </a>

          {/* Role Info Badge */}
          <div className="nav-links">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px 16px',
              background: user.role === 'admin' 
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))'
                : 'rgba(16, 185, 129, 0.12)',
              borderRadius: '10px',
              border: user.role === 'admin'
                ? '1px solid rgba(99, 102, 241, 0.3)'
                : '1px solid rgba(16, 185, 129, 0.3)',
            }}>
              {user.role === 'admin' ? (
                <>
                  <LayoutDashboard size={16} style={{ color: 'var(--primary)' }} />
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 600,
                    color: 'var(--primary)'
                  }}>
                    Admin Dashboard
                  </span>
                </>
              ) : (
                <>
                  <Calendar size={16} style={{ color: 'var(--success)' }} />
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 600,
                    color: 'var(--success)'
                  }}>
                    My Shifts
                  </span>
                </>
              )}
            </div>
          </div>

          {/* User Section */}
          <div className="nav-user">
            <div className="user-info">
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-role">{user.role}</div>
              </div>
            </div>
            <button className="nav-logout" onClick={logout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="content">
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Welcome back, {user.name} 👋
            </h1>
            {user.role === "admin" && (
              <p className="page-subtitle">
                Manage employee shifts and schedules
              </p>
            )}
          </div>
        </div>

        {/* Admin Shift Creation Form */}
        {user.role === "admin" && (
          <div className="card-lg" style={{ 
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          }}>
            <div className="card-header">
              <div>
                <h2 className="card-title">Create New Shift</h2>
                <p className="card-subtitle">Assign shifts to employees</p>
              </div>
            </div>
            <AdminShiftForm />
          </div>
        )}

        {/* Shifts Table */}
        <ShiftsTable />
      </main>
    </div>
  );
}
