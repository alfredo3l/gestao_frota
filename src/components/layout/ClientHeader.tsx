'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, Bell, User, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUsuario } from '@/contexts/UsuarioContext';

interface ClientHeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

export default function ClientHeader({ 
  onMenuClick, 
  isMenuOpen
}: ClientHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  const { usuario } = useUsuario();
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Obter as iniciais do nome do usuário
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const userInitials = usuario?.nome ? getInitials(usuario.nome) : 'US';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current && 
        !notificationsRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-notifications-toggle]')
      ) {
        setShowNotifications(false);
      }

      if (
        userMenuRef.current && 
        !userMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-user-menu-toggle]')
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Novo apoiador registrado',
      message: 'João Silva foi adicionado como apoiador.',
      time: '5 minutos atrás',
      read: false
    },
    {
      id: 2,
      title: 'Evento atualizado',
      message: 'O evento "Reunião com lideranças" foi atualizado.',
      time: '1 hora atrás',
      read: false
    },
    {
      id: 3,
      title: 'Demanda concluída',
      message: 'A demanda #123 foi marcada como concluída.',
      time: '3 horas atrás',
      read: true
    }
  ];

  const handleLogout = () => {
    // Fechar o menu do usuário
    setShowUserMenu(false);
    
    // Simulação de logout - em uma aplicação real, você chamaria uma API de logout
    localStorage.removeItem('usuario');
    
    // Redirecionar para a página inicial
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-border z-20 pl-0 md:pl-20">
      <div className="flex items-center justify-between h-full px-4">
        {/* Menu Toggle e Título */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="md:hidden">
            <h1 className="text-lg font-semibold text-gray-900">Secretaria de Estado da Casa Civil</h1>
          </div>
        </div>

        {/* Ações do Usuário */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Notificações */}
          <div className="relative">
            <button
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
              data-notifications-toggle
            >
              <Bell className="w-5 h-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Dropdown de Notificações */}
            {showNotifications && (
              <div 
                ref={notificationsRef}
                className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10"
              >
                <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Notificações</h3>
                  <button className="text-xs text-primary hover:text-primary-dark transition-colors">
                    Marcar todas como lidas
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        <div>
                          <div className="font-medium text-gray-900">{notification.title}</div>
                          <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                          <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <Link
                    href="/notificacoes"
                    className="block text-center text-sm text-primary hover:text-primary-dark transition-colors"
                    onClick={() => setShowNotifications(false)}
                  >
                    Ver todas as notificações
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Menu do Usuário */}
          <div className="relative">
            <button
              className="flex items-center gap-2 p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
              data-user-menu-toggle
            >
              {usuario?.fotoPerfil ? (
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={usuario.fotoPerfil}
                    alt={usuario.nome}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                  {userInitials}
                </div>
              )}
              <span className="hidden md:block text-sm font-medium">{usuario?.nome || 'Usuário'}</span>
              <ChevronDown className="hidden md:block w-4 h-4 text-gray-400" />
            </button>

            {/* Dropdown do Usuário */}
            {showUserMenu && (
              <div 
                ref={userMenuRef}
                className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10"
              >
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    {usuario?.fotoPerfil ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={usuario.fotoPerfil}
                          alt={usuario.nome}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                        {userInitials}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{usuario?.nome || 'Usuário'}</div>
                      <div className="text-sm text-gray-600">{usuario?.email || 'usuario@exemplo.com'}</div>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    href="/perfil"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span>Meu Perfil</span>
                  </Link>
                  <Link
                    href="/configuracoes"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>Configurações</span>
                  </Link>
                </div>
                <div className="py-1 border-t border-gray-100">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                    onClick={handleLogout}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Sair</span>
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