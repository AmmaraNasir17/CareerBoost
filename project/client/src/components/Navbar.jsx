import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Navbar({ userName = 'User', userRole = 'Applier', onMenuClick = () => {} }) {
  const navigate = useNavigate()
  const { t, language, setLanguage } = useLanguage()
  const [showProfile, setShowProfile] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 h-16 shadow-sm">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Section - Logo & Hamburger */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            title="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              C
            </div>
            <span className="hidden sm:inline text-lg font-bold text-gray-900">CareerBoost</span>
          </button>
        </div>

        {/* Center Search - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-xs">
          <input
            type="text"
            placeholder={t.navbar.searchPlaceholder}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Right Section - Profile & Language */}
        <div className="flex items-center gap-2 md:gap-3 ml-auto flex-shrink-0">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="hidden sm:block px-2.5 py-1.5 text-xs md:text-sm border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
            <option value="it">IT</option>
            <option value="pt">PT</option>
            <option value="ja">JA</option>
            <option value="zh">ZH</option>
          </select>

          <div className="hidden sm:flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {userName.charAt(0)}
            </div>
          </div>

          <div className="hidden md:block w-px h-6 bg-gray-200"></div>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {showProfile ? '✕' : '⋯'}
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  {t.navbar.profile}
                </button>
                <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  {t.navbar.settings}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userRole');
                    navigate('/login');
                  }}
                  className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                >
                  {t.navbar.logout || 'Logout'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
