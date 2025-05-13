export interface Veiculo {
  id: string;
  placa: string;
  modelo: string;
  ano: number;
  tipo: string;
  combustivel: string;
  status: string;
  km: number;
  quilometragem_atual: number;
  secretaria: string;
  secretaria_nome?: string;
  ultimaManutencao?: string;
  proximaManutencao?: string;
  documentos: string[];
  imagens: number;
  foto_url?: string;
  crlv_url?: string;
  seguro_url?: string;
  created_at: string;
  updated_at: string;
}

export interface VeiculoFormData {
  placa: string;
  modelo: string;
  ano: number;
  tipo: string;
  combustivel: string;
  status: string;
  quilometragem_atual: number;
  secretaria_id: string;
  foto_file: File | null;
  documentos_files: File[];
  crlv_file?: File | null;
  seguro_file?: File | null;
}

export interface VeiculoFiltros {
  status?: 'ativo' | 'inativo' | 'em_manutencao';
  secretaria_id?: string;
  tipo?: string;
  termoBusca?: string;
} 