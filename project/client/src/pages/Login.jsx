import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import AuthLayout from '../components/AuthLayout'
import translations from '../utils/translations.json'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const t = translations.login

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await loginUser({ email, password })

      const { token, role } = response

      // Clear any previous user data
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      
      // Set current user data
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      localStorage.setItem('userEmail', email)

      if (role === 'applier') {
        navigate('/applier')
      } else if (role === 'recruiter') {
        navigate('/recruiter')
      }
    } catch (err) {
      setError(err.message || t.loginError)
      console.error("Registration error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-900">{t.loginTitle}</h2>
          <p className="text-gray-600 text-sm font-normal">{t.loginSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              className="corporate-input"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t.passwordLabel}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              required
              className="corporate-input"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-sm text-red-700 font-medium animate-subtle-slide">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="corporate-checkbox"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none font-normal">
                {t.rememberMe}
              </label>
            </div>
            <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150">
              {t.forgotPassword}
            </a>
          </div>

          <button type="submit" disabled={loading} className="corporate-button mt-7">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></span>
                {t.signingIn}
              </span>
            ) : (
              t.signInButton
            )}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-500 font-medium">{t.newToCareerBoost}</span>
          </div>
        </div>

        <button onClick={() => navigate('/register')} className="corporate-secondary-button">
          {t.createAccountLink}
        </button>
      </div>
    </AuthLayout>
  )
}