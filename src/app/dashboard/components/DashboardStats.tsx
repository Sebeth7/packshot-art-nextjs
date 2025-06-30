'use client'

interface DashboardStatsProps {
  stats: {
    credits: number
    activeOrders: number
    activeReservations: number
    availableDAs: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const widgets = [
    {
      icon: '💳',
      value: stats.credits.toLocaleString(),
      label: 'Crédits Disponibles',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: '📦',
      value: stats.activeOrders,
      label: 'Commandes Actives',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: '🎨',
      value: stats.availableDAs.toLocaleString(),
      label: 'DA Disponibles',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: '🔒',
      value: stats.activeReservations,
      label: 'Réservations Actives',
      color: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {widgets.map((widget, index) => (
        <div
          key={index}
          className={`
            bg-gradient-to-br ${widget.color} 
            text-white rounded-xl p-6 
            transform hover:scale-105 transition-all duration-300
            shadow-lg hover:shadow-xl
            animate-in slide-in-from-bottom-4
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-1">
                {widget.value}
              </div>
              <div className="text-white/90 font-medium">
                {widget.label}
              </div>
            </div>
            <div className="text-4xl opacity-80">
              {widget.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}