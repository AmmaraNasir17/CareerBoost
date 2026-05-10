import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import StatsCard from "../../components/common/StatsCard";
import StreakTracker from "../../components/skills/StreakTracker";
import ApplicationStatusBadge from "../../components/jobs/ApplicationStatusBadge";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import useDashboard from "../../hooks/useDashboard";
import { formatRelativeDate } from "../../utils/formatters";

export default function ApplierDashboard() {
  const { data, loading, error } = useDashboard();

  if (loading) return <DashboardLayout><Spinner /></DashboardLayout>;

  return (
    <DashboardLayout>
      <PageWrapper title="My Dashboard" description="Your career progress at a glance">
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard label="Total Applied" value={data?.totalApplications || 0} color="blue" />
          <StatsCard label="Under Review" value={data?.statusBreakdown?.under_review || 0} color="yellow" />
          <StatsCard label="Shortlisted" value={data?.statusBreakdown?.shortlisted || 0} color="green" />
          <StatsCard label="Quiz Attempts" value={data?.totalQuizAttempts || 0} color="gray" />
        </div>

        {data?.streak && <StreakTracker streak={data.streak.streak} lastActivity={data.streak.last_activity_date} />}

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Recent Applications</h3>
          {data?.recentApplications?.length ? (
            <div className="space-y-3">
              {data.recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{app.job_title}</p>
                    <p className="text-xs text-gray-400">{formatRelativeDate(app.applied_at)}</p>
                  </div>
                  <ApplicationStatusBadge status={app.status} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No applications yet" description="Start applying to jobs to see them here" />
          )}
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}