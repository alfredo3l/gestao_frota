'use client';

import { useState } from 'react';
import { Home, Settings, ChevronRight, User, Calendar, FileText, Clipboard, CheckSquare, Lock, Cog } from 'lucide-react';
import Link from 'next/link';

export interface Vistoria {
  id: string;
  numero: string;
  endereco: string;
  imovel: string;
  dataAgendada: string;
  horario: string;
  status: string; // Poderia ser um tipo mais específico: 'agendada' | 'em_andamento' | 'concluida', etc.
  tipo: string;
  coordenadas?: { lat: number; lng: number }; // Adicionado campo opcional de coordenadas
}

export const vistorias: Vistoria[] = [
  {
    id: '1',
    numero: 'VST-2023/001',
    endereco: 'Rua das Flores, 123',
    imovel: 'Apartamento 301',
    dataAgendada: '2023-10-15',
    horario: '09:00',
    status: 'agendada',
    tipo: 'Entrega de Chaves'
  },
  {
    id: '2',
    numero: 'VST-2023/002',
    endereco: 'Av. Central, 456',
    imovel: 'Casa 78',
    dataAgendada: '2023-10-16',
    horario: '14:30',
    status: 'agendada',
    tipo: 'Vistoria Inicial'
  },
  {
    id: '3',
    numero: 'VST-2023/003',
    endereco: 'Travessa das Acácias, 789',
    imovel: 'Sala Comercial 42',
    dataAgendada: '2023-10-18',
    horario: '10:45',
    status: 'em_andamento',
    tipo: 'Vistoria Final'
  }
];

interface SidebarVistoriadorProps {
  isOpen: boolean;
  onClose: () => void;
  activeVistoriaId?: string;
  onVistoriaClick: (id: string) => void;
  onSettingsClick: () => void;
  showSettings?: boolean;
}

export default function SidebarVistoriador({
  isOpen,
  onClose,
  activeVistoriaId,
  onVistoriaClick,
  onSettingsClick,
  showSettings = false
}: SidebarVistoriadorProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-white border-r border-border
          transition-all duration-300 shadow-lg md:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-20' : 'w-64 md:w-64'}
          pt-16
        `}
      >
        {/* Botão de colapso (apenas visível em desktop) */}
        <button
          className="absolute right-0 translate-x-1/2 top-24 hidden md:flex items-center justify-center w-6 h-6 rounded-full border border-border bg-white shadow-sm"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expandir' : 'Colapsar'}
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
        </button>
        
        <div className="overflow-y-auto h-full pb-20">
          {!showSettings ? (
            /* Lista de vistorias agendadas */
            <div className="px-3 py-4">
              <div className={`mb-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                <h3 className={`font-medium text-sm text-gray-500 ${isCollapsed ? 'hidden' : 'block'}`}>Vistorias Agendadas</h3>
                <span className="text-xs bg-primary-light text-white px-2 py-0.5 rounded-full">
                  {vistorias.length}
                </span>
              </div>
              
              <ul className="space-y-1">
                {vistorias.map((vistoria) => {
                  const isActive = vistoria.id === activeVistoriaId;
                  
                  return (
                    <li key={vistoria.id}>
                      <button
                        onClick={() => onVistoriaClick(vistoria.id)}
                        className={`
                          w-full text-left px-3 py-2.5 rounded-lg transition-colors
                          flex items-start
                          ${isActive 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'hover:bg-gray-100 text-gray-700'
                          }
                          ${isCollapsed ? 'justify-center' : ''}
                        `}
                      >
                        {isCollapsed ? (
                          <div className="flex flex-col items-center">
                            <Clipboard className="h-5 w-5" />
                            <span className="text-[10px] mt-1">#{vistoria.id}</span>
                          </div>
                        ) : (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium truncate">{vistoria.numero}</span>
                              <span className="ml-2 text-xs">
                                {vistoria.status === 'agendada' && (
                                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full">Agendada</span>
                                )}
                                {vistoria.status === 'em_andamento' && (
                                  <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full">Em andamento</span>
                                )}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{vistoria.endereco}</p>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                              {vistoria.dataAgendada} às {vistoria.horario}
                            </div>
                          </div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            /* Configurações */
            <div className="px-3 py-4">
              <div className={`mb-4 ${isCollapsed ? 'text-center' : ''}`}>
                <h3 className={`font-medium text-gray-500 ${isCollapsed ? 'text-xs' : 'text-sm'}`}>
                  {isCollapsed ? 'Config' : 'Configurações'}
                </h3>
              </div>
              
              <ul className="space-y-1">
                {[
                  { icon: <User className="h-5 w-5" />, label: 'Meu Perfil', id: 'profile' },
                  { icon: <Lock className="h-5 w-5" />, label: 'Segurança', id: 'security' },
                  { icon: <Cog className="h-5 w-5" />, label: 'Preferências', id: 'preferences' },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      className={`
                        w-full px-3 py-2.5 rounded-lg transition-colors
                        hover:bg-gray-100 text-gray-700
                        ${isCollapsed ? 'flex flex-col items-center' : 'flex items-center'}
                      `}
                    >
                      {item.icon}
                      <span className={`${isCollapsed ? 'text-xs mt-1' : 'ml-3 text-sm'}`}>
                        {isCollapsed ? '' : item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Botão de alternar entre Vistorias e Configurações */}
          <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 p-3 bg-white">
            <button
              onClick={showSettings ? onVistoriaClick('1') : onSettingsClick}
              className={`
                w-full py-2 px-3 rounded-lg transition-colors
                ${showSettings ? 'hover:bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}
                ${isCollapsed ? 'flex flex-col items-center' : 'flex items-center'}
              `}
            >
              {showSettings ? (
                <>
                  <Home className="h-5 w-5" />
                  <span className={`${isCollapsed ? 'text-xs mt-1' : 'ml-3 text-sm'}`}>
                    {isCollapsed ? '' : 'Voltar às Vistorias'}
                  </span>
                </>
              ) : (
                <>
                  <Settings className="h-5 w-5" />
                  <span className={`${isCollapsed ? 'text-xs mt-1' : 'ml-3 text-sm'}`}>
                    {isCollapsed ? '' : 'Configurações'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
} 