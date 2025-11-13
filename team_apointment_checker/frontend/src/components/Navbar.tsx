import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "rgba(10, 15, 40, 0.8)",
        backdropFilter: "blur(12px)",
        padding: "14px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        zIndex: 1000,
      }}
    >
      <h2
        style={{
          color: "#00b7ff",
          margin: 0,
          fontWeight: 600,
          letterSpacing: "1px",
        }}
      >
        🏥 Clinic Portal
      </h2>
      <div>
        <Link
          to="/"
          style={{
            color: "white",
            marginRight: "24px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          All Appointments
        </Link>
        <Link
          to="/book"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Book Appointment
        </Link>
      </div>
    </nav>
  );
}
