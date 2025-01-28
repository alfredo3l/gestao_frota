'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SidebarImobiliaria, { imobiliarias } from '../../../components/layout/SidebarImobiliaria';
import ImobiliariaTabBar from '../../../components/dashboard/ImobiliariaTabBar';
import InspectionsList from '../../../components/dashboard/InspectionsList';
import { Building2, Mail, MapPin, Phone, Bell, Key, Users } from 'lucide-react';

const ClientHeader = dynamic(() => import('@/components/layout/ClientHeader'), {
  ssr: false
});

// Importação dinâmica do componente de mapa para evitar erros de SSR
const Map = dynamic(() => import('../../../components/Map'), { ssr: false });

export default function DashImobiliaria() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeImobiliaria, setActiveImobiliaria] = useState('1');
  const [activeTab, setActiveTab] = useState('vistorias');
  const [showSettings, setShowSettings] = useState(false);

  // Encontra a imobiliária ativa
  const imobiliariaAtiva = imobiliarias.find(imob => imob.id === activeImobiliaria);

  const renderContent = () => {
    if (!imobiliariaAtiva) return null;

    if (showSettings) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Configurações</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notificações */}
            <div className="bg-white rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Notificações</h3>
                  <p className="text-sm text-gray-600">Gerencie suas preferências de notificação</p>
                </div>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray-600">Novas vistorias</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray-600">Vistorias concluídas</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-gray-600">Relatórios disponíveis</span>
                </label>
              </div>
            </div>

            {/* Segurança */}
            <div className="bg-white rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Key className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Segurança</h3>
                  <p className="text-sm text-gray-600">Altere sua senha e configure a segurança</p>
                </div>
              </div>
              <button className="text-sm text-primary hover:text-primary-light transition-colors">
                Alterar senha
              </button>
            </div>

            {/* Usuários */}
            <div className="bg-white rounded-xl border border-border p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Usuários</h3>
                  <p className="text-sm text-gray-600">Gerencie os usuários da imobiliária</p>
                </div>
              </div>
              <button className="text-sm text-primary hover:text-primary-light transition-colors">
                Gerenciar usuários
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'vistorias':
        return <InspectionsList status="agendadas" />;
      
      case 'informacoes':
        return (
          <div className="bg-white rounded-xl border border-border p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Informações da Imobiliária
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Nome</p>
                  <p className="text-sm text-gray-600">{imobiliariaAtiva.nome}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">E-mail</p>
                  <p className="text-sm text-gray-600">{imobiliariaAtiva.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Telefone</p>
                  <p className="text-sm text-gray-600">(11) 99999-9999</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'endereco':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Endereço</p>
                  <p className="text-sm text-gray-600">{imobiliariaAtiva.endereco}</p>
                </div>
              </div>

              {/* Mapa */}
              <div className="h-[400px] rounded-lg overflow-hidden">
                <Map 
                  center={imobiliariaAtiva.coordenadas}
                  zoom={15}
                  markers={[{
                    position: imobiliariaAtiva.coordenadas,
                    title: imobiliariaAtiva.nome
                  }]}
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <SidebarImobiliaria
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeImobiliaria={activeImobiliaria}
        onImobiliariaClick={(id) => {
          setActiveImobiliaria(id);
          setShowSettings(false);
        }}
        onSettingsClick={() => setShowSettings(true)}
      />
      <ClientHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isMenuOpen={isSidebarOpen} />

      <main className="pl-0 md:pl-20 lg:pl-64 pt-16 transition-all duration-300">
        <div className="p-4 md:p-6 space-y-6">
          {/* Cabeçalho da Imobiliária */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {imobiliariaAtiva?.nome}
            </h1>
          </div>

          {/* TabBar e Conteúdo */}
          <div className="space-y-6">
            {!showSettings && (
              <ImobiliariaTabBar
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            )}
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
} 