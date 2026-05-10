import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ResumeUploader from "../../components/resume/ResumeUploader";
import ResumeAnalysisResult from "../../components/resume/ResumeAnalysisResult";
import SkillGapChart from "../../components/resume/SkillGapChart";
import ErrorMessage from "../../components/common/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import { uploadResume, analyzeResume } from "../../services/resumeService";

export default function ResumeAnalyzer() {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [jobSkills, setJobSkills] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (file) => {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("resume", file);
      await uploadResume(token, formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError("");
    try {
      const skills = jobSkills.split(",").map((s) => s.trim()).filter(Boolean);
      const res = await analyzeResume(token, skills);
      setAnalysis(res.analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <DashboardLayout>
      <PageWrapper title="Resume Analyzer" description="Check your ATS score and skill match">
        <div className="max-w-2xl space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-base font-semibold text-gray-800">Upload Resume</h3>
            <ResumeUploader onUpload={handleUpload} loading={uploading} />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-base font-semibold text-gray-800">Job Skills (optional)</h3>
            <p className="text-xs text-gray-400">Enter required skills from a job listing to get a match score</p>
            <input
              type="text"
              value={jobSkills}
              onChange={(e) => setJobSkills(e.target.value)}
              placeholder="React, Node.js, PostgreSQL..."
              className="corporate-input"
            />
            <button onClick={handleAnalyze} disabled={analyzing} className="corporate-button w-full">
              {analyzing ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>

          <ErrorMessage message={error} />

          {analysis && (
            <>
              <SkillGapChart
                matchScore={analysis.matchScore}
                matchedCount={analysis.matchedSkills?.length || 0}
                missingCount={analysis.missingSkills?.length || 0}
              />
              <ResumeAnalysisResult analysis={analysis} />
            </>
          )}
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}