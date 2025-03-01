'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/layout/Sidebar';
import { useUsuario } from '@/contexts/UsuarioContext';

const ClientHeader = dynamic(() => import('@/components/layout/ClientHeader'), {
  ssr: false
});

interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
}

export default function PaginaNotificacoes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('notificacoes');
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [carregandoNotificacoes, setCarregandoNotificacoes] = useState(true);
  
  const { usuario } = useUsuario();

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth >= 768);
    
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carregar notificações (simulado)
  useEffect(() => {
    const carregarNotificacoes = async () => {
      setCarregandoNotificacoes(true);
      
      try {
        // Simulação de chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados mockados que viriam do backend
        const notificacoesMock: Notificacao[] = [
          {
            id: 1,
            titulo: 'Novo apoiador registrado',
            mensagem: 'João Silva foi adicionado como apoiador.',
            data: '5 minutos atrás',
            lida: false
          },
          {
            id: 2,
            titulo: 'Evento atualizado',
            mensagem: 'O evento "Reunião com lideranças" foi atualizado.',
            data: '1 hora atrás',
            lida: false
          },
          {
            id: 3,
            titulo: 'Demanda concluída',
            mensagem: 'A demanda #123 foi marcada como concluída.',
            data: '3 horas atrás',
            lida: true
          },
          {
            id: 4,
            titulo: 'Novo evento criado',
            mensagem: 'Um novo evento foi criado: "Visita ao Bairro Norte".',
            data: '1 dia atrás',
            lida: true
          },
          {
            id: 5,
            titulo: 'Atualização do sistema',
            mensagem: 'O sistema foi atualizado para a versão 1.2.0.',
            data: '2 dias atrás',
            lida: true
          }
        ];
        
        setNotificacoes(notificacoesMock);
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
      } finally {
        setCarregandoNotificacoes(false);
      }
    };
    
    carregarNotificacoes();
  }, []);

  const marcarComoLida = (id: number) => {
    setNotificacoes(prev => 
      prev.map(notificacao => 
        notificacao.id === id 
          ? { ...notificacao, lida: true } 
          : notificacao
      )
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(prev => 
      prev.map(notificacao => ({ ...notificacao, lida: true }))
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onMenuItemClick={setActiveItem}
        activeItem={activeItem}
      />
      <ClientHeader 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        isMenuOpen={isSidebarOpen} 
      />

      <main className="pl-0 md:pl-20 lg:pl-64 pt-16 transition-all duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
            <button 
              onClick={marcarTodasComoLidas}
              className="px-4 py-2 text-sm text-primary hover:text-primary-dark transition-colors"
            >
              Marcar todas como lidas
            </button>
          </div>
          
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {carregandoNotificacoes ? (
              <div className="p-8">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-200 mt-2"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : notificacoes.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhuma notificação</h3>
                <p className="text-gray-500">Você não tem notificações no momento.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notificacoes.map((notificacao) => (
                  <div 
                    key={notificacao.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${!notificacao.lida ? 'bg-blue-50/50' : ''}`}
                    onClick={() => marcarComoLida(notificacao.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${!notificacao.lida ? 'bg-primary' : 'bg-gray-300'}`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{notificacao.titulo}</div>
                        <p className="text-sm text-gray-600 mt-0.5">{notificacao.mensagem}</p>
                        <div className="text-xs text-gray-500 mt-1">{notificacao.data}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 