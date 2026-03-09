import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api";

function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  // Fixed conversion rate for demo/project
  const INR_TO_USD = 0.012;

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/courses/${courseId}`);
      setCourse(res.data);
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const handlePaypal = () => {
    alert("PayPal payment in next page");
    navigate(`/paypal/${courseId}`);
  };

  if (!course) return <p>Loading...</p>;

  const inrPrice = Number(course.price);
  const usdPrice = (inrPrice * INR_TO_USD).toFixed(2);

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "40px" }}>
      <h2>Checkout</h2>

      <h3>{course.title}</h3>

      <p>{course.description}</p>

      <p>
        <strong>Course Price:</strong> ₹{inrPrice}
      </p>

      <p>
        <strong>Amount Payable:</strong> ${usdPrice}
      </p>

      <button
        onClick={handlePaypal}
        style={{
          padding: "12px 20px",
          backgroundColor: "#0070ba",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Pay with PayPal
      </button>
    </div>
  );
}

export default Checkout;