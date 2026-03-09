import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// ADMIN PAGES
import Users from "./pages/admin/Users";
import AdminCourses from "./pages/admin/Courses";
import Enrollments from "./pages/admin/Enrollments";
import Payments from "./pages/admin/Payments";

// STUDENT PAGES
import Home from "./pages/student/Home";
import Courses from "./pages/student/Courses";
import CourseDetails from "./pages/student/CourseDetails";
import MyCourses from "./pages/student/MyCourses";
import Checkout from "./pages/student/Checkout";
import PaypalPayment from "./pages/student/PaypalPayment";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial", padding: "20px" }}>
        <h1>LMS Platform</h1>

        {/* STUDENT NAVBAR */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/courses" style={{ marginRight: "15px" }}>Courses</Link>
          <Link to="/my-courses" style={{ marginRight: "15px" }}>My Courses</Link>
          <Link to="/admin/users">Admin</Link>
        </nav>

        <Routes>

          {/* STUDENT ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/checkout/:courseId" element={<Checkout />} />

          {/* PAYPAL PAYMENT PAGE */}
          <Route path="/paypal/:courseId" element={<PaypalPayment />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/enrollments" element={<Enrollments />} />
          <Route path="/admin/payments" element={<Payments />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;