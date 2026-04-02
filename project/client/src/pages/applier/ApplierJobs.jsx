import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const jobsData = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    salary: '$120 - $150',
    type: 'Full-time',
    experience: '5+ years',
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    company: 'StartUp Inc',
    location: 'Remote',
    salary: '$100 - $130',
    type: 'Full-time',
    experience: '3+ years',
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Design Studios',
    location: 'New York, NY',
    salary: '$90 - $120',
    type: 'Full-time',
    experience: '2+ years',
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: 'Web Solutions',
    location: 'Austin, TX',
    salary: '$85 - $110',
    type: 'Contract',
    experience: '3+ years',
  },
  {
    id: 5,
    title: 'JavaScript Developer',
    company: 'Cloud Systems',
    location: 'Remote',
    salary: '$80 - $110',
    type: 'Full-time',
    experience: '2+ years',
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'Enterprise Solutions',
    location: 'Seattle, WA',
    salary: '$130 - $160',
    type: 'Full-time',
    experience: '5+ years',
  },
]

export default function ApplierJobs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    jobType: '',
  })

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !filters.location || job.location.includes(filters.location)
    const matchesExperience = !filters.experience || job.experience === filters.experience
    const matchesType = !filters.jobType || job.type === filters.jobType

    return matchesSearch && matchesLocation && matchesExperience && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="John Doe" userRole="Applier" onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <Sidebar currentRole="applier" isMobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="md:ml-64 mt-16 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Jobs</h1>
            <p className="text-sm md:text-base text-gray-600">Browse and apply to available jobs</p>
          </div>

          {/* Search and Filters Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Locations</option>
                  <option value="Remote">Remote</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="New York">New York</option>
                  <option value="Austin">Austin</option>
                  <option value="Seattle">Seattle</option>
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select
                  value={filters.experience}
                  onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Levels</option>
                  <option value="2+ years">2+ years</option>
                  <option value="3+ years">3+ years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              {/* Job Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  value={filters.jobType}
                  onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⏱️</span>
                    <span>{job.experience}</span>
                  </div>
                </div>

                <div>
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100">
                    {job.type}
                  </span>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
