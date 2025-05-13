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