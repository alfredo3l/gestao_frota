'use client';

import { useState, useRef } from 'react';
import { X, Upload, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MotoristaFormData } from '@/types/Motorista';

interface MotoristaNovoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (motorista: MotoristaFormData) => Promise<void>;
  secretarias: { id: string; nome: string }[];
}

export default function MotoristaNovoModal({
  isOpen,
  onClose,
  onSave,
  secretarias
}: MotoristaNovoModalProps) {
  const initialFormData: MotoristaFormData = {
    nome: '',
    cpf: '',
    cnh: '',
    categoria_cnh: '',
    validade_cnh: new Date().toISOString().slice(0, 10),
    secretaria_id: '',
    status: 'ativo',
    foto_file: undefined,
    cnh_file: undefined
  };

  const [formData, setFormData] = useState<MotoristaFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  
  const fotoInputRef = useRef<HTMLInputElement>(null);
  const cnhInputRef = useRef<HTMLInputElement>(null);

  // Lista de categorias de CNH
  const categoriasCNH = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'AB',
    'AC',
    'AD',
    'AE'
  ];

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      if (name === 'foto_file') {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setFotoPreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
      
      setFormData({
        ...formData,
        [name]: file
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
      setFotoPreview(null);
    } catch (err) {
      setError('Ocorreu um erro ao salvar o motorista. Tente novamente.');
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
            <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
            Novo Motorista
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
                    Nome Completo*
                  </label>
                  <Input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: João da Silva"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    CPF*
                  </label>
                  <Input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    required
                    placeholder="000.000.000-00"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Número da CNH*
                  </label>
                  <Input
                    type="text"
                    name="cnh"
                    value={formData.cnh}
                    onChange={handleInputChange}
                    required
                    placeholder="00000000000"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Categoria da CNH*
                  </label>
                  <select
                    name="categoria_cnh"
                    value={formData.categoria_cnh}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    {categoriasCNH.map((categoria) => (
                      <option key={categoria} value={categoria}>{categoria}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Coluna da direita */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Validade da CNH*
                  </label>
                  <Input
                    type="date"
                    name="validade_cnh"
                    value={formData.validade_cnh}
                    onChange={handleInputChange}
                    required
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
                      <option key={secretaria.id} value={secretaria.id}>{secretaria.nome}</option>
                    ))}
                  </select>
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
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Foto do Motorista
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
                      <span>Enviar Foto</span>
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
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Arquivo da CNH
                  </label>
                  <input
                    type="file"
                    ref={cnhInputRef}
                    name="cnh_file"
                    accept=".pdf,.jpg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleTriggerFileInput(cnhInputRef)}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Enviar CNH</span>
                  </Button>
                  {formData.cnh_file && (
                    <span className="text-sm text-gray-500 ml-2">
                      {formData.cnh_file.name}
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
                <UserPlus className="w-4 h-4" />
                Salvar Motorista
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 