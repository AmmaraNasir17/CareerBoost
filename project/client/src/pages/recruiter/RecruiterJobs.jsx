import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyJobs, deleteJob } from "../../services/jobService";
import { getApplicants } from "../../services/applicationService";
import { getUser } from "../../services/authService";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function getStatusColor(status) {
  return status === "active"
    ? "bg-green-50 text-green-600 border border-green-100"
    : "bg-gray-50 text-gray-600 border border-gray-100";
}

export default function RecruiterJobs() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      await Promise.all([
        fetchUser(),
        fetchJobs(),
        fetchApplicants(),
      ]);

    } catch (err) {
      console.error("Dashboard load error:", err);
      setErrorMessage(err.message || "Failed to load recruiter data");

    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await getUser(token);
      setUser(data);

    } catch (err) {
      console.error("FETCH USER ERROR:", err);
      throw err;
    }
  };

  const fetchJobs = async () => {
    try {
      const data = await getMyJobs(token);
      setJobs(data);

    } catch (err) {
      console.error("FETCH JOBS ERROR:", err);
      throw err;
    }
  };

  const fetchApplicants = async () => {
    try {
      const data = await getApplicants(token);
      setApplicants(data);

    } catch (err) {
      console.error("FETCH APPLICANTS ERROR:", err);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id, token);
        fetchJobs();

      } catch (err) {
        console.error("DELETE JOB ERROR:", err);
        setErrorMessage(err.message || "Failed to delete job");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading your jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userName={user?.name || "Recruiter"}
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

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Posted Jobs
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Manage your job listings
              </p>
            </div>

            <button
              onClick={() => navigate("/recruiter/post-job")}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto"
            >
              + Post Job
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4 text-sm text-red-800 font-medium">
              {errorMessage}
            </div>
          )}

          {/* Jobs Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* Table Header */}
            <div className="px-6 py-4 md:py-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">
                Your Job Listings
              </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Job Title
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Applicants
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Posted Date
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.map((job, index) => (
                    <tr
                      key={job.id}
                      className={`${
                        index !== jobs.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      } hover:bg-gray-50 transition-colors`}
                    >
                      {/* Title */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold text-gray-900">
                          {job.title}
                        </p>
                      </td>

                      {/* Applicants */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {
                          applicants.filter(
                            (app) => app.job_id === job.id
                          ).length
                        }{" "}
                        Applicant(s)
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${getStatusColor(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-600 text-sm">
                          {new Date(job.created_at).toLocaleDateString()}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {jobs.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500 text-lg">
                  No job listings yet
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {jobs.length} job listing(s)
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}