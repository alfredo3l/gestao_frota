'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Map, 
  TrendingUp,
  Activity
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/layout/Sidebar';

const ClientHeader = dynamic(() => import('@/components/layout/ClientHeader'), {
  ssr: false
});

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cards = [
    {
      title: 'Apoiadores',
      description: 'Gerenciamento de apoiadores e lideranças',
      icon: <Users className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-50',
      onClick: () => router.push('/apoiadores')
    },
    {
      title: 'Demandas',
      description: 'Acompanhamento de solicitações e demandas',
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      color: 'bg-purple-50',
      onClick: () => router.push('/demandas')
    },
    {
      title: 'Eventos',
      description: 'Agenda de eventos e compromissos',
      icon: <Calendar className="w-8 h-8 text-green-500" />,
      color: 'bg-green-50',
      onClick: () => router.push('/eventos')
    },
    {
      title: 'Apoios Políticos',
      description: 'Rede de apoio entre candidatos',
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      color: 'bg-orange-50',
      onClick: () => router.push('/apoios')
    },
    {
      title: 'Regiões',
      description: 'Mapeamento de regiões e coordenadores',
      icon: <Map className="w-8 h-8 text-red-500" />,
      color: 'bg-red-50',
      onClick: () => router.push('/regioes')
    },
    {
      title: 'Assistente IA',
      description: 'Consulte o assistente de campanha',
      icon: <MessageSquare className="w-8 h-8 text-indigo-500" />,
      color: 'bg-indigo-50',
      onClick: () => router.push('/ia')
    },
    {
      title: 'Candidatos',
      description: 'Gerenciamento de candidatos',
      icon: <Activity className="w-8 h-8 text-teal-500" />,
      color: 'bg-teal-50',
      onClick: () => router.push('/candidatos')
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onMenuItemClick={setActiveItem}
        activeItem={activeItem.toLowerCase()}
      />
      <ClientHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isMenuOpen={isSidebarOpen} />

      <main className={`pl-0 ${isSidebarOpen ? 'md:pl-64' : 'md:pl-20'} pt-16 transition-all duration-300`}>
        <div className="p-4 md:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Painel de Controle</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className={`${card.color} rounded-xl border border-border shadow-sm p-6 cursor-pointer hover:shadow-md transition-all`}
                onClick={card.onClick}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                  <div className="rounded-full p-2 bg-white shadow-sm">
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 