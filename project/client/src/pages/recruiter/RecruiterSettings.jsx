import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageWrapper from "../../components/layout/PageWrapper";
import ErrorMessage from "../../components/common/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import { changePassword, updateProfile } from "../../services/profileService";

export default function RecruiterSettings() {
  const { token, user, logout } = useAuth();
  const [companyForm, setCompanyForm] = useState({ company_name: "", company_description: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await updateProfile(token, companyForm);
      setSuccess("Company info updated");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await changePassword(token, passwordForm);
      setSuccess("Password changed successfully");
      setPasswordForm({ currentPassword: "", newPassword: "" });
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
          <form onSubmit={handleCompanySubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h3 className="text-base font-semibold text-gray-800">Company Info</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input type="text" value={companyForm.company_name} onChange={(e) => setCompanyForm({ ...companyForm, company_name: e.target.value })} className="corporate-input" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Company Description</label>
              <textarea value={companyForm.company_description} onChange={(e) => setCompanyForm({ ...companyForm, company_description: e.target.value })} className="corporate-input min-h-[80px]" />
            </div>
            <ErrorMessage message={error} />
            {success && <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-sm text-green-700">{success}</div>}
            <button type="submit" disabled={loading} className="corporate-button w-full">{loading ? "Saving..." : "Save"}</button>
          </form>

          <form onSubmit={handlePasswordSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h3 className="text-base font-semibold text-gray-800">Change Password</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} required className="corporate-input" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required className="corporate-input" />
            </div>
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