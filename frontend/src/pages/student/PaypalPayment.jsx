import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaypalPayment() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Temporary hardcoded user id for testing
  const userId = 1;

  // Fixed conversion rate for project/demo purpose
  const INR_TO_USD = 0.012;

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/courses/${courseId}`);
      setCourse(res.data);
    } catch (err) {
      console.error("Failed to fetch course:", err);
      alert("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found.</p>;

  const inrPrice = Number(course.price);
  const usdPrice = (inrPrice * INR_TO_USD).toFixed(2);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>PayPal Payment</h2>

      <h3 style={{ marginBottom: "10px" }}>{course.title}</h3>

      <p style={{ marginBottom: "8px" }}>
        <strong>Course Price:</strong> ₹{inrPrice}
      </p>

      <p style={{ marginBottom: "20px" }}>
        <strong>PayPal Payment Amount:</strong> ${usdPrice}
      </p>

      <PayPalScriptProvider
        options={{
          "client-id":
            "ATXmnnkEY1XYm-2PxZZZO8W0rjTsZJzbvwz2XaW3ozrrHrzXjwA1ZqnMPrOb6vfnx32qymAglbEexWKS",
          currency: "USD",
        }}
      >
        <PayPalButtons
          disabled={processing}
          forceReRender={[usdPrice]}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: course.title,
                  amount: {
                    currency_code: "USD",
                    value: usdPrice,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              setProcessing(true);

              await actions.order.capture();

              await API.post("/enrollments", {
                user_id: userId,
                course_id: Number(courseId),
              });

              alert("Payment successful and course enrolled!");
              navigate("/my-courses");
            } catch (err) {
              console.error("Error after payment approval:", err);
              alert("Payment succeeded, but enrollment failed.");
            } finally {
              setProcessing(false);
            }
          }}
          onError={(err) => {
            console.error("PayPal error:", err);
            alert("Payment failed");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PaypalPayment;