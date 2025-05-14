'use client';

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase-types';

// Obter URL e chave anônima das variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificar se as variáveis de ambiente estão definidas
if (!supabaseUrl) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseAnonKey) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Criar o cliente Supabase com tipagem explícita
const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Exportar o cliente Supabase real
export const supabase = supabaseClient;

// Exibir informação no console que o cliente real está sendo usado (apenas no browser)
if (typeof window !== 'undefined') {
  console.info(
    '%c[INFO] Usando cliente Supabase real',
    'background: #4CAF50; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
  );
} 