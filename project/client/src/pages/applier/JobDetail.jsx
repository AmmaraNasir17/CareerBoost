import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import Badge from "../../components/common/Badge";
import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import { getJobById } from "../../services/jobService";
import { applyToJob } from "../../services/applicationService";
import { formatSalary, formatDate } from "../../utils/formatters";
import { JOB_TYPE_LABELS, EXPERIENCE_LABELS } from "../../utils/constants";

export default function JobDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getJobById(token, id)
      .then((data) => setJob(data.job))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    setError("");
    try {
      await applyToJob(token, id);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <DashboardLayout><Spinner /></DashboardLayout>;

  return (
    <DashboardLayout>
      <PageWrapper title={job?.title || "Job Detail"} action={
        <button onClick={() => navigate("/applier/jobs")} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>
      }>
        {job && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">{job.recruiter_name}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge label={job.location} variant="gray" />
                  {job.job_type && <Badge label={JOB_TYPE_LABELS[job.job_type] || job.job_type} variant="blue" />}
                  {job.experience_level && <Badge label={EXPERIENCE_LABELS[job.experience_level] || job.experience_level} variant="yellow" />}
                  {job.salary && <Badge label={formatSalary(job.salary)} variant="green" />}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              {job.required_skills?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.required_skills.map((skill, i) => <Badge key={i} label={skill} variant="gray" />)}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-400">Posted {formatDate(job.created_at)}</p>
            </div>

            <ErrorMessage message={error} />
            {success ? (
              <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-sm text-green-700 font-medium">
                Application submitted successfully!
              </div>
            ) : (
              <button onClick={handleApply} disabled={applying} className="corporate-button w-full">
                {applying ? "Submitting..." : "Apply Now"}
              </button>
            )}
          </div>
        )}
      </PageWrapper>
    </DashboardLayout>
  );
}