import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../components/common/AuthLayout";
import ErrorMessage from "../../components/common/ErrorMessage";
import translations from "../../utils/translations.json";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const t = translations.login;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      login(response.token, response.role);
      navigate(response.role === "applier" ? "/applier" : "/recruiter");
    } catch (err) {
      setError(err.message || t.loginError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-900">{t.loginTitle}</h2>
          <p className="text-gray-600 text-sm font-normal">{t.loginSubtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{t.emailLabel}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPlaceholder} required className="corporate-input" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{t.passwordLabel}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.passwordPlaceholder} required className="corporate-input" />
          </div>
          <ErrorMessage message={error} />
          <div className="flex items-center justify-between pt-1">
            <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">{t.forgotPassword}</a>
          </div>
          <button type="submit" disabled={loading} className="corporate-button mt-7">
            {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></span>{t.signingIn}</span> : t.signInButton}
          </button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-gray-500 font-medium">{t.newToCareerBoost}</span></div>
        </div>
        <button onClick={() => navigate("/register")} className="corporate-secondary-button">{t.createAccountLink}</button>
      </div>
    </AuthLayout>
  );
}