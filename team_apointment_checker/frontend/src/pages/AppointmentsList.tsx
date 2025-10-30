import { useEffect, useState } from "react";
import axios from "axios";

interface Appointment {
  _id: string;
  name: string;
  doctorname: string;
  time: number;
  price: number;
}

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/appointments");
      setAppointments(res.data.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div>
      <h2>All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table
          border={1}
          cellPadding={10}
          style={{ width: "100%", textAlign: "left" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Doctor</th>
              <th>Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td>{a.name}</td>
                <td>{a.doctorname}</td>
                <td>{a.time}</td>
                <td>₹{a.price}</td>
                <td>
                  <button onClick={() => deleteAppointment(a._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
