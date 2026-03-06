export default function StatsCard({ icon: Icon, label, value, color = 'blue', trend = null }) {
  const colorMap = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
    red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100' },
    teal: { bg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-100' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
  }

  const colors = colorMap[color] || colorMap.blue

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200`}>
      <div className="flex items-start justify-between mb-4">
        {Icon && (
          <div className={`${colors.bg} ${colors.icon} p-2.5 md:p-3 rounded-lg flex-shrink-0`}>
            <Icon className="w-5 md:w-6 h-5 md:h-6" />
          </div>
        )}
        {trend && (
          <div className={`text-xs font-semibold ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}%
          </div>
        )}
      </div>
      
      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
