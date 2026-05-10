import { useEffect, useState } from "react";

export default function QuizTimer({ durationSeconds, onExpire }) {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    if (remaining <= 0) { onExpire(); return; }
    const interval = setInterval(() => setRemaining((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [remaining]);

  const mins = Math.floor(remaining / 60).toString().padStart(2, "0");
  const secs = (remaining % 60).toString().padStart(2, "0");
  const isWarning = remaining <= 30;

  return (
    <div className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg
      ${isWarning ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-700"}`}>
      <span>{mins}:{secs}</span>
    </div>
  );
}