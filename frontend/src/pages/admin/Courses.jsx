import React, { useEffect, useState } from "react";
import API from "../../api";

function CoursesAdmin() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
  });

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const createCourse = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/courses", form);
      setCourses([...courses, res.data]);

      setForm({
        title: "",
        description: "",
        instructor: "",
        price: "",
      });
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Admin - Manage Courses</h2>

      {/* CREATE COURSE FORM */}
      <form onSubmit={createCourse} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <input
          type="text"
          placeholder="Instructor"
          value={form.instructor}
          onChange={(e) =>
            setForm({ ...form, instructor: e.target.value })
          }
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <button type="submit">Create Course</button>
      </form>

      {/* COURSE LIST */}
      <h3>All Courses</h3>

      {courses.map((course) => (
        <div
          key={course.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{course.title}</h4>
          <p>{course.description}</p>
          <p>
            Instructor: {course.instructor} | Price: ₹{course.price}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CoursesAdmin;