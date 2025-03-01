import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Demanda, DemandaStatus } from '@/types/demanda';

export type OrderDirection = 'asc' | 'desc';

export interface OrderConfig {
  column: string;
  direction: OrderDirection;
}

export function useDemandas() {
  const [demandas, setDemandas] = useState<Demanda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchDemandas = async (
    page = 1,
    perPage = 10,
    searchTerm = '',
    filters: Record<string, any> = {},
    orderConfig: OrderConfig = { column: 'dataRegistro', direction: 'desc' }
  ) => {
    try {
      setLoading(true);
      
      // Calcular offset para paginação
      const offset = (page - 1) * perPage;
      
      // Iniciar a query
      let query = supabase
        .from('demandas')
        .select('*', { count: 'exact' });
      
      // Aplicar filtros
      if (searchTerm) {
        query = query.or(`titulo.ilike.%${searchTerm}%,descricao.ilike.%${searchTerm}%`);
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
            query = query.eq('tipo', value);
          } else if (key === 'categoria') {
            if (Array.isArray(value)) {
              query = query.in('categoria', value);
            } else {
              query = query.eq('categoria', value);
            }
          } else if (key === 'prioridade') {
            if (Array.isArray(value)) {
              query = query.in('prioridade', value);
            } else {
              query = query.eq('prioridade', value);
            }
          } else if (key === 'solicitanteId') {
            query = query.eq('solicitante->id', value);
          } else if (key === 'responsavelId') {
            query = query.eq('responsavel->id', value);
          } else if (key === 'cidade') {
            query = query.eq('localizacao->cidade', value);
          } else if (key === 'estado') {
            query = query.eq('localizacao->estado', value);
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
      
      setDemandas(data as Demanda[]);
      setTotalCount(count || 0);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar demandas:', err);
      setError('Falha ao carregar demandas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getDemandaById = async (id: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('demandas')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data as Demanda;
    } catch (err) {
      console.error('Erro ao buscar demanda:', err);
      setError('Falha ao carregar dados da demanda. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createDemanda = async (demanda: Omit<Demanda, 'id'>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('demandas')
        .insert([demanda])
        .select();
      
      if (error) throw error;
      
      return data[0] as Demanda;
    } catch (err) {
      console.error('Erro ao criar demanda:', err);
      setError('Falha ao criar demanda. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDemanda = async (id: string, updates: Partial<Demanda>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('demandas')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      return data[0] as Demanda;
    } catch (err) {
      console.error('Erro ao atualizar demanda:', err);
      setError('Falha ao atualizar demanda. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteDemanda = async (id: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('demandas')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (err) {
      console.error('Erro ao excluir demanda:', err);
      setError('Falha ao excluir demanda. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const adicionarAtualizacao = async (
    id: string, 
    atualizacao: { 
      data: string; 
      usuario: string; 
      comentario: string; 
      status?: 'Aberta' | 'Em Análise' | 'Em Andamento' | 'Concluída' | 'Cancelada';
    }
  ) => {
    try {
      setLoading(true);
      
      // Primeiro, buscar a demanda atual
      const { data: demandaAtual, error: errorBusca } = await supabase
        .from('demandas')
        .select('atualizacoes')
        .eq('id', id)
        .single();
      
      if (errorBusca) throw errorBusca;
      
      // Adicionar a nova atualização
      const atualizacoes = demandaAtual.atualizacoes || [];
      atualizacoes.push(atualizacao);
      
      // Atualizar a demanda
      const updates: Partial<Demanda> = { 
        atualizacoes,
        ...(atualizacao.status && { status: atualizacao.status })
      };
      
      const { data, error } = await supabase
        .from('demandas')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      return data[0] as Demanda;
    } catch (err) {
      console.error('Erro ao adicionar atualização:', err);
      setError('Falha ao adicionar atualização. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    demandas,
    loading,
    error,
    totalCount,
    fetchDemandas,
    getDemandaById,
    createDemanda,
    updateDemanda,
    deleteDemanda,
    adicionarAtualizacao
  };
} 