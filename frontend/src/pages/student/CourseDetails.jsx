import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, User, IndianRupee, BookOpen, Clock, Award } from "lucide-react";
import API from "../../api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, type: "spring", stiffness: 120 },
  }),
};

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

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

  return (
    <div className="py-8 md:py-14">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6">
        {/* Back link */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-700 font-medium transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Left — Course Info (2 cols) */}
          <div className="md:col-span-2">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              {/* Gradient accent */}
              <div className="h-2 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 mb-6" />

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                {course.title}
              </h1>

              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <User className="h-4 w-4 text-slate-400" />
                  {course.instructor}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  Full Course
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock className="h-4 w-4 text-slate-400" />
                  Self-paced
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-8"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-3">About This Course</h2>
              <p className="text-slate-600 leading-relaxed">
                {course.description}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { icon: BookOpen, label: "Comprehensive Content", desc: "Full curriculum" },
                { icon: Award, label: "Certificate", desc: "On completion" },
                { icon: Clock, label: "Lifetime Access", desc: "Learn anytime" },
              ].map((feat) => (
                <div key={feat.label} className="bg-white rounded-xl ring-1 ring-slate-200 p-4 text-center">
                  <feat.icon className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-800">{feat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{feat.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Enrollment Card (sticky) */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="sticky top-24"
            >
              <div className="bg-white rounded-xl ring-1 ring-slate-200 shadow-lg p-6">
                {/* Price */}
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    <IndianRupee className="h-5 w-5 text-slate-900" />
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">
                      {Number(course.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-6">One-time payment • Lifetime access</p>

                {/* Enroll CTA */}
                <Link
                  to={`/checkout/${course.id}`}
                  className="block text-center px-6 py-3.5 text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 rounded-full shadow-lg shadow-emerald-900/20 transition-all hover:shadow-xl w-full"
                >
                  Enroll Now
                </Link>

                {/* Features list */}
                <ul className="mt-6 space-y-3">
                  {[
                    "Full course access",
                    "Hands-on projects",
                    "Certificate of completion",
                    "Self-paced learning",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;