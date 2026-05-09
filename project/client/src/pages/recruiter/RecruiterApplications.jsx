import { useState, useEffect } from "react";
import {
  getApplicants,
  updateApplicationStatus,
} from "../../services/applicationService";
import { getUser } from "../../services/authService";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

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

export default function RecruiterApplications() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applicantsData, setApplicantsData] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // ============================================
  // INIT LOAD
  // ============================================
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError("");

      await Promise.all([fetchUser(), fetchApplicants()]);

    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load data");

    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // USER
  // ============================================
  const fetchUser = async () => {
    const data = await getUser(token);
    setUser(data);
  };

  // ============================================
  // APPLICANTS
  // ============================================
  const fetchApplicants = async () => {
    const data = await getApplicants(token);
    setApplicantsData(data);
  };

  // ============================================
  // STATUS UPDATE
  // ============================================
  const handleStatusChange = async (applicantId, newStatus) => {
    if (
      window.confirm(
        `Are you sure you want to mark this applicant as ${newStatus}?`
      )
    ) {
      try {
        await updateApplicationStatus(applicantId, newStatus, token);
        fetchApplicants();
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to update status");
      }
    }
  };

  // ============================================
  // LOADING
  // ============================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading applicants...</p>
      </div>
    );
  }

  // ============================================
  // UI
  // ============================================
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
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Applicants
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Review candidates who applied
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="px-6 py-4 md:py-6 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">
                Candidate Applications
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      Candidate Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      Applied Job
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applicantsData.map((applicant, index) => (
                    <tr
                      key={applicant.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {applicant.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {applicant.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {applicant.appliedJob}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-lg border ${getStatusColor(
                            applicant.status
                          )}`}
                        >
                          {applicant.status
                            ?.replace("_", " ")
                            ?.replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">

                          <button className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-lg">
                            View
                          </button>

                          {applicant.status !== "shortlisted" && (
                            <button
                              onClick={() =>
                                handleStatusChange(
                                  applicant.id,
                                  "shortlisted"
                                )
                              }
                              className="px-3 py-1 text-xs text-green-600 hover:bg-green-50 rounded-lg"
                            >
                              Shortlist
                            </button>
                          )}

                          {applicant.status !== "rejected" && (
                            <button
                              onClick={() =>
                                handleStatusChange(applicant.id, "rejected")
                              }
                              className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              Reject
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {applicantsData.length === 0 && (
              <div className="px-6 py-12 text-center text-gray-500">
                No applicants yet
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}