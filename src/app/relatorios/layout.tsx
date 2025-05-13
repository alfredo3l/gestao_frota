'use client';

import { ReactNode } from 'react';
import LayoutProtegido from '@/components/layout/LayoutProtegido';
import { useSidebar } from '@/hooks/useSidebar';
import { useEffect } from 'react';

export default function RelatoriosLayout({ children }: { children: ReactNode }) {
  const { setActiveItem } = useSidebar();

  // Definir 'relatorios' como item ativo do menu
  useEffect(() => {
    setActiveItem('relatorios');
  }, [setActiveItem]);

  return (
    <LayoutProtegido>
      {children}
    </LayoutProtegido>
  );
} 