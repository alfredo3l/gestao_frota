'use client';

import { ReactNode } from 'react';
import LayoutProtegido from '@/components/layout/LayoutProtegido';
import { useSidebar } from '@/hooks/useSidebar';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { setActiveItem } = useSidebar();

  // Definir 'dashboard' como item ativo do menu
  useEffect(() => {
    setActiveItem('dashboard');
  }, [setActiveItem]);

  return (
    <LayoutProtegido>
      {children}
    </LayoutProtegido>
  );
} 