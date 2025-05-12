'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MotoristaFormData } from '@/types/Motorista';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovoMotoristaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secretarias, setSecretarias] = useState<{ id: string; nome: string }[]>([
    // Dados fictícios para teste
    { id: '1', nome: 'Secretaria de Administração' },
    { id: '2', nome: 'Secretaria de Saúde' },
    { id: '3', nome: 'Secretaria de Educação' },
    { id: '4', nome: 'Secretaria de Obras' },
    { id: '5', nome: 'Secretaria de Transportes' }
  ]);

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<MotoristaFormData>({
    nome: '',
    cpf: '',
    cnh: '',
    categoria_cnh: '',
    validade_cnh: new Date().toISOString().slice(0, 10),
    secretaria_id: '',
    status: 'ativo',
    foto_file: undefined,
    cnh_file: undefined
  });

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

  // Carregar dados de secretarias (mock)
  useEffect(() => {
    // Em uma aplicação real, você faria uma chamada de API para buscar as secretarias
    // Exemplo: fetchSecretarias().then(data => setSecretarias(data));
  }, []);

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
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Aqui você enviaria os dados para o servidor
      // Exemplo: await api.post('/motoristas', formData);
      console.log('Dados do formulário:', formData);
      
      // Simular um atraso para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar para a página de motoristas
      router.push('/motoristas');
    } catch (err) {
      setError('Ocorreu um erro ao salvar o motorista. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Novo Motorista</h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna da esquerda */}
            <div className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo*
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: João da Silva"
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                  CPF*
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                  placeholder="000.000.000-00"
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="cnh" className="block text-sm font-medium text-gray-700 mb-1">
                  Número da CNH*
                </label>
                <input
                  type="text"
                  id="cnh"
                  name="cnh"
                  value={formData.cnh}
                  onChange={handleInputChange}
                  required
                  placeholder="00000000000"
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="categoria_cnh" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria da CNH*
                </label>
                <select
                  id="categoria_cnh"
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
                <label htmlFor="validade_cnh" className="block text-sm font-medium text-gray-700 mb-1">
                  Validade da CNH*
                </label>
                <input
                  type="date"
                  id="validade_cnh"
                  name="validade_cnh"
                  value={formData.validade_cnh}
                  onChange={handleInputChange}
                  required
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="secretaria_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Secretaria*
                </label>
                <select
                  id="secretaria_id"
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
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status*
                </label>
                <select
                  id="status"
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
                <label htmlFor="foto_file" className="block text-sm font-medium text-gray-700 mb-1">
                  Foto do Motorista
                </label>
                <input
                  type="file"
                  id="foto_file"
                  name="foto_file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="cnh_file" className="block text-sm font-medium text-gray-700 mb-1">
                  Arquivo da CNH
                </label>
                <input
                  type="file"
                  id="cnh_file"
                  name="cnh_file"
                  accept=".pdf,.jpg,.png"
                  onChange={handleFileChange}
                  className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
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
                  <Save className="w-4 h-4" />
                  Salvar Motorista
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 