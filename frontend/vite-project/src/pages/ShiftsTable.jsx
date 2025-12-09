import { useEffect, useState } from "react";
import api from "../api/apiInstance.js";
import { useAuth } from "../context/AuthContext";

export default function ShiftsTable() {
  const [shifts, setShifts] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      const params = {};
      if (dateFilter) params.date = dateFilter;

      const res = await api.get("/shifts", { params });
      setShifts(res.data);
    };
    
    load();
  }, [dateFilter]);

  const load = async () => {
    const params = {};
    if (dateFilter) params.date = dateFilter;

    const res = await api.get("/shifts", { params });
    setShifts(res.data);
  };

  return (
    <div className="card-lg">
      <div className="card-header">
        <div>
          <h2 className="card-title">All Shifts</h2>
          <p className="card-subtitle">View and manage employee schedules</p>
        </div>
        <div className="form-group" style={{ marginBottom: 0, minWidth: '200px' }}>
          <input
            type="date"
            className="input"
            placeholder="Filter by date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {shifts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h3 className="empty-state-title">No shifts found</h3>
          <p className="empty-state-description">
            {dateFilter 
              ? "No shifts scheduled for this date. Try selecting a different date."
              : "There are no shifts scheduled yet. Create your first shift above."}
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                {user.role === "admin" && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {shifts.map((s) => {
                const startDate = new Date(s.startAt);
                const endDate = new Date(s.endAt);
                
                return (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 600 }}>{s.employee?.name}</td>
                    <td>{startDate.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</td>
                    <td>{startDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</td>
                    <td>{endDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</td>

                    {user.role === "admin" && (
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn-sm btn-danger"
                            onClick={async () => {
                              if (confirm('Are you sure you want to delete this shift?')) {
                                await api.delete(`/shifts/${s._id}`);
                                load();
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
