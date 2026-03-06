import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatsCard from '../components/StatsCard'
import { BriefcaseIcon, CheckCircleIcon, XCircleIcon, DocumentIcon, TrendingUpIcon } from '../components/Icons'
import { useLanguage } from '../context/LanguageContext.jsx'
import { interpolate } from '../App'

const recentApplications = [
  { id: 1, jobTitle: 'Senior React Developer', company: 'Tech Corp', appliedDate: '2024-02-15', status: 'Applied' },
  { id: 2, jobTitle: 'Full Stack Engineer', company: 'StartUp Inc', appliedDate: '2024-02-10', status: 'Shortlisted' },
  { id: 3, jobTitle: 'UI/UX Designer', company: 'Design Studios', appliedDate: '2024-02-08', status: 'Rejected' },
  { id: 4, jobTitle: 'Frontend Developer', company: 'Web Solutions', appliedDate: '2024-02-05', status: 'Applied' },
  { id: 5, jobTitle: 'JavaScript Developer', company: 'Cloud Systems', appliedDate: '2024-02-01', status: 'Shortlisted' },
]

function getStatusColor(status) {
  return {
    Applied: 'bg-blue-50 text-blue-600 border border-blue-100',
    Shortlisted: 'bg-green-50 text-green-600 border border-green-100',
    Rejected: 'bg-red-50 text-red-600 border border-red-100',
  }[status] || 'bg-gray-50 text-gray-600 border border-gray-100'
}

export default function ApplierDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="John Doe" userRole="Applier" onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <Sidebar currentRole="applier" isMobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="md:ml-64 mt-16 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {interpolate(t.applierDashboard.welcome, { name: 'John' })}
            </h1>
            <p className="text-sm md:text-base text-gray-600">{t.applierDashboard.overview}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <StatsCard icon={BriefcaseIcon} label={t.applierDashboard.applicationsSent} value="24" color="blue" trend={{ positive: true, value: 12 }} />
            <StatsCard icon={CheckCircleIcon} label={t.applierDashboard.shortlisted} value="8" color="green" trend={{ positive: true, value: 8 }} />
            <StatsCard icon={XCircleIcon} label={t.applierDashboard.rejections} value="3" color="red" trend={{ positive: false, value: 2 }} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Recent Applications */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 md:px-6 py-4 md:py-6 border-b border-gray-200">
                  <h2 className="text-base md:text-lg font-bold text-gray-900">{t.applierDashboard.recentApplications}</h2>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">{t.applierDashboard.recentApplicationsDesc}</p>
                </div>

                <div className="divide-y divide-gray-200">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">{app.jobTitle}</h3>
                          <p className="text-xs text-gray-600 mt-1 truncate">{app.company}</p>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 ${getStatusColor(app.status)}`}>
                          {t.applierDashboard[app.status.toLowerCase()] || app.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 md:mt-3">{interpolate(t.applierDashboard.appliedDate, { date: app.appliedDate })}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-4 md:space-y-6">
              {/* Profile Strength */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-50 text-blue-600 p-2 md:p-3 rounded-lg flex-shrink-0">
                    <DocumentIcon className="w-4 md:w-5 h-4 md:h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{t.applierDashboard.profileStrength}</h3>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">{t.applierDashboard.completeness}</span>
                    <span className="text-sm font-bold text-gray-900">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  {t.applierDashboard.improveProfile}
                </button>
              </div>

              {/* Top Skills */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-50 text-green-600 p-2 md:p-3 rounded-lg flex-shrink-0">
                    <TrendingUpIcon className="w-4 md:w-5 h-4 md:h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{t.applierDashboard.topSkills}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">JavaScript</span>
                    <span className="text-xs text-gray-600">Advanced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">React</span>
                    <span className="text-xs text-gray-600">Intermediate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Tailwind CSS</span>
                    <span className="text-xs text-gray-600">Intermediate</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                  {t.applierDashboard.viewCourses}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
