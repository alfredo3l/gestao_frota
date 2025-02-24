'use client';

import { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  ClipboardList,
  Settings,
  ChevronRight,
  LogOut,
  Crown,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MenuItem {
  name: string;
  icon: React.ElementType;
  hasSubmenu?: boolean;
  submenu?: MenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuItemClick: (itemName: string) => void;
  activeItem: string;
}

export default function Sidebar({ isOpen, onClose, onMenuItemClick, activeItem }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const submenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openSubmenu) {
        const submenuRef = submenuRefs.current[openSubmenu];
        if (submenuRef && !submenuRef.contains(event.target as Node)) {
          const menuButton = submenuRef.previousElementSibling;
          if (menuButton && !menuButton.contains(event.target as Node)) {
            setOpenSubmenu(null);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openSubmenu]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsCollapsed(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Eleições', icon: ClipboardList },
    { name: 'Imóveis', icon: Building2 },
    { name: 'Imobiliárias', icon: Building2 },
    { name: 'Vistoriadores', icon: Users },
    { name: 'Configurações', icon: Settings },
  ];

  const handleMenuClick = (item: MenuItem) => {
    onMenuItemClick(item.name);
    if (isMobile) {
      onClose();
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const setSubmenuRef = (name: string, el: HTMLDivElement | null) => {
    submenuRefs.current[name] = el;
  };

  return (
    <>
      {/* Overlay móvel */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[1400] md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-border transform ${
          mounted ? 'transition-transform duration-300' : ''
        } z-[1500] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`${isCollapsed ? 'p-4' : 'p-6'}`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary-light to-primary flex items-center justify-center overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_transparent_50%,_rgba(255,255,255,0.2)_100%)]"></div>
                  <span className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-inter)' }}>EV</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              {!isCollapsed && (
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                    Evolução
                  </span>
                  <span className="block text-sm text-gray-600">Vistoria</span>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all
                      ${activeItem === item.name.toLowerCase() && !item.hasSubmenu
                        ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 hover:shadow-sm"
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? item.name : ''}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="font-medium flex-1 text-left">{item.name}</span>
                        {item.hasSubmenu && (
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openSubmenu === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                        {!item.hasSubmenu && activeItem === item.name.toLowerCase() && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </button>

                  {/* Submenu */}
                  {item.hasSubmenu && (openSubmenu === item.name || (isCollapsed && activeItem === item.name.toLowerCase())) && (
                    <div
                      ref={(el) => setSubmenuRef(item.name, el)}
                      className={`mt-1 space-y-1 ${isCollapsed ? 'absolute left-full top-0 ml-2 w-48 bg-white rounded-lg shadow-lg border border-border p-2' : 'pl-4'}`}
                    >
                      {item.submenu?.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => {
                            onMenuItemClick(subItem.name);
                            setOpenSubmenu(null);
                            if (isMobile) {
                              onClose();
                            }
                          }}
                          className={`
                            w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm
                            ${activeItem === subItem.name.toLowerCase()
                              ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-md"
                              : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                            }
                          `}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span className="font-medium">{subItem.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Upgrade Plan */}
          <div className="p-4">
            <div className="relative p-5 rounded-xl bg-gradient-to-br from-primary via-primary-light to-primary overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_transparent_30%,_rgba(255,255,255,0.15)_100%)]"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-yellow-300" />
                  <span className="font-semibold text-white">Plano Free</span>
                </div>
                <div className="mb-4">
                  <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-white rounded-full"></div>
                  </div>
                  <p className="text-sm text-white/90 mt-2">
                    14 dias restantes no seu trial
                  </p>
                </div>
                <button className="w-full py-2.5 px-4 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group">
                  <span>Atualizar Plano</span>
                  <Sparkles className="w-4 h-4 text-yellow-500 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-border mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-gray-600 hover:text-primary transition-all px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
