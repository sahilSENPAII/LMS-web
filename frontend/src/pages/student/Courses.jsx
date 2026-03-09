import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, User, IndianRupee } from "lucide-react";
import API from "../../api";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 120 },
  }),
};

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

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
            Browse Courses
          </h1>
          <p className="text-slate-600 mt-3 max-w-lg">
            Discover expert-led courses designed to help you master new skills and advance your career.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No courses available yet.</p>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              className="group bg-white rounded-xl ring-1 ring-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Card Top Accent */}
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />

              <div className="p-6 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 mt-2 line-clamp-2 flex-1">
                  {course.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>{course.instructor}</span>
                </div>

                {/* Footer: Price + CTA */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-4 w-4 text-emerald-600" />
                    <span className="text-lg font-semibold text-slate-900">
                      {Number(course.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Link
                    to={`/course/${course.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-emerald-900 hover:bg-emerald-800 rounded-full transition-all shadow-sm"
                  >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;