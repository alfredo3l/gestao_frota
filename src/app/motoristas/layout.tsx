'use client';

import { ReactNode } from 'react';
import LayoutProtegido from '@/components/layout/LayoutProtegido';
import { useSidebar } from '@/hooks/useSidebar';
import { useEffect } from 'react';

export default function MotoristasLayout({ children }: { children: ReactNode }) {
  const { setActiveItem } = useSidebar();

  // Definir 'motoristas' como item ativo do menu
  useEffect(() => {
    setActiveItem('motoristas');
  }, [setActiveItem]);

  return (
    <LayoutProtegido recursoNecessario="motoristas">
      {children}
    </LayoutProtegido>
  );
} 