import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h2>Book Appointment</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
        }}
      >
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
  );
}
