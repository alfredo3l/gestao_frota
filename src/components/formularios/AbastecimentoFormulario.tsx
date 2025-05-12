'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AbastecimentoFormData } from '@/types/Abastecimento';

interface AbastecimentoFormularioProps {
  abastecimento?: any;
  veiculos: any[];
  motoristas: any[];
  onSave: (data: AbastecimentoFormData) => Promise<void>;
  onCancel: () => void;
}

export default function AbastecimentoFormulario({
  abastecimento,
  veiculos,
  motoristas,
  onSave,
  onCancel
}: AbastecimentoFormularioProps) {
  // Estado inicial
  const [formData, setFormData] = useState<AbastecimentoFormData>({
    veiculo_id: abastecimento?.veiculo.id || '',
    motorista_id: abastecimento?.motorista.id || '',
    data: abastecimento?.data || new Date().toISOString().slice(0, 10),
    tipo_combustivel: abastecimento?.combustivel || 'Gasolina',
    litros: abastecimento?.litros || 0,
    valor_total: abastecimento?.valor || 0,
    quilometragem: abastecimento?.kmAtual || 0,
    cupom_fiscal_file: null,
    observacoes: abastecimento?.observacoes || ''
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
      setFormData({
        ...formData,
        cupom_fiscal_file: e.target.files[0]
      });
    }
  };

  // Cálculos automáticos
  const valorPorLitro = formData.litros > 0 
    ? (formData.valor_total / formData.litros).toFixed(2)
    : '0.00';

  // Handler para envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setEnviando(true);
      setErro('');
      await onSave(formData);
    } catch (error) {
      setErro('Ocorreu um erro ao salvar o abastecimento. Tente novamente.');
      console.error('Erro ao salvar abastecimento:', error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dados gerais */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="veiculo_id">Veículo</Label>
          <Select
            id="veiculo_id"
            name="veiculo_id"
            value={formData.veiculo_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um veículo</option>
            {veiculos.map((veiculo) => (
              <option key={veiculo.id} value={veiculo.id}>
                {veiculo.placa} - {veiculo.modelo}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="motorista_id">Motorista</Label>
          <Select
            id="motorista_id"
            name="motorista_id"
            value={formData.motorista_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um motorista</option>
            {motoristas.map((motorista) => (
              <option key={motorista.id} value={motorista.id}>
                {motorista.nome}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Data e combustível */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="data">Data do abastecimento</Label>
          <Input
            type="date"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="tipo_combustivel">Tipo de combustível</Label>
          <Select
            id="tipo_combustivel"
            name="tipo_combustivel"
            value={formData.tipo_combustivel}
            onChange={handleChange}
            required
          >
            <option value="Gasolina">Gasolina</option>
            <option value="Diesel">Diesel</option>
            <option value="Etanol">Etanol</option>
            <option value="GNV">GNV</option>
          </Select>
        </div>
      </div>

      {/* Valores */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="litros">Quantidade (litros)</Label>
          <Input
            type="number"
            id="litros"
            name="litros"
            value={formData.litros || ''}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <Label htmlFor="valor_total">Valor total (R$)</Label>
          <Input
            type="number"
            id="valor_total"
            name="valor_total"
            value={formData.valor_total || ''}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <Label htmlFor="valor_litro">Valor por litro (R$)</Label>
          <Input
            type="text"
            id="valor_litro"
            value={`R$ ${valorPorLitro}`}
            readOnly
            disabled
          />
        </div>
      </div>

      {/* Quilometragem */}
      <div>
        <Label htmlFor="quilometragem">Quilometragem atual (Km)</Label>
        <Input
          type="number"
          id="quilometragem"
          name="quilometragem"
          value={formData.quilometragem || ''}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      {/* Cupom fiscal */}
      <div>
        <Label htmlFor="cupom_fiscal_file">Cupom fiscal (opcional)</Label>
        <Input
          type="file"
          id="cupom_fiscal_file"
          name="cupom_fiscal_file"
          onChange={handleFileChange}
          accept="image/*,.pdf"
        />
        {abastecimento?.cupomFiscal && (
          <p className="text-sm text-gray-500 mt-1">
            Já existe um cupom fiscal cadastrado para este abastecimento.
            {formData.cupom_fiscal_file && " Será substituído pelo novo arquivo."}
          </p>
        )}
      </div>

      {/* Observações */}
      <div>
        <Label htmlFor="observacoes">Observações (opcional)</Label>
        <Textarea
          id="observacoes"
          name="observacoes"
          value={formData.observacoes || ''}
          onChange={handleChange}
          rows={3}
        />
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