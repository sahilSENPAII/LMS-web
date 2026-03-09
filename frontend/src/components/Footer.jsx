import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">
                LearnFlow
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Discover premium online courses taught by industry experts. Master new skills at your own pace.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/courses" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/my-courses" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                  My Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Admin
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/admin/users" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                  Manage Users
                </Link>
              </li>
              <li>
                <Link to="/admin/courses" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                  Manage Courses
                </Link>
              </li>
              <li>
                <Link to="/admin/payments" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                  Payments
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2026 LearnFlow. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with ❤️ for learners
          </p>
        </div>
      </div>
    </footer>
  );
}
