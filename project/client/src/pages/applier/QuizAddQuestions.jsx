import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ErrorMessage from "../../components/common/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import { addQuestion } from "../../services/quizService";

const emptyQuestion = {
  question_text: "",
  options: ["", "", "", ""],
  correct_answer: "",
  position: 1,
};

export default function QuizAddQuestions() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([{ ...emptyQuestion }]);
  const [saving, setSaving] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [error, setError] = useState("");

  const updateQuestion = (index, field, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (qIndex, optIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex) return q;
        const options = [...q.options];
        options[optIndex] = value;
        return { ...q, options };
      })
    );
  };

  const addEmptyQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { ...emptyQuestion, position: prev.length + 1 },
    ]);
  };

  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      for (const question of questions) {
        const filledOptions = question.options.filter((o) => o.trim());
        if (filledOptions.length < 2) {
          throw new Error("Each question needs at least 2 options");
        }
        if (!question.correct_answer.trim()) {
          throw new Error("Each question needs a correct answer selected");
        }
        await addQuestion(token, id, {
          ...question,
          options: filledOptions,
        });
        setSavedCount((prev) => prev + 1);
      }
      navigate("/applier/quizzes");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <PageWrapper
        title="Add Questions"
        description={`Adding questions to quiz`}
        action={
          <button onClick={() => navigate("/applier/quizzes")} className="text-sm text-gray-500 hover:text-gray-700">
            Skip for now
          </button>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">
                  Question {qIndex + 1}
                </h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600">Question Text</label>
                <textarea
                  value={q.question_text}
                  onChange={(e) => updateQuestion(qIndex, "question_text", e.target.value)}
                  placeholder="What is the question?"
                  required
                  className="corporate-input min-h-[80px] text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600">Options</label>
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-4 flex-shrink-0">
                        {String.fromCharCode(65 + optIndex)}.
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                        className="corporate-input text-sm flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-600">Correct Answer</label>
                <select
                  value={q.correct_answer}
                  onChange={(e) => updateQuestion(qIndex, "correct_answer", e.target.value)}
                  required
                  className="corporate-input text-sm"
                >
                  <option value="">Select correct answer</option>
                  {q.options
                    .filter((o) => o.trim())
                    .map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addEmptyQuestion}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
          >
            + Add Another Question
          </button>

          {saving && savedCount > 0 && (
            <p className="text-sm text-blue-600 font-medium">
              Saved {savedCount} of {questions.length} questions...
            </p>
          )}

          <ErrorMessage message={error} />

          <button type="submit" disabled={saving} className="corporate-button w-full">
            {saving ? `Saving questions...` : `Save ${questions.length} Question${questions.length > 1 ? "s" : ""} & Finish`}
          </button>
        </form>
      </PageWrapper>
    </DashboardLayout>
  );
}