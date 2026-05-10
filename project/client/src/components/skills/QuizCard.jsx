import { useNavigate } from "react-router-dom";
import Badge from "../common/Badge";
import { DIFFICULTY_VARIANTS } from "../../utils/constants";

export default function QuizCard({ quiz, bestScore }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{quiz.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{quiz.topic}</p>
        </div>
        <Badge label={quiz.difficulty} variant={DIFFICULTY_VARIANTS[quiz.difficulty] || "gray"} />
      </div>

      {bestScore !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Best Score</span>
            <span>{bestScore}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${bestScore >= 70 ? "bg-green-500" : bestScore >= 40 ? "bg-yellow-400" : "bg-red-400"}`}
              style={{ width: `${bestScore}%` }}
            />
          </div>
        </div>
      )}

      <button
        onClick={() => navigate(`/applier/quizzes/${quiz.id}`)}
        className="mt-4 w-full corporate-button text-sm py-2"
      >
        {bestScore !== undefined ? "Retake Quiz" : "Start Quiz"}
      </button>
    </div>
  );
}