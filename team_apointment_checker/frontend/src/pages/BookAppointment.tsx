import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

interface AppointmentForm {
  name: string;
  time: string;
  doctorname: string;
  price: string;
}

export default function BookAppointment() {
  const [form, setForm] = useState<AppointmentForm>({
    name: "",
    time: "",
    doctorname: "",
    price: "",
  });

  const navigate = useNavigate();

  const doctors = [
    "Dr. Rohan Mehta (Cardiologist)",
    "Dr. Ayesha Khan (Pediatrician)",
    "Dr. Neha Gupta (Dermatologist)",
    "Dr. Arjun Rao (Orthopedic)",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/appointments", form);
      alert("Appointment booked successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error booking:", err);
      alert("Failed to book appointment.");
    }
  };

  // 🌀 Easter Egg — Doctor Strange
  const handleEasterEgg = async () => {
    try {
      await axios.post("http://localhost:5000/appointments", {
        name: "Mystery Patient",
        time: "13",
        doctorname: "Dr. Stephen Strange (Master of the Mystic Arts)",
        price: "9999",
      });
      alert("🌀 A portal has opened! You've booked Doctor Strange!");
    } catch (err) {
      console.error("Easter Egg error:", err);
    }
  };

  return (
    <div className="appointment-page">
      <div className="background-gif"></div>

      <img
        src="/bounce.png"
        alt="Mystic Portal"
        className="bouncing-png"
        onClick={handleEasterEgg}
        title="Click the portal 🌀"
      />

      <div className="appointment-container">
        <h2>Book Appointment</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="time"
            placeholder="Time (e.g. 10 for 10AM)"
            value={form.time}
            onChange={handleChange}
            required
          />
          <select
            name="doctorname"
            value={form.doctorname}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc, idx) => (
              <option key={idx} value={doc}>
                {doc}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="price"
            placeholder="Consultation Fee"
            value={form.price}
            onChange={handleChange}
            required
          />
          <button type="submit">Book Appointment</button>
        </form>
      </div>
    </div>
  );
}
