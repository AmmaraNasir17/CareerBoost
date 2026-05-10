export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-sm text-red-700 font-medium animate-subtle-slide">
      {message}
    </div>
  );
}