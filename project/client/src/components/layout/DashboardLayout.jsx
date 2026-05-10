import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";

export default function DashboardLayout({ children }) {
  const { user, role } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userName={user?.name || "User"}
        userRole={role === "recruiter" ? "Recruiter" : "Applier"}
        onMenuClick={() => setIsMobileOpen((prev) => !prev)}
      />

      <Sidebar
        currentRole={role}
        isMobileOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />

      <div className="md:ml-64 pt-16">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}