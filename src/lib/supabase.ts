'use client';

import { createClient } from '@supabase/supabase-js'
import { mockSupabaseClient } from './mockSupabase';
import { Database } from '@/types/supabase-types';

// Usar URL e chave hardcoded para teste (copiar do CONEXAO_SUPABASE.md)
const testSupabaseUrl = 'https://pztvnkdesfdemmdeuvmn.supabase.co';
const testSupabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dHZua2Rlc2ZkZW1tZGV1dm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjUwMDgsImV4cCI6MjA2MjY0MTAwOH0.e156tShBaatSWsqyZwuA8Affz-iaYjyFAb6ltb-Wn4o';

// Variável que controla se vamos usar o mock ou o cliente real
const isUsingMock = false;

// Criar o cliente Supabase com tipagem explícita para evitar a inferência excessivamente profunda
const supabaseClient = createClient<Database>(testSupabaseUrl, testSupabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

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
  } else {
    console.info(
      '%c[INFO] Usando cliente Supabase real',
      'background: #4CAF50; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
    );
  }
} 