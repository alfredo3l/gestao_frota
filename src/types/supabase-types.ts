export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      abastecimentos: {
        Row: {
          id: string;
          veiculo_id: string;
          motorista_id: string;
          data: string;
          litros: number;
          valor: number;
          posto: string;
          km: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          veiculo_id: string;
          motorista_id: string;
          data: string;
          litros: number;
          valor: number;
          posto: string;
          km: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          veiculo_id?: string;
          motorista_id?: string;
          data?: string;
          litros?: number;
          valor?: number;
          posto?: string;
          km?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      manutencoes: {
        Row: {
          id: string;
          veiculo_id: string;
          tipo: string;
          descricao: string;
          data: string;
          valor: number;
          oficina: string;
          km: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          veiculo_id: string;
          tipo: string;
          descricao: string;
          data: string;
          valor: number;
          oficina: string;
          km: number;
          status: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          veiculo_id?: string;
          tipo?: string;
          descricao?: string;
          data?: string;
          valor?: number;
          oficina?: string;
          km?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      motoristas: {
        Row: {
          id: string;
          nome: string;
          cpf: string;
          cnh: string;
          categoria_cnh: string;
          validade_cnh: string;
          secretaria_id: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          cpf: string;
          cnh: string;
          categoria_cnh: string;
          validade_cnh: string;
          secretaria_id: string;
          status: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          cpf?: string;
          cnh?: string;
          categoria_cnh?: string;
          validade_cnh?: string;
          secretaria_id?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      secretarias: {
        Row: {
          id: string;
          nome: string;
          descricao: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          nome: string;
          descricao: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          descricao?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      veiculos: {
        Row: {
          id: string;
          placa: string;
          modelo: string;
          ano: number;
          tipo: string;
          combustivel: string;
          status: string;
          quilometragem_atual: number;
          secretaria_id: string;
          foto_url: string | null;
          crlv_url: string | null;
          seguro_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          placa: string;
          modelo: string;
          ano: number;
          tipo: string;
          combustivel: string;
          status: string;
          quilometragem_atual: number;
          secretaria_id: string;
          foto_url?: string | null;
          crlv_url?: string | null;
          seguro_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          placa?: string;
          modelo?: string;
          ano?: number;
          tipo?: string;
          combustivel?: string;
          status?: string;
          quilometragem_atual?: number;
          secretaria_id?: string;
          foto_url?: string | null;
          crlv_url?: string | null;
          seguro_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      usuarios: {
        Row: {
          id: string;
          email: string;
          nome: string;
          senha_hash: string;
          perfil: string;
          secretaria_id: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          nome: string;
          senha_hash: string;
          perfil: string;
          secretaria_id?: string | null;
          status: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          nome?: string;
          senha_hash?: string;
          perfil?: string;
          secretaria_id?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      solicitacoes: {
        Row: {
          id: string;
          usuario_id: string;
          secretaria_id: string;
          veiculo_id: string | null;
          motorista_id: string | null;
          destino: string;
          data_solicitacao: string;
          data_saida: string;
          data_retorno: string;
          status: string;
          justificativa: string;
          observacoes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          usuario_id: string;
          secretaria_id: string;
          veiculo_id?: string | null;
          motorista_id?: string | null;
          destino: string;
          data_solicitacao: string;
          data_saida: string;
          data_retorno: string;
          status: string;
          justificativa: string;
          observacoes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          usuario_id?: string;
          secretaria_id?: string;
          veiculo_id?: string | null;
          motorista_id?: string | null;
          destino?: string;
          data_solicitacao?: string;
          data_saida?: string;
          data_retorno?: string;
          status?: string;
          justificativa?: string;
          observacoes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
} 