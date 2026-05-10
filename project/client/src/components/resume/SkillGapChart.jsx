export default function SkillGapChart({ matchScore = 0, missingCount = 0, matchedCount = 0 }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <h4 className="text-sm font-semibold text-gray-700">Skill Gap Overview</h4>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Match Score</span>
          <span>{matchScore}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${matchScore >= 70 ? "bg-green-500" : matchScore >= 40 ? "bg-yellow-400" : "bg-red-400"}`}
            style={{ width: `${matchScore}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{matchedCount}</p>
          <p className="text-xs text-green-600 mt-0.5">Matched</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-red-500">{missingCount}</p>
          <p className="text-xs text-red-500 mt-0.5">Missing</p>
        </div>
      </div>
    </div>
  );
}