import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [success, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validation: Check if fields are empty
    if (!email.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError('All fields are required')
      return
    }

    // Validation: Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Validation: Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validation: Check minimum password length
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    // Simulate processing
    setLoading(true)
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 500)
  }

  const handleBackToLogin = () => {
    navigate('/login')
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-900">Forgot Password</h2>
          <p className="text-gray-600 text-sm font-normal">Enter your new password below</p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-sm text-green-700 font-medium animate-subtle-slide">
            Password reset successful! Redirecting to login...
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="corporate-input"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                className="corporate-input"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
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
                  Processing...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150"
              >
                Remember your password? Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}
