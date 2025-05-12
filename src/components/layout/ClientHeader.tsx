'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, User, ChevronDown, Settings, LogOut, Bell, Car } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUsuario } from '@/contexts/UsuarioContext';
import NotificacoesDropdown from '@/components/ui/NotificacoesDropdown';

interface ClientHeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
  isSidebarCollapsed?: boolean;
}

export default function ClientHeader({ 
  onMenuClick, 
  isMenuOpen,
  isSidebarCollapsed = false
}: ClientHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  const { usuario } = useUsuario();
  
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

  const handleLogout = () => {
    // Fechar o menu do usuário
    setShowUserMenu(false);
    
    // Simulação de logout - em uma aplicação real, você chamaria uma API de logout
    localStorage.removeItem('usuario');
    
    // Redirecionar para a página inicial
    router.push('/');
  };

  return (
    <header 
      className={`fixed top-0 z-20 h-14 bg-white border-b border-border transition-all duration-300 ${
        isMenuOpen 
          ? (isSidebarCollapsed ? 'left-20' : 'left-64') 
          : 'left-0'
      } right-0`}
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Menu Toggle e Título */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors md:hidden"
            aria-label={isMenuOpen ? "Recolher menu" : "Expandir menu"}
            title={isMenuOpen ? "Recolher menu" : "Expandir menu"}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="block md:hidden">
            <h1 className="text-lg font-semibold text-gray-900">Sistema de Gestão de Frotas</h1>
          </div>
        </div>

        {/* Ações do Usuário */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Notificações */}
          <NotificacoesDropdown />

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
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  {userInitials}
                </div>
              )}
              <span className="hidden md:block text-sm font-medium">{usuario?.nome || 'Usuário'}</span>
              <span className="hidden md:block text-xs text-gray-500">{usuario?.role === 'admin' ? 'Administrador' : usuario?.role === 'gestor_frota' ? 'Gestor de Frota' : usuario?.role === 'motorista' ? 'Motorista' : 'Usuário'}</span>
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
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                        {userInitials}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{usuario?.nome || 'Usuário'}</div>
                      <div className="text-sm text-gray-600">{usuario?.email || 'usuario@exemplo.com'}</div>
                      <div className="text-xs text-blue-600">{usuario?.role === 'admin' ? 'Administrador' : usuario?.role === 'gestor_frota' ? 'Gestor de Frota' : usuario?.role === 'motorista' ? 'Motorista' : 'Usuário'}</div>
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
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span>Configurações</span>
                  </Link>
                </div>
                <div className="py-1 border-t border-gray-100">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
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