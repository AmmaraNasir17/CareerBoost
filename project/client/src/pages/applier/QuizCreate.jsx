import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ErrorMessage from "../../components/common/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import { createQuiz } from "../../services/quizService";
import { DIFFICULTY_VARIANTS } from "../../utils/constants";

export default function QuizCreate() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", topic: "", difficulty: "easy" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await createQuiz(token, form);
      navigate(`/quizzes/${res.quiz.id}/add-questions`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageWrapper
        title="Create Quiz"
        description="Set up a new skill quiz"
        action={
          <button onClick={() => navigate("/applier/quizzes")} className="text-sm text-gray-500 hover:text-gray-700">
            ← Back
          </button>
        }
      >
        <div className="max-w-lg">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Quiz Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. React Fundamentals"
                required
                className="corporate-input"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Topic</label>
              <input
                type="text"
                value={form.topic}
                onChange={(e) => handleChange("topic", e.target.value)}
                placeholder="e.g. React, Node.js, DSA"
                required
                className="corporate-input"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Difficulty</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.keys(DIFFICULTY_VARIANTS).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleChange("difficulty", level)}
                    className={`py-2.5 rounded-lg border text-sm font-medium capitalize transition-all
                      ${form.difficulty === level
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <ErrorMessage message={error} />

            <button type="submit" disabled={loading} className="corporate-button w-full">
              {loading ? "Creating..." : "Create Quiz & Add Questions →"}
            </button>
          </form>
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}