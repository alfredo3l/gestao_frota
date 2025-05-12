'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAutorizacao } from '@/hooks/useAutorizacao';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeftCircle,
  ChevronRightCircle,
  Shield,
  ClipboardList,
  Car,
  Fuel,
  Wrench,
  FileBarChart,
  BarChart,
  FileSearch,
  Building
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
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function Sidebar({ isOpen, onClose, activeItem, onMenuItemClick, onCollapseChange }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState(false);
  const { verificarPermissao, carregando, usuarioAtual, isSuperAdmin, isAdmin, getPerfilUsuario } = useAutorizacao();
  const router = useRouter();

  // Efeito para sincronizar o estado collapsed com isOpen
  useEffect(() => {
    if (!isOpen) {
      setCollapsed(true);
    }
  }, [isOpen]);

  // Notificar o componente pai quando o estado collapsed mudar
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(collapsed);
    }
  }, [collapsed, onCollapseChange]);

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const toggleCollapse = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    
    // Notificar o componente pai explicitamente
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState);
    }
  };

  // Função para realizar logout
  const handleLogout = () => {
    // Simular logout - em uma aplicação real, chamaria uma API
    localStorage.removeItem('usuario');
    // Redirecionar para a página inicial
    router.push('/');
  };

  // Verificar se o usuário tem permissão para acessar um recurso
  const temPermissao = (recurso: string): boolean => {
    if (carregando) return false;
    
    return verificarPermissao({
      recurso,
      acao: 'ler',
      redirecionarSeNaoAutorizado: false
    });
  };

  const menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      href: '/dashboard',
      id: 'dashboard'
    },
    {
      title: 'Veículos',
      icon: <Car className="w-5 h-5" />,
      href: '/veiculos',
      id: 'veiculos'
    },
    {
      title: 'Motoristas',
      icon: <Users className="w-5 h-5" />,
      href: '/motoristas',
      id: 'motoristas'
    },
    {
      title: 'Abastecimentos',
      icon: <Fuel className="w-5 h-5" />,
      href: '/abastecimentos',
      id: 'abastecimentos'
    },
    {
      title: 'Manutenções',
      icon: <Wrench className="w-5 h-5" />,
      href: '/manutencoes',
      id: 'manutencoes'
    },
    {
      title: 'Solicitações',
      icon: <FileSearch className="w-5 h-5" />,
      href: '/solicitacoes',
      id: 'solicitacoes'
    },
    {
      title: 'Relatórios',
      icon: <FileBarChart className="w-5 h-5" />,
      href: '/relatorios',
      id: 'relatorios',
      submenu: [
        {
          title: 'Consumo por Veículo',
          icon: <BarChart className="w-5 h-5" />,
          href: '/relatorios/consumo',
          id: 'relatorios-consumo'
        },
        {
          title: 'Custos por Secretaria',
          icon: <Building className="w-5 h-5" />,
          href: '/relatorios/custos',
          id: 'relatorios-custos'
        },
        {
          title: 'Manutenções',
          icon: <Wrench className="w-5 h-5" />,
          href: '/relatorios/manutencoes',
          id: 'relatorios-manutencoes'
        }
      ]
    },
    {
      title: 'Configurações',
      icon: <Settings className="w-5 h-5" />,
      href: '/configuracoes',
      id: 'configuracoes'
    }
  ];

  // Definindo o item de Administração separadamente para usar no rodapé
  const adminMenuItem: MenuItem = {
    title: 'Administração',
    icon: <Shield className="w-5 h-5" />,
    href: '/admin',
    id: 'admin',
    submenu: [
      {
        title: 'Usuários',
        icon: <Users className="w-5 h-5" />,
        href: '/admin',
        id: 'admin-usuarios'
      },
      {
        title: 'Secretarias',
        icon: <Building className="w-5 h-5" />,
        href: '/admin/secretarias',
        id: 'admin-secretarias'
      },
      {
        title: 'Logs de Atividades',
        icon: <ClipboardList className="w-5 h-5" />,
        href: '/admin/logs',
        id: 'admin-logs'
      }
    ]
  };

  // Filtrar itens do menu com base nas permissões do usuário
  const menuItemsFiltrados = menuItems.filter(item => {
    // Sempre mostrar o Dashboard
    if (item.id === 'dashboard') return true;
    
    // Verificar permissão para os demais itens
    return temPermissao(item.id);
  });

  // Verificar se o usuário tem permissão para o item de administração
  const temPermissaoAdmin = temPermissao('admin');

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Logo no topo da sidebar */}
        <div className="relative flex justify-center items-center pt-6 pb-4">
          <div className={`w-full flex justify-center ${collapsed ? 'px-1' : 'px-4'}`}>
            <Image 
              src="/logo_frota.PNG" 
              alt="Logo Gestão de Frota" 
              width={collapsed ? 70 : 200} 
              height={collapsed ? 60 : 80} 
              className="object-contain"
              priority
            />
          </div>
          
          {/* Botão para colapsar/expandir */}
          <button
            onClick={toggleCollapse}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-10"
            title={collapsed ? "Expandir menu" : "Recolher menu"}
          >
            {collapsed ? (
              <ChevronRightCircle className="w-6 h-6 text-blue-600" />
            ) : (
              <ChevronLeftCircle className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto">
          <div className="flex-1 overflow-y-auto px-2">
            {/* Menu de Navegação */}
            <nav className="space-y-1">
              {menuItemsFiltrados.map((item) => (
                <div key={item.id}>
                  {item.submenu ? (
                    // Itens com submenu
                    <div>
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className={`flex items-center w-full px-3 py-2 text-base font-medium rounded-md ${
                          activeItem === item.id || activeItem.startsWith(item.id + '-')
                            ? 'text-blue-700 bg-blue-50'
                            : 'text-gray-700 hover:bg-gray-100'
                        } ${collapsed ? 'justify-center' : 'justify-between'}`}
                        aria-expanded={expandedMenus[item.id] ? 'true' : 'false'}
                        aria-controls={`submenu-${item.id}`}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          {!collapsed && <span>{item.title}</span>}
                        </div>
                        {!collapsed && (
                          expandedMenus[item.id] ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {expandedMenus[item.id] && !collapsed && (
                        <div 
                          className="mt-1 pl-10 space-y-1"
                          id={`submenu-${item.id}`}
                        >
                          {item.submenu.map(subItem => (
                            <Link
                              key={subItem.id}
                              href={subItem.href}
                              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                                activeItem === subItem.id
                                  ? 'text-blue-700 bg-blue-50'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                              onClick={() => onMenuItemClick(subItem.id)}
                            >
                              <span className="mr-3">{subItem.icon}</span>
                              <span>{subItem.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Itens sem submenu
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                        activeItem === item.id
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-gray-700 hover:bg-gray-100'
                      } ${collapsed ? 'justify-center' : ''}`}
                      onClick={() => onMenuItemClick(item.id)}
                    >
                      <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Rodapé do Sidebar */}
          <div className="mt-auto p-3 border-t border-gray-200">
            {temPermissaoAdmin && (
              <Link
                href={adminMenuItem.href}
                className={`flex items-center px-3 py-2 text-base font-medium rounded-md mb-2 ${
                  activeItem === adminMenuItem.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${collapsed ? 'justify-center' : ''}`}
                onClick={() => onMenuItemClick(adminMenuItem.id)}
              >
                <span className={collapsed ? '' : 'mr-3'}>{adminMenuItem.icon}</span>
                {!collapsed && <span>{adminMenuItem.title}</span>}
              </Link>
            )}

            <button
              onClick={handleLogout}
              className={`flex items-center px-3 py-2 text-base font-medium rounded-md w-full text-gray-700 hover:bg-gray-100 ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <span className={collapsed ? '' : 'mr-3'}>
                <LogOut className="w-5 h-5" />
              </span>
              {!collapsed && <span>Sair</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
