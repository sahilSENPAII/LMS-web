import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, GraduationCap, LogIn } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  const studentLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/my-courses", label: "My Courses" },
  ];

  const adminLinks = [
    { to: "/admin/users", label: "Users" },
    { to: "/admin/courses", label: "Courses" },
    { to: "/admin/enrollments", label: "Enrollments" },
    { to: "/admin/payments", label: "Payments" },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to={isAdmin ? "/admin/users" : "/"} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center shadow-sm group-hover:bg-emerald-800 transition-colors">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900 tracking-tight">
              {isAdmin ? "LearnFlow Admin" : "LearnFlow"}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-emerald-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <Link
                to="/"
                className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                ← Student View
              </Link>
            ) : (
              <>
                <Link
                  to="/admin/users"
                  className="text-sm text-slate-600 hover:text-slate-900 font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-all"
                >
                  Admin
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 rounded-full shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700"
                >
                  <BookOpen className="h-4 w-4" />
                  Browse Courses
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-100 mt-3 space-y-2">
                {isAdmin ? (
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center text-sm text-slate-600 font-medium py-2"
                  >
                    ← Student View
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/admin/users"
                      onClick={() => setMobileOpen(false)}
                      className="block text-center text-sm text-slate-600 font-medium py-2"
                    >
                      Admin Panel
                    </Link>
                    <Link
                      to="/courses"
                      onClick={() => setMobileOpen(false)}
                      className="block text-center px-5 py-2.5 text-sm font-medium text-white bg-emerald-900 hover:bg-emerald-800 rounded-full shadow-sm transition-all"
                    >
                      Browse Courses
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
