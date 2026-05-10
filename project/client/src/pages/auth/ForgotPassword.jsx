import { useState } from "react";
import { apiRequest } from "../../services/api";
import AuthLayout from "../../components/common/AuthLayout";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiRequest("/auth/forgot-password", "POST", { email });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-900">Reset password</h2>
          <p className="text-gray-600 text-sm">Enter your email and we'll send a reset link</p>
        </div>
        {success ? (
          <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-sm text-green-700 font-medium">
            Reset link sent. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="corporate-input" />
            </div>
            <ErrorMessage message={error} />
            <button type="submit" disabled={loading} className="corporate-button">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
        <a href="/login" className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium">Back to login</a>
      </div>
    </AuthLayout>
  );
}