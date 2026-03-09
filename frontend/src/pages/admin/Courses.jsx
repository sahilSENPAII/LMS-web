import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus, User, IndianRupee } from "lucide-react";
import API from "../../api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 120 },
  }),
};

function CoursesAdmin() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
  });

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/courses", form);
      setCourses([...courses, res.data]);
      setForm({ title: "", description: "", instructor: "", price: "" });
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
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
            <BookOpen className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Courses</h1>
            <p className="text-sm text-slate-500">Create and manage courses on the platform</p>
          </div>
        </motion.div>

        {/* Create Course Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5 text-emerald-600" />
            Create New Course
          </h2>
          <form onSubmit={createCourse} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Course Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg ring-1 ring-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 transition-all"
              />
              <input
                type="text"
                placeholder="Instructor Name"
                value={form.instructor}
                onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg ring-1 ring-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 transition-all"
              />
            </div>
            <textarea
              placeholder="Course Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg ring-1 ring-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 resize-none transition-all"
            />
            <div className="flex items-end gap-4">
              <input
                type="number"
                placeholder="Price (₹)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-48 px-4 py-2.5 rounded-lg ring-1 ring-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 rounded-full shadow-sm transition-all"
              >
                <Plus className="h-4 w-4" />
                Create Course
              </button>
            </div>
          </form>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4">All Courses ({courses.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 3}
                className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-5 hover:shadow-md transition-all"
              >
                <h4 className="text-base font-semibold text-slate-900 leading-snug">{course.title}</h4>
                <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <IndianRupee className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-semibold text-slate-800">
                    {Number(course.price).toLocaleString("en-IN")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CoursesAdmin;