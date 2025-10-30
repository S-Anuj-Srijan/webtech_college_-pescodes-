import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#222", padding: "10px" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px" }}>
        All Appointments
      </Link>
      <Link to="/book" style={{ color: "white" }}>
        Book Appointment
      </Link>
    </nav>
  );
}
