import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import JobCard from "../../components/jobs/JobCard";
import JobFilters from "../../components/jobs/JobFilters";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import useJobs from "../../hooks/useJobs";
import useAuth from "../../hooks/useAuth";
import { toggleSaveJob, getSavedJobs } from "../../services/jobService";
import { useEffect } from "react";

export default function ApplierJobs() {
  const { token } = useAuth();
  const [filters, setFilters] = useState({});
  const [savedIds, setSavedIds] = useState([]);
  const { jobs, loading, error } = useJobs(filters);

  useEffect(() => {
    getSavedJobs(token)
      .then((data) => setSavedIds((data.jobs || []).map((j) => j.job_id)))
      .catch(() => {});
  }, []);

  const handleSave = async (jobId) => {
    await toggleSaveJob(token, jobId);
    setSavedIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleReset = () => setFilters({});

  return (
    <DashboardLayout>
      <PageWrapper title="Browse Jobs" description="Find your next opportunity">
        <div className="flex gap-6">
          <div className="w-64 flex-shrink-0">
            <JobFilters filters={filters} onChange={setFilters} onReset={handleReset} />
          </div>
          <div className="flex-1 min-w-0">
            {loading ? <Spinner /> : error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : jobs.length === 0 ? (
              <EmptyState title="No jobs found" description="Try adjusting your filters" />
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} onSave={handleSave} isSaved={savedIds.includes(job.id)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}