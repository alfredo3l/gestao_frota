'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MotoristaFormData } from '@/types/Motorista';

interface MotoristaFormularioProps {
  motorista?: any;
  secretarias: { id: string; nome: string }[];
  onSave: (data: MotoristaFormData) => Promise<void>;
  onCancel: () => void;
}

export default function MotoristaFormulario({ 
  motorista, 
  secretarias, 
  onSave, 
  onCancel 
}: MotoristaFormularioProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MotoristaFormData>(() => {
    // Determinar o secretaria_id correto
    const secretariaIdValue = motorista?.secretaria_id || 
      (motorista?.secretaria ? secretarias.find(s => s.nome === motorista.secretaria)?.id || '' : '');
    
    return {
      nome: motorista?.nome || '',
      cpf: motorista?.cpf || '',
      cnh: motorista?.cnh?.numero || '',
      categoria_cnh: motorista?.cnh?.categoria || '',
      validade_cnh: motorista?.cnh?.validade ? new Date(motorista.cnh.validade).toISOString().split('T')[0] : '',
      telefone: motorista?.telefone || '',
      email: motorista?.email || '',
      secretaria_id: secretariaIdValue,
      status: motorista?.status?.toLowerCase() === 'ativo' ? 'ativo' : 'inativo',
      foto_file: undefined
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, foto_file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Erro ao salvar motorista:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo*
          </label>
          <Input
            id="nome"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Nome completo do motorista"
          />
        </div>
        
        <div>
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
            CPF*
          </label>
          <Input
            id="cpf"
            name="cpf"
            type="text"
            value={formData.cpf}
            onChange={handleChange}
            required
            placeholder="000.000.000-00"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@exemplo.com"
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <Input
            id="telefone"
            name="telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Informações da CNH</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="cnh" className="block text-sm font-medium text-gray-700 mb-1">
              Número da CNH*
            </label>
            <Input
              id="cnh"
              name="cnh"
              type="text"
              value={formData.cnh}
              onChange={handleChange}
              required
              placeholder="00000000000"
            />
          </div>

          <div>
            <label htmlFor="categoria_cnh" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria*
            </label>
            <select
              id="categoria_cnh"
              name="categoria_cnh"
              value={formData.categoria_cnh}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Selecione uma categoria</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="AB">AB</option>
              <option value="AC">AC</option>
              <option value="AD">AD</option>
              <option value="AE">AE</option>
            </select>
          </div>

          <div>
            <label htmlFor="validade_cnh" className="block text-sm font-medium text-gray-700 mb-1">
              Validade*
            </label>
            <Input
              id="validade_cnh"
              name="validade_cnh"
              type="date"
              value={formData.validade_cnh}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Informações Adicionais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="secretaria_id" className="block text-sm font-medium text-gray-700 mb-1">
              Secretaria*
            </label>
            <select
              id="secretaria_id"
              name="secretaria_id"
              value={formData.secretaria_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Selecione uma secretaria</option>
              {secretarias.map((secretaria) => (
                <option key={secretaria.id} value={secretaria.id}>
                  {secretaria.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status*
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Foto</h3>
        <div>
          <label htmlFor="foto_file" className="block text-sm font-medium text-gray-700 mb-1">
            Foto do Motorista
          </label>
          <Input
            id="foto_file"
            name="foto_file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p className="mt-1 text-sm text-gray-500">
            Arquivos JPG, PNG ou GIF. Tamanho máximo de 5MB.
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : motorista ? 'Salvar Alterações' : 'Cadastrar Motorista'}
        </Button>
      </div>
    </form>
  );
} 