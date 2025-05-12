'use client';

import { ReactNode } from 'react';
import LayoutProtegido from '@/components/layout/LayoutProtegido';
import { useSidebar } from '@/hooks/useSidebar';
import { useEffect } from 'react';

export default function SolicitacoesLayout({ children }: { children: ReactNode }) {
  const { setActiveItem } = useSidebar();

  // Definir 'solicitacoes' como item ativo do menu
  useEffect(() => {
    setActiveItem('solicitacoes');
  }, [setActiveItem]);

  return (
    <LayoutProtegido recursoNecessario="solicitacoes">
      {children}
    </LayoutProtegido>
  );
} 