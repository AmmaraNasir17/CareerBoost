import { useState, useEffect } from "react";
import { getAllJobs, applyToJob } from "../../services/jobService";
import { getUser } from "../../services/authService";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function ApplierJobs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    jobType: "",
  });

  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
    fetchJobs();
  }, []);

  // ✅ Get logged-in user from backend (NOT localStorage)
  const fetchUser = async () => {
    try {
      const data = await getUser(token);
      setUser(data);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  // ✅ Fetch all jobs
  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Apply to job
  async function handleApply(jobId) {
    try {
      await applyToJob(jobId, token);
      alert("Applied successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to apply");
    }
  }

  // ✅ Filtering logic (safe null handling)
  const filteredJobs = jobs.filter((job) => {
    const title = job?.title?.toLowerCase() || "";
    const company = job?.company?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      title.includes(search) || company.includes(search);

    const matchesLocation =
      !filters.location ||
      (job?.location || "").toLowerCase().includes(filters.location.toLowerCase());

    const matchesExperience =
      !filters.experience || job?.experience_level === filters.experience;

    const matchesType =
      !filters.jobType || job?.type === filters.jobType;

    return matchesSearch && matchesLocation && matchesExperience && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading all jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar
        userName={user?.name || "Applier"}
        userRole="Applier"
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Sidebar */}
      <Sidebar
        currentRole="applier"
        isMobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main className="md:ml-64 mt-16 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Jobs
            </h1>
            <p className="text-gray-600">
              Browse and apply to available jobs
            </p>
          </div>

          {/* Search + Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

              {/* Location */}
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="px-4 py-2.5 border border-gray-300 rounded-lg"
              />

              {/* Experience */}
              <select
                value={filters.experience}
                onChange={(e) =>
                  setFilters({ ...filters, experience: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Experience</option>
                <option value="0+ years">No Experience</option>
                <option value="1+ years">1+ years</option>
                <option value="2+ years">2+ years</option>
                <option value="3+ years">3+ years</option>
                <option value="5+ years">5+ years</option>
              </select>

              {/* Job Type */}
              <select
                value={filters.jobType}
                onChange={(e) =>
                  setFilters({ ...filters, jobType: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>

            </div>
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>

                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p>📍 {job.location || "Not specified"}</p>
                  <p>💰 {job.salary || "Not disclosed"}</p>
                  <p>⏱ {job.experience_level}</p>
                </div>

                <span className="inline-block mt-3 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">
                  {job.type}
                </span>

                <button
                  onClick={() => handleApply(job.id)}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply Now
                </button>
              </div>
            ))}

          </div>

          {/* Empty state */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No jobs found matching your filters
            </div>
          )}

        </div>
      </main>
    </div>
  );
}