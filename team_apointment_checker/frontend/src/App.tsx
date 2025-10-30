import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppointmentsList from "./pages/AppointmentsList";
import BookAppointment from "./pages/BookAppointment";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<AppointmentsList />} />
          <Route path="/book" element={<BookAppointment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
