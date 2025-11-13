import { useEffect, useState } from "react";
import axios from "axios";
import "./AppointmentsList.css";

interface Appointment {
  _id: string;
  name: string;
  doctorname: string;
  time: number;
  price: number;
}

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const formatTime = (time: number) => {
    if (time < 12) return `${time} AM`;
    if (time === 12) return "12 PM";
    return `${time - 12} PM`;
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % appointments.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? appointments.length - 1 : prev - 1
    );
  };

  // 🎹 Handle keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextCard();
      if (e.key === "ArrowLeft") prevCard();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [appointments.length]);

  return (
    <div className="appointments-3d-page">
      <h2>All Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="deck-container">
          <div
            className="deck"
            style={{
              transform: `rotateY(${
                currentIndex * -360 / appointments.length
              }deg)`,
            }}
          >
            {appointments.map((a, i) => {
              const angle = (360 / appointments.length) * i;
              return (
                <div
                  key={a._id}
                  className={`appointment-card ${
                    i === currentIndex ? "active" : ""
                  }`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(400px)`,
                  }}
                >
                  <h3>
                    {a.name}
                    {a.doctorname.includes("Strange") && (
                      <span className="mystic-badge">🌀</span>
                    )}
                  </h3>
                  <p>
                    <strong>Doctor:</strong> {a.doctorname}
                  </p>
                  <p>
                    <strong>Time:</strong> {formatTime(a.time)}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{a.price}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => deleteAppointment(a._id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>

          
        </div>
      )}
    </div>
  );
}
