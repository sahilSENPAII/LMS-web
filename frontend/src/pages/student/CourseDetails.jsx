import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/courses/${id}`);
      setCourse(res.data);
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  if (!course) {
    return <p>Loading course...</p>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h2>{course.title}</h2>

      <p style={{ color: "#555", marginTop: "10px" }}>
        {course.description}
      </p>

      <p style={{ marginTop: "15px" }}>
        <strong>Instructor:</strong> {course.instructor}
      </p>

      <p>
        <strong>Price:</strong> ₹{course.price}
      </p>

      <Link to={`/checkout/${course.id}`}>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Enroll Now
        </button>
      </Link>
    </div>
  );
}

export default CourseDetails;