import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ApplicationStatusBadge from "../../components/jobs/ApplicationStatusBadge";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import useApplications from "../../hooks/useApplications";
import { formatRelativeDate } from "../../utils/formatters";

export default function ApplierApplications() {
  const { applications, loading, error } = useApplications();

  return (
    <DashboardLayout>
      <PageWrapper title="My Applications" description="Track all your job applications">
        {loading ? <Spinner /> : error ? <p className="text-sm text-red-500">{error}</p> :
          applications.length === 0 ? (
            <EmptyState title="No applications yet" description="Apply to jobs to see them here" />
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">{app.job_title}</p>
                    <p className="text-sm text-gray-500">{app.recruiter_name}</p>
                    <p className="text-xs text-gray-400 mt-1">{app.location} · {app.job_type}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <ApplicationStatusBadge status={app.status} />
                    <span className="text-xs text-gray-400">{formatRelativeDate(app.applied_at)}</span>
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