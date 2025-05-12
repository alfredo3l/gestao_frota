import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Abastecimento, AbastecimentoFormData, AbastecimentoFiltros } from '@/types/Abastecimento';

export type OrderDirection = 'asc' | 'desc';

export interface OrderConfig {
  column: string;
  direction: OrderDirection;
}

export function useAbastecimentos() {
  const [abastecimentos, setAbastecimentos] = useState<Abastecimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchAbastecimentos = async (
    page = 1, 
    perPage = 10, 
    filtros?: AbastecimentoFiltros,
    orderConfig?: OrderConfig
  ) => {
    try {
      setLoading(true);
      setError(null);

      const from = (page - 1) * perPage;
      const to = from + perPage - 1;

      let query = supabase
        .from('abastecimentos')
        .select(`
          *,
          veiculos (
            id,
            placa,
            modelo,
            quilometragem_atual
          ),
          motoristas (
            id,
            nome
          )
        `, { 
          count: 'exact' 
        });

      // Aplicar filtros
      if (filtros?.veiculo_id) {
        query = query.eq('veiculo_id', filtros.veiculo_id);
      }

      if (filtros?.motorista_id) {
        query = query.eq('motorista_id', filtros.motorista_id);
      }

      if (filtros?.tipo_combustivel) {
        query = query.eq('tipo_combustivel', filtros.tipo_combustivel);
      }

      if (filtros?.data_inicio && filtros?.data_fim) {
        query = query.gte('data', filtros.data_inicio).lte('data', filtros.data_fim);
      } else if (filtros?.data_inicio) {
        query = query.gte('data', filtros.data_inicio);
      } else if (filtros?.data_fim) {
        query = query.lte('data', filtros.data_fim);
      }

      if (filtros?.termoBusca) {
        // Na tabela de abastecimentos, a busca seria por ID ou observações (se existir)
        query = query.or(`id.ilike.%${filtros.termoBusca}%`);
      }

      // Aplicar ordenação
      if (orderConfig) {
        query = query.order(orderConfig.column, { 
          ascending: orderConfig.direction === 'asc',
          nullsFirst: orderConfig.direction === 'asc'
        });
      } else {
        query = query.order('data', { ascending: false });
      }

      // Aplicar paginação
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      // Processar dados para incluir informações relacionadas
      const abastecimentosProcessados = data.map(abastecimento => {
        // Calcular valor por litro
        const valorLitro = abastecimento.litros > 0 
          ? abastecimento.valor_total / abastecimento.litros
          : 0;
        
        // Obter quilometragem anterior (se disponível em histórico)
        // Isso poderia ser implementado consultando o último abastecimento do veículo
        const km_anterior = 0; // Placeholder para implementação futura
        const km_percorridos = km_anterior > 0 
          ? abastecimento.quilometragem - km_anterior
          : 0;
        
        // Calcular consumo médio
        const consumo_medio = km_percorridos > 0 && abastecimento.litros > 0
          ? km_percorridos / abastecimento.litros
          : 0;

        return {
          ...abastecimento,
          veiculo_placa: abastecimento.veiculos?.placa || 'N/A',
          motorista_nome: abastecimento.motoristas?.nome || 'N/A',
          valor_litro: valorLitro,
          km_percorridos,
          consumo_medio
        };
      });

      setAbastecimentos(abastecimentosProcessados);
      if (count !== null) setTotalCount(count);
    } catch (err: any) {
      console.error('Erro ao buscar abastecimentos:', err);
      setError(err?.message || 'Erro ao carregar dados. Por favor, tente novamente.');
      setAbastecimentos([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const createAbastecimento = async (abastecimento: AbastecimentoFormData) => {
    try {
      setLoading(true);
      
      // Buscar quilometragem atual do veículo
      const { data: veiculo, error: veiculoError } = await supabase
        .from('veiculos')
        .select('quilometragem_atual')
        .eq('id', abastecimento.veiculo_id)
        .single();
        
      if (veiculoError) throw veiculoError;
      
      // Validar quilometragem (não pode ser menor que a atual do veículo)
      if (abastecimento.quilometragem < veiculo.quilometragem_atual) {
        return { 
          success: false, 
          error: `A quilometragem informada (${abastecimento.quilometragem} km) não pode ser menor que a atual do veículo (${veiculo.quilometragem_atual} km).`
        };
      }
      
      // Primeiro inserimos os dados básicos do abastecimento
      const { data, error } = await supabase
        .from('abastecimentos')
        .insert({
          veiculo_id: abastecimento.veiculo_id,
          motorista_id: abastecimento.motorista_id,
          data: abastecimento.data,
          litros: abastecimento.litros,
          valor_total: abastecimento.valor_total,
          tipo_combustivel: abastecimento.tipo_combustivel,
          quilometragem: abastecimento.quilometragem
        })
        .select('*')
        .single();

      if (error) throw error;

      // Atualizar a quilometragem do veículo
      const { error: updateError } = await supabase
        .from('veiculos')
        .update({ quilometragem_atual: abastecimento.quilometragem })
        .eq('id', abastecimento.veiculo_id);
        
      if (updateError) throw updateError;

      // Se tiver arquivo de cupom fiscal, fazer o upload
      const id = data.id;
      let cupom_fiscal_url = null;

      if (abastecimento.cupom_fiscal_file) {
        const cupomPath = `abastecimentos/${id}/cupom_fiscal`;
        const { error: fileError } = await supabase.storage
          .from('files')
          .upload(cupomPath, abastecimento.cupom_fiscal_file, {
            upsert: true,
          });

        if (fileError) throw fileError;

        const { data: urlData } = await supabase.storage
          .from('files')
          .getPublicUrl(cupomPath);

        cupom_fiscal_url = urlData.publicUrl;
        
        // Atualizar o registro com a URL do cupom
        const { error: updateCupomError } = await supabase
          .from('abastecimentos')
          .update({ cupom_fiscal_url })
          .eq('id', id);
          
        if (updateCupomError) throw updateCupomError;
      }

      return { 
        success: true, 
        data: { 
          ...data, 
          cupom_fiscal_url 
        } 
      };
    } catch (err: any) {
      console.error('Erro ao registrar abastecimento:', err);
      return { 
        success: false, 
        error: err?.message || 'Erro ao registrar abastecimento. Por favor, tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const updateAbastecimento = async (id: string, abastecimento: Partial<AbastecimentoFormData>) => {
    try {
      setLoading(true);
      
      // Buscar abastecimento atual para comparação
      const { data: abastecimentoAtual, error: getError } = await supabase
        .from('abastecimentos')
        .select('quilometragem, veiculo_id')
        .eq('id', id)
        .single();
        
      if (getError) throw getError;
      
      // Verificar se a quilometragem está sendo atualizada
      const veiculo_id = abastecimento.veiculo_id || abastecimentoAtual.veiculo_id;
      let quilometragem_atualizada = false;
      
      if (abastecimento.quilometragem && abastecimento.quilometragem !== abastecimentoAtual.quilometragem) {
        // Buscar quilometragem atual do veículo
        const { data: veiculo, error: veiculoError } = await supabase
          .from('veiculos')
          .select('quilometragem_atual')
          .eq('id', veiculo_id)
          .single();
          
        if (veiculoError) throw veiculoError;
        
        // Se a nova quilometragem for maior que a atual do veículo, atualizar o veículo também
        if (abastecimento.quilometragem > veiculo.quilometragem_atual) {
          quilometragem_atualizada = true;
        }
      }
      
      // Preparar as atualizações para o abastecimento
      const updates: Partial<Abastecimento> = {};
      
      if (abastecimento.veiculo_id !== undefined) updates.veiculo_id = abastecimento.veiculo_id;
      if (abastecimento.motorista_id !== undefined) updates.motorista_id = abastecimento.motorista_id;
      if (abastecimento.data !== undefined) updates.data = abastecimento.data;
      if (abastecimento.litros !== undefined) updates.litros = abastecimento.litros;
      if (abastecimento.valor_total !== undefined) updates.valor_total = abastecimento.valor_total;
      if (abastecimento.tipo_combustivel !== undefined) updates.tipo_combustivel = abastecimento.tipo_combustivel;
      if (abastecimento.quilometragem !== undefined) updates.quilometragem = abastecimento.quilometragem;

      // Se tiver arquivo de cupom fiscal, fazer o upload
      if (abastecimento.cupom_fiscal_file) {
        const cupomPath = `abastecimentos/${id}/cupom_fiscal`;
        const { error: fileError } = await supabase.storage
          .from('files')
          .upload(cupomPath, abastecimento.cupom_fiscal_file, {
            upsert: true,
          });

        if (fileError) throw fileError;

        const { data: urlData } = await supabase.storage
          .from('files')
          .getPublicUrl(cupomPath);

        updates.cupom_fiscal_url = urlData.publicUrl;
      }

      // Atualizar o abastecimento
      if (Object.keys(updates).length > 0) {
        const { data, error } = await supabase
          .from('abastecimentos')
          .update(updates)
          .eq('id', id)
          .select(`
            *,
            veiculos (
              id,
              placa,
              modelo
            ),
            motoristas (
              id,
              nome
            )
          `)
          .single();

        if (error) throw error;

        // Se a quilometragem foi atualizada, atualizar também o veículo
        if (quilometragem_atualizada && abastecimento.quilometragem) {
          const { error: updateVeiculoError } = await supabase
            .from('veiculos')
            .update({ quilometragem_atual: abastecimento.quilometragem })
            .eq('id', veiculo_id);
            
          if (updateVeiculoError) throw updateVeiculoError;
        }

        // Atualizar o estado
        setAbastecimentos(prev => 
          prev.map(a => a.id === id ? {
            ...data,
            veiculo_placa: data.veiculos?.placa || 'N/A',
            motorista_nome: data.motoristas?.nome || 'N/A',
            valor_litro: data.litros > 0 ? data.valor_total / data.litros : 0
          } : a)
        );

        return { success: true, data };
      }

      return { success: true };
    } catch (err: any) {
      console.error('Erro ao atualizar abastecimento:', err);
      return { 
        success: false, 
        error: err?.message || 'Erro ao atualizar abastecimento. Por favor, tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteAbastecimento = async (id: string) => {
    try {
      setLoading(true);

      // Buscar o abastecimento para obter informações antes de excluir
      const { data: abastecimento, error: getError } = await supabase
        .from('abastecimentos')
        .select('*')
        .eq('id', id)
        .single();
        
      if (getError) throw getError;

      // Excluir arquivos do storage
      await supabase.storage
        .from('files')
        .remove([`abastecimentos/${id}/cupom_fiscal`]);

      // Excluir o abastecimento
      const { error } = await supabase
        .from('abastecimentos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Atualizar o estado
      setAbastecimentos(prev => prev.filter(a => a.id !== id));

      return { success: true };
    } catch (err: any) {
      console.error('Erro ao excluir abastecimento:', err);
      return { 
        success: false, 
        error: err?.message || 'Erro ao excluir abastecimento. Por favor, tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const getAbastecimento = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('abastecimentos')
        .select(`
          *,
          veiculos (
            id,
            placa,
            modelo
          ),
          motoristas (
            id,
            nome
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Calcular valores adicionais
      const valorLitro = data.litros > 0 
        ? data.valor_total / data.litros
        : 0;

      return { 
        success: true, 
        data: {
          ...data,
          veiculo_placa: data.veiculos?.placa || 'N/A',
          motorista_nome: data.motoristas?.nome || 'N/A',
          valor_litro: valorLitro
        } 
      };
    } catch (err: any) {
      console.error('Erro ao buscar abastecimento:', err);
      return { 
        success: false, 
        error: err?.message || 'Erro ao buscar abastecimento. Por favor, tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Função para obter o consumo médio de um veículo
  const getConsumoMedio = async (veiculo_id: string, periodo_dias = 30) => {
    try {
      setLoading(true);
      
      // Calcular a data inicial do período
      const data_fim = new Date().toISOString().split('T')[0];
      const data_inicio = new Date(Date.now() - periodo_dias * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0];
      
      // Buscar abastecimentos no período, ordenados por data
      const { data, error } = await supabase
        .from('abastecimentos')
        .select('data, quilometragem, litros')
        .eq('veiculo_id', veiculo_id)
        .gte('data', data_inicio)
        .lte('data', data_fim)
        .order('data', { ascending: true });
        
      if (error) throw error;
      
      // Se não houver pelo menos dois abastecimentos, não é possível calcular
      if (!data || data.length < 2) {
        return { 
          success: true, 
          data: { 
            consumo_medio: 0, 
            total_km: 0, 
            total_litros: 0,
            mensagem: 'Dados insuficientes para cálculo.'
          } 
        };
      }
      
      // Calcular a distância total percorrida
      const km_inicial = data[0].quilometragem;
      const km_final = data[data.length - 1].quilometragem;
      const total_km = km_final - km_inicial;
      
      // Calcular o total de combustível usado
      const total_litros = data.slice(0, -1).reduce((acc, item) => acc + item.litros, 0);
      
      // Calcular o consumo médio
      const consumo_medio = total_litros > 0 ? total_km / total_litros : 0;
      
      return { 
        success: true, 
        data: { 
          consumo_medio, 
          total_km, 
          total_litros,
          mensagem: consumo_medio > 0 
            ? `Consumo médio de ${consumo_medio.toFixed(2)} km/l nos últimos ${periodo_dias} dias.` 
            : 'Dados insuficientes para cálculo.'
        } 
      };
    } catch (err: any) {
      console.error('Erro ao calcular consumo médio:', err);
      return { 
        success: false, 
        error: err?.message || 'Erro ao calcular consumo médio. Por favor, tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    abastecimentos,
    loading,
    error,
    totalCount,
    fetchAbastecimentos,
    createAbastecimento,
    updateAbastecimento,
    deleteAbastecimento,
    getAbastecimento,
    getConsumoMedio
  };
} 