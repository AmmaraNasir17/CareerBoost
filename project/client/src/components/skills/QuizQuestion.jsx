export default function QuizQuestion({ question, selectedAnswer, onSelect, index, total }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">Question {index + 1} of {total}</span>
      </div>

      <p className="text-base font-medium text-gray-900">{question.question_text}</p>

      <div className="space-y-2.5">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onSelect(question.id, option)}
            className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-150
              ${selectedAnswer === option
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-gray-50"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}