'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

const PROFILES = {
  GESTOR: 'gestor',
  VISTORIADOR: 'vistoriador',
  IMOBILIARIA: 'imobiliaria'
} as const;

type UserProfile = typeof PROFILES[keyof typeof PROFILES];

export default function Rota() {
  useEffect(() => {
    // Aqui você faria a verificação do perfil do usuário
    // Por exemplo, buscando da API ou do localStorage
    const userProfile: UserProfile = PROFILES.GESTOR; // Exemplo: pode vir do seu sistema de autenticação

    switch (userProfile) {
      case PROFILES.GESTOR:
        redirect('/dashboard/gestor');
        break;
      case PROFILES.VISTORIADOR:
        redirect('/dashboard/vistoriador');
        break;
      case PROFILES.IMOBILIARIA:
        redirect('/dashboard/imobiliaria');
        break;
      default:
        redirect('/login');
    }
  }, []);

  // Retorna um loading enquanto faz o redirecionamento
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-primary mb-2">Carregando...</h2>
        <p className="text-foreground/70">Redirecionando para sua área</p>
      </div>
    </main>
  );
} 