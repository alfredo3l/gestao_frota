import { createClient } from '@supabase/supabase-js'
import { mockSupabaseClient } from './mockSupabase';

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mocked-key';

// Sempre usar o mock para facilitar o desenvolvimento
const isUsingMock = true;

// Criar o cliente Supabase (sempre o mock neste caso)
export const supabase = mockSupabaseClient;

// Função para verificar se estamos usando o cliente real ou o mock
export const isRealSupabaseClient = () => false;

// Exibir aviso no console se estiver usando o mock
if (typeof window !== 'undefined') {
  console.warn(
    '%c[ATENÇÃO] Usando cliente Supabase mockado!',
    'background: #FFA500; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
  );
  console.info(
    '%cPara usar o cliente real, configure as variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local',
    'color: #666; font-style: italic;'
  );
} 