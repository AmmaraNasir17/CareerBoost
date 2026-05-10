import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import StatsCard from "../../components/common/StatsCard";
import ApplicationStatusBadge from "../../components/jobs/ApplicationStatusBadge";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import useDashboard from "../../hooks/useDashboard";
import { formatRelativeDate } from "../../utils/formatters";

export default function RecruiterDashboard() {
  const { data, loading, error } = useDashboard();

  if (loading) return <DashboardLayout><Spinner /></DashboardLayout>;

  return (
    <DashboardLayout>
      <PageWrapper title="Recruiter Dashboard" description="Overview of your hiring activity">
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard label="Jobs Posted" value={data?.totalJobs || 0} color="blue" />
          <StatsCard label="Total Applicants" value={data?.totalApplicants || 0} color="gray" />
          <StatsCard label="Shortlisted" value={data?.shortlisted || 0} color="green" />
          <StatsCard label="Conversion Rate" value={`${data?.conversionRate || 0}%`} color="yellow" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Recent Applicants</h3>
          {data?.recentApplications?.length ? (
            <div className="space-y-3">
              {data.recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{app.applier_name}</p>
                    <p className="text-xs text-gray-400">{app.job_title} · {formatRelativeDate(app.applied_at)}</p>
                  </div>
                  <ApplicationStatusBadge status={app.status} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No applicants yet" description="Post a job to start receiving applications" />
          )}
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}