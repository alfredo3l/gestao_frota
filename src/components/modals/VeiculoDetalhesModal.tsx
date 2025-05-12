'use client';

import { X, ExternalLink, Edit, Car, FileText, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Veiculo } from '@/types/Veiculo';

interface VeiculoDetalhesModalProps {
  isOpen: boolean;
  onClose: () => void;
  veiculo: Veiculo | null;
  onEdit: (veiculo: Veiculo) => void;
}

export default function VeiculoDetalhesModal({
  isOpen,
  onClose,
  veiculo,
  onEdit
}: VeiculoDetalhesModalProps) {
  if (!isOpen || !veiculo) return null;

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'inativo':
        return 'bg-red-100 text-red-800';
      case 'em_manutencao':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'inativo':
        return 'Inativo';
      case 'em_manutencao':
        return 'Em Manutenção';
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Detalhes do Veículo</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 flex-1">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Coluna da Esquerda - Foto e Informações Básicas */}
            <div className="md:w-1/3">
              <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 aspect-square flex items-center justify-center">
                {veiculo.foto_url ? (
                  <img 
                    src={veiculo.foto_url} 
                    alt={`${veiculo.modelo} - ${veiculo.placa}`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Car className="w-16 h-16 text-gray-400" />
                )}
              </div>
              
              <div className="space-y-3">
                <div className="text-center">
                  <Badge 
                    variant={
                      veiculo.status === 'ativo' ? 'success' : 
                      veiculo.status === 'inativo' ? 'error' : 
                      'warning'
                    }
                    className="text-xs px-3 py-1"
                  >
                    {getStatusText(veiculo.status)}
                  </Badge>
                </div>
                
                <div className="text-center">
                  <h3 className="font-bold text-xl">{veiculo.modelo}</h3>
                  <p className="text-lg font-medium">{veiculo.placa}</p>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="flex justify-between">
                    <span>Tipo:</span>
                    <span className="font-medium text-gray-900">{veiculo.tipo}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Ano:</span>
                    <span className="font-medium text-gray-900">{veiculo.ano}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Combustível:</span>
                    <span className="font-medium text-gray-900">{veiculo.combustivel}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Quilometragem:</span>
                    <span className="font-medium text-gray-900">{veiculo.quilometragem_atual.toLocaleString('pt-BR')} km</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Coluna da Direita - Detalhes e Documentos */}
            <div className="md:w-2/3 space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 border-b pb-1">Informações Adicionais</h3>
                
                <div className="text-sm">
                  <p className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>Secretaria:</span>
                    <span className="font-medium text-gray-900">{veiculo.secretaria_nome || 'Não informada'}</span>
                  </p>
                  
                  <p className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Cadastrado em:</span>
                    <span className="font-medium text-gray-900">{formatarData(veiculo.created_at)}</span>
                  </p>
                  
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Última atualização:</span>
                    <span className="font-medium text-gray-900">{formatarData(veiculo.updated_at)}</span>
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 border-b pb-1">Documentos</h3>
                
                <div className="space-y-2">
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">CRLV Digital</span>
                    </div>
                    {veiculo.crlv_url ? (
                      <a 
                        href={veiculo.crlv_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                      >
                        <span>Visualizar</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        Não disponível
                      </span>
                    )}
                  </div>
                  
                  <div className="p-3 border rounded-md flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Seguro</span>
                    </div>
                    {veiculo.seguro_url ? (
                      <a 
                        href={veiculo.seguro_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                      >
                        <span>Visualizar</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        Não disponível
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                <h3 className="font-medium text-gray-900 border-b pb-1">Informações de Uso</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-md text-center">
                    <p className="text-xs text-gray-500">Último Abastecimento</p>
                    <p className="text-lg font-medium">-</p>
                  </div>
                  
                  <div className="p-3 border rounded-md text-center">
                    <p className="text-xs text-gray-500">Próxima Manutenção</p>
                    <p className="text-lg font-medium">-</p>
                  </div>
                  
                  <div className="p-3 border rounded-md text-center">
                    <p className="text-xs text-gray-500">Custo Mensal (Média)</p>
                    <p className="text-lg font-medium">-</p>
                  </div>
                  
                  <div className="p-3 border rounded-md text-center">
                    <p className="text-xs text-gray-500">Consumo Médio</p>
                    <p className="text-lg font-medium">-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            Fechar
          </Button>
          <Button 
            type="button" 
            onClick={() => onEdit(veiculo)}
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar Veículo
          </Button>
        </div>
      </div>
    </div>
  );
} 