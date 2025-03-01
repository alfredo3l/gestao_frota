import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Apoiador } from '@/types/apoiador';

export type OrderDirection = 'asc' | 'desc';

export interface OrderConfig {
  column: string;
  direction: OrderDirection;
}

export function useApoiadores() {
  const [apoiadores, setApoiadores] = useState<Apoiador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchApoiadores = async (
    page = 1,
    perPage = 10,
    searchTerm = '',
    filters: Record<string, any> = {},
    orderConfig: OrderConfig = { column: 'nome', direction: 'asc' }
  ) => {
    try {
      setLoading(true);
      
      // Calcular offset para paginação
      const offset = (page - 1) * perPage;
      
      // Iniciar a query
      let query = supabase
        .from('apoiadores')
        .select('*', { count: 'exact' });
      
      // Aplicar filtros
      if (searchTerm) {
        query = query.or(`nome.ilike.%${searchTerm}%,cpf.ilike.%${searchTerm}%,endereco->>bairro.ilike.%${searchTerm}%`);
      }
      
      // Aplicar filtros adicionais
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'liderancaId') {
            query = query.eq('liderancaId', value);
          } else if (key === 'cidade') {
            query = query.eq('endereco->>cidade', value);
          } else if (key === 'estado') {
            query = query.eq('endereco->>estado', value);
          } else if (key === 'nivelEngajamento') {
            if (Array.isArray(value)) {
              query = query.in('nivelEngajamento', value);
            } else {
              query = query.eq('nivelEngajamento', value);
            }
          } else if (key === 'status') {
            query = query.eq('status', value);
          } else if (key === 'tags' && Array.isArray(value)) {
            query = query.contains('tags', value);
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
      
      setApoiadores(data as Apoiador[]);
      setTotalCount(count || 0);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar apoiadores:', err);
      setError('Falha ao carregar apoiadores. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getApoiadorById = async (id: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('apoiadores')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data as Apoiador;
    } catch (err) {
      console.error('Erro ao buscar apoiador:', err);
      setError('Falha ao carregar dados do apoiador. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createApoiador = async (apoiador: Omit<Apoiador, 'id'>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('apoiadores')
        .insert([apoiador])
        .select();
      
      if (error) throw error;
      
      return data[0] as Apoiador;
    } catch (err) {
      console.error('Erro ao criar apoiador:', err);
      setError('Falha ao criar apoiador. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateApoiador = async (id: string, updates: Partial<Apoiador>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('apoiadores')
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      return data[0] as Apoiador;
    } catch (err) {
      console.error('Erro ao atualizar apoiador:', err);
      setError('Falha ao atualizar apoiador. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteApoiador = async (id: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('apoiadores')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (err) {
      console.error('Erro ao excluir apoiador:', err);
      setError('Falha ao excluir apoiador. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getApoiadoresByLideranca = async (liderancaId: string) => {
    try {
      setLoading(true);
      
      const { data, error, count } = await supabase
        .from('apoiadores')
        .select('*', { count: 'exact' })
        .eq('liderancaId', liderancaId);
      
      if (error) throw error;
      
      setApoiadores(data as Apoiador[]);
      setTotalCount(count || 0);
      return data as Apoiador[];
    } catch (err) {
      console.error('Erro ao buscar apoiadores por liderança:', err);
      setError('Falha ao carregar apoiadores. Tente novamente.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    apoiadores,
    loading,
    error,
    totalCount,
    fetchApoiadores,
    getApoiadorById,
    createApoiador,
    updateApoiador,
    deleteApoiador,
    getApoiadoresByLideranca
  };
} 