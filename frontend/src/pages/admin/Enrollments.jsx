import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, CheckCircle } from "lucide-react";
import axios from "axios";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 120 },
  }),
};

function Enrollments() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const userId = 1;

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/enrollments/user/${userId}`
      );
      const enrolledIds = res.data.map((course) => course.id);
      setEnrolledCourses(enrolledIds);
    } catch (err) {
      console.error("Failed to fetch enrollments", err);
    }
  };

  const enrollCourse = async (courseId) => {
    try {
      await axios.post("http://localhost:5001/api/enrollments", {
        user_id: userId,
        course_id: courseId,
      });
      alert("Successfully enrolled!");
      fetchEnrollments();
    } catch (err) {
      if (err.response && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("Enrollment failed");
      }
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <ClipboardList className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Enrollments</h1>
            <p className="text-sm text-slate-500">Enroll users into available courses</p>
          </div>
        </motion.div>

        {/* Courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => {
            const isEnrolled = enrolledCourses.includes(course.id);

            return (
              <motion.div
                key={course.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 1}
                className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                {/* Status indicator */}
                <div className={`h-1.5 ${isEnrolled ? 'bg-emerald-500' : 'bg-slate-200'}`} />

                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-900 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="mt-4">
                    {isEnrolled ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                        Enrolled
                      </span>
                    ) : (
                      <button
                        onClick={() => enrollCourse(course.id)}
                        className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 rounded-full shadow-sm transition-all"
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Enrollments;