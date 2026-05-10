import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ErrorMessage from "../../components/common/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import { changePassword } from "../../services/profileService";

export default function ApplierSettings() {
  const { token, logout } = useAuth();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await changePassword(token, form);
      setSuccess(true);
      setForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageWrapper title="Settings">
        <div className="max-w-lg space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h3 className="text-base font-semibold text-gray-800">Change Password</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input type="password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} required className="corporate-input" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required className="corporate-input" />
            </div>
            <ErrorMessage message={error} />
            {success && <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-sm text-green-700">Password changed successfully</div>}
            <button type="submit" disabled={loading} className="corporate-button w-full">{loading ? "Saving..." : "Update Password"}</button>
          </form>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-3">Account</h3>
            <button onClick={logout} className="corporate-secondary-button text-red-600 border-red-200 hover:bg-red-50 w-full">Sign Out</button>
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}