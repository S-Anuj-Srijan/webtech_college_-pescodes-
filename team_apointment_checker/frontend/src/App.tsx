import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppointmentsList from "./pages/AppointmentsList";
import BookAppointment from "./pages/BookAppointment";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppointmentsList />} />
        <Route path="/book" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
}
