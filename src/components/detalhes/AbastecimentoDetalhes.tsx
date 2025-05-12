'use client';

import React from 'react';
import { Fuel, Car, User, Calendar, FileText, TrendingUp, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AbastecimentoDetalhesProps {
  abastecimento: any;
}

export default function AbastecimentoDetalhes({ abastecimento }: AbastecimentoDetalhesProps) {
  // Função para formatar data no padrão brasileiro
  const formatarData = (dataString: string) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  // Função para formatar valores monetários
  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          <Fuel className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-900">
            Abastecimento em {formatarData(abastecimento.data)}
          </h3>
          <p className="text-gray-500">{abastecimento.secretaria}</p>
        </div>
      </div>

      {/* Informações */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Car className="h-5 w-5 mr-2 text-gray-500" />
              Veículo
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Placa:</span>{' '}
                <span className="font-medium">{abastecimento.veiculo.placa}</span>
              </p>
              <p>
                <span className="text-gray-500">Modelo:</span>{' '}
                <span className="font-medium">{abastecimento.veiculo.modelo}</span>
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-gray-500" />
              Motorista
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Nome:</span>{' '}
                <span className="font-medium">{abastecimento.motorista.nome}</span>
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              Data e Hora
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Data:</span>{' '}
                <span className="font-medium">{formatarData(abastecimento.data)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <Fuel className="h-5 w-5 mr-2 text-gray-500" />
              Abastecimento
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Combustível:</span>{' '}
                <span className="font-medium">{abastecimento.combustivel}</span>
              </p>
              <p>
                <span className="text-gray-500">Litros:</span>{' '}
                <span className="font-medium">{abastecimento.litros.toFixed(1)} L</span>
              </p>
              <p>
                <span className="text-gray-500">Valor:</span>{' '}
                <span className="font-medium">{formatarValor(abastecimento.valor)}</span>
              </p>
              <p>
                <span className="text-gray-500">Preço por litro:</span>{' '}
                <span className="font-medium">{formatarValor(abastecimento.valor / abastecimento.litros)}</span>
              </p>
              <p>
                <span className="text-gray-500">Cupom fiscal:</span>{' '}
                <span className="font-medium">{abastecimento.cupomFiscal ? 'Sim' : 'Não'}</span>
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-gray-500" />
              Quilometragem
            </h4>
            <div className="space-y-2 pl-7">
              <p>
                <span className="text-gray-500">Km Atual:</span>{' '}
                <span className="font-medium">{abastecimento.kmAtual.toLocaleString('pt-BR')} km</span>
              </p>
              <p>
                <span className="text-gray-500">Km Anterior:</span>{' '}
                <span className="font-medium">{abastecimento.kmAnterior.toLocaleString('pt-BR')} km</span>
              </p>
              <p>
                <span className="text-gray-500">Km Rodados:</span>{' '}
                <span className="font-medium">{abastecimento.kmRodados.toLocaleString('pt-BR')} km</span>
              </p>
              <p>
                <span className="text-gray-500">Consumo Médio:</span>{' '}
                <span className="font-medium">{abastecimento.consumoMedio.toFixed(2)} km/L</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Observações */}
      {abastecimento.observacoes && (
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-gray-500" />
            Observações
          </h4>
          <p className="text-gray-600 whitespace-pre-line pl-7">{abastecimento.observacoes}</p>
        </div>
      )}
    </div>
  );
} 