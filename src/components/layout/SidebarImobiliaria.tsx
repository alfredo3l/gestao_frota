'use client';

import { useState } from 'react';
import { LogOut, Settings, Building2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SidebarImobiliariaProps {
  isOpen: boolean;
  onClose: () => void;
  activeImobiliaria: string;
  onImobiliariaClick: (imobiliaria: string) => void;
  onSettingsClick: () => void;
}

// Dados simulados de imobiliárias
const imobiliarias = [
  {
    id: '1',
    nome: 'Imobiliária Premium SP',
    email: 'premium@imobsp.com.br',
    endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    coordenadas: { lat: -23.5505, lng: -46.6333 },
  },
  {
    id: '2',
    nome: 'Imobiliária Central',
    email: 'contato@centralimob.com.br',
    endereco: 'Rua Augusta, 500 - Consolação, São Paulo - SP',
    coordenadas: { lat: -23.5505, lng: -46.6333 },
  },
  {
    id: '3',
    nome: 'SP Imóveis Elite',
    email: 'elite@spimov.com.br',
    endereco: 'Rua Oscar Freire, 123 - Jardins, São Paulo - SP',
    coordenadas: { lat: -23.5505, lng: -46.6333 },
  },
];

export default function SidebarImobiliaria({ 
  isOpen, 
  onClose, 
  activeImobiliaria,
  onImobiliariaClick,
  onSettingsClick
}: SidebarImobiliariaProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <>
      {/* Overlay móvel */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[1400] md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-border transform transition-transform duration-300 z-[1500] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary-light to-primary flex items-center justify-center overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_transparent_50%,_rgba(255,255,255,0.2)_100%)]"></div>
                <span className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-inter)' }}>EV</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Evolução
              </span>
              <span className="block text-sm text-gray-600">Vistoria</span>
            </div>
          </div>
        </div>

        {/* Lista de Imobiliárias */}
        <div className="py-4 flex flex-col h-[calc(100%-4rem)]">
          <div className="px-4 mb-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Imobiliárias
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {imobiliarias.map((imobiliaria) => (
              <button
                key={imobiliaria.id}
                onClick={() => {
                  onImobiliariaClick(imobiliaria.id);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors group ${
                  activeImobiliaria === imobiliaria.id
                    ? 'bg-primary/5 text-primary border-r-2 border-primary'
                    : 'text-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    activeImobiliaria === imobiliaria.id
                      ? 'bg-primary/10'
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <Building2 className={`w-4 h-4 ${
                      activeImobiliaria === imobiliaria.id
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <span className="text-sm font-medium block">{imobiliaria.nome}</span>
                    <span className="text-xs text-gray-500">{imobiliaria.endereco.split(' - ')[0]}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Botões do Rodapé */}
          <div className="mt-auto mx-4 mb-6 pt-4 flex flex-col gap-2 border-t border-border">
            <button
              onClick={onSettingsClick}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <Settings className="w-4 h-4 transition-transform group-hover:rotate-45" />
              <span>Configurações</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export { imobiliarias }; 