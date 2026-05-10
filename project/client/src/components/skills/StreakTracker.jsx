export default function StreakTracker({ streak = 0, lastActivity }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
      <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl">
        🔥
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{streak} <span className="text-base font-medium text-gray-500">day streak</span></p>
        {lastActivity && (
          <p className="text-xs text-gray-400 mt-0.5">Last active: {lastActivity}</p>
        )}
      </div>
    </div>
  );
}