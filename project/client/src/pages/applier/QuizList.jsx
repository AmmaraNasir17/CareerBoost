import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import QuizCard from "../../components/skills/QuizCard";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import useQuiz from "../../hooks/useQuiz";
import { DIFFICULTY_VARIANTS } from "../../utils/constants";

export default function QuizList() {
  const [filters, setFilters] = useState({});
  const { quizzes, loading, error, getBestScore } = useQuiz(filters);

  return (
    <DashboardLayout>
      <PageWrapper title="Skill Quizzes" description="Test and improve your knowledge">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Filter by topic..."
            onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
            className="corporate-input max-w-xs text-sm"
          />
          <select
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            className="corporate-input max-w-xs text-sm"
          >
            <option value="">All Difficulties</option>
            {Object.keys(DIFFICULTY_VARIANTS).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {loading ? <Spinner /> : error ? <p className="text-sm text-red-500">{error}</p> :
          quizzes.length === 0 ? (
            <EmptyState title="No quizzes available" description="Check back later for new quizzes" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} bestScore={getBestScore(quiz.id)} />
              ))}
            </div>
          )
        }
      </PageWrapper>
    </DashboardLayout>
  );
}