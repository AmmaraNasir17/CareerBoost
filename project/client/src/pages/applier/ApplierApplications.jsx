import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const applicationsData = [
  {
    id: 1,
    jobTitle: 'Senior React Developer',
    company: 'Tech Corp',
    appliedDate: '2024-02-15',
    status: 'Applied',
  },
  {
    id: 2,
    jobTitle: 'Full Stack Engineer',
    company: 'StartUp Inc',
    appliedDate: '2024-02-10',
    status: 'Under Review',
  },
  {
    id: 3,
    jobTitle: 'UI/UX Designer',
    company: 'Design Studios',
    appliedDate: '2024-02-08',
    status: 'Rejected',
  },
  {
    id: 4,
    jobTitle: 'Frontend Developer',
    company: 'Web Solutions',
    appliedDate: '2024-02-05',
    status: 'Shortlisted',
  },
  {
    id: 5,
    jobTitle: 'JavaScript Developer',
    company: 'Cloud Systems',
    appliedDate: '2024-02-01',
    status: 'Shortlisted',
  },
  {
    id: 6,
    jobTitle: 'DevOps Engineer',
    company: 'Enterprise Solutions',
    appliedDate: '2024-01-28',
    status: 'Applied',
  },
]

function getStatusColor(status) {
  return {
    'Applied': 'bg-blue-50 text-blue-600 border border-blue-100',
    'Under Review': 'bg-yellow-50 text-yellow-600 border border-yellow-100',
    'Shortlisted': 'bg-green-50 text-green-600 border border-green-100',
    'Rejected': 'bg-red-50 text-red-600 border border-red-100',
  }[status] || 'bg-gray-50 text-gray-600 border border-gray-100'
}

export default function ApplierApplications() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="John Doe" userRole="Applier" onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <Sidebar currentRole="applier" isMobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="md:ml-64 mt-16 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Applications</h1>
            <p className="text-sm md:text-base text-gray-600">Track your job application progress</p>
          </div>

          {/* Applications Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 md:py-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Your Applications</h2>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Job Title</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Applied Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applicationsData.map((application, index) => (
                    <tr
                      key={application.id}
                      className={`${
                        index !== applicationsData.length - 1 ? 'border-b border-gray-200' : ''
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold text-gray-900">{application.jobTitle}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-600">{application.company}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-gray-600 text-sm">{application.appliedDate}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg border ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {applicationsData.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500 text-lg">No applications yet</p>
              </div>
            )}

            {/* Table Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">Showing {applicationsData.length} applications</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
