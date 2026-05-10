import { useRef, useState } from "react";

export default function ResumeUploader({ onUpload, loading }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    onUpload(file);
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-200
        ${dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      {loading ? (
        <p className="text-sm text-gray-500">Uploading...</p>
      ) : fileName ? (
        <p className="text-sm text-green-600 font-medium">{fileName} uploaded</p>
      ) : (
        <>
          <p className="text-sm font-medium text-gray-700">Drop your resume here or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
        </>
      )}
    </div>
  );
}