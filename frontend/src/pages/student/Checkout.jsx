import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, ShieldCheck, IndianRupee } from "lucide-react";
import API from "../../api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, type: "spring", stiffness: 120 },
  }),
};

function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const INR_TO_USD = 0.012;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handlePaypal = () => {
    navigate(`/paypal/${courseId}`);
  };

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
      </div>
    );
  }

  const inrPrice = Number(course.price);
  const usdPrice = (inrPrice * INR_TO_USD).toFixed(2);

  return (
    <div className="py-8 md:py-14">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Back */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <Link
            to={`/course/${courseId}`}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-700 font-medium transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"
        >
          Checkout
        </motion.h1>

        <div className="mt-8 grid md:grid-cols-5 gap-8">
          {/* Order Summary — 3 cols */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="md:col-span-3"
          >
            <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>

              <div className="border-b border-slate-100 pb-4 mb-4">
                <h3 className="text-base font-medium text-slate-800">{course.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{course.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Course Price</span>
                  <div className="flex items-center gap-0.5 text-slate-800 font-medium">
                    <IndianRupee className="h-3.5 w-3.5" />
                    {inrPrice.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">PayPal Amount (USD)</span>
                  <span className="text-slate-800 font-medium">${usdPrice}</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between">
                  <span className="text-base font-semibold text-slate-900">Total</span>
                  <span className="text-base font-semibold text-slate-900">${usdPrice}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment — 2 cols */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment</h2>

              <button
                onClick={handlePaypal}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#0070ba] hover:bg-[#003087] rounded-full shadow-lg transition-all hover:shadow-xl"
              >
                <CreditCard className="h-4 w-4" />
                Pay with PayPal
              </button>

              <div className="flex items-center gap-2 mt-5 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span>Secure payment powered by PayPal. Your information is encrypted.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;