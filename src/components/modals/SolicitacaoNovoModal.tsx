'use client';

import { useState } from 'react';
import { X, Calendar, MapPin, Users, Truck, FileText, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SolicitacaoFormData } from '@/types/Solicitacao';

interface SolicitacaoNovoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (solicitacao: SolicitacaoFormData) => Promise<void>;
  veiculos: { id: string; placa: string; modelo: string }[];
  motoristas: { id: string; nome: string }[];
}

export default function SolicitacaoNovoModal({
  isOpen,
  onClose,
  onSave,
  veiculos,
  motoristas
}: SolicitacaoNovoModalProps) {
  const initialFormData: SolicitacaoFormData = {
    secretaria_id: '',
    data_prevista_inicio: new Date().toISOString().slice(0, 10),
    data_prevista_fim: new Date().toISOString().slice(0, 10),
    destino: '',
    finalidade: '',
    justificativa: '',
    observacoes: ''
  };

  const [formData, setFormData] = useState<SolicitacaoFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lista de prioridades de solicitação
  const prioridades = [
    'normal',
    'urgente',
    'emergencial'
  ];

  // Títulos para as prioridades
  const prioridadesTitulo: Record<string, string> = {
    normal: 'Normal',
    urgente: 'Urgente',
    emergencial: 'Emergencial'
  };

  // Lista de secretarias (mock)
  const secretarias = [
    { id: '1', nome: 'Administração' },
    { id: '2', nome: 'Educação' },
    { id: '3', nome: 'Saúde' },
    { id: '4', nome: 'Infraestrutura' },
    { id: '5', nome: 'Assistência Social' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSave(formData);
      onClose();
      setFormData(initialFormData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar solicitação');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <ClipboardList className="w-5 h-5 mr-2 text-blue-600" />
            Nova Solicitação de Veículo
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 flex-1">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coluna da esquerda */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Secretaria*
                  </label>
                  <select
                    name="secretaria_id"
                    value={formData.secretaria_id}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {secretarias.map((secretaria) => (
                      <option key={secretaria.id} value={secretaria.id}>
                        {secretaria.nome}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Data Início*
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      name="data_prevista_inicio"
                      value={formData.data_prevista_inicio}
                      onChange={handleInputChange}
                      required
                      className="w-full h-10 pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Data Fim
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      name="data_prevista_fim"
                      value={formData.data_prevista_fim}
                      onChange={handleInputChange}
                      className="w-full h-10 pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Destino*
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      name="destino"
                      value={formData.destino}
                      onChange={handleInputChange}
                      required
                      placeholder="Local de destino"
                      className="w-full h-10 pl-10"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
              </div>
              
              {/* Coluna da direita */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Finalidade/Motivo*
                  </label>
                  <Textarea
                    name="finalidade"
                    value={formData.finalidade}
                    onChange={handleInputChange}
                    required
                    placeholder="Descreva o motivo da viagem"
                    className="h-24"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Justificativa
                  </label>
                  <Textarea
                    name="justificativa"
                    value={formData.justificativa || ''}
                    onChange={handleInputChange}
                    placeholder="Justificativa adicional se necessário"
                    className="h-24"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Observações
                  </label>
                  <Input
                    type="text"
                    name="observacoes"
                    value={formData.observacoes || ''}
                    onChange={handleInputChange}
                    placeholder="Observações adicionais"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Solicitação'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 