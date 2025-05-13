// Hook simplificado para substituir o useAutorizacao
// Para sistema de gestão de frotas

'use client';

import { useState, useEffect } from 'react';

export interface PermissaoProps {
  recurso: string;
  acao: 'ler' | 'escrever' | 'excluir' | 'criar';
  redirecionarSeNaoAutorizado?: boolean;
}

export function usePermissoes() {
  const [carregando, setCarregando] = useState(true);
  
  useEffect(() => {
    // Simulação de carregamento de permissões
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Função para verificar permissão
  const verificarPermissao = ({ recurso }: PermissaoProps): boolean => {
    // No sistema de frotas, todos têm acesso a todos os recursos
    // Esta é uma simplificação, em um sistema real seria implementada a lógica adequada
    return true;
  };

  // Valores do hook
  return {
    verificarPermissao,
    carregando,
    usuarioAtual: { nome: 'Administrador', email: 'admin@exemplo.com' },
    isSuperAdmin: true,
    isAdmin: true,
    getPerfilUsuario: () => 'admin'
  };
} 