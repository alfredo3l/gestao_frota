'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ManutencaoFormData } from '@/types/Manutencao';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovaManutencaoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [veiculos, setVeiculos] = useState<{ id: string; placa: string; modelo: string }[]>([
    // Dados fictícios para teste
    { id: '1', placa: 'ABC-1234', modelo: 'Toyota Corolla' },
    { id: '2', placa: 'DEF-5678', modelo: 'Honda Civic' },
    { id: '3', placa: 'GHI-9012', modelo: 'Ford Ranger' },
  ]);

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<ManutencaoFormData>({
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
  });

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

  // Carregar dados de veículos (mock)
  useEffect(() => {
    // Em uma aplicação real, você faria uma chamada de API para buscar os veículos
    // Exemplo: fetchVeiculos().then(data => setVeiculos(data));
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Aqui você enviaria os dados para o servidor
      // Exemplo: await api.post('/manutencoes', formData);
      console.log('Dados do formulário:', formData);
      
      // Simular um atraso para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar para a página de manutenções
      router.push('/manutencoes');
    } catch (err) {
      setError('Ocorreu um erro ao salvar a manutenção. Tente novamente.');
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
          <h1 className="text-2xl font-bold text-gray-900">Nova Manutenção</h1>
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
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Manutenção*
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  required
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="preventiva">Preventiva</option>
                  <option value="corretiva">Corretiva</option>
                </select>
              </div>

              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição*
                </label>
                <textarea
                  id="descricao"
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
                <label htmlFor="fornecedor" className="block text-sm font-medium text-gray-700 mb-1">
                  Fornecedor/Oficina*
                </label>
                <input
                  type="text"
                  id="fornecedor"
                  name="fornecedor"
                  value={formData.fornecedor}
                  onChange={handleInputChange}
                  required
                  placeholder="Nome da oficina ou prestador"
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-1">
                  Valor (R$)*
                </label>
                <input
                  type="number"
                  id="valor"
                  name="valor"
                  value={formData.valor || ''}
                  onChange={handleInputChange}
                  required
                  min={0}
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
            </div>

            {/* Coluna da direita */}
            <div className="space-y-4">
              <div>
                <label htmlFor="data_inicio" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Início*
                </label>
                <input
                  type="date"
                  id="data_inicio"
                  name="data_inicio"
                  value={formData.data_inicio}
                  onChange={handleInputChange}
                  required
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="data_fim" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Conclusão
                </label>
                <input
                  type="date"
                  id="data_fim"
                  name="data_fim"
                  value={formData.data_fim || ''}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  <option value="agendada">Agendada</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluida">Concluída</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>

              <div>
                <label htmlFor="proxima_revisao_km" className="block text-sm font-medium text-gray-700 mb-1">
                  Próxima Revisão (km)
                </label>
                <input
                  type="number"
                  id="proxima_revisao_km"
                  name="proxima_revisao_km"
                  value={formData.proxima_revisao_km || ''}
                  onChange={handleInputChange}
                  min={0}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="proxima_revisao_data" className="block text-sm font-medium text-gray-700 mb-1">
                  Data da Próxima Revisão
                </label>
                <input
                  type="date"
                  id="proxima_revisao_data"
                  name="proxima_revisao_data"
                  value={formData.proxima_revisao_data || ''}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="notas" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="notas"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="ordem_servico_file" className="block text-sm font-medium text-gray-700 mb-1">
                Ordem de Serviço
              </label>
              <input
                type="file"
                id="ordem_servico_file"
                name="ordem_servico_file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="nota_fiscal_file" className="block text-sm font-medium text-gray-700 mb-1">
                Nota Fiscal
              </label>
              <input
                type="file"
                id="nota_fiscal_file"
                name="nota_fiscal_file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md"
              />
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
                  Salvar Manutenção
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 