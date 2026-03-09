import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, IndianRupee } from "lucide-react";
import axios from "axios";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 120 },
  }),
};

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
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-10 md:mb-14"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            My Courses
          </h1>
          <p className="text-slate-600 mt-3">
            {courses.length > 0
              ? `You are enrolled in ${courses.length} course${courses.length !== 1 ? "s" : ""}.`
              : "Track your enrolled courses and continue learning."}
          </p>
        </motion.div>

        {/* Empty State */}
        {courses.length === 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-center py-16 bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
              <BookOpen className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No courses yet</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
              Start your learning journey by browsing our collection of expert-led courses.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 rounded-full shadow-sm transition-all"
            >
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}

        {/* Enrolled Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Enrolled indicator */}
              <div className="h-1.5 bg-gradient-to-r from-emerald-600 to-emerald-400" />

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                    {course.title}
                  </h3>
                  <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                    Enrolled
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-1 mt-4 text-sm text-slate-400">
                  <IndianRupee className="h-3.5 w-3.5" />
                  <span>{Number(course.price).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}