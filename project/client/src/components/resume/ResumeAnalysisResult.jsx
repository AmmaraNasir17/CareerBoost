import Badge from "../common/Badge";

export default function ResumeAnalysisResult({ analysis }) {
  if (!analysis) return null;

  const { atsScore, atsFeedback, matchScore, matchedSkills, missingSkills, extractedKeywords } = analysis;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-xs text-gray-500 mb-1">ATS Score</p>
          <p className={`text-4xl font-bold ${atsScore >= 70 ? "text-green-600" : atsScore >= 40 ? "text-yellow-500" : "text-red-500"}`}>
            {atsScore}%
          </p>
        </div>
        {matchScore !== undefined && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-xs text-gray-500 mb-1">Job Match</p>
            <p className={`text-4xl font-bold ${matchScore >= 70 ? "text-green-600" : matchScore >= 40 ? "text-yellow-500" : "text-red-500"}`}>
              {matchScore}%
            </p>
          </div>
        )}
      </div>

      {atsFeedback && atsFeedback.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">ATS Suggestions</h4>
          <ul className="space-y-1.5">
            {atsFeedback.map((item, i) => (
              <li key={i} className="text-sm text-red-600 flex items-start gap-2">
                <span className="mt-0.5">•</span>{item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {missingSkills && missingSkills.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Missing Skills</h4>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, i) => (
              <Badge key={i} label={skill} variant="red" />
            ))}
          </div>
        </div>
      )}

      {matchedSkills && matchedSkills.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Matched Skills</h4>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, i) => (
              <Badge key={i} label={skill} variant="green" />
            ))}
          </div>
        </div>
      )}

      {extractedKeywords && extractedKeywords.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Extracted Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {extractedKeywords.slice(0, 20).map((kw, i) => (
              <Badge key={i} label={kw} variant="gray" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}