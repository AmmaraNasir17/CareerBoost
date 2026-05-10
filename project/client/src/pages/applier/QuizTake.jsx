import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import QuizQuestion from "../../components/skills/QuizQuestion";
import QuizTimer from "../../components/skills/QuizTimer";
import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import { getQuizById, submitQuiz } from "../../services/quizService";

export default function QuizTake() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getQuizById(token, id)
      .then((data) => { setQuiz(data.quiz); setQuestions(data.questions); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSelect = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await submitQuiz(token, id, answers);
      navigate(`/applier/quizzes/${id}/result`, { state: { result: res.result } });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) return <DashboardLayout><Spinner /></DashboardLayout>;

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  return (
    <DashboardLayout>
      <PageWrapper title={quiz?.title || "Quiz"} action={
        <QuizTimer durationSeconds={questions.length * 60} onExpire={handleSubmit} />
      }>
        <div className="max-w-xl space-y-6">
          <ErrorMessage message={error} />
          {current && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <QuizQuestion
                question={current}
                selectedAnswer={answers[current.id]}
                onSelect={handleSelect}
                index={currentIndex}
                total={questions.length}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((i) => i - 1)}
              disabled={currentIndex === 0}
              className="corporate-secondary-button px-5 py-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>

            {isLast ? (
              <button
                onClick={handleSubmit}
                disabled={submitting || answeredCount === 0}
                className="corporate-button px-5 py-2 text-sm"
              >
                {submitting ? "Submitting..." : `Submit (${answeredCount}/${questions.length})`}
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="corporate-button px-5 py-2 text-sm"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}