'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Secretaria, SecretariaFormData } from '@/hooks/useSecretarias';

interface SecretariaFormProps {
  secretaria?: Secretaria | null; // Para edição
  onSave: (data: SecretariaFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function SecretariaForm({
  secretaria,
  onSave,
  onCancel,
  isLoading,
}: SecretariaFormProps) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (secretaria) {
      setNome(secretaria.nome);
    } else {
      setNome('');
    }
  }, [secretaria]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      // Adicionar alguma validação/feedback para o usuário
      alert('O nome da secretaria não pode estar vazio.');
      return;
    }
    await onSave({ nome });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="nomeSecretaria" className="block text-sm font-medium text-gray-700 mb-1">
          Nome da Secretaria
        </label>
        <Input
          id="nomeSecretaria"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Secretaria de Educação"
          className="w-full"
          disabled={isLoading}
        />
      </div>
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading || !nome.trim()}>
          {isLoading ? (secretaria ? 'Salvando...' : 'Criando...') : (secretaria ? 'Salvar Alterações' : 'Criar Secretaria')}
        </Button>
      </div>
    </form>
  );
} 