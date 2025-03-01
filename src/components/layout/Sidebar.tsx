'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  UserCheck, 
  Map, 
  Bot, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onMenuItemClick: (item: string) => void;
}

export default function Sidebar({ isOpen, onClose, activeItem, onMenuItemClick }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      href: '/dashboard',
      id: 'dashboard'
    },
    {
      title: 'Apoiadores',
      icon: <Users className="w-5 h-5" />,
      href: '/apoiadores',
      id: 'apoiadores'
    },
    {
      title: 'Demandas',
      icon: <FileText className="w-5 h-5" />,
      href: '/demandas',
      id: 'demandas'
    },
    {
      title: 'Eventos',
      icon: <Calendar className="w-5 h-5" />,
      href: '/eventos',
      id: 'eventos'
    },
    {
      title: 'Apoios Políticos',
      icon: <UserCheck className="w-5 h-5" />,
      href: '/apoios',
      id: 'apoios'
    },
    {
      title: 'Regiões',
      icon: <Map className="w-5 h-5" />,
      href: '/regioes',
      id: 'regioes'
    },
    {
      title: 'Assistente IA',
      icon: <Bot className="w-5 h-5" />,
      href: '/ia',
      id: 'ia'
    },
    {
      title: 'Configurações',
      icon: <Settings className="w-5 h-5" />,
      href: '/configuracoes',
      id: 'configuracoes'
    }
  ];

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white border-r border-border z-30 transition-all duration-300 pt-16 ${
          isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="px-3 py-4">
            {/* Logo e Nome do Sistema */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                EP
              </div>
              <div className={`ml-3 font-semibold text-gray-900 ${!isOpen && 'hidden'}`}>
                Evolução Política
              </div>
            </div>

            {/* Menu de Navegação */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeItem.startsWith(item.id)
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-gray-500">{item.icon}</span>
                          <span className={`ml-3 ${!isOpen && 'hidden'}`}>{item.title}</span>
                        </div>
                        {isOpen && (
                          expandedMenus[item.id] ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      
                      {expandedMenus[item.id] && isOpen && (
                        <div className="mt-1 ml-4 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.href}
                              onClick={() => onMenuItemClick(subItem.id)}
                              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeItem === subItem.id
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <span className="text-gray-500">{subItem.icon}</span>
                              <span className="ml-3">{subItem.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => onMenuItemClick(item.id)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeItem === item.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-gray-500">{item.icon}</span>
                      <span className={`ml-3 ${!isOpen && 'hidden'}`}>{item.title}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Rodapé do Sidebar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <button
              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-5 h-5 text-gray-500" />
              <span className={`ml-3 ${!isOpen && 'hidden'}`}>Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
