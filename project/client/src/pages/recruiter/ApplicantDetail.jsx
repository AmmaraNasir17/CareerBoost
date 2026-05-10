import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ApplicationStatusBadge from "../../components/jobs/ApplicationStatusBadge";
import Badge from "../../components/common/Badge";
import Spinner from "../../components/common/Spinner";
import useAuth from "../../hooks/useAuth";
import { getApplicantsForJob, updateApplicationStatus } from "../../services/applicationService";
import { APPLICATION_STATUS } from "../../utils/constants";
import { formatDate } from "../../utils/formatters";

export default function ApplicantDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getApplicantsForJob(token, id)
      .then((data) => setApplicants(data.applications || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (appId, status) => {
    try {
      const res = await updateApplicationStatus(token, appId, status);
      setApplicants((prev) => prev.map((a) => a.id === appId ? { ...a, status: res.application.status } : a));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <DashboardLayout><Spinner /></DashboardLayout>;

  return (
    <DashboardLayout>
      <PageWrapper title="Applicants" action={<button onClick={() => navigate("/recruiter/jobs")} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>}>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {applicants.length === 0 ? (
          <p className="text-sm text-gray-500">No applicants for this job yet.</p>
        ) : (
          <div className="space-y-3">
            {applicants.map((app) => (
              <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-gray-900">{app.applier_name}</p>
                    <p className="text-sm text-gray-500">{app.applier_email}</p>
                    <p className="text-xs text-gray-400 mt-1">Applied {formatDate(app.applied_at)}</p>
                  </div>
                  <ApplicationStatusBadge status={app.status} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Update Status:</span>
                  {Object.entries(APPLICATION_STATUS).map(([val, { label, variant }]) => (
                    <button
                      key={val}
                      onClick={() => handleStatusChange(app.id, val)}
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all
                        ${app.status === val ? "opacity-100 ring-2 ring-offset-1" : "opacity-60 hover:opacity-100"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </PageWrapper>
    </DashboardLayout>
  );
}