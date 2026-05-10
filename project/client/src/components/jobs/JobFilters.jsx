import { JOB_TYPES, EXPERIENCE_LEVELS } from "../../utils/constants";

export default function JobFilters({ filters, onChange, onReset }) {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Filters</h3>
        <button onClick={onReset} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
          Reset
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-600">Search</label>
        <input
          type="text"
          value={filters.search || ""}
          onChange={(e) => handleChange("search", e.target.value)}
          placeholder="Job title or keyword"
          className="corporate-input text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-600">Location</label>
        <input
          type="text"
          value={filters.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="City or remote"
          className="corporate-input text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-600">Job Type</label>
        <select
          value={filters.job_type || ""}
          onChange={(e) => handleChange("job_type", e.target.value)}
          className="corporate-input text-sm"
        >
          <option value="">All Types</option>
          {JOB_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-600">Experience Level</label>
        <select
          value={filters.experience_level || ""}
          onChange={(e) => handleChange("experience_level", e.target.value)}
          className="corporate-input text-sm"
        >
          <option value="">All Levels</option>
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-600">Min Salary</label>
          <input
            type="number"
            value={filters.salary_min || ""}
            onChange={(e) => handleChange("salary_min", e.target.value)}
            placeholder="0"
            className="corporate-input text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-600">Max Salary</label>
          <input
            type="number"
            value={filters.salary_max || ""}
            onChange={(e) => handleChange("salary_max", e.target.value)}
            placeholder="Any"
            className="corporate-input text-sm"
          />
        </div>
      </div>
    </div>
  );
}