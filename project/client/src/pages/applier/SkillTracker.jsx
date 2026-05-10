import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import SkillProgressBar from "../../components/skills/SkillProgressBar";
import StreakTracker from "../../components/skills/StreakTracker";
import Badge from "../../components/common/Badge";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import useSkills from "../../hooks/useSkills";
import { formatDate } from "../../utils/formatters";

export default function SkillTracker() {
  const { progress, weakAreas, streak, loading, error } = useSkills();

  if (loading) return <DashboardLayout><Spinner /></DashboardLayout>;

  return (
    <DashboardLayout>
      <PageWrapper title="Skill Tracker" description="Monitor your learning progress">
        {error && <p className="text-sm text-red-500">{error}</p>}

        {streak && <StreakTracker streak={streak.streak} lastActivity={formatDate(streak.last_activity_date)} />}

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-800">Skill Progress</h3>
          {progress.length === 0 ? (
            <EmptyState title="No skill data yet" description="Complete quizzes to track your progress" />
          ) : (
            <div className="space-y-4">
              {progress.map((item) => (
                <SkillProgressBar key={item.id} topic={item.topic} score={item.latest_score} attempts={item.attempts} />
              ))}
            </div>
          )}
        </div>

        {weakAreas.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
            <h3 className="text-base font-semibold text-gray-800">Weak Areas</h3>
            <p className="text-xs text-gray-400">Topics where you scored below 50%</p>
            <div className="flex flex-wrap gap-2">
              {weakAreas.map((area) => (
                <Badge key={area.id} label={`${area.topic} — ${area.latest_score}%`} variant="red" />
              ))}
            </div>
          </div>
        )}
      </PageWrapper>
    </DashboardLayout>
  );
}