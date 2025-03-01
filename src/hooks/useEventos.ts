import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Evento, EventoStatus } from '@/types/evento';

export type OrderDirection = 'asc' | 'desc';

export interface OrderConfig {
  column: string;
  direction: OrderDirection;
}

export function useEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchEventos = async (
    page = 1,
    perPage = 10,
    searchTerm = '',
    filters: Record<string, any> = {},
    orderConfig: OrderConfig = { column: 'dataInicio', direction: 'asc' }
  ) => {
    try {
      setLoading(true);
      
      // Calcular offset para paginação
      const offset = (page - 1) * perPage;
      
      // Iniciar a query
      let query = supabase
        .from('eventos')
        .select('*', { count: 'exact' });
      
      // Aplicar filtros
      if (searchTerm) {
        query = query.or(`titulo.ilike.%${searchTerm}%,descricao.ilike.%${searchTerm}%,local->>nome.ilike.%${searchTerm}%`);
      }
      
      // Aplicar filtros adicionais
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'status') {
            if (Array.isArray(value)) {
              query = query.in('status', value);
            } else {
              query = query.eq('status', value);
            }
          } else if (key === 'tipo') {
            if (Array.isArray(value)) {
              query = query.in('tipo', value);
            } else {
              query = query.eq('tipo', value);
            }
          } else if (key === 'organizadorId') {
            query = query.eq('organizador->id', value);
          } else if (key === 'cidade') {
            query = query.eq('local->cidade', value);
          } else if (key === 'estado') {
            query = query.eq('local->estado', value);
          } else if (key === 'dataInicio') {
            query = query.gte('dataInicio', value);
          } else if (key === 'dataFim') {
            query = query.lte('dataFim', value);
          } else if (key === 'participanteId') {
            query = query.contains('participantes', [{ id: value }]);
          }
        }
      });
      
      // Aplicar ordenação
      query = query.order(orderConfig.column, { ascending: orderConfig.direction === 'asc' });
      
      // Aplicar paginação
      query = query.range(offset, offset + perPage - 1);
      
      // Executar a query
      const { data, error, count } = await query;
      
      if (error) throw error;
      
      setEventos(data as Evento[]);
      setTotalCount(count || 0);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
      setError('Falha ao carregar eventos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getEventoById = async (id: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data as Evento;
    } catch (err) {
      console.error('Erro ao buscar evento:', err);
      setError('Falha ao carregar dados do evento. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createEvento = async (evento: Omit<Evento, 'id'>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('eventos')
        .insert([evento])
        .select();
      
      if (error) throw error;
      
      return data[0] as Evento;
    } catch (err) {
      console.error('Erro ao criar evento:', err);
      setError('Falha ao criar evento. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateEvento = async (id: string, updates: Partial<Evento>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('eventos')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      return data[0] as Evento;
    } catch (err) {
      console.error('Erro ao atualizar evento:', err);
      setError('Falha ao atualizar evento. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvento = async (id: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('eventos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (err) {
      console.error('Erro ao excluir evento:', err);
      setError('Falha ao excluir evento. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const confirmarParticipacao = async (eventoId: string, participanteId: string) => {
    try {
      setLoading(true);
      
      // Primeiro, buscar o evento atual
      const { data: eventoAtual, error: errorBusca } = await supabase
        .from('eventos')
        .select('participantes')
        .eq('id', eventoId)
        .single();
      
      if (errorBusca) throw errorBusca;
      
      // Atualizar o status de confirmação do participante
      const participantes = eventoAtual.participantes || [];
      const participanteIndex = participantes.findIndex((p: { id: string }) => p.id === participanteId);
      
      if (participanteIndex >= 0) {
        participantes[participanteIndex].confirmado = true;
      }
      
      // Atualizar o evento
      const { data, error } = await supabase
        .from('eventos')
        .update({ participantes })
        .eq('id', eventoId)
        .select();
      
      if (error) throw error;
      
      return data[0] as Evento;
    } catch (err) {
      console.error('Erro ao confirmar participação:', err);
      setError('Falha ao confirmar participação. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const adicionarParticipante = async (
    eventoId: string, 
    participante: { 
      id: string; 
      nome: string; 
      tipo: 'Candidato' | 'Coordenador' | 'Liderança' | 'Apoiador';
      confirmado: boolean;
    }
  ) => {
    try {
      setLoading(true);
      
      // Primeiro, buscar o evento atual
      const { data: eventoAtual, error: errorBusca } = await supabase
        .from('eventos')
        .select('participantes')
        .eq('id', eventoId)
        .single();
      
      if (errorBusca) throw errorBusca;
      
      // Adicionar o novo participante
      const participantes = eventoAtual.participantes || [];
      
      // Verificar se o participante já existe
      const participanteExistente = participantes.find((p: { id: string }) => p.id === participante.id);
      
      if (!participanteExistente) {
        participantes.push(participante);
      }
      
      // Atualizar o evento
      const { data, error } = await supabase
        .from('eventos')
        .update({ participantes })
        .eq('id', eventoId)
        .select();
      
      if (error) throw error;
      
      return data[0] as Evento;
    } catch (err) {
      console.error('Erro ao adicionar participante:', err);
      setError('Falha ao adicionar participante. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getEventosByParticipante = async (participanteId: string) => {
    try {
      setLoading(true);
      
      const { data, error, count } = await supabase
        .from('eventos')
        .select('*', { count: 'exact' })
        .contains('participantes', [{ id: participanteId }]);
      
      if (error) throw error;
      
      setEventos(data as Evento[]);
      setTotalCount(count || 0);
      return data as Evento[];
    } catch (err) {
      console.error('Erro ao buscar eventos por participante:', err);
      setError('Falha ao carregar eventos. Tente novamente.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    eventos,
    loading,
    error,
    totalCount,
    fetchEventos,
    getEventoById,
    createEvento,
    updateEvento,
    deleteEvento,
    confirmarParticipacao,
    adicionarParticipante,
    getEventosByParticipante
  };
} 