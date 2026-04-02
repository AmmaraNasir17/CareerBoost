import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

export default function Messages() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="John Doe" userRole="Applier" onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <Sidebar currentRole="applier" isMobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="md:ml-64 mt-16 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-sm md:text-base text-gray-600">View your conversations with recruiters</p>
          </div>

          {/* Placeholder Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="text-center py-12">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-lg text-gray-600 mb-2">No messages yet</p>
              <p className="text-gray-500">
                This is the Messages page. Conversations will appear here.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
