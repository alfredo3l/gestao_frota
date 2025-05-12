export interface Solicitacao {
  id: string;
  empresa_id: string;
  secretaria_id: string;
  secretaria_nome?: string;
  solicitante_id: string;
  solicitante_nome?: string;
  veiculo_id?: string;
  veiculo_placa?: string;
  motorista_id?: string;
  motorista_nome?: string;
  data_solicitacao: string;
  data_prevista_inicio: string;
  data_prevista_fim: string;
  data_real_inicio?: string;
  data_real_fim?: string;
  destino: string;
  finalidade: string;
  justificativa?: string;
  status: 'pendente' | 'aprovada' | 'negada' | 'em_andamento' | 'concluida' | 'cancelada';
  motivo_negacao?: string;
  observacoes?: string;
  quilometragem_inicial?: number;
  quilometragem_final?: number;
  aprovador_id?: string;
  aprovador_nome?: string;
  created_at: string;
  updated_at: string;
}

export interface SolicitacaoFormData {
  secretaria_id: string;
  veiculo_id?: string;
  motorista_id?: string;
  data_prevista_inicio: string;
  data_prevista_fim: string;
  destino: string;
  finalidade: string;
  justificativa?: string;
  observacoes?: string;
}

export interface SolicitacaoFiltros {
  secretaria_id?: string;
  veiculo_id?: string;
  motorista_id?: string;
  status?: 'pendente' | 'aprovada' | 'negada' | 'em_andamento' | 'concluida' | 'cancelada';
  data_inicio?: string;
  data_fim?: string;
  termoBusca?: string;
}

export interface AprovarSolicitacaoData {
  veiculo_id: string;
  motorista_id: string;
  observacoes?: string;
}

export interface NegarSolicitacaoData {
  motivo_negacao: string;
}

export interface FinalizarSolicitacaoData {
  quilometragem_final: number;
  data_real_fim: string;
  observacoes?: string;
} 