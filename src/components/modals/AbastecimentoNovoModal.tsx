'use client';

import { useState, useRef } from 'react';
import { X, Upload, Fuel, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AbastecimentoFormData } from '@/types/Abastecimento';

interface AbastecimentoNovoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (abastecimento: AbastecimentoFormData) => Promise<void>;
  veiculos: { id: string; placa: string; modelo: string }[];
  motoristas: { id: string; nome: string }[];
}

export default function AbastecimentoNovoModal({
  isOpen,
  onClose,
  onSave,
  veiculos,
  motoristas
}: AbastecimentoNovoModalProps) {
  const initialFormData: AbastecimentoFormData = {
    veiculo_id: '',
    motorista_id: '',
    data: new Date().toISOString().slice(0, 10),
    litros: 0,
    valor_total: 0,
    tipo_combustivel: '',
    quilometragem: 0,
    cupom_fiscal_file: undefined
  };

  const [formData, setFormData] = useState<AbastecimentoFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [valorLitro, setValorLitro] = useState<number>(0);
  
  const cupomFiscalInputRef = useRef<HTMLInputElement>(null);

  // Lista de tipos de combustível
  const tiposCombustivel = [
    'Gasolina',
    'Etanol',
    'Flex',
    'Diesel',
    'GNV',
    'Elétrico',
    'Híbrido'
  ];

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'litros' || name === 'valor_total' || name === 'quilometragem') {
      setFormData({
        ...formData,
        [name]: value === '' ? 0 : Number(value)
      });

      // Calcular o valor por litro quando os valores são alterados
      if (name === 'litros' && formData.valor_total > 0) {
        const litros = Number(value);
        if (litros > 0) {
          setValorLitro(formData.valor_total / litros);
        }
      } else if (name === 'valor_total' && formData.litros > 0) {
        const valorTotal = Number(value);
        if (valorTotal > 0) {
          setValorLitro(valorTotal / formData.litros);
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
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
      setError('Ocorreu um erro ao salvar o abastecimento. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <Fuel className="w-5 h-5 mr-2 text-blue-600" />
            Novo Abastecimento
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
                    Motorista*
                  </label>
                  <select
                    name="motorista_id"
                    value={formData.motorista_id}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {motoristas.map((motorista) => (
                      <option key={motorista.id} value={motorista.id}>
                        {motorista.nome}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Data do Abastecimento*
                  </label>
                  <Input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Tipo de Combustível*
                  </label>
                  <select
                    name="tipo_combustivel"
                    value={formData.tipo_combustivel}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {tiposCombustivel.map((combustivel) => (
                      <option key={combustivel} value={combustivel}>{combustivel}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Coluna da direita */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Litros Abastecidos*
                  </label>
                  <Input
                    type="number"
                    name="litros"
                    value={formData.litros || ''}
                    onChange={handleInputChange}
                    required
                    min={0.1}
                    step={0.01}
                    className="w-full"
                    placeholder="Ex: 45.7"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Valor Total (R$)*
                  </label>
                  <Input
                    type="number"
                    name="valor_total"
                    value={formData.valor_total || ''}
                    onChange={handleInputChange}
                    required
                    min={0.01}
                    step={0.01}
                    className="w-full"
                    placeholder="Ex: 320.50"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Valor por Litro (R$)
                  </label>
                  <Input
                    type="number"
                    value={valorLitro ? valorLitro.toFixed(3) : ''}
                    disabled
                    className="w-full bg-gray-50"
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
                    step={1}
                    className="w-full"
                    placeholder="Ex: 45870"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Cupom Fiscal
              </label>
              <input
                type="file"
                ref={cupomFiscalInputRef}
                name="cupom_fiscal_file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleTriggerFileInput(cupomFiscalInputRef)}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Enviar Cupom Fiscal</span>
                </Button>
                {formData.cupom_fiscal_file && (
                  <span className="text-sm text-gray-500 ml-2">
                    {formData.cupom_fiscal_file.name}
                  </span>
                )}
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
                <Fuel className="w-4 h-4" />
                Salvar Abastecimento
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 