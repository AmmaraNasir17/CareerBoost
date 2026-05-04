import { useState, useEffect } from "react";
import {
  getApplicants,
  updateApplicationStatus,
} from "../../services/applicationService";
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
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const data = await getApplicants(token);
      setApplicantsData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicantId, newStatus) => {
    if (
      window.confirm(
        `Are you sure you want to mark this applicant as ${newStatus}?`,
      )
    ) {
      try {
        await updateApplicationStatus(applicantId, newStatus, token);
        fetchApplicants();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading applicants...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userName="Recruiter"
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
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Applicants
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Review candidates who applied
            </p>
          </div>

          {/* Applicants Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 md:py-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">
                Candidate Applications
              </h2>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Candidate Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Applied Job
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applicantsData.map((applicant, index) => (
                    <tr
                      key={applicant.id}
                      className={`${
                        index !== applicantsData.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold text-gray-900">
                          {applicant.name}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-600 text-sm">
                          {applicant.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-600">{applicant.appliedJob}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg border ${getStatusColor(applicant.status)}`}
                        >
                          {applicant.status.replace("_", " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            View Profile
                          </button>
                          
                          {applicant.status !== "Shortlisted" && (
                            <button
                              onClick={() =>
                                handleStatusChange(applicant.id, "shortlisted")
                              }
                              className="px-3 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              Shortlist
                            </button>
                          )}

                          {applicant.status !== "Rejected" && (
                            <button
                              onClick={() =>
                                handleStatusChange(applicant.id, "rejected")
                              }
                              className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

            {/* Empty State */}
            {applicantsData.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500 text-lg">No applicants yet</p>
              </div>
            )}

            {/* Table Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {applicantsData.length} applicants
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
