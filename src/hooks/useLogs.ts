import { useState, useEffect } from 'react';
import { useAutorizacao } from './useAutorizacao';

export interface LogAtividade {
  id: string;
  usuarioId: string;
  usuarioNome: string;
  acao: 'criar' | 'editar' | 'excluir' | 'login' | 'logout' | 'alterar_permissao' | 'alterar_status' | 'alterar_perfil';
  recurso: string;
  detalhes?: string;
  timestamp: Date;
  ip?: string;
}

export function useLogs() {
  const [logs, setLogs] = useState<LogAtividade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { usuarioAtual } = useAutorizacao();

  // Carregar logs
  useEffect(() => {
    const carregarLogs = async () => {
      setCarregando(true);
      setErro(null);
      
      try {
        // Simulação de chamada à API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Dados mockados que viriam do backend
        const dadosLogs: LogAtividade[] = [
          {
            id: '1',
            usuarioId: '1',
            usuarioNome: 'João Silva',
            acao: 'login',
            recurso: 'sistema',
            detalhes: 'Login realizado com sucesso',
            timestamp: new Date(Date.now() - 3600000 * 2), // 2 horas atrás
            ip: '192.168.1.1'
          },
          {
            id: '2',
            usuarioId: '1',
            usuarioNome: 'João Silva',
            acao: 'editar',
            recurso: 'usuarios',
            detalhes: 'Alteração de permissões do usuário Maria Oliveira',
            timestamp: new Date(Date.now() - 3600000), // 1 hora atrás
            ip: '192.168.1.1'
          },
          {
            id: '3',
            usuarioId: '1',
            usuarioNome: 'João Silva',
            acao: 'criar',
            recurso: 'usuarios',
            detalhes: 'Criação de novo usuário: Carlos Santos',
            timestamp: new Date(Date.now() - 1800000), // 30 minutos atrás
            ip: '192.168.1.1'
          },
          {
            id: '4',
            usuarioId: '2',
            usuarioNome: 'Maria Oliveira',
            acao: 'login',
            recurso: 'sistema',
            detalhes: 'Login realizado com sucesso',
            timestamp: new Date(Date.now() - 3600000 * 5), // 5 horas atrás
            ip: '192.168.1.2'
          },
          {
            id: '5',
            usuarioId: '2',
            usuarioNome: 'Maria Oliveira',
            acao: 'editar',
            recurso: 'apoiadores',
            detalhes: 'Atualização de dados do apoiador José Pereira',
            timestamp: new Date(Date.now() - 3600000 * 4), // 4 horas atrás
            ip: '192.168.1.2'
          },
          {
            id: '6',
            usuarioId: '3',
            usuarioNome: 'Carlos Santos',
            acao: 'login',
            recurso: 'sistema',
            detalhes: 'Login realizado com sucesso',
            timestamp: new Date(Date.now() - 86400000), // 1 dia atrás
            ip: '192.168.1.3'
          },
          {
            id: '7',
            usuarioId: '1',
            usuarioNome: 'João Silva',
            acao: 'alterar_permissao',
            recurso: 'permissoes',
            detalhes: 'Alteração de permissões do usuário Carlos Santos: adicionado acesso a Apoiadores',
            timestamp: new Date(Date.now() - 3600000 * 3), // 3 horas atrás
            ip: '192.168.1.1'
          },
          {
            id: '8',
            usuarioId: '1',
            usuarioNome: 'João Silva',
            acao: 'alterar_status',
            recurso: 'usuarios',
            detalhes: 'Alteração de status do usuário Pedro Alves: ativo -> inativo',
            timestamp: new Date(Date.now() - 86400000 * 2), // 2 dias atrás
            ip: '192.168.1.1'
          },
          {
            id: '9',
            usuarioId: '4',
            usuarioNome: 'Ana Souza',
            acao: 'criar',
            recurso: 'apoiadores',
            detalhes: 'Cadastro de novo apoiador: Roberto Ferreira',
            timestamp: new Date(Date.now() - 86400000 * 3), // 3 dias atrás
            ip: '192.168.1.4'
          },
          {
            id: '10',
            usuarioId: '1',
            usuarioNome: 'João Silva',
            acao: 'alterar_perfil',
            recurso: 'usuarios',
            detalhes: 'Alteração de perfil do usuário Ana Souza: coordenador -> admin',
            timestamp: new Date(Date.now() - 86400000 * 4), // 4 dias atrás
            ip: '192.168.1.1'
          },
          {
            id: '11',
            usuarioId: '5',
            usuarioNome: 'Pedro Alves',
            acao: 'excluir',
            recurso: 'apoiadores',
            detalhes: 'Exclusão do apoiador Marcos Silva',
            timestamp: new Date(Date.now() - 86400000 * 5), // 5 dias atrás
            ip: '192.168.1.5'
          },
          {
            id: '12',
            usuarioId: '2',
            usuarioNome: 'Maria Oliveira',
            acao: 'logout',
            recurso: 'sistema',
            detalhes: 'Logout realizado com sucesso',
            timestamp: new Date(Date.now() - 3600000 * 3.5), // 3.5 horas atrás
            ip: '192.168.1.2'
          }
        ];
        
        setLogs(dadosLogs);
      } catch (error) {
        console.error('Erro ao carregar logs:', error);
        setErro('Não foi possível carregar os logs de atividades');
      } finally {
        setCarregando(false);
      }
    };
    
    carregarLogs();
  }, []);

  // Registrar nova atividade
  const registrarAtividade = async (
    acao: 'criar' | 'editar' | 'excluir' | 'login' | 'logout' | 'alterar_permissao' | 'alterar_status' | 'alterar_perfil',
    recurso: string,
    detalhes?: string
  ): Promise<boolean> => {
    if (!usuarioAtual) {
      console.error('Não é possível registrar atividade: usuário não autenticado');
      return false;
    }
    
    try {
      // Criar novo log
      const novoLog: LogAtividade = {
        id: `${logs.length + 1}`,
        usuarioId: usuarioAtual.id,
        usuarioNome: usuarioAtual.nome,
        acao,
        recurso,
        detalhes,
        timestamp: new Date(),
        ip: '127.0.0.1' // Em um ambiente real, isso viria do servidor
      };
      
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Adicionar ao estado local
      setLogs(prevLogs => [novoLog, ...prevLogs]);
      
      return true;
    } catch (error) {
      console.error('Erro ao registrar atividade:', error);
      return false;
    }
  };

  // Filtrar logs por período
  const filtrarLogsPorPeriodo = (dias: number) => {
    if (dias === 0) return logs; // Retornar todos os logs
    
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);
    
    return logs.filter(log => log.timestamp >= dataLimite);
  };

  // Filtrar logs por usuário
  const filtrarLogsPorUsuario = (usuarioId: string) => {
    return logs.filter(log => log.usuarioId === usuarioId);
  };

  // Filtrar logs por ação
  const filtrarLogsPorAcao = (acao: LogAtividade['acao']) => {
    return logs.filter(log => log.acao === acao);
  };

  // Filtrar logs por recurso
  const filtrarLogsPorRecurso = (recurso: string) => {
    return logs.filter(log => log.recurso === recurso);
  };

  return {
    logs,
    carregando,
    erro,
    registrarAtividade,
    filtrarLogsPorPeriodo,
    filtrarLogsPorUsuario,
    filtrarLogsPorAcao,
    filtrarLogsPorRecurso
  };
} 