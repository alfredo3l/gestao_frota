'use client';

import { ReactNode } from 'react';
import LayoutProtegido from '@/components/layout/LayoutProtegido';
import { useSidebar } from '@/hooks/useSidebar';
import { useEffect } from 'react';

export default function ManutencoesLayout({ children }: { children: ReactNode }) {
  const { setActiveItem } = useSidebar();

  // Definir 'manutencoes' como item ativo do menu
  useEffect(() => {
    setActiveItem('manutencoes');
  }, [setActiveItem]);

  return (
    <LayoutProtegido recursoNecessario="manutencoes">
      {children}
    </LayoutProtegido>
  );
} 