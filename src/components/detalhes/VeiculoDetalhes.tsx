'use client';

import React from 'react';
import { Car, Calendar, FileText, Wrench, Fuel } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VeiculoDetalhesProps {
  veiculo: any;
}

export default function VeiculoDetalhes({ veiculo }: VeiculoDetalhesProps) {
  // Função para renderizar o badge de status com a cor correta
  const renderStatusBadge = (status: string) => {
    const statusNormalizado = status.toLowerCase();
    switch(statusNormalizado) {
      case 'ativo':
        return <Badge variant="success">{status}</Badge>;
      case 'inativo':
        return <Badge variant="error">{status}</Badge>;
      case 'em manutenção':
      case 'em_manutencao':
        return <Badge variant="warning">{status}</Badge>;
      case 'em uso':
        return <Badge variant="info">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          <Car className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-900">
            {veiculo.placa} - {veiculo.modelo}
          </h3>
          <p className="text-gray-500">{veiculo.secretaria}</p>
        </div>
      </div>

      {/* Informações */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Car className="h-5 w-5 mr-2 text-gray-500" />
              Informações Básicas
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Placa:</span>{' '}
                <span className="font-medium">{veiculo.placa}</span>
              </p>
              <p>
                <span className="text-gray-500">Modelo:</span>{' '}
                <span className="font-medium">{veiculo.modelo}</span>
              </p>
              <p>
                <span className="text-gray-500">Ano:</span>{' '}
                <span className="font-medium">{veiculo.ano}</span>
              </p>
              <p>
                <span className="text-gray-500">Tipo:</span>{' '}
                <span className="font-medium">{veiculo.tipo}</span>
              </p>
              <p>
                <span className="text-gray-500">Status:</span>{' '}
                <span className="font-medium">{renderStatusBadge(veiculo.status)}</span>
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Fuel className="h-5 w-5 mr-2 text-gray-500" />
              Combustível e Quilometragem
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Tipo de Combustível:</span>{' '}
                <span className="font-medium">{veiculo.combustivel}</span>
              </p>
              <p>
                <span className="text-gray-500">Quilometragem:</span>{' '}
                <span className="font-medium">{veiculo.km.toLocaleString('pt-BR')} km</span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Wrench className="h-5 w-5 mr-2 text-gray-500" />
              Manutenção
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Última Manutenção:</span>{' '}
                <span className="font-medium">
                  {veiculo.ultimaManutencao ? new Date(veiculo.ultimaManutencao).toLocaleDateString('pt-BR') : 'N/A'}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Próxima Manutenção:</span>{' '}
                <span className="font-medium">
                  {veiculo.proximaManutencao ? new Date(veiculo.proximaManutencao).toLocaleDateString('pt-BR') : 'N/A'}
                </span>
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-gray-500" />
              Documentos
            </h4>
            <div className="space-y-2 pl-7">
              {veiculo.documentos && veiculo.documentos.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {veiculo.documentos.map((doc: string, index: number) => (
                    <Badge key={index} className="bg-gray-100 text-gray-800">
                      {doc}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Nenhum documento cadastrado</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 