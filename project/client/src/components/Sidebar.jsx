import { useNavigate, useLocation } from 'react-router-dom'

export default function Sidebar({ currentRole = 'applier', isMobileOpen = false, onClose = () => {} }) {
  const navigate = useNavigate()
  const location = useLocation()

  const applierMenuItems = [
    { label: 'Dashboard', icon: '🏠', route: '/applier' },
    { label: 'Jobs', icon: '💼', route: '/applier/jobs' },
    { label: 'Applications', icon: '📋', route: '/applier/applications' },
  ]

  const recruiterMenuItems = [
    { label: 'Dashboard', icon: '📊', route: '/recruiter' },
    { label: 'Jobs', icon: '💼', route: '/recruiter/jobs' },
    { label: 'Applicants', icon: '📥', route: '/recruiter/applicants' },
  ]

  const menuItems = currentRole === 'recruiter' ? recruiterMenuItems : applierMenuItems

  const isActive = (route) => {
    if (route === '/applier' || route === '/recruiter') {
      return location.pathname === route
    }
    return location.pathname.startsWith(route)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-16 w-64 bg-white border-r border-gray-200 flex-col" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Menu Items */}
        <nav className="px-4 py-6 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.route)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive(item.route)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
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
                onClick={() => {
                  navigate(item.route)
                  onClose()
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(item.route)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </>
    </>
  )
}
