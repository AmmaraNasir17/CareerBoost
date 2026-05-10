import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ currentRole = "applier", isMobileOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();

  const applierMenuItems = [
    { label: "Dashboard",    icon: "🏠", route: "/applier" },
    { label: "Jobs",         icon: "💼", route: "/applier/jobs" },
    { label: "Saved Jobs",   icon: "🔖", route: "/applier/saved-jobs" },
    { label: "Applications", icon: "📋", route: "/applier/applications" },
    { label: "Resume Builder",  icon: "📄", route: "/applier/resume-builder" },
    { label: "Resume Analyzer", icon: "🔍", route: "/applier/resume-analyzer" },
    { label: "Quizzes",      icon: "🧠", route: "/applier/quizzes" },
    { label: "Skill Tracker",icon: "📈", route: "/applier/skills" },
  ];

  const recruiterMenuItems = [
    { label: "Dashboard",   icon: "📊", route: "/recruiter" },
    { label: "My Jobs",     icon: "💼", route: "/recruiter/jobs" },
    { label: "Post a Job",  icon: "➕", route: "/recruiter/post-job" },
    { label: "Applicants",  icon: "📥", route: "/recruiter/applicants" },
  ];

  const menuItems = currentRole === "recruiter" ? recruiterMenuItems : applierMenuItems;

  const isActive = (route) => {
    if (route === "/applier" || route === "/recruiter") {
      return location.pathname === route;
    }
    return location.pathname.startsWith(route);
  };

  const NavItems = ({ onItemClick }) => (
    <nav className="px-4 py-6 space-y-1">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => { navigate(item.route); onItemClick?.(); }}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all text-sm
            ${isActive(item.route)
              ? "bg-blue-50 text-blue-700"
              : "text-gray-700 hover:bg-gray-50"
            }`}
        >
          <span className="text-base">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-16 w-64 bg-white border-r border-gray-200 flex-col overflow-y-auto" style={{ height: "calc(100vh - 64px)" }}>
        <NavItems />
      </aside>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-16 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 md:hidden overflow-y-auto`}
        style={{ height: "calc(100vh - 64px)", transform: isMobileOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <NavItems onItemClick={onClose} />
      </div>
    </>
  );
}