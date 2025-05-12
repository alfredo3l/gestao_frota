'use client';

import React from 'react';
import { Car, Wrench, Calendar, AlertTriangle, FileText, Clock, User, MapPin, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ManutencaoDetalhesProps {
  manutencao: any;
}

export default function ManutencaoDetalhes({ manutencao }: ManutencaoDetalhesProps) {
  // Função para formatar data no padrão brasileiro
  const formatarData = (dataString: string | null | undefined) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  // Função para formatar valores monetários
  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Função para renderizar o badge de status com a cor correta
  const renderStatusBadge = (status: string) => {
    const statusNormalizado = status.toLowerCase();
    switch(statusNormalizado) {
      case 'agendada':
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
      case 'baixa':
        return <Badge variant="info">{prioridade}</Badge>;
      case 'média':
      case 'media':
        return <Badge variant="warning">{prioridade}</Badge>;
      case 'alta':
        return <Badge variant="error">{prioridade}</Badge>;
      default:
        return <Badge>{prioridade}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
          <Wrench className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-900">{manutencao.titulo}</h3>
          <p className="text-gray-500">{manutencao.fornecedor}</p>
        </div>
      </div>

      {/* Status e Prioridade */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Status:</span>
          {renderStatusBadge(manutencao.status)}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Prioridade:</span>
          {renderPrioridadeBadge(manutencao.prioridade)}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Tipo:</span>
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            manutencao.tipo === 'Preventiva' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {manutencao.tipo}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Informações do Veículo */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Car className="h-5 w-5 mr-2 text-gray-500" />
              Informações do Veículo
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Placa:</span>{' '}
                <span className="font-medium">{manutencao.veiculo.placa}</span>
              </p>
              <p>
                <span className="text-gray-500">Modelo:</span>{' '}
                <span className="font-medium">{manutencao.veiculo.modelo}</span>
              </p>
              <p>
                <span className="text-gray-500">Ano:</span>{' '}
                <span className="font-medium">{manutencao.veiculo.ano}</span>
              </p>
              <p>
                <span className="text-gray-500">Quilometragem:</span>{' '}
                <span className="font-medium">{manutencao.km.toLocaleString('pt-BR')} km</span>
              </p>
            </div>
          </div>

          {/* Datas */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              Datas
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Data Agendada:</span>{' '}
                <span className="font-medium">{formatarData(manutencao.dataAgendada)}</span>
              </p>
              <p>
                <span className="text-gray-500">Data de Conclusão:</span>{' '}
                <span className="font-medium">
                  {manutencao.dataConclusao ? formatarData(manutencao.dataConclusao) : 'Não concluída'}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Detalhes do Serviço */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Wrench className="h-5 w-5 mr-2 text-gray-500" />
              Detalhes do Serviço
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Fornecedor:</span>{' '}
                <span className="font-medium">{manutencao.fornecedor}</span>
              </p>
              <p>
                <span className="text-gray-500">Valor:</span>{' '}
                <span className="font-medium">{formatarValor(manutencao.valor)}</span>
              </p>
              <p>
                <span className="text-gray-500">Descrição:</span>
              </p>
              <p className="text-gray-800 mt-2 bg-gray-50 p-3 rounded border border-gray-100">
                {manutencao.descricao}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 