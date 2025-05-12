'use client';

import { useState, useRef } from 'react';
import { X, Upload, Wrench, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ManutencaoFormData } from '@/types/Manutencao';

interface ManutencaoNovoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (manutencao: ManutencaoFormData) => Promise<void>;
  veiculos: { id: string; placa: string; modelo: string }[];
}

export default function ManutencaoNovoModal({
  isOpen,
  onClose,
  onSave,
  veiculos
}: ManutencaoNovoModalProps) {
  const initialFormData: ManutencaoFormData = {
    veiculo_id: '',
    tipo: 'preventiva',
    descricao: '',
    valor: 0,
    fornecedor: '',
    data_inicio: new Date().toISOString().slice(0, 10),
    data_fim: undefined,
    status: 'agendada',
    quilometragem: 0,
    proxima_revisao_km: undefined,
    proxima_revisao_data: undefined,
    notas: '',
    ordem_servico_file: undefined,
    nota_fiscal_file: undefined
  };

  const [formData, setFormData] = useState<ManutencaoFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const ordemServicoInputRef = useRef<HTMLInputElement>(null);
  const notaFiscalInputRef = useRef<HTMLInputElement>(null);

  // Lista de tipos de manutenção
  const tiposManutencao = [
    'preventiva',
    'corretiva'
  ];

  // Lista de status de manutenção
  const statusManutencao = [
    'agendada',
    'em_andamento',
    'concluida',
    'cancelada'
  ];

  // Títulos para os tipos de manutenção
  const tiposTitulo: Record<string, string> = {
    preventiva: 'Preventiva',
    corretiva: 'Corretiva'
  };

  // Títulos para os status
  const statusTitulo: Record<string, string> = {
    agendada: 'Agendada',
    em_andamento: 'Em Andamento',
    concluida: 'Concluída',
    cancelada: 'Cancelada'
  };

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'valor' || name === 'quilometragem' || name === 'proxima_revisao_km') {
      setFormData({
        ...formData,
        [name]: value === '' ? undefined : Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value === '' ? undefined : value
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleTriggerFileInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
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
      setError('Ocorreu um erro ao salvar a manutenção. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <Wrench className="w-5 h-5 mr-2 text-blue-600" />
            Nova Manutenção
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
                    Veículo*
                  </label>
                  <select
                    name="veiculo_id"
                    value={formData.veiculo_id}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {veiculos.map((veiculo) => (
                      <option key={veiculo.id} value={veiculo.id}>
                        {veiculo.placa} - {veiculo.modelo}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Tipo de Manutenção*
                  </label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {tiposManutencao.map((tipo) => (
                      <option key={tipo} value={tipo}>{tiposTitulo[tipo]}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Descrição*
                  </label>
                  <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder="Descreva o serviço a ser realizado"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Fornecedor/Oficina*
                  </label>
                  <Input
                    type="text"
                    name="fornecedor"
                    value={formData.fornecedor}
                    onChange={handleInputChange}
                    required
                    placeholder="Nome da oficina ou prestador"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Valor (R$)*
                  </label>
                  <Input
                    type="number"
                    name="valor"
                    value={formData.valor || ''}
                    onChange={handleInputChange}
                    required
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Quilometragem Atual*
                  </label>
                  <Input
                    type="number"
                    name="quilometragem"
                    value={formData.quilometragem || ''}
                    onChange={handleInputChange}
                    required
                    min={0}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Coluna da direita */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Data de Início*
                  </label>
                  <Input
                    type="date"
                    name="data_inicio"
                    value={formData.data_inicio}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Data de Conclusão
                  </label>
                  <Input
                    type="date"
                    name="data_fim"
                    value={formData.data_fim || ''}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Status*
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statusManutencao.map((status) => (
                      <option key={status} value={status}>{statusTitulo[status]}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Próxima Revisão (km)
                  </label>
                  <Input
                    type="number"
                    name="proxima_revisao_km"
                    value={formData.proxima_revisao_km || ''}
                    onChange={handleInputChange}
                    min={0}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Data da Próxima Revisão
                  </label>
                  <Input
                    type="date"
                    name="proxima_revisao_data"
                    value={formData.proxima_revisao_data || ''}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Observações
                  </label>
                  <textarea
                    name="notas"
                    value={formData.notas || ''}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Observações adicionais sobre a manutenção"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Ordem de Serviço
                </label>
                <input
                  type="file"
                  ref={ordemServicoInputRef}
                  name="ordem_servico_file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleTriggerFileInput(ordemServicoInputRef)}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Enviar Ordem de Serviço</span>
                  </Button>
                  {formData.ordem_servico_file && (
                    <span className="text-sm text-gray-500 ml-2">
                      {formData.ordem_servico_file.name}
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Nota Fiscal
                </label>
                <input
                  type="file"
                  ref={notaFiscalInputRef}
                  name="nota_fiscal_file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleTriggerFileInput(notaFiscalInputRef)}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Enviar Nota Fiscal</span>
                  </Button>
                  {formData.nota_fiscal_file && (
                    <span className="text-sm text-gray-500 ml-2">
                      {formData.nota_fiscal_file.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                Salvando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Salvar Manutenção
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 