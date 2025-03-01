'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ChevronRight,
  ChevronLeftCircle,
  ChevronRightCircle
} from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  id: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  id: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onMenuItemClick: (item: string) => void;
}

export default function Sidebar({ isOpen, onClose, activeItem, onMenuItemClick }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState(false);

  // Efeito para sincronizar o estado collapsed com isOpen
  useEffect(() => {
    if (!isOpen) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isOpen]);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const menuItems: MenuItem[] = [
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
        className={`fixed top-0 left-0 h-full bg-white border-r border-border z-30 pt-2 ${
          isOpen ? (collapsed ? 'w-20' : 'w-64') : 'w-0 md:w-20'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="h-full overflow-y-auto">
          <div className="px-3 py-2">
            {/* Logo do Governo de Mato Grosso do Sul */}
            <div className="flex flex-col items-center justify-center mb-4">
              <div className={`w-full flex justify-center ${collapsed ? 'px-1' : 'px-2'}`}>
                <Image 
                  src="/LOGO_CASA_CIVIL.png" 
                  alt="Logo do Governo de Mato Grosso do Sul" 
                  width={collapsed ? 50 : 150} 
                  height={collapsed ? 50 : 60} 
                  className="object-contain"
                  priority
                />
              </div>
              {!collapsed && (
                <div className="mt-1 font-semibold text-gray-900 text-center">
                  <div>Secretaria de Estado</div>
                  <div>da Casa Civil</div>
                </div>
              )}
            </div>

            {/* Botão para colapsar/expandir o sidebar */}
            <button 
              onClick={toggleCollapse}
              className="absolute -right-3 top-20 bg-white border border-border rounded-full p-1 text-gray-500 hover:bg-gray-100 shadow-sm"
              title={collapsed ? "Expandir menu" : "Recolher menu"}
            >
              {collapsed ? 
                <ChevronRightCircle className="w-5 h-5" /> : 
                <ChevronLeftCircle className="w-5 h-5" />
              }
            </button>

            {/* Menu de Navegação */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                          activeItem.startsWith(item.id)
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className={activeItem.startsWith(item.id) ? 'text-white' : 'text-gray-500'}>
                            {item.icon}
                          </span>
                          <span className={`ml-3 ${collapsed && 'hidden'}`}>{item.title}</span>
                        </div>
                        {!collapsed && (
                          expandedMenus[item.id] ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      
                      {expandedMenus[item.id] && !collapsed && item.submenu && (
                        <div className="mt-1 ml-4 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.href}
                              onClick={() => onMenuItemClick(subItem.id)}
                              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                activeItem === subItem.id
                                  ? 'bg-primary text-white'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <span className={activeItem === subItem.id ? 'text-white' : 'text-gray-500'}>
                                {subItem.icon}
                              </span>
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
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        activeItem === item.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className={activeItem === item.id ? 'text-white' : 'text-gray-500'}>
                        {item.icon}
                      </span>
                      <span className={`ml-3 ${collapsed && 'hidden'}`}>{item.title}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Rodapé do Sidebar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <button
              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5 text-gray-500" />
              <span className={`ml-3 ${collapsed && 'hidden'}`}>Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
