import Badge from "../common/Badge";

export default function JobStatusBadge({ type, level }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {type && <Badge label={type} variant="blue" />}
      {level && <Badge label={level} variant="yellow" />}
    </div>
  );
}