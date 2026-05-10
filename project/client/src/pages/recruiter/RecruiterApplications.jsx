import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ApplicationStatusBadge from "../../components/jobs/ApplicationStatusBadge";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import ErrorMessage from "../../components/common/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import { getAllApplicants, updateApplicationStatus } from "../../services/applicationService";
import { formatRelativeDate } from "../../utils/formatters";
import { APPLICATION_STATUS } from "../../utils/constants";

export default function RecruiterApplications() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllApplicants(token)
      .then((data) => setApplications(data.applications || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await updateApplicationStatus(token, id, status);
      setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status: res.application.status } : a));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DashboardLayout>
      <PageWrapper title="All Applicants" description="Review and manage applications">
        <ErrorMessage message={error} />
        {loading ? <Spinner /> : applications.length === 0 ? (
          <EmptyState title="No applications yet" description="Applications will appear here once candidates apply" />
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-base font-semibold text-gray-900">{app.applier_name}</p>
                  <p className="text-sm text-gray-500">{app.applier_email}</p>
                  <p className="text-xs text-gray-400 mt-1">{app.job_title} · {formatRelativeDate(app.applied_at)}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <ApplicationStatusBadge status={app.status} />
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white"
                  >
                    {Object.entries(APPLICATION_STATUS).map(([val, { label }]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageWrapper>
    </DashboardLayout>
  );
}