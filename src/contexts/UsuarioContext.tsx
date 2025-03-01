'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface PerfilUsuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  fotoPerfil?: string;
}

interface AtualizarPerfilParams {
  nome?: string;
  email?: string;
  telefone?: string;
  cargo?: string;
  fotoPerfil?: string;
}

interface UsuarioContextType {
  usuario: PerfilUsuario | null;
  carregando: boolean;
  erro: string | null;
  atualizarPerfil: (dados: AtualizarPerfilParams) => Promise<boolean>;
  removerFotoPerfil: () => Promise<boolean>;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export function UsuarioProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Carregar dados do usuário
  useEffect(() => {
    const carregarUsuario = async () => {
      setCarregando(true);
      setErro(null);
      
      try {
        // Simulação de chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados mockados que viriam do backend
        const dadosUsuario: PerfilUsuario = {
          id: '1',
          nome: 'João Silva',
          email: 'joao.silva@exemplo.com',
          telefone: '(11) 98765-4321',
          cargo: 'Coordenador de Campanha',
          fotoPerfil: '/images/avatar-default.svg'
        };
        
        // Salvar no localStorage para persistência
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
        
        setUsuario(dadosUsuario);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        setErro('Não foi possível carregar os dados do usuário');
      } finally {
        setCarregando(false);
      }
    };
    
    // Verificar se já temos dados no localStorage
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
      setCarregando(false);
    } else {
      carregarUsuario();
    }
  }, []);

  // Atualizar perfil do usuário
  const atualizarPerfil = async (dados: AtualizarPerfilParams): Promise<boolean> => {
    if (!usuario) return false;
    
    setCarregando(true);
    setErro(null);
    
    try {
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar dados localmente
      const usuarioAtualizado = {
        ...usuario,
        ...dados
      };
      
      // Salvar no localStorage para persistência
      localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
      
      setUsuario(usuarioAtualizado);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setErro('Não foi possível atualizar o perfil');
      return false;
    } finally {
      setCarregando(false);
    }
  };

  // Remover foto do perfil
  const removerFotoPerfil = async (): Promise<boolean> => {
    if (!usuario) return false;
    
    setCarregando(true);
    setErro(null);
    
    try {
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar dados localmente
      const usuarioAtualizado = {
        ...usuario,
        fotoPerfil: undefined
      };
      
      // Salvar no localStorage para persistência
      localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
      
      setUsuario(usuarioAtualizado);
      return true;
    } catch (error) {
      console.error('Erro ao remover foto do perfil:', error);
      setErro('Não foi possível remover a foto do perfil');
      return false;
    } finally {
      setCarregando(false);
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        carregando,
        erro,
        atualizarPerfil,
        removerFotoPerfil
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContext);
  if (context === undefined) {
    throw new Error('useUsuario deve ser usado dentro de um UsuarioProvider');
  }
  return context;
} 