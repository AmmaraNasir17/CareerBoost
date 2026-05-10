export default function SkillProgressBar({ topic, score, attempts }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{topic}</span>
        <span className="text-gray-400 text-xs">{attempts} attempt{attempts !== 1 ? "s" : ""} · {score}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${score >= 70 ? "bg-green-500" : score >= 40 ? "bg-yellow-400" : "bg-red-400"}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}