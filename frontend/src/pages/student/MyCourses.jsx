import { useEffect, useState } from "react";
import axios from "axios";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/enrollments/user/1"
        );

        setCourses(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <h2 style={{ padding: "40px" }}>Loading courses...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Courses</h1>

      {courses.length === 0 ? (
        <p>You have not enrolled in any courses.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
          {courses.map((course) => (
            <div
              key={course.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px"
              }}
            >
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p>
                <b>Price:</b> ₹{course.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}