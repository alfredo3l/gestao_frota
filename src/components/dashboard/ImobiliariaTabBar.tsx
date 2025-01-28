'use client';

interface ImobiliariaTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ImobiliariaTabBar({ activeTab, onTabChange }: ImobiliariaTabBarProps) {
  const tabs = [
    { id: 'vistorias', label: 'Vistorias' },
    { id: 'informacoes', label: 'Informações' },
    { id: 'endereco', label: 'Endereço' },
  ];

  return (
    <div className="border-b border-border">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
              ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
} 