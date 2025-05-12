'use client';

import { ReactNode } from 'react';
import LayoutProtegido from '@/components/layout/LayoutProtegido';
import { useSidebar } from '@/hooks/useSidebar';
import { useEffect } from 'react';

export default function VeiculosLayout({ children }: { children: ReactNode }) {
  const { setActiveItem } = useSidebar();

  // Definir 'veiculos' como item ativo do menu
  useEffect(() => {
    setActiveItem('veiculos');
  }, [setActiveItem]);

  return (
    <LayoutProtegido recursoNecessario="veiculos">
      {children}
    </LayoutProtegido>
  );
} 