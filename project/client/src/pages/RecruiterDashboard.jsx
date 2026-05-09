import { useEffect, useState } from "react";
import { getUser } from "../services/authService";
import { getMyJobs } from "../services/jobService";
import { getApplicants } from "../services/applicationService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import { BriefcaseIcon, UsersIcon, CheckCircleIcon } from "../components/Icons";

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [recentApplicants, setRecentApplicants] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
    fetchJobs();
    fetchRecentApplicants();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getMyJobs(token);
      setJobs(data.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecentApplicants = async () => {
    try {
      const data = await getApplicants(token);
      setRecentApplicants(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await getUser(token);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userName={user?.name}
        userRole="Recruiter"
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <Sidebar
        currentRole="recruiter"
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
              Manage your job postings and review applicants
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <StatsCard
              icon={BriefcaseIcon}
              label="Active Jobs"
              value={jobs.length}
              color="blue"
              trend={{ positive: true, value: 20 }}
            />
            <StatsCard
              icon={UsersIcon}
              label="Total Applicants"
              value={recentApplicants.length}
              color="teal"
              trend={{ positive: true, value: 15 }}
            />
            <StatsCard
              icon={CheckCircleIcon}
              label="Shortlisted Candidates"
              value={
                recentApplicants.filter((app) => app.status === "shortlisted")
                  .length
              }
              color="green"
              trend={{ positive: true, value: 5 }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Posted Jobs */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 md:px-6 py-4 md:py-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-900">
                      Posted Jobs
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                      Your active job listings
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/recruiter/jobs")}
                    className="px-4 py-2 bg-blue-600 text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    View All
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {job.title}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                              <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                              </span>
                              <span className="text-xs text-gray-500">
                                Posted{" "}
                                {new Date(job.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 sm:flex-shrink-0">
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap bg-green-100 text-green-800 ">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Top Positions
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">
                      {jobs[0]?.title || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">
                      {jobs[1]?.title || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">
                      {jobs[2]?.title || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Applicants */}
          <div className="mt-6 md:mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 md:px-6 py-4 md:py-6 border-b border-gray-200">
              <h2 className="text-base md:text-lg font-bold text-gray-900">
                Recent Applicants
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                Latest submissions across your job postings
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {recentApplicants.slice(0,3).map((applicant) => (
                <div
                  key={applicant.id}
                  className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                        {applicant.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {applicant.name}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {applicant.appliedJob}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 sm:flex-shrink-0">
                      <span className="text-xs text-gray-600 whitespace-nowrap">
                        {new Date(applicant.applied_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
