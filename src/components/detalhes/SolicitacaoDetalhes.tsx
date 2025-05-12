'use client';

import React from 'react';
import { ClipboardList, Calendar, MapPin, User, Car, Info, AlertCircle, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SolicitacaoDetalhesProps {
  solicitacao: any;
}

export default function SolicitacaoDetalhes({ solicitacao }: SolicitacaoDetalhesProps) {
  // Função para formatar data no padrão brasileiro
  const formatarData = (dataString: string | null | undefined) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  // Função para renderizar o badge de status com a cor correta
  const renderStatusBadge = (status: string) => {
    const statusNormalizado = status.toLowerCase();
    switch(statusNormalizado) {
      case 'pendente':
        return <Badge variant="warning">{status}</Badge>;
      case 'aprovada':
        return <Badge variant="info">{status}</Badge>;
      case 'em andamento':
        return <Badge variant="warning">{status}</Badge>;
      case 'concluída':
      case 'concluida':
        return <Badge variant="success">{status}</Badge>;
      case 'cancelada':
        return <Badge variant="error">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Função para renderizar o badge de prioridade
  const renderPrioridadeBadge = (prioridade: string) => {
    const prioridadeNormalizada = prioridade.toLowerCase();
    switch(prioridadeNormalizada) {
      case 'alta':
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>;
      case 'média':
      case 'media':
        return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>;
      case 'baixa':
        return <Badge className="bg-green-100 text-green-800">Baixa</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{prioridade}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          <ClipboardList className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-900">
            {solicitacao.numero}
          </h3>
          <p className="text-gray-500">{solicitacao.secretaria}</p>
        </div>
      </div>

      {/* Status e Prioridade */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Status:</span>
          {renderStatusBadge(solicitacao.status)}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Prioridade:</span>
          {renderPrioridadeBadge(solicitacao.prioridade)}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Data da Solicitação:</span>
          <span className="font-medium">{formatarData(solicitacao.dataRequisicao)}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Detalhes da Viagem */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Info className="h-5 w-5 mr-2 text-gray-500" />
              Detalhes da Viagem
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Destino:</span>{' '}
                <span className="font-medium">{solicitacao.destino}</span>
              </p>
              <p>
                <span className="text-gray-500">Distância estimada:</span>{' '}
                <span className="font-medium">{solicitacao.distanciaEstimada} km</span>
              </p>
              <p>
                <span className="text-gray-500">Período:</span>{' '}
                <span className="font-medium">
                  {formatarData(solicitacao.dataInicio)}
                  {solicitacao.dataInicio !== solicitacao.dataFim && ` a ${formatarData(solicitacao.dataFim)}`}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Número de passageiros:</span>{' '}
                <span className="font-medium">{solicitacao.passageiros}</span>
              </p>
            </div>
          </div>

          {/* Solicitante */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-gray-500" />
              Solicitante
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Nome:</span>{' '}
                <span className="font-medium">{solicitacao.solicitante.nome}</span>
              </p>
              <p>
                <span className="text-gray-500">Cargo:</span>{' '}
                <span className="font-medium">{solicitacao.solicitante.cargo}</span>
              </p>
              <p>
                <span className="text-gray-500">Departamento:</span>{' '}
                <span className="font-medium">{solicitacao.solicitante.departamento}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Motivo */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-gray-500" />
              Motivo da Viagem
            </h4>
            <div className="space-y-2 pl-7">
              <p className="text-gray-800">{solicitacao.motivo}</p>
            </div>
          </div>

          {/* Veículo e Motorista */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Car className="h-5 w-5 mr-2 text-gray-500" />
              Veículo e Motorista
            </h4>
            {solicitacao.veiculo ? (
              <div className="space-y-2 pl-7">
                <p>
                  <span className="text-gray-500">Veículo:</span>{' '}
                  <span className="font-medium">{solicitacao.veiculo.placa} - {solicitacao.veiculo.modelo}</span>
                </p>
                <p>
                  <span className="text-gray-500">Motorista:</span>{' '}
                  <span className="font-medium">
                    {solicitacao.motorista ? solicitacao.motorista.nome : 'Não designado'}
                  </span>
                </p>
              </div>
            ) : (
              <div className="pl-7">
                <p className="text-gray-500 italic">Veículo e motorista ainda não designados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 