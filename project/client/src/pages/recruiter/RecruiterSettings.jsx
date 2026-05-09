import { useState, useEffect } from "react";
import { getUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function RecruiterSettings() {
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

  const fetchUser = async () => {
    try {
      setLoading(true);

      const data = await getUser(token);

      setUser(data);

      setFormData({
        name: data.name || "",
        email: data.email || "",
      });

      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);

    } catch (err) {
      console.error("FETCH USER ERROR:", err);
      setErrorMessage(err.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

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
      setErrorMessage("");
      setSuccessMessage("");

      localStorage.setItem("userName", formData.name.trim());
      localStorage.setItem("userEmail", formData.email.trim());

      setUser((prev) => ({
        ...prev,
        name: formData.name.trim(),
        email: formData.email.trim(),
      }));

      setSuccessMessage("Profile updated successfully");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error) {
      console.error("Error saving settings:", error);
      setErrorMessage(error.message || "Failed to save settings");

    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userName={formData.name || user?.name}
        userRole="Recruiter"
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      <Sidebar
        currentRole="recruiter"
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
            <p className="text-sm md:text-base text-gray-600">
              Manage your profile information
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h2>
            </div>

            <div className="px-6 py-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-gray-600 text-sm">
                      Loading your settings...
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveChanges} className="space-y-6">

                  {/* Success */}
                  {successMessage && (
                    <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-sm text-green-800 font-medium">
                      {successMessage}
                    </div>
                  )}

                  {/* Error */}
                  {errorMessage && (
                    <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-sm text-red-800 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={saving}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={saving}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading || saving}
                      className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/recruiter")}
                      disabled={saving}
                      className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}