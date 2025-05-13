export interface Motorista {
  id: string;
  empresa_id: string;
  nome: string;
  cpf: string;
  cnh: string;
  categoria_cnh: string;
  validade_cnh: string;
  secretaria_id: string;
  secretaria_nome?: string;
  foto_url?: string;
  cnh_url?: string;
  status: 'ativo' | 'inativo';
  created_at: string;
  updated_at: string;
}

export interface MotoristaFormData {
  nome: string;
  cpf: string;
  cnh: string;
  categoria_cnh: string;
  validade_cnh: string;
  secretaria_id: string;
  status: 'ativo' | 'inativo';
  foto_file?: File;
  cnh_file?: File;
  telefone?: string;
  email?: string;
}

export interface MotoristaFiltros {
  status?: 'ativo' | 'inativo';
  secretaria_id?: string;
  termoBusca?: string;
  cnh_vencida?: boolean;
} 