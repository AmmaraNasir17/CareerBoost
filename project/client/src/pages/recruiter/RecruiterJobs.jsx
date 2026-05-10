import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import Badge from "../../components/common/Badge";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import useAuth from "../../hooks/useAuth";
import { getMyJobs, deleteJob } from "../../services/jobService";
import { JOB_TYPE_LABELS, EXPERIENCE_LABELS } from "../../utils/constants";
import { formatDate } from "../../utils/formatters";

export default function RecruiterJobs() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyJobs(token)
      .then((data) => setJobs(data.jobs || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await deleteJob(token, id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DashboardLayout>
      <PageWrapper
        title="My Jobs"
        description="Manage your job listings"
        action={<button onClick={() => navigate("/recruiter/post-job")} className="corporate-button text-sm py-2 px-4">+ Post Job</button>}
      >
        {loading ? <Spinner /> : error ? <p className="text-sm text-red-500">{error}</p> :
          jobs.length === 0 ? (
            <EmptyState title="No jobs posted yet" description="Post your first job to start hiring" action={
              <button onClick={() => navigate("/recruiter/post-job")} className="corporate-button text-sm">Post a Job</button>
            } />
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge label={job.location} variant="gray" />
                        {job.job_type && <Badge label={JOB_TYPE_LABELS[job.job_type] || job.job_type} variant="blue" />}
                        {job.experience_level && <Badge label={EXPERIENCE_LABELS[job.experience_level] || job.experience_level} variant="yellow" />}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Posted {formatDate(job.created_at)}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => navigate(`/recruiter/jobs/${job.id}/edit`)} className="corporate-secondary-button text-sm py-1.5 px-3">Edit</button>
                      <button onClick={() => handleDelete(job.id)} className="text-sm text-red-500 hover:text-red-700 font-medium px-2">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </PageWrapper>
    </DashboardLayout>
  );
}