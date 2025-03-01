'use client';

import { useState, useEffect } from 'react';
import { Bell, Lock, User, Palette, Save } from 'lucide-react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/layout/Sidebar';

const ClientHeader = dynamic(() => import('@/components/layout/ClientHeader'), {
  ssr: false
});

export default function PaginaConfiguracoes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('configuracoes');
  const [activeTab, setActiveTab] = useState<'perfil' | 'notificacoes' | 'seguranca' | 'aparencia'>('perfil');

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth >= 768);
    
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Informações do Perfil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  defaultValue="João Silva"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  defaultValue="joao.silva@exemplo.com"
                />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  defaultValue="(11) 98765-4321"
                />
              </div>
              <div>
                <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo
                </label>
                <input
                  type="text"
                  id="cargo"
                  className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  defaultValue="Coordenador de Campanha"
                />
              </div>
            </div>
            <div className="pt-4">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Alterações
              </button>
            </div>
          </div>
        );
      case 'notificacoes':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Preferências de Notificações</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="font-medium text-gray-900 mb-3">Notificações por E-mail</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-gray-600">Novos apoiadores cadastrados</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-gray-600">Eventos próximos</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-gray-600">Relatórios semanais</span>
                  </label>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="font-medium text-gray-900 mb-3">Notificações no Sistema</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-gray-600">Novas demandas</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-gray-600">Atualizações de status</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-gray-600">Mensagens de outros usuários</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar Preferências
              </button>
            </div>
          </div>
        );
      case 'seguranca':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Segurança da Conta</h3>
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Alterar Senha</h4>
                <div>
                  <label htmlFor="senha-atual" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    id="senha-atual"
                    className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="nova-senha" className="block text-sm font-medium text-gray-700 mb-1">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    id="nova-senha"
                    className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="confirmar-senha" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    id="confirmar-senha"
                    className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  />
                </div>
                <div className="pt-2">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    Alterar Senha
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <h4 className="font-medium text-gray-900">Autenticação de Dois Fatores</h4>
                <p className="text-sm text-gray-600">
                  Adicione uma camada extra de segurança à sua conta ativando a autenticação de dois fatores.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Status: <span className="text-red-500">Desativado</span></span>
                  <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                    Ativar 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'aparencia':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Aparência do Sistema</h3>
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Tema</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-primary rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-gray-900">Claro</span>
                      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="h-20 bg-gray-100 rounded-md border border-gray-200"></div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-gray-900">Escuro</span>
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    </div>
                    <div className="h-20 bg-gray-800 rounded-md"></div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-gray-900">Sistema</span>
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    </div>
                    <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-800 rounded-md"></div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <h4 className="font-medium text-gray-900">Densidade</h4>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="densidade" className="text-primary focus:ring-primary mr-2" defaultChecked />
                    <span className="text-sm text-gray-700">Confortável</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="densidade" className="text-primary focus:ring-primary mr-2" />
                    <span className="text-sm text-gray-700">Compacto</span>
                  </label>
                </div>
              </div>
              <div className="pt-4">
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Salvar Preferências
                </button>
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
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onMenuItemClick={setActiveItem}
        activeItem={activeItem}
      />
      <ClientHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isMenuOpen={isSidebarOpen} />

      <main className="pl-0 md:pl-20 lg:pl-64 pt-16 transition-all duration-300">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Tabs de navegação */}
            <div className="w-full md:w-64 bg-white rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-medium text-gray-900">Preferências</h2>
              </div>
              <div className="divide-y divide-border">
                <button
                  onClick={() => setActiveTab('perfil')}
                  className={`w-full p-3 flex items-center gap-3 text-left ${
                    activeTab === 'perfil' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  } transition-colors`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Perfil</span>
                </button>
                <button
                  onClick={() => setActiveTab('notificacoes')}
                  className={`w-full p-3 flex items-center gap-3 text-left ${
                    activeTab === 'notificacoes' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  } transition-colors`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Notificações</span>
                </button>
                <button
                  onClick={() => setActiveTab('seguranca')}
                  className={`w-full p-3 flex items-center gap-3 text-left ${
                    activeTab === 'seguranca' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  } transition-colors`}
                >
                  <Lock className="w-5 h-5" />
                  <span className="font-medium">Segurança</span>
                </button>
                <button
                  onClick={() => setActiveTab('aparencia')}
                  className={`w-full p-3 flex items-center gap-3 text-left ${
                    activeTab === 'aparencia' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  } transition-colors`}
                >
                  <Palette className="w-5 h-5" />
                  <span className="font-medium">Aparência</span>
                </button>
              </div>
            </div>
            
            {/* Conteúdo da tab ativa */}
            <div className="flex-1 bg-white rounded-xl border border-border p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 