import { useEffect, useState } from "react";
import axios from "axios";

function Enrollments() {

  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const userId = 1;

  // =========================
  // Fetch all courses
  // =========================
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  // =========================
  // Fetch enrolled courses
  // =========================
  const fetchEnrollments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/enrollments/user/${userId}`
      );

      const enrolledIds = res.data.map((course) => course.id);
      setEnrolledCourses(enrolledIds);

    } catch (err) {
      console.error("Failed to fetch enrollments", err);
    }
  };

  // =========================
  // Enroll function
  // =========================
  const enrollCourse = async (courseId) => {
    try {

      await axios.post("http://localhost:5001/api/enrollments", {
        user_id: userId,
        course_id: courseId,
      });

      alert("Successfully enrolled!");

      fetchEnrollments();

    } catch (err) {

      if (err.response && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("Enrollment failed");
      }

    }
  };

  // =========================
  // Load data on page load
  // =========================
  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Courses</h1>

      {courses.map((course) => {

        const isEnrolled = enrolledCourses.includes(course.id);

        return (
          <div
            key={course.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>{course.title}</h3>
            <p>{course.description}</p>

            <button
              onClick={() => enrollCourse(course.id)}
              disabled={isEnrolled}
              style={{
                padding: "10px 20px",
                backgroundColor: isEnrolled ? "green" : "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: isEnrolled ? "not-allowed" : "pointer",
              }}
            >
              {isEnrolled ? "Enrolled ✓" : "Enroll"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Enrollments;