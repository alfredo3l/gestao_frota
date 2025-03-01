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
  Activity,
  UserCheck,
  BarChart3,
  Bell,
  Settings,
  User,
  Award
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
      title: 'Coordenadores',
      description: 'Gerenciamento de coordenadores políticos',
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      color: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      onClick: () => router.push('/coordenadores')
    },
    {
      title: 'Lideranças',
      description: 'Gerenciamento de lideranças políticas',
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      color: 'from-emerald-50 to-emerald-50/50',
      borderColor: 'border-emerald-200/30',
      onClick: () => router.push('/liderancas')
    },
    {
      title: 'Apoiadores',
      description: 'Cadastro e gestão de apoiadores',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      color: 'from-blue-50 to-blue-50/50',
      borderColor: 'border-blue-200/30',
      onClick: () => router.push('/apoiadores')
    },
    {
      title: 'Demandas',
      description: 'Acompanhamento de solicitações',
      icon: <FileText className="w-6 h-6 text-purple-500" />,
      color: 'from-purple-50 to-purple-50/50',
      borderColor: 'border-purple-200/30',
      onClick: () => router.push('/demandas')
    },
    {
      title: 'Agenda Política',
      description: 'Gerenciamento de compromissos políticos',
      icon: <Calendar className="w-6 h-6 text-green-500" />,
      color: 'from-green-50 to-green-50/50',
      borderColor: 'border-green-200/30',
      onClick: () => router.push('/agenda-politica')
    },
    {
      title: 'Resultados Eleições',
      description: 'Acompanhamento de resultados eleitorais',
      icon: <BarChart3 className="w-6 h-6 text-amber-500" />,
      color: 'from-amber-50 to-amber-50/50',
      borderColor: 'border-amber-200/30',
      onClick: () => router.push('/resultados-eleicoes')
    },
    {
      title: 'Apoios Políticos',
      description: 'Rede de apoio entre candidatos',
      icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
      color: 'from-orange-50 to-orange-50/50',
      borderColor: 'border-orange-200/30',
      onClick: () => router.push('/apoios')
    },
    {
      title: 'Regiões',
      description: 'Mapeamento de áreas e territórios',
      icon: <Map className="w-6 h-6 text-red-500" />,
      color: 'from-red-50 to-red-50/50',
      borderColor: 'border-red-200/30',
      onClick: () => router.push('/regioes')
    },
    {
      title: 'Candidatos',
      description: 'Gestão de candidatos',
      icon: <Activity className="w-6 h-6 text-teal-500" />,
      color: 'from-teal-50 to-teal-50/50',
      borderColor: 'border-teal-200/30',
      onClick: () => router.push('/candidatos')
    },
    {
      title: 'Campanha',
      description: 'Gestão de campanha eleitoral',
      icon: <TrendingUp className="w-6 h-6 text-indigo-500" />,
      color: 'from-indigo-50 to-indigo-50/50',
      borderColor: 'border-indigo-200/30',
      onClick: () => router.push('/campanha')
    },
    {
      title: 'Notificações',
      description: 'Central de notificações do sistema',
      icon: <Bell className="w-6 h-6 text-pink-500" />,
      color: 'from-pink-50 to-pink-50/50',
      borderColor: 'border-pink-200/30',
      onClick: () => router.push('/notificacoes')
    },
    {
      title: 'Assistente IA',
      description: 'Consulte o assistente de campanha',
      icon: <MessageSquare className="w-6 h-6 text-violet-500" />,
      color: 'from-violet-50 to-violet-50/50',
      borderColor: 'border-violet-200/30',
      onClick: () => router.push('/ia')
    },
    {
      title: 'Perfil',
      description: 'Gerencie seu perfil de usuário',
      icon: <User className="w-6 h-6 text-cyan-500" />,
      color: 'from-cyan-50 to-cyan-50/50',
      borderColor: 'border-cyan-200/30',
      onClick: () => router.push('/perfil')
    },
    {
      title: 'Configurações',
      description: 'Ajustes e preferências do sistema',
      icon: <Settings className="w-6 h-6 text-gray-500" />,
      color: 'from-gray-50 to-gray-50/50',
      borderColor: 'border-gray-200/30',
      onClick: () => router.push('/configuracoes')
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Painel de Controle</h1>
            <p className="text-gray-600 mt-1">Acesse os módulos do sistema de gestão de campanha</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br ${card.color} rounded-xl border ${card.borderColor} shadow-sm p-5 cursor-pointer hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group`}
                onClick={card.onClick}
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg p-3 bg-white/80 shadow-sm group-hover:shadow group-hover:bg-white transition-all">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-gray-800">{card.title}</h3>
                    <p className="text-xs text-gray-600 group-hover:text-gray-700">{card.description}</p>
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