import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, IndianRupee } from "lucide-react";
import API from "../../api";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, type: "spring", stiffness: 120 },
  }),
};

function PaypalPayment() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const userId = 1;
  const INR_TO_USD = 0.012;

  useEffect(() => {
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
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-20 text-center">
        <p className="text-slate-500 text-lg">Course not found.</p>
        <Link to="/courses" className="text-emerald-700 text-sm font-medium mt-4 inline-block hover:underline">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  const inrPrice = Number(course.price);
  const usdPrice = (inrPrice * INR_TO_USD).toFixed(2);

  return (
    <div className="py-8 md:py-14">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        {/* Back */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <Link
            to={`/checkout/${courseId}`}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-700 font-medium transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Checkout
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-lg overflow-hidden"
        >
          {/* Header accent */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />

          <div className="p-6 md:p-8">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-6">
              Complete Payment
            </h1>

            {/* Course Summary */}
            <div className="bg-slate-50 rounded-xl p-5 mb-6">
              <h3 className="text-base font-semibold text-slate-800">{course.title}</h3>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1 text-slate-500">
                  <IndianRupee className="h-3.5 w-3.5" />
                  <span>₹{inrPrice.toLocaleString("en-IN")}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-800 font-medium">${usdPrice} USD</span>
              </div>
            </div>

            {/* PayPal Buttons */}
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

            {/* Security Note */}
            <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-100 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>
                Your payment is securely processed by PayPal. We never store your financial information.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PaypalPayment;