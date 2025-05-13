'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle, AlertTriangle } from 'lucide-react';
import { useSecretarias, Secretaria, SecretariaFormData } from '@/hooks/useSecretarias';
import SecretariaModal from '@/components/modals/SecretariaModal';
import SecretariaForm from '@/components/admin/secretarias/SecretariaForm';
import SecretariaLista from '@/components/admin/secretarias/SecretariaLista';
import { Button } from '@/components/ui/button';

export default function AdminSecretariasPage() {
  const {
    secretarias,
    loading,
    error,
    fetchSecretarias,
    createSecretaria,
    updateSecretaria,
    deleteSecretaria,
  } = useSecretarias();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secretariaParaEditar, setSecretariaParaEditar] = useState<Secretaria | null>(null);
  const [operationError, setOperationError] = useState<string | null>(null);

  useEffect(() => {
    fetchSecretarias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas uma vez na montagem do componente

  const handleOpenModalParaCriar = () => {
    setSecretariaParaEditar(null);
    setOperationError(null);
    setIsModalOpen(true);
  };

  const handleOpenModalParaEditar = (secretaria: Secretaria) => {
    setSecretariaParaEditar(secretaria);
    setOperationError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSecretariaParaEditar(null);
    setOperationError(null);
  };

  const handleSaveSecretaria = async (formData: SecretariaFormData) => {
    setOperationError(null);
    let result;
    if (secretariaParaEditar) {
      result = await updateSecretaria(secretariaParaEditar.id, formData);
    } else {
      result = await createSecretaria(formData);
    }

    if (result.success) {
      handleCloseModal();
    } else {
      setOperationError(result.error || 'Ocorreu um erro desconhecido.');
    }
  };

  const handleDeleteSecretaria = async (id: string) => {
    setOperationError(null);
    const result = await deleteSecretaria(id);
    if (!result.success) {
      setOperationError(result.error || 'Erro ao excluir secretaria.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Secretarias</h1>
        <Button onClick={handleOpenModalParaCriar} className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="w-5 h-5 mr-2" />
          Nova Secretaria
        </Button>
      </div>

      {error && !isModalOpen && (
        <div className="my-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <p><strong>Erro ao carregar dados:</strong> {error}</p>
        </div>
      )}

      <SecretariaLista
        secretarias={secretarias}
        onEdit={handleOpenModalParaEditar}
        onDelete={handleDeleteSecretaria}
        isLoading={loading}
        error={error}
      />

      <SecretariaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={secretariaParaEditar ? 'Editar Secretaria' : 'Nova Secretaria'}
      >
        <SecretariaForm
          secretaria={secretariaParaEditar}
          onSave={handleSaveSecretaria}
          onCancel={handleCloseModal}
          isLoading={loading && isModalOpen}
        />
        {operationError && (
          <div className="mt-3 p-3 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
            <AlertTriangle className="inline-block w-4 h-4 mr-1" /> 
            {operationError}
          </div>
        )}
      </SecretariaModal>
    </div>
  );
} 