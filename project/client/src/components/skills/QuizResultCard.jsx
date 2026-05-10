import Badge from "../common/Badge";
import { PERFORMANCE_LABELS } from "../../utils/constants";

export default function QuizResultCard({ result }) {
  const { score, correct, total, performance, breakdown } = result;
  const config = PERFORMANCE_LABELS[performance] || { label: performance, variant: "gray" };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <p className="text-sm text-gray-500 mb-1">Your Score</p>
        <p className={`text-5xl font-bold mb-2 ${score >= 70 ? "text-green-600" : score >= 40 ? "text-yellow-500" : "text-red-500"}`}>
          {score}%
        </p>
        <p className="text-sm text-gray-500">{correct} out of {total} correct</p>
        <div className="mt-3">
          <Badge label={config.label} variant={config.variant} />
        </div>
      </div>

      {breakdown && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Answer Breakdown</h4>
          {breakdown.map((item, i) => (
            <div key={i} className={`p-3 rounded-lg text-sm border ${item.is_correct ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <p className="font-medium text-gray-800">{item.question_text}</p>
              <p className={`mt-1 text-xs ${item.is_correct ? "text-green-600" : "text-red-600"}`}>
                Your answer: {item.user_answer || "Not answered"} {item.is_correct ? "✓" : `✗ — Correct: ${item.correct_answer}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}