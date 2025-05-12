export interface Abastecimento {
  id: string;
  empresa_id: string;
  veiculo_id: string;
  veiculo_placa?: string;
  motorista_id: string;
  motorista_nome?: string;
  data: string;
  litros: number;
  valor_total: number;
  valor_litro?: number;
  tipo_combustivel: string;
  quilometragem: number;
  km_percorridos?: number;
  consumo_medio?: number;  // km/litro
  cupom_fiscal_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AbastecimentoFormData {
  veiculo_id: string;
  motorista_id: string;
  data: string;
  tipo_combustivel: string;
  litros: number;
  valor_total: number;
  quilometragem: number;
  cupom_fiscal_file: File | null;
  observacoes?: string;
}

export interface AbastecimentoFiltros {
  veiculo_id?: string;
  motorista_id?: string;
  data_inicio?: string;
  data_fim?: string;
  tipo_combustivel?: string;
  termoBusca?: string;
}

export interface Abastecimento {
  id: string;
  data: string;
  veiculo: {
    id: string;
    placa: string;
    modelo: string;
  };
  motorista: {
    id: string;
    nome: string;
  };
  combustivel: string;
  litros: number;
  valor: number;
  kmAtual: number;
  kmAnterior: number;
  kmRodados: number;
  consumoMedio: number;
  cupomFiscal: boolean;
  secretaria: string;
  observacoes?: string;
} 