'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { VeiculoFormData } from '@/types/Veiculo';

interface VeiculoFormularioProps {
  veiculo?: any;
  secretarias: any[];
  onSave: (data: VeiculoFormData) => Promise<void>;
  onCancel: () => void;
}

export default function VeiculoFormulario({
  veiculo,
  secretarias,
  onSave,
  onCancel
}: VeiculoFormularioProps) {
  // Estado inicial
  const [formData, setFormData] = useState<VeiculoFormData>(() => {
    // Determinar o secretaria_id correto
    const secretariaIdValue = veiculo?.secretaria 
      ? (secretarias.find(s => s.nome === veiculo.secretaria)?.id || '')
      : '';
    
    return {
      placa: veiculo?.placa || '',
      modelo: veiculo?.modelo || '',
      ano: veiculo?.ano || new Date().getFullYear(),
      tipo: veiculo?.tipo || 'Sedan',
      combustivel: veiculo?.combustivel || 'Flex',
      status: veiculo?.status === 'Ativo' ? 'ativo' : veiculo?.status === 'Inativo' ? 'inativo' : 'em_manutencao',
      quilometragem_atual: veiculo?.km || 0,
      secretaria_id: secretariaIdValue,
      foto_file: null,
      documentos_files: []
    };
  });

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  // Handlers para mudanças nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Converter valores numéricos
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.name === 'foto_file') {
        setFormData({
          ...formData,
          foto_file: e.target.files[0]
        });
      } else if (e.target.name === 'documentos_files') {
        setFormData({
          ...formData,
          documentos_files: Array.from(e.target.files)
        });
      }
    }
  };

  // Handler para envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setEnviando(true);
      setErro('');
      await onSave(formData);
    } catch (error) {
      setErro('Ocorreu um erro ao salvar o veículo. Tente novamente.');
      console.error('Erro ao salvar veículo:', error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dados de identificação */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="placa">Placa</Label>
          <Input
            type="text"
            id="placa"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            pattern="[A-Z]{3}-[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2}"
            placeholder="ABC-1234 ou ABC1D23"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Formato: ABC-1234 ou padrão Mercosul</p>
        </div>

        <div>
          <Label htmlFor="modelo">Modelo</Label>
          <Input
            type="text"
            id="modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            placeholder="Ex: Toyota Corolla"
            required
          />
        </div>
      </div>

      {/* Características */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="ano">Ano</Label>
          <Input
            type="number"
            id="ano"
            name="ano"
            value={formData.ano || ''}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear() + 1}
            required
          />
        </div>

        <div>
          <Label htmlFor="tipo">Tipo de veículo</Label>
          <Select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="Sedan">Sedan</option>
            <option value="Hatch">Hatch</option>
            <option value="SUV">SUV</option>
            <option value="Caminhonete">Caminhonete</option>
            <option value="Utilitário">Utilitário</option>
            <option value="Ônibus">Ônibus</option>
            <option value="Caminhão">Caminhão</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="combustivel">Combustível</Label>
          <Select
            id="combustivel"
            name="combustivel"
            value={formData.combustivel}
            onChange={handleChange}
            required
          >
            <option value="Flex">Flex</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diesel">Diesel</option>
            <option value="Etanol">Etanol</option>
            <option value="Elétrico">Elétrico</option>
            <option value="GNV">GNV</option>
          </Select>
        </div>
      </div>

      {/* Status e secretaria */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="em_manutencao">Em Manutenção</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="quilometragem_atual">Quilometragem atual (km)</Label>
          <Input
            type="number"
            id="quilometragem_atual"
            name="quilometragem_atual"
            value={formData.quilometragem_atual || ''}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div>
          <Label htmlFor="secretaria_id">Secretaria</Label>
          <Select
            id="secretaria_id"
            name="secretaria_id"
            value={formData.secretaria_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecionar secretaria</option>
            {secretarias.map((secretaria) => (
              <option key={secretaria.id} value={secretaria.id}>
                {secretaria.nome}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Arquivos */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="foto_file">Foto do veículo (opcional)</Label>
          <Input
            type="file"
            id="foto_file"
            name="foto_file"
            onChange={handleFileChange}
            accept="image/*"
          />
          {veiculo?.imagens > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {veiculo.imagens} {veiculo.imagens === 1 ? 'imagem cadastrada' : 'imagens cadastradas'}.
              {formData.foto_file && " Será adicionada nova imagem."}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="documentos_files">Documentos (opcional)</Label>
          <Input
            type="file"
            id="documentos_files"
            name="documentos_files"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            multiple
          />
          {veiculo?.documentos?.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {veiculo.documentos.length} {veiculo.documentos.length === 1 ? 'documento cadastrado' : 'documentos cadastrados'}.
              {formData.documentos_files.length > 0 && " Serão adicionados novos documentos."}
            </p>
          )}
        </div>
      </div>

      {/* Mensagem de erro */}
      {erro && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{erro}</p>
        </div>
      )}

      {/* Ações */}
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={enviando}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={enviando}
        >
          {enviando ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
} 