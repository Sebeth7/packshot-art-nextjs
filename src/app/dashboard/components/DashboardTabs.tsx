'use client'

interface Tab {
  id: string
  label: string
  icon: string
}

interface DashboardTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function DashboardTabs({ tabs, activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              transition-colors duration-200
              ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <span className="flex items-center space-x-2">
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label.replace(/^[^\s]+ /, '')}</span>
              <span className="sm:hidden">{tab.icon}</span>
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}