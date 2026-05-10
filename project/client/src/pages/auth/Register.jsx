import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../components/common/AuthLayout";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "applier" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser(form);
      const response = await import("../../services/authService").then((m) =>
        m.loginUser({ email: form.email, password: form.password })
      );
      login(response.token, response.role);
      navigate(response.role === "applier" ? "/applier" : "/recruiter");
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
          <h2 className="text-3xl font-semibold text-gray-900">Create account</h2>
          <p className="text-gray-600 text-sm">Join CareerBoost today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Your name" required className="corporate-input" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="you@example.com" required className="corporate-input" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="Min. 6 characters" required className="corporate-input" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              {["applier", "recruiter"].map((r) => (
                <button key={r} type="button" onClick={() => handleChange("role", r)}
                  className={`py-2.5 rounded-lg border text-sm font-medium capitalize transition-all ${form.role === r ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ErrorMessage message={error} />
          <button type="submit" disabled={loading} className="corporate-button">
            {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></span>Creating account...</span> : "Create Account"}
          </button>
        </form>
        <button onClick={() => navigate("/login")} className="corporate-secondary-button">Already have an account? Sign in</button>
      </div>
    </AuthLayout>
  );
}