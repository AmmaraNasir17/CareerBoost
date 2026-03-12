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

      localStorage.setItem('token', token)
      localStorage.setItem('role', role)

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
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150">
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-500 font-medium">{t.or}</span>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <button type="button" className="corporate-social-button">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="flex-1 text-center text-sm font-normal">{t.continueWithGoogle}</span>
            </button>

            <button type="button" className="corporate-social-button-dark">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.17-.93 3.53-1.02 1.9-.15 3.37.97 3.82 2.94-.75.44-1.44 1.05-1.75 1.85-.51 1.62.3 3.16 1.3 4.1-.59 1.71-1.51 2.89-2.98 3.8zm-4.04-14.33c-.03-1.88 1.33-3.46 3.2-3.72.15 1.98-1.36 3.52-3.2 3.72z"/>
              </svg>
              <span className="flex-1 text-center text-sm font-normal">{t.withApple}</span>
            </button>

            <button type="button" className="corporate-social-button">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
              </svg>
              <span className="flex-1 text-center text-sm font-normal">{t.continueWithMicrosoft}</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 font-normal">{t.trustLine}</p>
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