'use client';

import { useState, useRef } from 'react';
import { X, Upload, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VeiculoFormData } from '@/types/Veiculo';

interface VeiculoNovoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (veiculo: VeiculoFormData) => Promise<void>;
  secretarias: { id: string; nome: string }[];
}

export default function VeiculoNovoModal({
  isOpen,
  onClose,
  onSave,
  secretarias
}: VeiculoNovoModalProps) {
  const initialFormData: VeiculoFormData = {
    placa: '',
    modelo: '',
    tipo: '',
    ano: new Date().getFullYear(),
    combustivel: '',
    status: 'ativo',
    quilometragem_atual: 0,
    secretaria_id: '',
    foto_file: null,
    documentos_files: [],
    crlv_file: null,
    seguro_file: null
  };

  const [formData, setFormData] = useState<VeiculoFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  
  const fotoInputRef = useRef<HTMLInputElement>(null);
  const documentosInputRef = useRef<HTMLInputElement>(null);
  const crlvInputRef = useRef<HTMLInputElement>(null);
  const seguroInputRef = useRef<HTMLInputElement>(null);

  const tiposVeiculo = [
    'Sedan',
    'Hatch',
    'SUV',
    'Caminhonete',
    'Van',
    'Caminhão',
    'Motocicleta',
    'Ônibus',
    'Outro'
  ];

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'ano' || name === 'quilometragem_atual') {
      setFormData({
        ...formData,
        [name]: Number(value)
      });
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
      if (name === 'foto_file') {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setFotoPreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
        
        setFormData({
          ...formData,
          foto_file: file
        });
      } else if (name === 'documentos_files') {
        setFormData({
          ...formData,
          documentos_files: Array.from(files)
        });
      } else if (name === 'crlv_file') {
        setFormData({
          ...formData,
          crlv_file: files[0]
        });
      } else if (name === 'seguro_file') {
        setFormData({
          ...formData,
          seguro_file: files[0]
        });
      }
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
      setFotoPreview(null);
    } catch (err) {
      setError('Ocorreu um erro ao salvar o veículo. Tente novamente.');
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
            <Car className="w-5 h-5 mr-2 text-blue-600" />
            Novo Veículo
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
                    Placa*
                  </label>
                  <Input
                    type="text"
                    name="placa"
                    value={formData.placa}
                    onChange={handleInputChange}
                    placeholder="ABC-1234"
                    required
                    className="w-full"
                    maxLength={8}
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Modelo*
                  </label>
                  <Input
                    type="text"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleInputChange}
                    placeholder="Ex: Toyota Corolla"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Tipo*
                  </label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {tiposVeiculo.map((tipo) => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Ano*
                  </label>
                  <Input
                    type="number"
                    name="ano"
                    value={formData.ano}
                    onChange={handleInputChange}
                    required
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Combustível*
                  </label>
                  <select
                    name="combustivel"
                    value={formData.combustivel}
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
                    Status*
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                    <option value="em_manutencao">Em Manutenção</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Quilometragem Atual*
                  </label>
                  <Input
                    type="number"
                    name="quilometragem_atual"
                    value={formData.quilometragem_atual}
                    onChange={handleInputChange}
                    required
                    min={0}
                    className="w-full"
                  />
                </div>
                
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
                    Foto do Veículo
                  </label>
                  <input
                    type="file"
                    ref={fotoInputRef}
                    name="foto_file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleTriggerFileInput(fotoInputRef)}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Enviar foto</span>
                    </Button>
                    {fotoPreview && (
                      <div className="ml-3 relative w-12 h-12 rounded-md overflow-hidden">
                        <img 
                          src={fotoPreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      CRLV Digital
                    </label>
                    <input
                      type="file"
                      ref={crlvInputRef}
                      name="crlv_file"
                      accept=".pdf,.jpg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleTriggerFileInput(crlvInputRef)}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Enviar CRLV</span>
                    </Button>
                    {formData.crlv_file && (
                      <span className="text-sm text-gray-500 ml-2">
                        {formData.crlv_file.name}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Seguro do Veículo
                    </label>
                    <input
                      type="file"
                      ref={seguroInputRef}
                      name="seguro_file"
                      accept=".pdf,.jpg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleTriggerFileInput(seguroInputRef)}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Enviar Seguro</span>
                    </Button>
                    {formData.seguro_file && (
                      <span className="text-sm text-gray-500 ml-2">
                        {formData.seguro_file.name}
                      </span>
                    )}
                  </div>
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
                <Car className="w-4 h-4" />
                Salvar Veículo
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 