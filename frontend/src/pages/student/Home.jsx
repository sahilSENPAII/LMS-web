import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Welcome to LMS</h1>
      <p>Learn new skills with our courses.</p>

      <Link to="/courses">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>
          Browse Courses
        </button>
      </Link>
    </div>
  );
}