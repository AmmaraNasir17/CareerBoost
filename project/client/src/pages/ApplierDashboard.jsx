import { useState, useEffect } from "react";
import { getMyApplications } from "../services/applicationService";
import { getUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentIcon,
  TrendingUpIcon,
} from "../components/Icons";

function getStatusColor(status) {
  return (
    {
      applied: "bg-blue-50 text-blue-600 border border-blue-100",
      under_review: "bg-yellow-50 text-yellow-600 border border-yellow-100",
      shortlisted: "bg-green-50 text-green-600 border border-green-100",
      rejected: "bg-red-50 text-red-600 border border-red-100",
    }[status] || "bg-gray-50 text-gray-600 border border-gray-100"
  );
}

export default function ApplierDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [applicationsData, setApplicationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await getMyApplications(token);
        setApplicationsData(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchUser() {
      try {
        const userData = await getUser(token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
    fetchApplications();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userName={user?.name}
        userRole="Applier"
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <Sidebar
        currentRole="applier"
        isMobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main className="md:ml-64 mt-16 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome {user?.name.split(' ')[0]} 👋
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Here's an overview of your job search progress
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <StatsCard
              icon={BriefcaseIcon}
              label="Applications Sent"
              value={applicationsData.length}
              color="blue"
              trend={{ positive: true, value: 12 }}
            />
            <StatsCard
              icon={CheckCircleIcon}
              label="Shortlisted"
              value={applicationsData.filter(app => app.status === 'shortlisted').length}
              color="green"
              trend={{ positive: true, value: 8 }}
            />
            <StatsCard
              icon={XCircleIcon}
              label="Rejections"
              value={applicationsData.filter(app => app.status === 'rejected').length}
              color="red"
              trend={{ positive: false, value: 2 }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Recent Applications */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 md:px-6 py-4 md:py-6 border-b border-gray-200">
                  <h2 className="text-base md:text-lg font-bold text-gray-900">
                    Recent Applications
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    Your latest job submissions
                  </p>
                </div>

                <div className="divide-y divide-gray-200">
                  {applicationsData.slice(0,3).map((app) => (
                    <div
                      key={app.id}
                      className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {app.title}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {app.company}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 ${getStatusColor(app.status)}`}
                        >
                          {app.status.replace("_", " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 md:mt-3">
                        Applied {new Date(app.applied_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-4 md:space-y-6">
              {/* Top Skills */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-50 text-green-600 p-2 md:p-3 rounded-lg flex-shrink-0">
                    <TrendingUpIcon className="w-4 md:w-5 h-4 md:h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Top Skills
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">
                      JavaScript
                    </span>
                    <span className="text-xs text-gray-600">Advanced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">
                      React
                    </span>
                    <span className="text-xs text-gray-600">Intermediate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">
                      Tailwind CSS
                    </span>
                    <span className="text-xs text-gray-600">Intermediate</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                  View Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
