import { useState, useEffect } from "react";
import { getUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function ApplierSettings() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // =====================================
  // FETCH USER (API ONLY)
  // =====================================
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const data = await getUser(token);

      setUser(data);
      setFormData({
        name: data?.name || "",
        email: data?.email || "",
      });

    } catch (err) {
      console.error("FETCH USER ERROR:", err);
      setErrorMessage(err.message || "Failed to load user data");

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // INPUT HANDLER
  // =====================================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  // =====================================
  // SAVE (LOCAL ONLY FOR NOW)
  // =====================================
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Email is required");
      return;
    }

    if (!formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    try {
      setSaving(true);

      // NOTE: currently only UI save (no backend update endpoint used)
      setSuccessMessage("Profile updated successfully");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (err) {
      console.error("SAVE ERROR:", err);
      setErrorMessage(err.message || "Failed to save settings");

    } finally {
      setSaving(false);
    }
  };

  // =====================================
  // LOADING UI
  // =====================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading settings...</p>
      </div>
    );
  }

  // =====================================
  // UI
  // =====================================
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar
        userName={user?.name || "Applier"}
        userRole="Applier"
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      <Sidebar
        currentRole="applier"
        isMobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main className="md:ml-64 mt-16 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Account Settings
            </h1>
            <p className="text-gray-600">
              Manage your profile information
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="px-6 py-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h2>
            </div>

            <div className="px-6 py-6">

              {/* Success */}
              {successMessage && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg">
                  {successMessage}
                </div>
              )}

              {/* Error */}
              {errorMessage && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSaveChanges} className="space-y-6">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={saving}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={saving}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/applier")}
                    disabled={saving}
                    className="px-6 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                </div>

              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}