'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { VeiculoFormData } from '@/types/Veiculo';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovoVeiculoPage() {
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
  const [formData, setFormData] = useState<VeiculoFormData>({
    placa: '',
    modelo: '',
    tipo: '',
    ano: new Date().getFullYear(),
    combustivel: '',
    status: 'ativo',
    quilometragem_atual: 0,
    secretaria_id: '',
    crlv_file: null,
    seguro_file: null,
    foto_file: null,
    documentos_files: []
  });

  // Lista de tipos de veículos
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

  // Carregar dados de secretarias (mock)
  useEffect(() => {
    // Em uma aplicação real, você faria uma chamada de API para buscar as secretarias
    // Exemplo: fetchSecretarias().then(data => setSecretarias(data));
  }, []);

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
      // Exemplo: await api.post('/veiculos', formData);
      console.log('Dados do formulário:', formData);
      
      // Simular um atraso para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar para a página de veículos
      router.push('/veiculos');
    } catch (err) {
      setError('Ocorreu um erro ao salvar o veículo. Tente novamente.');
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
          <h1 className="text-2xl font-bold text-gray-900">Novo Veículo</h1>
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
                <label htmlFor="placa" className="block text-sm font-medium text-gray-700 mb-1">
                  Placa*
                </label>
                <input
                  type="text"
                  id="placa"
                  name="placa"
                  value={formData.placa}
                  onChange={handleInputChange}
                  required
                  maxLength={8}
                  placeholder="ABC-1234"
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo*
                </label>
                <input
                  type="text"
                  id="modelo"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Toyota Corolla"
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo*
                </label>
                <select
                  id="tipo"
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
                <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-1">
                  Ano*
                </label>
                <input
                  type="number"
                  id="ano"
                  name="ano"
                  value={formData.ano}
                  onChange={handleInputChange}
                  required
                  min={1900}
                  max={new Date().getFullYear() + 1}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="combustivel" className="block text-sm font-medium text-gray-700 mb-1">
                  Combustível*
                </label>
                <select
                  id="combustivel"
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
                  <option value="em_manutencao">Em Manutenção</option>
                </select>
              </div>

              <div>
                <label htmlFor="quilometragem_atual" className="block text-sm font-medium text-gray-700 mb-1">
                  Quilometragem Atual*
                </label>
                <input
                  type="number"
                  id="quilometragem_atual"
                  name="quilometragem_atual"
                  value={formData.quilometragem_atual}
                  onChange={handleInputChange}
                  required
                  min={0}
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
                <label htmlFor="foto_file" className="block text-sm font-medium text-gray-700 mb-1">
                  Foto do Veículo
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
                <label htmlFor="crlv_file" className="block text-sm font-medium text-gray-700 mb-1">
                  CRLV Digital
                </label>
                <input
                  type="file"
                  id="crlv_file"
                  name="crlv_file"
                  accept=".pdf,.jpg,.png"
                  onChange={handleFileChange}
                  className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="seguro_file" className="block text-sm font-medium text-gray-700 mb-1">
                  Seguro do Veículo
                </label>
                <input
                  type="file"
                  id="seguro_file"
                  name="seguro_file"
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
                  Salvar Veículo
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 