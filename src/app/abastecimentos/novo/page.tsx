'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AbastecimentoFormData } from '@/types/Abastecimento';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovoAbastecimentoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [veiculos, setVeiculos] = useState<{ id: string; placa: string; modelo: string }[]>([
    // Dados fictícios para teste
    { id: '1', placa: 'ABC-1234', modelo: 'Toyota Corolla' },
    { id: '2', placa: 'DEF-5678', modelo: 'Honda Civic' },
    { id: '3', placa: 'GHI-9012', modelo: 'Ford Ranger' },
  ]);
  
  const [motoristas, setMotoristas] = useState<{ id: string; nome: string }[]>([
    // Dados fictícios para teste
    { id: '1', nome: 'João da Silva' },
    { id: '2', nome: 'Maria Oliveira' },
    { id: '3', nome: 'Pedro Santos' },
  ]);

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<AbastecimentoFormData>({
    veiculo_id: '',
    motorista_id: '',
    data: new Date().toISOString().slice(0, 10),
    litros: 0,
    valor_total: 0,
    tipo_combustivel: '',
    quilometragem: 0,
    cupom_fiscal_file: null
  });

  // Lista de tipos de combustível
  const tiposCombustivel = [
    'Gasolina',
    'Etanol',
    'Diesel',
    'GNV',
    'Biodiesel',
    'Diesel S10'
  ];

  // Carregar dados de veículos e motoristas (mock)
  useEffect(() => {
    // Em uma aplicação real, você faria chamadas de API para buscar os dados
    // Exemplo: 
    // fetchVeiculos().then(data => setVeiculos(data));
    // fetchMotoristas().then(data => setMotoristas(data));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'litros' || name === 'valor_total' || name === 'quilometragem') {
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
      // Exemplo: await api.post('/abastecimentos', formData);
      console.log('Dados do formulário:', formData);
      
      // Simular um atraso para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar para a página de abastecimentos
      router.push('/abastecimentos');
    } catch (err) {
      setError('Ocorreu um erro ao salvar o abastecimento. Tente novamente.');
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
          <h1 className="text-2xl font-bold text-gray-900">Novo Abastecimento</h1>
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
                <label htmlFor="veiculo_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Veículo*
                </label>
                <select
                  id="veiculo_id"
                  name="veiculo_id"
                  value={formData.veiculo_id}
                  onChange={handleInputChange}
                  required
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  {veiculos.map((veiculo) => (
                    <option key={veiculo.id} value={veiculo.id}>{veiculo.placa} - {veiculo.modelo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="motorista_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Motorista*
                </label>
                <select
                  id="motorista_id"
                  name="motorista_id"
                  value={formData.motorista_id}
                  onChange={handleInputChange}
                  required
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  {motoristas.map((motorista) => (
                    <option key={motorista.id} value={motorista.id}>{motorista.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
                  Data do Abastecimento*
                </label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  required
                  max={new Date().toISOString().slice(0, 10)}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="tipo_combustivel" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Combustível*
                </label>
                <select
                  id="tipo_combustivel"
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
                <label htmlFor="litros" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade (litros)*
                </label>
                <input
                  type="number"
                  id="litros"
                  name="litros"
                  value={formData.litros || ''}
                  onChange={handleInputChange}
                  required
                  min={0.1}
                  step={0.01}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="valor_total" className="block text-sm font-medium text-gray-700 mb-1">
                  Valor Total (R$)*
                </label>
                <input
                  type="number"
                  id="valor_total"
                  name="valor_total"
                  value={formData.valor_total || ''}
                  onChange={handleInputChange}
                  required
                  min={0.01}
                  step={0.01}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="quilometragem" className="block text-sm font-medium text-gray-700 mb-1">
                  Quilometragem Atual*
                </label>
                <input
                  type="number"
                  id="quilometragem"
                  name="quilometragem"
                  value={formData.quilometragem || ''}
                  onChange={handleInputChange}
                  required
                  min={0}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="cupom_fiscal_file" className="block text-sm font-medium text-gray-700 mb-1">
                  Cupom Fiscal (PDF ou imagem)
                </label>
                <input
                  type="file"
                  id="cupom_fiscal_file"
                  name="cupom_fiscal_file"
                  accept=".pdf,.jpg,.jpeg,.png"
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
                  Salvar Abastecimento
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 