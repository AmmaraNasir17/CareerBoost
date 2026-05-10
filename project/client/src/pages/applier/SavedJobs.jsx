import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import JobCard from "../../components/jobs/JobCard";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import useAuth from "../../hooks/useAuth";
import { getSavedJobs, toggleSaveJob } from "../../services/jobService";

export default function SavedJobs() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedJobs(token)
      .then((data) => setJobs(data.jobs || []))
      .finally(() => setLoading(false));
  }, []);

  const handleUnsave = async (jobId) => {
    await toggleSaveJob(token, jobId);
    setJobs((prev) => prev.filter((j) => j.job_id !== jobId));
  };

  return (
    <DashboardLayout>
      <PageWrapper title="Saved Jobs" description="Jobs you've bookmarked">
        {loading ? <Spinner /> : jobs.length === 0 ? (
          <EmptyState title="No saved jobs" description="Save jobs while browsing to find them here" />
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onSave={handleUnsave} isSaved={true} />
            ))}
          </div>
        )}
      </PageWrapper>
    </DashboardLayout>
  );
}