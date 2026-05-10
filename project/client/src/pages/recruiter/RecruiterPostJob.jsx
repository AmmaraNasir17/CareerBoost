import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ErrorMessage from "../../components/common/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import { postJob } from "../../services/jobService";
import { JOB_TYPES, EXPERIENCE_LEVELS } from "../../utils/constants";

export default function RecruiterPostJob() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", location: "", job_type: "", experience_level: "", salary: "", required_skills: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await postJob(token, {
        ...form,
        salary: form.salary ? Number(form.salary) : null,
        required_skills: form.required_skills.split(",").map((s) => s.trim()).filter(Boolean),
      });
      navigate("/recruiter/jobs");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageWrapper title="Post a Job" description="Fill in the details to create a new listing">
        <div className="max-w-lg">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            {[{ field: "title", label: "Job Title" }, { field: "location", label: "Location" }].map(({ field, label }) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input type="text" value={form[field]} onChange={(e) => handleChange(field, e.target.value)} required className="corporate-input" />
              </div>
            ))}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} required className="corporate-input min-h-[120px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Job Type</label>
                <select value={form.job_type} onChange={(e) => handleChange("job_type", e.target.value)} required className="corporate-input">
                  <option value="">Select</option>
                  {JOB_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                <select value={form.experience_level} onChange={(e) => handleChange("experience_level", e.target.value)} required className="corporate-input">
                  <option value="">Select</option>
                  {EXPERIENCE_LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Salary (optional)</label>
              <input type="number" value={form.salary} onChange={(e) => handleChange("salary", e.target.value)} className="corporate-input" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Required Skills</label>
              <input type="text" value={form.required_skills} onChange={(e) => handleChange("required_skills", e.target.value)} placeholder="React, Node.js, SQL..." className="corporate-input" />
            </div>
            <ErrorMessage message={error} />
            <button type="submit" disabled={loading} className="corporate-button w-full">{loading ? "Posting..." : "Post Job"}</button>
          </form>
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}