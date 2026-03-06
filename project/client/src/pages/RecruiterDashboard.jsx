import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatsCard from '../components/StatsCard'
import { BriefcaseIcon, UsersIcon, CheckCircleIcon } from '../components/Icons'
import { useLanguage } from '../context/LanguageContext.jsx'
import { interpolate } from '../App'

const postedJobs = [
  { id: 1, title: 'Senior React Developer', applicants: 24, posted: '2024-02-10', status: 'Active' },
  { id: 2, title: 'Full Stack Engineer', applicants: 18, posted: '2024-02-05', status: 'Active' },
  { id: 3, title: 'UI/UX Designer', applicants: 12, posted: '2024-01-28', status: 'Active' },
  { id: 4, title: 'Backend Developer', applicants: 31, posted: '2024-01-20', status: 'Closed' },
  { id: 5, title: 'Data Scientist', applicants: 15, posted: '2024-01-15', status: 'Active' },
]

const recentApplicants = [
  { id: 1, name: 'Alice Johnson', appliedFor: 'Senior React Developer', appliedDate: '2024-02-18', rating: 4.5 },
  { id: 2, name: 'Bob Smith', appliedFor: 'Full Stack Engineer', appliedDate: '2024-02-17', rating: 4.2 },
  { id: 3, name: 'Carol Davis', appliedFor: 'Senior React Developer', appliedDate: '2024-02-16', rating: 4.8 },
  { id: 4, name: 'David Wilson', appliedFor: 'UI/UX Designer', appliedDate: '2024-02-15', rating: 4.0 },
  { id: 5, name: 'Eva Martinez', appliedFor: 'Data Scientist', appliedDate: '2024-02-14', rating: 4.6 },
]

function getRatingStars(rating) {
  return Array.from({ length: 5 }).map((_, i) => (
    <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
      ★
    </span>
  ))
}

export default function RecruiterDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="Sarah Anderson" userRole="Recruiter" onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <Sidebar currentRole="recruiter" isMobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="md:ml-64 mt-16 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {interpolate(t.recruiterDashboard.welcome, { name: 'Sarah' })}
            </h1>
            <p className="text-sm md:text-base text-gray-600">{t.recruiterDashboard.manage}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <StatsCard icon={BriefcaseIcon} label={t.recruiterDashboard.activeJobs} value="5" color="blue" trend={{ positive: true, value: 20 }} />
            <StatsCard icon={UsersIcon} label={t.recruiterDashboard.totalApplicants} value="100" color="teal" trend={{ positive: true, value: 15 }} />
            <StatsCard icon={CheckCircleIcon} label={t.recruiterDashboard.shortlistedCandidates} value="28" color="green" trend={{ positive: true, value: 5 }} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Posted Jobs */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 md:px-6 py-4 md:py-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-900">{t.recruiterDashboard.postedJobs}</h2>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{t.recruiterDashboard.postedJobsDesc}</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                    {t.recruiterDashboard.postJobBtn}
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  {postedJobs.map((job) => (
                    <div key={job.id} className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">{job.title}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                              <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                                <UsersIcon className="w-4 h-4" /> {job.applicants} {t.recruiterDashboard.applicants}
                              </span>
                              <span className="text-xs text-gray-500">{interpolate(t.recruiterDashboard.postedDate, { date: job.posted })}</span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 sm:flex-shrink-0">
                            <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap ${
                              job.status === 'Active'
                                ? 'bg-green-50 text-green-600 border border-green-100'
                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}>
                              {job.status === 'Active' ? t.recruiterDashboard.active : t.recruiterDashboard.closed}
                            </span>
                            <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
                              {t.recruiterDashboard.view}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">{t.recruiterDashboard.hiringProgress}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-600">{t.recruiterDashboard.thisWeek}</span>
                      <span className="text-sm font-bold text-gray-900">8</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gray-600">{t.recruiterDashboard.thisMonth}</span>
                      <span className="text-sm font-bold text-gray-900">28</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">{t.recruiterDashboard.topPositions}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">React Developer</span>
                    <span className="text-xs font-bold text-gray-900">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">Full Stack</span>
                    <span className="text-xs font-bold text-gray-900">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 font-medium">UI/UX Designer</span>
                    <span className="text-xs font-bold text-gray-900">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Applicants */}
          <div className="mt-6 md:mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 md:px-6 py-4 md:py-6 border-b border-gray-200">
              <h2 className="text-base md:text-lg font-bold text-gray-900">{t.recruiterDashboard.recentApplicants}</h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">{t.recruiterDashboard.recentApplicantsDesc}</p>
            </div>

            <div className="divide-y divide-gray-200">
              {recentApplicants.map((applicant) => (
                <div key={applicant.id} className="px-4 md:px-6 py-3 md:py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                        {applicant.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{applicant.name}</p>
                        <p className="text-xs text-gray-600 truncate">{applicant.appliedFor}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 sm:flex-shrink-0">
                      <span className="text-xs text-gray-600 whitespace-nowrap">{applicant.appliedDate}</span>
                      <div className="flex gap-0.5">
                        {getRatingStars(applicant.rating)}
                      </div>
                      <button className="px-3 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                        {t.recruiterDashboard.review}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
