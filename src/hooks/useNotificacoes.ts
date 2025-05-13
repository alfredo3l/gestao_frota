// Hook simplificado para notificações
// Para sistema de gestão de frotas

'use client';

import { useState, useEffect } from 'react';

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'sucesso' | 'aviso' | 'erro';
  timestamp: Date;
  lida: boolean;
  link?: string;
  acao?: string;
}

export function useNotificacoes() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Carregar notificações (simulação)
  useEffect(() => {
    const carregarNotificacoes = async () => {
      try {
        // Simulando carregamento da API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Exemplo de notificações para demonstração
        const notificacoesExemplo: Notificacao[] = [
          {
            id: '1',
            titulo: 'Manutenção agendada',
            mensagem: 'Veículo ABC-1234 tem manutenção agendada para amanhã',
            tipo: 'info',
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
            lida: false,
            link: '/manutencoes',
            acao: 'Ver manutenção'
          },
          {
            id: '2',
            titulo: 'CNH próxima do vencimento',
            mensagem: 'A CNH do motorista João Silva vencerá em 15 dias',
            tipo: 'aviso',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 horas atrás
            lida: false,
            link: '/motoristas',
            acao: 'Ver motorista'
          },
          {
            id: '3',
            titulo: 'Abastecimento registrado',
            mensagem: 'Abastecimento do veículo DEF-5678 foi registrado com sucesso',
            tipo: 'sucesso',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
            lida: true,
            link: '/abastecimentos',
            acao: 'Ver detalhes'
          }
        ];

        setNotificacoes(notificacoesExemplo);
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
        setErro('Não foi possível carregar as notificações');
        setCarregando(false);
      }
    };

    carregarNotificacoes();
  }, []);

  // Marcar uma notificação como lida
  const marcarComoLida = async (id: string) => {
    try {
      // Simulando chamada à API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotificacoes(prev => 
        prev.map(notificacao => 
          notificacao.id === id 
            ? { ...notificacao, lida: true } 
            : notificacao
        )
      );
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      setErro('Não foi possível marcar a notificação como lida');
      return Promise.reject(error);
    }
  };

  // Marcar todas as notificações como lidas
  const marcarTodasComoLidas = async () => {
    try {
      // Simulando chamada à API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNotificacoes(prev => 
        prev.map(notificacao => ({ ...notificacao, lida: true }))
      );
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erro ao marcar todas notificações como lidas:', error);
      setErro('Não foi possível marcar todas as notificações como lidas');
      return Promise.reject(error);
    }
  };

  // Excluir uma notificação
  const excluirNotificacao = async (id: string) => {
    try {
      // Simulando chamada à API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotificacoes(prev => 
        prev.filter(notificacao => notificacao.id !== id)
      );
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erro ao excluir notificação:', error);
      setErro('Não foi possível excluir a notificação');
      return Promise.reject(error);
    }
  };

  // Obter notificações não lidas
  const getNotificacoesNaoLidas = () => {
    return notificacoes.filter(notificacao => !notificacao.lida);
  };

  return {
    notificacoes,
    carregando,
    erro,
    marcarComoLida,
    marcarTodasComoLidas,
    excluirNotificacao,
    getNotificacoesNaoLidas
  };
} 