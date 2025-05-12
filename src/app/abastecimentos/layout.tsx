'use client';

import { ReactNode } from 'react';
import LayoutProtegido from '@/components/layout/LayoutProtegido';
import { useSidebar } from '@/hooks/useSidebar';
import { useEffect } from 'react';

export default function AbastecimentosLayout({ children }: { children: ReactNode }) {
  const { setActiveItem } = useSidebar();

  // Definir 'abastecimentos' como item ativo do menu
  useEffect(() => {
    setActiveItem('abastecimentos');
  }, [setActiveItem]);

  return (
    <LayoutProtegido recursoNecessario="abastecimentos">
      {children}
    </LayoutProtegido>
  );
} 