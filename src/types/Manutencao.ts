export interface Manutencao {
  id: string;
  empresa_id: string;
  veiculo_id: string;
  veiculo_placa?: string;
  tipo: 'preventiva' | 'corretiva';
  descricao: string;
  valor: number;
  fornecedor: string;
  data_inicio: string;
  data_fim?: string;
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  quilometragem: number;
  proxima_revisao_km?: number;
  proxima_revisao_data?: string;
  notas?: string;
  ordem_servico_url?: string;
  nota_fiscal_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ManutencaoFormData {
  veiculo_id: string;
  tipo: 'preventiva' | 'corretiva';
  descricao: string;
  valor: number;
  fornecedor: string;
  data_inicio: string;
  data_fim?: string;
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  quilometragem: number;
  proxima_revisao_km?: number;
  proxima_revisao_data?: string;
  notas?: string;
  ordem_servico_file?: File;
  nota_fiscal_file?: File;
}

export interface ManutencaoFiltros {
  veiculo_id?: string;
  tipo?: 'preventiva' | 'corretiva';
  status?: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  data_inicio?: string;
  data_fim?: string;
  fornecedor?: string;
  termoBusca?: string;
} 