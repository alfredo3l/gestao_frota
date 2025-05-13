import { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSidebar } from '@/hooks/useSidebar';
import Sidebar from '@/components/layout/Sidebar';
import Carregando from '@/components/ui/Carregando';

const ClientHeader = dynamic(() => import('@/components/layout/ClientHeader'), {
  ssr: false
});

interface LayoutProtegidoProps {
  children: ReactNode;
  titulo?: string;
  recursoNecessario?: string;
}

export default function LayoutProtegido({
  children,
  titulo = 'Gestão de Frotas'
}: LayoutProtegidoProps) {
  const { isOpen, activeItem, setIsOpen, setActiveItem } = useSidebar();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Ajustar sidebar em telas pequenas
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    // Inicializa o estado com base no tamanho da tela
    handleResize();

    // Adiciona o evento de resize
    window.addEventListener('resize', handleResize);
    
    // Limpa o evento ao desmontar
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  // Handler para quando o estado de collapsed da sidebar mudar
  const handleSidebarCollapseChange = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMenuItemClick={setActiveItem}
        activeItem={activeItem}
        onCollapseChange={handleSidebarCollapseChange}
      />
      <ClientHeader 
        onMenuClick={() => setIsOpen(!isOpen)} 
        isMenuOpen={isOpen} 
        isSidebarCollapsed={sidebarCollapsed}
      />

      <main 
        className={`pt-16 transition-all duration-300 ${
          isOpen 
            ? (sidebarCollapsed ? 'ml-20' : 'ml-64') 
            : 'ml-0'
        }`}
      >
        <div className="p-4 sm:p-6">
          {titulo && (
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{titulo}</h1>
          )}
          {children}
        </div>
      </main>
    </div>
  );
} 