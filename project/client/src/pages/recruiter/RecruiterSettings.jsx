import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

export default function RecruiterSettings() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  // Initialize form with saved user data
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail') || ''
    const savedName = localStorage.getItem('userName') || ''
    
    setFormData({
      name: savedName,
      email: savedEmail
    })
    setLoading(false)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setSuccessMessage('')
    setErrorMessage('')
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim()) {
      setErrorMessage('Name is required')
      return
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required')
      return
    }
    if (!formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email')
      return
    }

    try {
      setSaving(true)
      setErrorMessage('')
      setSuccessMessage('')
      
      // Save to localStorage
      localStorage.setItem('userName', formData.name.trim())
      localStorage.setItem('userEmail', formData.email.trim())

      setSuccessMessage('Profile updated successfully')
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      setErrorMessage(error.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        userName={formData.name || 'User'} 
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
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Account Settings
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Manage your profile information
            </p>
          </div>

          {/* Settings Card */}
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
                    <p className="text-gray-600 text-sm">Loading your settings...</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveChanges} className="space-y-6">
                  {/* Success Message */}
                  {successMessage && (
                    <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-sm text-green-800 font-medium animate-subtle-slide flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-sm text-red-800 font-medium animate-subtle-slide flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      disabled={saving}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-600"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      disabled={saving}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-600"
                    />
                  </div>

                  {/* Button Group */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading || saving}
                      className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <>
                          <span className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></span>
                          <span>Saving...</span>
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/recruiter')}
                      disabled={saving}
                      className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
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
  )
}
