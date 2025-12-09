import { useEffect, useState } from "react";
import api from "../api/apiInstance.js";

export default function AdminShiftForm() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await api.post("/shifts", { employeeId, date, startTime, endTime });
      setEmployeeId("");
      setDate("");
      setStartTime("");
      setEndTime("");
      alert("Shift created");
    } catch (error) {
      setErr(error.response?.data?.message || "Failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {err && <div className="alert alert-error">{err}</div>}

      <div className="form-group">
        <label className="form-label">Employee</label>
        <select
          className="input"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e._id} value={e._id}>
              {e.name} ({e.employeeCode})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-group">
          <label className="form-label">Start Time</label>
          <input
            type="time"
            className="input"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">End Time</label>
          <input
            type="time"
            className="input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Create Shift</button>
    </form>
  );
}
