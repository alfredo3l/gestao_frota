'use client';

import React from 'react';
import { User, Phone, Mail, Calendar, AlertTriangle, Building, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MotoristaDetalhesProps {
  motorista: any;
}

export default function MotoristaDetalhes({ motorista }: MotoristaDetalhesProps) {
  // Função para renderizar o badge de status CNH com a cor correta
  const renderStatusCNHBadge = (status: string) => {
    const statusNormalizado = status.toLowerCase();
    switch(statusNormalizado) {
      case 'válida':
      case 'valida':
        return <Badge variant="success">{status}</Badge>;
      case 'prestes a vencer':
        return <Badge variant="warning">{status}</Badge>;
      case 'vencida':
        return <Badge variant="error">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Função para renderizar o badge de status do motorista
  const renderStatusMotoristaBadge = (status: string) => {
    const statusNormalizado = status.toLowerCase();
    switch(statusNormalizado) {
      case 'ativo':
        return <Badge variant="success">{status}</Badge>;
      case 'inativo':
        return <Badge variant="error">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Função para formatar data no padrão brasileiro
  const formatarData = (dataString: string | null | undefined) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-900">
            {motorista.nome}
          </h3>
          <p className="text-gray-500">{motorista.secretaria}</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">Status:</span>
        {renderStatusMotoristaBadge(motorista.status)}
      </div>

      {/* Informações Pessoais */}
      <div className="border rounded-lg p-4">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <User className="h-5 w-5 mr-2 text-gray-500" />
          Informações Pessoais
        </h4>
        <div className="space-y-2 pl-7">
          <p>
            <span className="text-gray-500">CPF:</span>{' '}
            <span className="font-medium">{motorista.cpf}</span>
          </p>
          <p>
            <span className="text-gray-500">E-mail:</span>{' '}
            <span className="font-medium">{motorista.email || 'Não informado'}</span>
          </p>
          <p>
            <span className="text-gray-500">Telefone:</span>{' '}
            <span className="font-medium">{motorista.telefone || 'Não informado'}</span>
          </p>
          <p>
            <span className="text-gray-500">Secretaria:</span>{' '}
            <span className="font-medium">{motorista.secretaria}</span>
          </p>
        </div>
      </div>

      {/* Informações da CNH */}
      <div className="border rounded-lg p-4">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-gray-500" />
          Carteira Nacional de Habilitação
        </h4>
        <div className="space-y-2 pl-7">
          <p>
            <span className="text-gray-500">Número:</span>{' '}
            <span className="font-medium">{motorista.cnh.numero}</span>
          </p>
          <p>
            <span className="text-gray-500">Categoria:</span>{' '}
            <span className="font-medium">{motorista.cnh.categoria}</span>
          </p>
          <p>
            <span className="text-gray-500">Validade:</span>{' '}
            <span className="font-medium">{formatarData(motorista.cnh.validade)}</span>
          </p>
          <p>
            <span className="text-gray-500">Status:</span>{' '}
            <span className="font-medium">{renderStatusCNHBadge(motorista.cnh.status)}</span>
          </p>
        </div>
      </div>

      {/* Última Viagem */}
      <div className="border rounded-lg p-4">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-500" />
          Atividade
        </h4>
        <div className="space-y-2 pl-7">
          <p>
            <span className="text-gray-500">Última Viagem:</span>{' '}
            <span className="font-medium">
              {motorista.ultimaViagem ? formatarData(motorista.ultimaViagem) : 'Nenhuma viagem registrada'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
} 