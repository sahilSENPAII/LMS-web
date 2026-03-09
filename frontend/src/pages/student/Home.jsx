import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Award, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 100 },
  }),
};

const stats = [
  { icon: BookOpen, value: "200+", label: "Expert Courses" },
  { icon: Users, value: "15K+", label: "Active Learners" },
  { icon: Award, value: "95%", label: "Success Rate" },
  { icon: TrendingUp, value: "4.9★", label: "Avg. Rating" },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ── Hero Section ── */}
      <section className="relative py-20 md:py-28 lg:py-36">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-100 opacity-50 blur-3xl" />
          <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-teal-100 opacity-40 blur-3xl" />
        </div>

        <div className="relative max-w-[1180px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — Text Content */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6"
              >
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  Premium Learning Platform
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.08]"
              >
                Master new skills,{" "}
                <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  accelerate your career
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed"
              >
                Access expert-led courses designed to transform your skills.
                Learn at your own pace with hands-on projects and real-world applications.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 rounded-full shadow-lg shadow-emerald-900/20 transition-all hover:shadow-xl hover:shadow-emerald-900/25"
                >
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/my-courses"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-full ring-1 ring-slate-200 transition-all"
                >
                  My Dashboard
                </Link>
              </motion.div>
            </div>

            {/* Right — Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Security/Quality Card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="col-span-2 md:col-span-1 p-6 rounded-xl bg-gradient-to-b from-emerald-900 to-emerald-800 shadow-lg text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="heroGrad" cx="70%" cy="30%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <rect fill="url(#heroGrad)" width="100%" height="100%" />
                  </svg>
                </div>
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 ring-1 ring-white/10 mb-4">
                    <ShieldCheck className="h-4 w-4 text-emerald-200" />
                    <span className="text-xs font-medium text-emerald-200 uppercase tracking-wider">
                      Verified Quality
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-50/95 leading-snug">
                    Expert-Curated Curriculum
                  </h3>
                  <p className="text-sm text-emerald-300/80 mt-2">
                    Every course vetted by industry professionals
                  </p>
                </div>
              </motion.div>

              {/* Growth Card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="p-6 rounded-xl bg-gradient-to-b from-teal-400 to-emerald-500 shadow-lg text-white relative overflow-hidden"
              >
                <div className="relative">
                  <p className="text-sm text-white/90">Career Growth</p>
                  <h3 className="text-lg font-medium text-white mt-1 leading-snug">
                    140+ Skill Paths Available
                  </h3>
                </div>
              </motion.div>

              {/* Revenue/Stats Card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="p-6 rounded-xl bg-white ring-1 ring-slate-200 shadow-lg"
              >
                <p className="text-sm text-slate-500">Student Success</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-semibold text-slate-800 tracking-tight">
                    95%
                  </span>
                  <span className="text-xs text-emerald-600 font-medium">↑ Completion</span>
                </div>
                {/* Mini bars */}
                <div className="flex items-end gap-2 mt-4 h-16 rounded-lg bg-gradient-to-b from-emerald-50 to-white p-2">
                  {[18, 36, 54, 72].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0, opacity: 0.6 }}
                      animate={{ height: h, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 100 }}
                      className="flex-1 rounded-md bg-gradient-to-t from-emerald-200 to-emerald-400"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-200">
        <div className="max-w-[1180px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 mb-4">
                  <stat.icon className="h-6 w-6 text-emerald-700" />
                </div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1180px] mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center bg-gradient-to-b from-emerald-900 to-emerald-800 rounded-2xl p-10 md:p-16 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="ctaGrad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect fill="url(#ctaGrad)" width="100%" height="100%" />
              </svg>
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Start Your Learning Journey Today
              </h2>
              <p className="text-emerald-200/90 mt-4 max-w-md mx-auto">
                Join thousands of learners already transforming their careers with LearnFlow.
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 text-sm font-medium text-emerald-900 bg-white hover:bg-emerald-50 rounded-full shadow-lg transition-all hover:shadow-xl"
              >
                Browse All Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section className="py-12 border-t border-slate-200">
        <div className="max-w-[1180px] mx-auto px-4 md:px-6">
          <p className="text-center text-sm text-slate-400 mb-6">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70">
            {["Google", "Microsoft", "Amazon", "Meta"].map((brand) => (
              <span key={brand} className="text-lg font-semibold text-slate-400 tracking-tight">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}