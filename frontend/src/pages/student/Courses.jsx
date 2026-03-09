import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

function Courses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div style={{ maxWidth: "1100px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>All Courses</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{course.title}</h3>

            <p style={{ color: "#555" }}>{course.description}</p>

            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>

            <p>
              <strong>Price:</strong> ₹{course.price}
            </p>

            <Link to={`/course/${course.id}`}>
              <button
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;