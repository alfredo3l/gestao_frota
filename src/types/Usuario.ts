export type Role = 'admin' | 'gestor_frota' | 'motorista' | 'leitor';

export interface Usuario {
  id: string;
  email: string;
  nome: string;
  role: Role;
  empresa_id: string;
  empresa_nome?: string;
  secretaria_id?: string;
  secretaria_nome?: string;
  motorista_id?: string;
  status: 'ativo' | 'inativo';
  ultimo_login?: string;
  foto_url?: string;
  telefone?: string;
  created_at: string;
  updated_at: string;
}

export interface UsuarioFormData {
  email: string;
  nome: string;
  role: Role;
  secretaria_id?: string;
  motorista_id?: string;
  status: 'ativo' | 'inativo';
  telefone?: string;
  senha?: string;
  confirmar_senha?: string;
  foto_file?: File;
}

export interface UsuarioFiltros {
  role?: Role;
  secretaria_id?: string;
  status?: 'ativo' | 'inativo';
  termoBusca?: string;
}

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  logo_url?: string;
  ativa: boolean;
  created_at: string;
  updated_at: string;
}

export interface Secretaria {
  id: string;
  empresa_id: string;
  nome: string;
  sigla?: string;
  responsavel?: string;
  created_at: string;
  updated_at: string;
}

export interface Permissoes {
  veiculos: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  motoristas: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  abastecimentos: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  manutencoes: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  solicitacoes: {
    visualizar: boolean;
    criar: boolean;
    aprovar: boolean;
    negar: boolean;
    finalizar: boolean;
    excluir: boolean;
  };
  relatorios: {
    visualizar: boolean;
    exportar: boolean;
  };
  usuarios: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  configuracoes: {
    visualizar: boolean;
    editar: boolean;
  };
} 