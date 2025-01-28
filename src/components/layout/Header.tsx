'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Menu, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
  fullWidth?: boolean;
}

export default function Header({ onMenuClick, isMenuOpen, fullWidth = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeProfile, setActiveProfile] = useState('gestor');

  const pathname = usePathname();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Detecta o perfil ativo baseado na URL
  useEffect(() => {
    if (pathname?.includes('/dashboard/imobiliaria')) {
      setActiveProfile('imobiliaria');
    } else if (pathname?.includes('/dashboard/vistoriador')) {
      setActiveProfile('vistoriador');
    } else if (pathname?.includes('/dashboard/gestor')) {
      setActiveProfile('gestor');
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Nova vistoria agendada',
      description: 'Imob Premium - Rua das Flores, 123',
      time: '5 minutos atrás',
      isNew: true,
    },
    {
      id: 2,
      title: 'Vistoria concluída',
      description: 'Imob Plus - Av. Principal, 456',
      time: '1 hora atrás',
      isNew: true,
    },
    {
      id: 3,
      title: 'Relatório disponível',
      description: 'Vistoria #123 - Imob Master',
      time: '2 horas atrás',
      isNew: false,
    },
  ];

  const handleLogout = () => {
    router.push('/login');
  };

  const handleProfileChange = (profile: string) => {
    switch (profile) {
      case 'imobiliaria':
        router.push('/dashboard/imobiliaria');
        break;
      case 'vistoriador':
        router.push('/dashboard/vistoriador');
        break;
      case 'gestor':
        router.push('/dashboard/gestor');
        break;
      default:
        break;
    }
  };

  return (
    <header className={`h-16 bg-white border-b border-border fixed top-0 z-[1000] transition-all duration-300 ${
      isMobile || fullWidth ? 'left-0' : 'left-64'
    } right-0`}>
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mostra o menu apenas quando não for fullWidth e estiver em mobile */}
          {isMobile && !fullWidth && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          )}
          {/* Logo visível apenas quando for fullWidth (sem sidebar) */}
          {fullWidth && (
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Evolução
            </span>
          )}
        </div>

        {/* Ações do Header */}
        <div className="flex items-center gap-4">
          {/* Notificações */}
          <div ref={notificationsRef} className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Menu de Notificações */}
            {isNotificationsOpen && (
              <div className="absolute top-full right-0 mt-1 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-border py-2 z-[1001]">
                <div className="px-4 py-2 border-b border-border">
                  <h3 className="font-semibold text-gray-900">Notificações</h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer relative"
                    >
                      {notification.isNew && (
                        <span className="absolute right-4 top-3 w-2 h-2 bg-primary rounded-full"></span>
                      )}
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-0.5">{notification.description}</p>
                      <span className="text-xs text-gray-500 mt-1">{notification.time}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-border">
                  <button className="text-sm text-primary hover:text-primary-light transition-colors w-full text-center">
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menu do Perfil */}
          <div ref={mobileMenuRef} className="relative">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-8 h-8 rounded-full overflow-hidden border border-gray-200"
            >
              <img
                src="https://consultoriodehipnose.com.br/wp-content/uploads/2021/05/as-9-necessidades-basicas-do-ser-humano.jpg"
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </button>

            {isMobileMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-border py-1 z-[1001]">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-gray-900">Paulo Morales</p>
                  <p className="text-xs text-gray-600">paulomorales@gmail.com</p>
                </div>
                <button 
                  onClick={() => handleProfileChange('gestor')}
                  className={`w-full px-4 py-2 text-left ${
                    activeProfile === 'gestor' 
                      ? 'bg-primary text-white hover:bg-primary-light' 
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  Perfil Gestor
                </button>
                <button 
                  onClick={() => handleProfileChange('imobiliaria')}
                  className={`w-full px-4 py-2 text-left ${
                    activeProfile === 'imobiliaria' 
                      ? 'bg-primary text-white hover:bg-primary-light' 
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  Perfil Imobiliária
                </button>
                <button 
                  onClick={() => handleProfileChange('vistoriador')}
                  className={`w-full px-4 py-2 text-left ${
                    activeProfile === 'vistoriador' 
                      ? 'bg-primary text-white hover:bg-primary-light' 
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  Perfil Vistoriador
                </button>
                <div className="border-t border-border mt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-600"
                  >
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 