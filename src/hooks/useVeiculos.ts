'use client';

// Pattern para usar em todas as chamadas ao Supabase:
// const { data, error } = await Promise.resolve(supabase.from(...))

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Veiculo, VeiculoFormData, VeiculoFiltros } from '@/types/Veiculo';

export type OrderDirection = 'asc' | 'desc';

export interface OrderConfig {
  column: string;
  direction: OrderDirection;
}

export function useVeiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchVeiculos = async (
    page = 1, 
    perPage = 10, 
    filtros?: VeiculoFiltros,
    orderConfig?: OrderConfig
  ) => {
    try {
      setLoading(true);
      setError(null);

      const from = (page - 1) * perPage;
      const to = from + perPage - 1;

      let query = supabase
        .from('veiculos')
        .select(`
          *,
          secretarias (
            id,
            nome
          )
        `, { 
          count: 'exact' 
        });

      // Aplicar filtros
      if (filtros?.status) {
        query = query.eq('status', filtros.status);
      }

      if (filtros?.secretaria_id) {
        query = query.eq('secretaria_id', filtros.secretaria_id);
      }

      if (filtros?.tipo) {
        query = query.eq('tipo', filtros.tipo);
      }

      if (filtros?.termoBusca) {
        query = query.or(`placa.ilike.%${filtros.termoBusca}%,modelo.ilike.%${filtros.termoBusca}%`);
      }

      // Aplicar ordenação
      if (orderConfig) {
        query = query.order(orderConfig.column, { 
          ascending: orderConfig.direction === 'asc'
        });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Aplicar paginação
      query = query.range(from, to);

      const { data, error, count } = await Promise.resolve(query);

      if (error) throw error;

      // Processar dados para incluir o nome da secretaria
      const veiculosProcessados = Array.isArray(data) ? data.map(veiculo => ({
        ...veiculo,
        secretaria_nome: veiculo.secretarias?.nome || 'N/A'
      })) : [];

      setVeiculos(veiculosProcessados);
      if (count !== null) setTotalCount(count);
    } catch (err: any) {
      console.error('Erro ao buscar veículos:', err);
      setError(err?.message || 'Erro ao carregar dados. Por favor, tente novamente.');
      setVeiculos([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const createVeiculo = async (veiculo: VeiculoFormData) => {
    try {
      setLoading(true);
      
      // Primeiro inserimos os dados básicos do veículo
      const { data, error } = await supabase
        .from('veiculos')
        .insert({
          placa: veiculo.placa,
          modelo: veiculo.modelo,
          tipo: veiculo.tipo,
          ano: veiculo.ano,
          combustivel: veiculo.combustivel,
          status: veiculo.status,
          quilometragem_atual: veiculo.quilometragem_atual,
          secretaria_id: veiculo.secretaria_id
        })
        .select('*')
        .single()
        .then(result => result);

      if (error) throw error;

      // Se tiver arquivos, fazemos o upload
      const id = data.id;
      const updates: Partial<Veiculo> = {};

      // Upload da foto
      if (veiculo.foto_file) {
        const fotoPath = `veiculos/${id}/foto`;
        const { data: fileData, error: fileError } = await Promise.resolve(supabase.storage
          .from('files')
          .upload(fotoPath, veiculo.foto_file, {
            upsert: true,
          }));

        if (fileError) throw fileError;

        const { data: urlData } = await Promise.resolve(supabase.storage
          .from('files')
          .getPublicUrl(fotoPath));

        updates.foto_url = urlData.publicUrl;
      }

      // Upload do CRLV
      if (veiculo.crlv_file) {
        const crlvPath = `veiculos/${id}/crlv`;
        const { error: fileError } = await Promise.resolve(supabase.storage
          .from('files')
          .upload(crlvPath, veiculo.crlv_file, {
            upsert: true,
          }));

        if (fileError) throw fileError;

        const { data: urlData } = await Promise.resolve(supabase.storage
          .from('files')
          .getPublicUrl(crlvPath));

        updates.crlv_url = urlData.publicUrl;
      }

      // Upload do seguro
      if (veiculo.seguro_file) {
        const seguroPath = `veiculos/${id}/seguro`;
        const { error: fileError } = await Promise.resolve(supabase.storage
          .from('files')
          .upload(seguroPath, veiculo.seguro_file, {
            upsert: true,
          }));

        if (fileError) throw fileError;

        const { data: urlData } = await Promise.resolve(supabase.storage
          .from('files')
          .getPublicUrl(seguroPath));

        updates.seguro_url = urlData.publicUrl;
      }

      // Se tiver atualizações de URL, atualizar o registro
      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from('veiculos')
          .update(updates)
          .eq('id', id)
          .then(result => result);

        if (updateError) throw updateError;
      }

      return { success: true, data: { ...data, ...updates } };
    } catch (err: any) {
      console.error('Erro ao criar veículo:', err);
      return { 
        success: false, 
        error: err?.message || 'Erro ao criar veículo. Por favor, tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const updateVeiculo = async (id: string, veiculo: Partial<VeiculoFormData>) => {
    try {
      setLoading(true);
      
      // Primeiro atualizamos os dados básicos do veículo
      const updates: Partial<Veiculo> = {};
      
      // Adicionar campos de texto/número
      if (veiculo.placa !== undefined) updates.placa = veiculo.placa;
      if (veiculo.modelo !== undefined) updates.modelo = veiculo.modelo;
      if (veiculo.tipo !== undefined) updates.tipo = veiculo.tipo;
      if (veiculo.ano !== undefined) updates.ano = veiculo.ano;
      if (veiculo.combustivel !== undefined) updates.combustivel = veiculo.combustivel;
      if (veiculo.status !== undefined) updates.status = veiculo.status;
      if (veiculo.quilometragem_atual !== undefined) updates.quilometragem_atual = veiculo.quilometragem_atual;
      if (veiculo.secretaria_id !== undefined) updates.secretaria_id = veiculo.secretaria_id;

      // Se tiver atualizações, atualizar o registro
      if (Object.keys(updates).length > 0) {
        const result = await supabase
          .from('veiculos')
          .update(updates)
          .eq('id', id)
          .then(result => result);

        if (result.error) throw result.error;
      }

      return { success: true };
    } catch (err: any) {
      console.error('Erro ao atualizar veículo:', err);
      return { 
        success: false, 
        error: err?.message || 'Erro ao atualizar veículo. Por favor, tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteVeiculo = async (id: string) => {
    try {
      setLoading(true);
      
      // Verificar se existe alguma dependência (abastecimentos, manutenções, solicitações)
      const { count: abastecimentosCount, error: abastecimentosError } = await Promise.resolve(supabase
        .from('abastecimentos')
        .select('*', { count: 'exact', head: true })
        .eq('veiculo_id', id));
      
      if (abastecimentosError) throw abastecimentosError;
      
      if (abastecimentosCount && abastecimentosCount > 0) {
        return { 
          success: false, 
          error: 'Não é possível excluir o veículo, pois existem abastecimentos vinculados.'
        };
      }
      
      const { count: manutencoesCount, error: manutencoesError } = await Promise.resolve(supabase
        .from('manutencoes')
        .select('*', { count: 'exact', head: true })
        .eq('veiculo_id', id));
      
      if (manutencoesError) throw manutencoesError;
      
      if (manutencoesCount && manutencoesCount > 0) {
        return { 
          success: false, 
          error: 'Não é possível excluir o veículo, pois existem manutenções vinculadas.'
        };
      }
      
      const { count: solicitacoesCount, error: solicitacoesError } = await Promise.resolve(supabase
        .from('solicitacoes')
        .select('*', { count: 'exact', head: true })
        .eq('veiculo_id', id));
      
      if (solicitacoesError) throw solicitacoesError;
      
      if (solicitacoesCount && solicitacoesCount > 0) {
        return { 
          success: false, 
          error: 'Não é possível excluir o veículo, pois existem solicitações vinculadas.'
        };
      }

      // Excluir arquivos do storage
      await Promise.resolve(supabase.storage
        .from('files')
        .remove([
          `veiculos/${id}/foto`,
          `veiculos/${id}/crlv`,
          `veiculos/${id}/seguro`
        ]));

      // Excluir o veículo
      const { error } = await Promise.resolve(supabase
        .from('veiculos')
        .delete()
        .eq('id', id));

      if (error) throw error;

      // Atualizar o estado
      setVeiculos(prev => prev.filter(v => v.id !== id));

      return { success: true };
    } catch (err: any) {
      console.error('Erro ao excluir veículo:', err);
      return { 
        success: false, 
        error: err?.message || 'Erro ao excluir veículo. Por favor, tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const getVeiculo = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await Promise.resolve(supabase
        .from('veiculos')
        .select(`
          *,
          secretarias (
            id,
            nome
          )
        `)
        .eq('id', id)
        .single());

      if (error) throw error;

      return { 
        success: true, 
        data: {
          ...data,
          secretaria_nome: data.secretarias?.nome || 'N/A'
        } 
      };
    } catch (err: any) {
      console.error('Erro ao buscar veículo:', err);
      return { 
        success: false, 
        error: err?.message || 'Erro ao buscar veículo. Por favor, tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    veiculos,
    loading,
    error,
    totalCount,
    fetchVeiculos,
    createVeiculo,
    updateVeiculo,
    deleteVeiculo,
    getVeiculo
  };
} 