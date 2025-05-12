import { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAutorizacao } from '@/hooks/useAutorizacao';
import { useSidebar } from '@/hooks/useSidebar';
import Sidebar from '@/components/layout/Sidebar';
import AcessoNegado from '@/components/ui/AcessoNegado';
import Carregando from '@/components/ui/Carregando';

const ClientHeader = dynamic(() => import('@/components/layout/ClientHeader'), {
  ssr: false
});

interface LayoutProtegidoProps {
  children: ReactNode;
  recursoNecessario?: string;
  acaoNecessaria?: 'ler' | 'criar' | 'editar' | 'excluir';
  mensagemAcessoNegado?: string;
}

export default function LayoutProtegido({
  children,
  recursoNecessario,
  acaoNecessaria = 'ler',
  mensagemAcessoNegado = 'Você não tem permissão para acessar esta página.'
}: LayoutProtegidoProps) {
  const { isOpen, activeItem, setIsOpen, setActiveItem } = useSidebar();
  const { verificarPermissao, carregando } = useAutorizacao();
  const [acessoNegado, setAcessoNegado] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Verificar permissão se um recurso for especificado
  useEffect(() => {
    if (!carregando && recursoNecessario) {
      const temPermissao = verificarPermissao({
        recurso: recursoNecessario,
        acao: acaoNecessaria,
        redirecionarSeNaoAutorizado: false
      });
      
      if (!temPermissao) {
        setAcessoNegado(true);
      }
    }
  }, [carregando, verificarPermissao, recursoNecessario, acaoNecessaria]);

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

  // Renderizar tela de carregamento
  if (carregando) {
    return <Carregando tipo="skeleton" mensagem="Verificando permissões..." />;
  }

  // Renderizar mensagem de acesso negado
  if (acessoNegado) {
    return (
      <AcessoNegado 
        mensagem={mensagemAcessoNegado}
        caminhoRedirecionamento="/dashboard"
        tempoRedirecionamento={5000}
      />
    );
  }

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
          {children}
        </div>
      </main>
    </div>
  );
} 