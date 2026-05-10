import { useLocation, useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import QuizResultCard from "../../components/skills/QuizResultCard";

export default function QuizResult() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) {
    navigate(`/applier/quizzes/${id}`);
    return null;
  }

  return (
    <DashboardLayout>
      <PageWrapper title="Quiz Result">
        <div className="max-w-xl space-y-5">
          <QuizResultCard result={result} />
          <div className="flex gap-3">
            <button onClick={() => navigate(`/applier/quizzes/${id}`)} className="corporate-button flex-1">
              Retake Quiz
            </button>
            <button onClick={() => navigate("/applier/quizzes")} className="corporate-secondary-button flex-1">
              All Quizzes
            </button>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}