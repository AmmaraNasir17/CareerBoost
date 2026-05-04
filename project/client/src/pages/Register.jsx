import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import AuthLayout from '../components/AuthLayout'
import translations from '../utils/translations.json'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('applier')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const t = translations.register

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError(t.passwordMismatch)
      return
    }

    if (password.length < 6) {
      setError(t.passwordMinLength)
      return
    }

    setLoading(true)

    try {
      const response = await registerUser({
        name,
        email,
        password,
        role,
      })

      const { token } = response

      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      localStorage.setItem('userName', name)
      localStorage.setItem('userEmail', email)

      if (role === 'applier') {
        navigate('/applier')
      } else if (role === 'recruiter') {
        navigate('/recruiter')
      }
    } catch (err) {
      setError(err.message || t.registerError)
      console.error("Registration error:", err)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-900">{t.registerTitle}</h2>
          <p className="text-gray-600 text-sm font-normal">{t.registerSubtitle}</p>
        </div>        

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {t.nameLabel}
            </label>
            <input
              id="name"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              required
              className="corporate-input"
            />
          </div>

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
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              {t.roleLabel}
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="corporate-input corporate-select"
            >
              <option value="applier">{t.applier}</option>
              <option value="recruiter">{t.recruiter}</option>
            </select>
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

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {t.confirmPasswordLabel}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.confirmPasswordPlaceholder}
              required
              className="corporate-input"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-sm text-red-700 font-medium animate-subtle-slide">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="corporate-button mt-7">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></span>
                {t.creatingAccount}
              </span>
            ) : (
              t.createAccountButton
            )}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-500 font-medium">{t.alreadyHaveAccount}</span>
          </div>
        </div>

        <button onClick={() => navigate('/login')} className="corporate-secondary-button">
          {t.signInLink}
        </button>
      </div>
    </AuthLayout>
  )
}