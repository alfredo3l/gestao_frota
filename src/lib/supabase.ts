'use client';

import { createClient } from '@supabase/supabase-js'
import { mockSupabaseClient } from './mockSupabase';
import { Database } from '@/types/supabase';

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mocked-key';

// Log para debug - remover depois
if (typeof window !== 'undefined') {
  console.log('=== INFORMAÇÕES DE CONEXÃO SUPABASE ===');
  console.log('URL:', supabaseUrl);
  console.log('URL é valor padrão:', supabaseUrl === 'https://example.supabase.co');
  console.log('ANON_KEY começa com:', supabaseAnonKey.substring(0, 20) + '...');
  console.log('ANON_KEY é valor padrão:', supabaseAnonKey === 'mocked-key');
}

// Variável que controla se vamos usar o mock ou o cliente real
// Forçando o uso do cliente real mesmo se as variáveis não forem encontradas
const isUsingMock = false;

// Usar URL e chave hardcoded para teste (copiar do CONEXAO_SUPABASE.md)
const testSupabaseUrl = 'https://pztvnkdesfdemmdeuvmn.supabase.co';
const testSupabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dHZua2Rlc2ZkZW1tZGV1dm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjUwMDgsImV4cCI6MjA2MjY0MTAwOH0.e156tShBaatSWsqyZwuA8Affz-iaYjyFAb6ltb-Wn4o';

// Criar o cliente Supabase real com tipagem explícita para evitar problemas de recursão
const supabaseClient = createClient<any>(
  supabaseUrl === 'https://example.supabase.co' ? testSupabaseUrl : supabaseUrl, 
  supabaseAnonKey === 'mocked-key' ? testSupabaseAnonKey : supabaseAnonKey
);

// Exportar o cliente apropriado (mock ou real)
export const supabase = isUsingMock ? mockSupabaseClient : supabaseClient;

// Função para verificar se estamos usando o cliente real ou o mock
export const isRealSupabaseClient = () => !isUsingMock;

// Exibir informação no console sobre qual cliente está sendo usado
if (typeof window !== 'undefined') {
  if (isUsingMock) {
    console.warn(
      '%c[ATENÇÃO] Usando cliente Supabase mockado!',
      'background: #FFA500; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
    );
    console.info(
      '%cPara usar o cliente real, altere a variável isUsingMock para false no arquivo src/lib/supabase.ts e configure as variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local',
      'color: #666; font-style: italic;'
    );
  } else {
    console.info(
      '%c[INFO] Usando cliente Supabase real',
      'background: #4CAF50; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
    );
    // Log para debug - usando client real
    console.log('Cliente Supabase real criado com:');
    console.log('- URL final:', supabaseUrl === 'https://example.supabase.co' ? testSupabaseUrl : supabaseUrl);
    console.log('- Cliente mockado?', isUsingMock);
  }
} 