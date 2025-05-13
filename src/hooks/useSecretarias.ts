'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Secretaria {
  id: string; 
  nome: string;
  created_at?: string; 
  updated_at?: string; 
}

export interface SecretariaFormData {
  nome: string;
}

export function useSecretarias() {
  const [secretarias, setSecretarias] = useState<Secretaria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{ id: string, perfil_acesso?: string } | null>(null);

  // Verificar usuário atual ao inicializar o hook
  useEffect(() => {
    const checkCurrentUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const { data: profileData } = await supabase
          .from('usuarios')
          .select('id, perfil_acesso')
          .eq('id', data.session.user.id)
          .single();
        
        setUserProfile(profileData || { id: data.session.user.id });
      }
    };
    
    checkCurrentUser();
  }, []);

  const fetchSecretarias = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('secretarias')
        .select('*')
        .order('nome', { ascending: true });

      if (fetchError) throw fetchError;
      setSecretarias(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar secretarias:', err);
      setError(err?.message || 'Erro ao carregar secretarias.');
      setSecretarias([]);
    } finally {
      setLoading(false);
    }
  };

  const createSecretaria = async (formData: SecretariaFormData) => {
    try {
      setLoading(true);
      setError(null);

      // Verificar autenticação e permissões
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }

      // Verificar se o usuário tem permissão de admin
      if (userProfile?.perfil_acesso !== 'admin') {
        throw new Error('Você não tem permissão para criar secretarias. Apenas administradores podem realizar esta operação.');
      }

      const { data, error: insertError } = await supabase
        .from('secretarias')
        .insert(formData)
        .select()
        .single();

      if (insertError) throw insertError;
      if (data) {
        // Adicionar a nova secretaria à lista local
        setSecretarias(prev => [...prev, data].sort((a, b) => a.nome.localeCompare(b.nome)));
      }
      return { success: true, data };
    } catch (err: any) {
      console.error('Erro ao criar secretaria:', err);
      setError(err?.message || 'Erro ao criar secretaria.');
      return { success: false, error: err?.message };
    } finally {
      setLoading(false);
    }
  };

  const updateSecretaria = async (id: string, formData: SecretariaFormData) => {
    try {
      setLoading(true);
      setError(null);

      // Verificar autenticação e permissões
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }

      // Verificar se o usuário tem permissão de admin
      if (userProfile?.perfil_acesso !== 'admin') {
        throw new Error('Você não tem permissão para atualizar secretarias. Apenas administradores podem realizar esta operação.');
      }

      const { data, error: updateError } = await supabase
        .from('secretarias')
        .update(formData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      if (data) {
        // Atualizar a secretaria na lista local
        setSecretarias(prev => 
          prev.map(s => s.id === id ? data : s).sort((a, b) => a.nome.localeCompare(b.nome))
        );
      }
      return { success: true, data };
    } catch (err: any) {
      console.error('Erro ao atualizar secretaria:', err);
      setError(err?.message || 'Erro ao atualizar secretaria.');
      return { success: false, error: err?.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteSecretaria = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // Verificar autenticação e permissões
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('Usuário não autenticado. Faça login para continuar.');
      }

      // Verificar se o usuário tem permissão de admin
      if (userProfile?.perfil_acesso !== 'admin') {
        throw new Error('Você não tem permissão para excluir secretarias. Apenas administradores podem realizar esta operação.');
      }

      const { error: deleteError } = await supabase
        .from('secretarias')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      // Remover a secretaria da lista local
      setSecretarias(prev => prev.filter(s => s.id !== id));
      return { success: true };
    } catch (err: any) {
      // Verificar se é erro de FK constraint (ex: secretaria em uso por veículo)
      if (err.code === '23503') { // Código de erro PostgreSQL para foreign_key_violation
        console.error('Erro ao excluir secretaria: Violação de chave estrangeira', err);
        const userFriendlyError = 'Não é possível excluir esta secretaria pois ela está vinculada a um ou mais veículos.';
        setError(userFriendlyError);
        return { success: false, error: userFriendlyError };
      }
      console.error('Erro ao excluir secretaria:', err);
      setError(err?.message || 'Erro ao excluir secretaria.');
      return { success: false, error: err?.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    secretarias,
    loading,
    error,
    userProfile,
    fetchSecretarias,
    createSecretaria,
    updateSecretaria,
    deleteSecretaria
  };
} 