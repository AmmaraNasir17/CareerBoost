import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ResumeBuilderForm from "../../components/resume/ResumeBuilderForm";
import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import useResume from "../../hooks/useResume";
import useAuth from "../../hooks/useAuth";
import { saveResume, exportResumePDF } from "../../services/resumeService";
import { useState } from "react";

export default function ResumeBuilder() {
  const { token } = useAuth();
  const { resume, setResume, loading, error } = useResume();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (data) => {
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    try {
      const res = await saveResume(token, data);
      setResume(res.resume);
      setSaveSuccess(true);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportResumePDF(token);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setSaveError(err.message);
    }
  };

  if (loading) return <DashboardLayout><Spinner /></DashboardLayout>;

  return (
    <DashboardLayout>
      <PageWrapper
        title="Resume Builder"
        description="Build and export your professional resume"
        action={
          resume && (
            <button onClick={handleExport} className="corporate-button text-sm py-2 px-4">
              Export PDF
            </button>
          )
        }
      >
        <ErrorMessage message={error || saveError} />
        {saveSuccess && (
          <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-sm text-green-700 font-medium">
            Resume saved successfully
          </div>
        )}
        <ResumeBuilderForm initial={resume} onSave={handleSave} loading={saving} />
      </PageWrapper>
    </DashboardLayout>
  );
}