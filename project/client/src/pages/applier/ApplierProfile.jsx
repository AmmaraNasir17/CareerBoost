import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ErrorMessage from "../../components/common/ErrorMessage";
import Spinner from "../../components/common/Spinner";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "../../services/profileService";

export default function ApplierProfile() {
  const { user, token, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", skills: "", experience: "", education: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!user) return <DashboardLayout><Spinner /></DashboardLayout>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await updateProfile(token, {
        name: form.name,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        experience: form.experience,
        education: form.education,
      });
      setUser((prev) => ({ ...prev, name: form.name }));
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageWrapper title="My Profile" description="Update your personal information">
        <div className="max-w-lg">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="corporate-input" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={user.email} disabled className="corporate-input opacity-60" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <input type="text" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="React, Node.js, SQL..." className="corporate-input" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <textarea value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="corporate-input min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <textarea value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} className="corporate-input min-h-[80px]" />
            </div>
            <ErrorMessage message={error} />
            {success && <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-sm text-green-700">Profile updated successfully</div>}
            <button type="submit" disabled={loading} className="corporate-button w-full">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}