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
    // Debug: verificar os valores disponíveis
    console.log('Perfis disponíveis:', PROFILES);
    
    // Aqui você faria a verificação do perfil do usuário
    // Por exemplo, buscando da API ou do localStorage
    const userProfile: UserProfile = PROFILES.GESTOR;
    
    // Debug: verificar o valor atual
    console.log('Perfil do usuário:', userProfile);
    console.log('Tipo do perfil:', typeof userProfile);

    switch (userProfile) {
      case PROFILES.GESTOR:
        console.log('Redirecionando para gestor...');
        redirect('/dashboard/gestor');
        break;
      case PROFILES.VISTORIADOR:
        console.log('Redirecionando para vistoriador...');
        redirect('/dashboard/vistoriador');
        break;
      case PROFILES.IMOBILIARIA:
        console.log('Redirecionando para imobiliaria...');
        redirect('/dashboard/imobiliaria');
        break;
      default:
        console.log('Redirecionando para login...');
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