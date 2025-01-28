'use client';

import { Calendar, UserCheck, Loader2, CheckCircle2, Lock } from 'lucide-react';

export type InspectionStatus = 'agendadas' | 'atribuidas' | 'andamento' | 'finalizadas' | 'liberadas';

interface InspectionsTabBarProps {
  activeTab: InspectionStatus;
  onTabChange: (tab: InspectionStatus) => void;
}

const tabs = [
  { id: 'agendadas', label: 'Agendadas', icon: Calendar },
  { id: 'atribuidas', label: 'Atribuídas', icon: UserCheck },
  { id: 'andamento', label: 'Em Andamento', icon: Loader2 },
  { id: 'finalizadas', label: 'Finalizadas', icon: CheckCircle2 },
  { id: 'liberadas', label: 'Liberadas', icon: Lock },
] as const;

export default function InspectionsTabBar({ activeTab, onTabChange }: InspectionsTabBarProps) {
  return (
    <div className="bg-white border border-border rounded-xl p-1.5 flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as InspectionStatus)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${isActive 
                ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
} 