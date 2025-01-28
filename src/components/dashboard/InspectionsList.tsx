'use client';

import { Calendar, MapPin, Clock, User, ArrowRight } from 'lucide-react';
import type { InspectionStatus } from './InspectionsTabBar';

interface InspectionsListProps {
  status: InspectionStatus;
}

// Dados simulados de vistorias
const mockInspections = [
  {
    id: 1,
    realEstate: 'Imob Premium',
    address: 'Rua das Flores, 123 - Centro',
    date: '25/03/2024',
    time: '14:30',
    inspector: 'João Silva',
    progress: 0,
  },
  {
    id: 2,
    realEstate: 'Imob Plus',
    address: 'Av. Principal, 456 - Jardins',
    date: '26/03/2024',
    time: '09:00',
    inspector: 'Maria Santos',
    progress: 65,
  },
  {
    id: 3,
    realEstate: 'Imob Master',
    address: 'Rua do Comércio, 789 - Centro',
    date: '26/03/2024',
    time: '15:45',
    inspector: 'Pedro Costa',
    progress: 30,
  }
];

// Função auxiliar para obter o título baseado no status
const getStatusTitle = (status: InspectionStatus) => {
  const titles = {
    agendadas: 'Vistorias Agendadas',
    atribuidas: 'Vistorias Atribuídas',
    andamento: 'Vistorias em Andamento',
    finalizadas: 'Vistorias Finalizadas',
    liberadas: 'Vistorias Liberadas'
  };
  return titles[status];
};

// Função auxiliar para obter a cor do status
const getStatusColor = (status: InspectionStatus) => {
  const colors = {
    agendadas: 'bg-yellow-50 text-yellow-700',
    atribuidas: 'bg-blue-50 text-blue-700',
    andamento: 'bg-purple-50 text-purple-700',
    finalizadas: 'bg-green-50 text-green-700',
    liberadas: 'bg-primary/10 text-primary'
  };
  return colors[status];
};

export default function InspectionsList({ status }: InspectionsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockInspections.map((inspection) => (
        <div
          key={inspection.id}
          className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow space-y-4"
        >
          {/* Cabeçalho do Card */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{inspection.realEstate}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{inspection.address}</span>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status === 'andamento' ? `${inspection.progress}%` : status}
            </span>
          </div>

          {/* Informações da Vistoria */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{inspection.date}</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>{inspection.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{inspection.inspector || 'Aguardando atribuição'}</span>
            </div>
          </div>

          {/* Barra de Progresso (apenas para vistorias em andamento) */}
          {status === 'andamento' && (
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${inspection.progress}%` }}
              />
            </div>
          )}

          {/* Botão de Ação */}
          <button className="w-full mt-2 flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors py-2">
            <span>Ver Detalhes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
} 