import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// LAYOUT
import Layout from "./components/Layout";

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
      <Layout>
        <Routes>
          {/* STUDENT ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/checkout/:courseId" element={<Checkout />} />
          <Route path="/paypal/:courseId" element={<PaypalPayment />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/enrollments" element={<Enrollments />} />
          <Route path="/admin/payments" element={<Payments />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;