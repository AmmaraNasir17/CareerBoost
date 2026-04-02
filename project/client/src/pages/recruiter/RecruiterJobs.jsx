import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const jobsData = [
  {
    id: 1,
    title: 'Senior React Developer',
    applicants: 45,
    status: 'Active',
    postedDate: '2024-02-01',
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    applicants: 32,
    status: 'Active',
    postedDate: '2024-01-28',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    applicants: 28,
    status: 'Closed',
    postedDate: '2024-01-20',
  },
  {
    id: 4,
    title: 'Frontend Developer',
    applicants: 56,
    status: 'Active',
    postedDate: '2024-01-15',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    applicants: 22,
    status: 'Active',
    postedDate: '2024-01-10',
  },
]

function getStatusColor(status) {
  return status === 'Active'
    ? 'bg-green-50 text-green-600 border border-green-100'
    : 'bg-gray-50 text-gray-600 border border-gray-100'
}

export default function RecruiterJobs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="Sarah Anderson" userRole="Recruiter" onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <Sidebar currentRole="recruiter" isMobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="md:ml-64 mt-16 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Posted Jobs</h1>
              <p className="text-sm md:text-base text-gray-600">Manage your job listings</p>
            </div>
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto">
              + Post Job
            </button>
          </div>

          {/* Jobs Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 md:py-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Your Job Listings</h2>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Job Title</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Applicants</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Posted Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobsData.map((job, index) => (
                    <tr
                      key={job.id}
                      className={`${
                        index !== jobsData.length - 1 ? 'border-b border-gray-200' : ''
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold text-gray-900">{job.title}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-600 font-medium">{job.applicants}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg border ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-600 text-sm">{job.postedDate}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            View
                          </button>
                          <button className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            Edit
                          </button>
                          <button className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {jobsData.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500 text-lg">No job listings yet</p>
              </div>
            )}

            {/* Table Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">Showing {jobsData.length} job listings</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
