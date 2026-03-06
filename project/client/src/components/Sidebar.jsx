import { useLanguage } from '../context/LanguageContext.jsx'

export default function Sidebar({ currentRole = 'applier', isMobileOpen = false, onClose = () => {} }) {
  const { t } = useLanguage()

  const applierMenuItems = [
    { label: t.sidebar.applier.dashboard, icon: '🏠', active: true },
    { label: t.sidebar.applier.applications, icon: '📋', active: false },
    { label: t.sidebar.applier.savedJobs, icon: '🔖', active: false },
    { label: t.sidebar.applier.messages, icon: '💬', active: false },
  ]

  const recruiterMenuItems = [
    { label: t.sidebar.recruiter.dashboard, icon: '📊', active: true },
    { label: t.sidebar.recruiter.postJob, icon: '📝', active: false },
    { label: t.sidebar.recruiter.applicants, icon: '📥', active: false },
    { label: t.sidebar.recruiter.team, icon: '👥', active: false },
  ]

  const menuItems = currentRole === 'recruiter' ? recruiterMenuItems : applierMenuItems

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-16 w-64 bg-white border-r border-gray-200 flex-col" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Menu Items */}
        <nav className="px-4 py-6 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                item.active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">Profile</p>
              <p className="text-xs text-gray-600">Manage account</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
            {t.sidebar.signOut}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <>
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={onClose}
          />
        )}
        
        <div
          className={`fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 md:hidden flex flex-col ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="px-4 py-6 space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={onClose}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  item.active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button className="w-full px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              {t.sidebar.signOut}
            </button>
          </div>
        </div>
      </>
    </>
  )
}
