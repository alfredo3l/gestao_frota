'use client';

import { useState, useEffect } from 'react';
import { Car, Plus, Search, Filter, FileText, Upload, AlertTriangle, Clock, CheckCircle, XCircle, Eye, Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { usePermissoes } from '@/hooks/usePermissoes';
import VeiculoNovoModal from '@/components/modals/VeiculoNovoModal';
import { VeiculoFormData } from '@/types/Veiculo';
import AcoesDropdown from '@/components/ui/AcoesDropdown';
import VeiculoDetalhes from '@/components/detalhes/VeiculoDetalhes';
import VeiculoFormulario from '@/components/formularios/VeiculoFormulario';
import { useVeiculos } from '@/hooks/useVeiculos';

// Opções de filtros
const tiposVeiculo = ['Todos', 'Sedan', 'Hatch', 'SUV', 'Caminhonete', 'Utilitário', 'Ônibus', 'Caminhão'];
const tiposCombustivel = ['Todos', 'Flex', 'Gasolina', 'Diesel', 'Etanol', 'Elétrico'];
const statusVeiculo = ['Todos', 'Ativo', 'Inativo', 'Em Manutenção', 'Em Uso'];
const secretarias = ['Todas', 'Administração', 'Saúde', 'Educação', 'Obras', 'Agricultura', 'Assistência Social'];

// Mock de secretarias para o modal
const secretariasMock = [
  { id: '1', nome: 'Administração' },
  { id: '2', nome: 'Saúde' },
  { id: '3', nome: 'Educação' },
  { id: '4', nome: 'Obras' },
  { id: '5', nome: 'Agricultura' },
  { id: '6', nome: 'Assistência Social' }
];

export default function Veiculos() {
  const [filtro, setFiltro] = useState('');
  const [filtroPorTipo, setFiltroPorTipo] = useState('Todos');
  const [filtroPorCombustivel, setFiltroPorCombustivel] = useState('Todos');
  const [filtroPorStatus, setFiltroPorStatus] = useState('Todos');
  const [filtroPorSecretaria, setFiltroPorSecretaria] = useState('Todas');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalVeiculoAberto, setModalVeiculoAberto] = useState(false);
  
  // Usar o hook useVeiculos
  const { 
    veiculos, 
    loading: carregando, 
    error, 
    fetchVeiculos, 
    createVeiculo,
    updateVeiculo, 
    deleteVeiculo
  } = useVeiculos();

  const { verificarPermissao } = usePermissoes();
  const podeCriar = verificarPermissao({ recurso: 'veiculos', acao: 'criar', redirecionarSeNaoAutorizado: false });

  // Função para converter o status para o formato esperado pela API
  const converterStatus = (status: string): "ativo" | "inativo" | "em_manutencao" | undefined => {
    if (status === 'Todos') return undefined;
    
    const statusMinusculo = status.toLowerCase();
    if (statusMinusculo === 'ativo') return "ativo";
    if (statusMinusculo === 'inativo') return "inativo";
    if (statusMinusculo === 'em manutenção') return "em_manutencao";
    
    return undefined;
  };

  // Carregar veículos do Supabase
  useEffect(() => {
    fetchVeiculos(1, 50, {
      termoBusca: filtro || undefined,
      tipo: filtroPorTipo !== 'Todos' ? filtroPorTipo : undefined,
      combustivel: filtroPorCombustivel !== 'Todos' ? filtroPorCombustivel : undefined,
      status: converterStatus(filtroPorStatus),
      secretaria_id: undefined // Implementar quando tivermos o mapeamento de IDs
    });
  }, [filtro, filtroPorTipo, filtroPorCombustivel, filtroPorStatus, filtroPorSecretaria]);

  // Filtrar veículos
  const veiculosFiltrados = veiculos;

  // Função para renderizar o badge de status com a cor correta
  const renderStatusBadge = (status: string) => {
    const statusNormalizado = status.toLowerCase();
    switch(statusNormalizado) {
      case 'ativo':
        return <Badge variant="success">{status}</Badge>;
      case 'inativo':
        return <Badge variant="error">{status}</Badge>;
      case 'em manutenção':
      case 'em_manutencao':
        return <Badge variant="warning">{status}</Badge>;
      case 'em uso':
        return <Badge variant="info">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Handler para salvar novo veículo
  const handleSaveVeiculo = async (data: VeiculoFormData) => {
    await createVeiculo(data);
  };

  // Handler para confirmar exclusão
  const handleConfirmDelete = async (id: string) => {
    const result = await deleteVeiculo(id);
    if (!result.success) {
      alert(result.error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Veículos</h1>
        
        {podeCriar && (
          <Button 
            onClick={() => setModalVeiculoAberto(true)}
            className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Veículo
          </Button>
        )}
      </div>

      {/* Barra de busca e filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar por placa ou modelo..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <Button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            variant="outline"
            className="flex items-center justify-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filtros {mostrarFiltros ? '▲' : '▼'}
          </Button>
        </div>

        {/* Filtros Avançados */}
        {mostrarFiltros && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Veículo
              </label>
              <select
                id="tipo"
                value={filtroPorTipo}
                onChange={(e) => setFiltroPorTipo(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {tiposVeiculo.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="combustivel" className="block text-sm font-medium text-gray-700 mb-1">
                Combustível
              </label>
              <select
                id="combustivel"
                value={filtroPorCombustivel}
                onChange={(e) => setFiltroPorCombustivel(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {tiposCombustivel.map((combustivel) => (
                  <option key={combustivel} value={combustivel}>
                    {combustivel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={filtroPorStatus}
                onChange={(e) => setFiltroPorStatus(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {statusVeiculo.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="secretaria" className="block text-sm font-medium text-gray-700 mb-1">
                Secretaria
              </label>
              <select
                id="secretaria"
                value={filtroPorSecretaria}
                onChange={(e) => setFiltroPorSecretaria(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {secretarias.map((secretaria) => (
                  <option key={secretaria} value={secretaria}>
                    {secretaria}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Tabela de Veículos */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
        {carregando ? (
          <div className="p-6 text-center text-gray-500">Carregando veículos...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600 bg-red-50 border border-red-200 rounded-md">
            <AlertTriangle className="inline-block w-5 h-5 mr-2" />
            {error}
          </div>
        ) : veiculosFiltrados.length === 0 ? (
          <div className="p-6 text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-md">
            <Car className="inline-block w-5 h-5 mr-2 text-gray-400" />
            Não existem veículos cadastrados até o momento.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Placa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Veículo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Secretaria
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Km
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {veiculosFiltrados.map((veiculo) => (
                  <tr key={veiculo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {veiculo.placa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span>{veiculo.modelo}</span>
                        <span className="text-xs text-gray-400">{veiculo.ano}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {veiculo.secretaria_nome || veiculo.secretaria}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {veiculo.quilometragem_atual || veiculo.km}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {renderStatusBadge(veiculo.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      <AcoesDropdown 
                        itens={[
                          {
                            label: 'Ver Detalhes',
                            icon: <Eye className="w-4 h-4" />,
                            modalContent: <VeiculoDetalhes veiculo={veiculo} />,
                            modalTitulo: 'Detalhes do Veículo'
                          },
                          {
                            label: 'Editar',
                            icon: <Edit className="w-4 h-4" />,
                            modalContent: <VeiculoFormulario 
                              veiculo={veiculo}
                              secretarias={secretariasMock}
                              onSave={async (data) => {
                                await updateVeiculo(veiculo.id, data);
                              }}
                              onCancel={() => {
                                console.log('Cancelando edição');
                              }}
                            />,
                            modalTitulo: 'Editar Veículo',
                          },
                          {
                            label: 'Excluir',
                            icon: <Trash className="w-4 h-4" />,
                            confirmacao: {
                              titulo: 'Confirmar Exclusão',
                              mensagem: `Tem certeza que deseja excluir o veículo ${veiculo.placa}?`,
                              onConfirm: () => handleConfirmDelete(veiculo.id)
                            }
                          }
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Novo Veículo */}
      <VeiculoNovoModal
        isOpen={modalVeiculoAberto}
        onClose={() => setModalVeiculoAberto(false)}
        onSave={handleSaveVeiculo}
        secretarias={secretariasMock}
      />
    </div>
  );
} 