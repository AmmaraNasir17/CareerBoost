import { useNavigate } from 'react-router-dom'

export default function Header({ userRole = 'Applier', userName = 'John Doe' }) {
  const navigate = useNavigate()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CareerBoost</h1>
          <p className="text-sm text-gray-500">{userRole}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {userName.charAt(0)}
          </div>
          <button
            onClick={() => navigate('/')}
            className="ml-4 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Switch Role
          </button>
        </div>
      </div>
    </header>
  )
}
