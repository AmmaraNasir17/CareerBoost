import { useState } from 'react'

export default function MobileMenu({ isOpen, onClose, menuItems }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 w-64 h-screen bg-white border-r border-gray-100 z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                item.active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50">
          <button className="w-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}
