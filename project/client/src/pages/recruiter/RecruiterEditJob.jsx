import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ErrorMessage from "../../components/common/ErrorMessage";
import Spinner from "../../components/common/Spinner";
import useAuth from "../../hooks/useAuth";
import { getJobById, editJob } from "../../services/jobService";
import { JOB_TYPES, EXPERIENCE_LEVELS } from "../../utils/constants";

export default function RecruiterEditJob() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getJobById(token, id)
      .then((data) => {
        const j = data.job;
        setForm({ title: j.title, description: j.description, location: j.location, job_type: j.job_type, experience_level: j.experience_level, salary: j.salary || "", required_skills: (j.required_skills || []).join(", ") });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await editJob(token, id, {
        ...form,
        salary: form.salary ? Number(form.salary) : null,
        required_skills: form.required_skills.split(",").map((s) => s.trim()).filter(Boolean),
      });
      navigate("/recruiter/jobs");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <DashboardLayout><Spinner /></DashboardLayout>;

  return (
    <DashboardLayout>
      <PageWrapper title="Edit Job" action={<button onClick={() => navigate("/recruiter/jobs")} className="text-sm text-gray-500 hover:text-gray-700">← Back</button>}>
        <div className="max-w-lg">
          {form && (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              {[{ field: "title", label: "Job Title" }, { field: "location", label: "Location" }].map(({ field, label }) => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <input type="text" value={form[field]} onChange={(e) => handleChange(field, e.target.value)} className="corporate-input" />
                </div>
              ))}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} className="corporate-input min-h-[120px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Job Type</label>
                  <select value={form.job_type} onChange={(e) => handleChange("job_type", e.target.value)} className="corporate-input">
                    {JOB_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                  <select value={form.experience_level} onChange={(e) => handleChange("experience_level", e.target.value)} className="corporate-input">
                    {EXPERIENCE_LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input type="number" value={form.salary} onChange={(e) => handleChange("salary", e.target.value)} className="corporate-input" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Required Skills</label>
                <input type="text" value={form.required_skills} onChange={(e) => handleChange("required_skills", e.target.value)} className="corporate-input" />
              </div>
              <ErrorMessage message={error} />
              <button type="submit" disabled={saving} className="corporate-button w-full">{saving ? "Saving..." : "Save Changes"}</button>
            </form>
          )}
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}