import { useNavigate } from "react-router-dom";
import Badge from "../common/Badge";
import { formatSalary, formatDate } from "../../utils/formatters";
import { JOB_TYPE_LABELS, EXPERIENCE_LABELS } from "../../utils/constants";

export default function JobCard({ job, onSave, isSaved, showApplyButton = true }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{job.recruiter_name}</p>
        </div>
        {onSave && (
          <button
            onClick={() => onSave(job.id)}
            className={`text-sm font-medium transition-colors ${isSaved ? "text-blue-600" : "text-gray-400 hover:text-blue-500"}`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <Badge label={job.location} variant="gray" />
        {job.job_type && <Badge label={JOB_TYPE_LABELS[job.job_type] || job.job_type} variant="blue" />}
        {job.experience_level && <Badge label={EXPERIENCE_LABELS[job.experience_level] || job.experience_level} variant="yellow" />}
        {job.salary && <Badge label={formatSalary(job.salary)} variant="green" />}
      </div>

      {job.description && (
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{job.description}</p>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{formatDate(job.created_at)}</span>
        {showApplyButton && (
          <button
            onClick={() => navigate(`/applier/jobs/${job.id}`)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            View Details →
          </button>
        )}
      </div>
    </div>
  );
}