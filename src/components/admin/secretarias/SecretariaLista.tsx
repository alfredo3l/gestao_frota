'use client';

import { Secretaria } from '@/hooks/useSecretarias';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, AlertTriangle, Loader2 } from 'lucide-react';

interface SecretariaListaProps {
  secretarias: Secretaria[];
  onEdit: (secretaria: Secretaria) => void;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export default function SecretariaLista({
  secretarias,
  onEdit,
  onDelete,
  isLoading,
  error,
}: SecretariaListaProps) {

  if (isLoading && secretarias.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2 text-gray-600">Carregando secretarias...</p>
      </div>
    );
  }

  if (error && secretarias.length === 0) {
    return (
      <div className="my-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        <p>{error}</p>
      </div>
    );
  }
  
  if (secretarias.length === 0 && !isLoading) {
    return (
      <div className="my-4 p-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md text-center">
        Nenhuma secretaria cadastrada ainda.
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white shadow border rounded-lg">
      <ul role="list" className="divide-y divide-gray-200">
        {secretarias.map((secretaria) => (
          <li key={secretaria.id} className="px-4 py-4 sm:px-6 flex items-center justify-between hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-800 truncate">
              {secretaria.nome}
            </span>
            <div className="ml-4 flex-shrink-0 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(secretaria)}
                className="text-blue-600 hover:text-blue-700 border-blue-300 hover:border-blue-400"
              >
                <Edit className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Editar</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    if (window.confirm(`Tem certeza que deseja excluir a secretaria "${secretaria.nome}"? Esta ação não pode ser desfeita.`)) {
                        onDelete(secretaria.id);
                    }
                }}
                className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
              >
                <Trash2 className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Excluir</span>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 