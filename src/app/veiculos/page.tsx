'use client';

import { useState, useEffect } from 'react';
import { Car, Plus, Search, Filter, FileText, Upload, AlertTriangle, Clock, CheckCircle, XCircle, Eye, Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAutorizacao } from '@/hooks/useAutorizacao';
import VeiculoNovoModal from '@/components/modals/VeiculoNovoModal';
import { VeiculoFormData } from '@/types/Veiculo';
import AcoesDropdown from '@/components/ui/AcoesDropdown';
import VeiculoDetalhes from '@/components/detalhes/VeiculoDetalhes';
import VeiculoFormulario from '@/components/formularios/VeiculoFormulario';

// Mock de dados para demonstração
const veiculosMock = [
  {
    id: '1',
    placa: 'ABC-1234',
    modelo: 'Toyota Corolla',
    ano: 2020,
    tipo: 'Sedan',
    combustivel: 'Flex',
    status: 'Ativo',
    km: 45000,
    secretaria: 'Administração',
    ultimaManutencao: '2023-05-10',
    proximaManutencao: '2023-11-10',
    documentos: ['CRLV', 'Seguro'],
    imagens: 2
  },
  {
    id: '2',
    placa: 'DEF-5678',
    modelo: 'Fiat Strada',
    ano: 2019,
    tipo: 'Utilitário',
    combustivel: 'Diesel',
    status: 'Em Manutenção',
    km: 67800,
    secretaria: 'Obras',
    ultimaManutencao: '2023-07-15',
    proximaManutencao: '2023-10-15',
    documentos: ['CRLV'],
    imagens: 3
  },
  {
    id: '3',
    placa: 'GHI-9012',
    modelo: 'VW Gol',
    ano: 2021,
    tipo: 'Hatch',
    combustivel: 'Flex',
    status: 'Ativo',
    km: 28000,
    secretaria: 'Saúde',
    ultimaManutencao: '2023-06-20',
    proximaManutencao: '2023-12-20',
    documentos: ['CRLV', 'Seguro', 'Inventário'],
    imagens: 4
  },
  {
    id: '4',
    placa: 'JKL-3456',
    modelo: 'Chevrolet S10',
    ano: 2018,
    tipo: 'Caminhonete',
    combustivel: 'Diesel',
    status: 'Inativo',
    km: 95000,
    secretaria: 'Agricultura',
    ultimaManutencao: '2023-04-05',
    proximaManutencao: '2023-10-05',
    documentos: ['CRLV'],
    imagens: 1
  },
  {
    id: '5',
    placa: 'MNO-7890',
    modelo: 'Renault Duster',
    ano: 2022,
    tipo: 'SUV',
    combustivel: 'Flex',
    status: 'Ativo',
    km: 15000,
    secretaria: 'Educação',
    ultimaManutencao: '2023-08-12',
    proximaManutencao: '2024-02-12',
    documentos: ['CRLV', 'Seguro'],
    imagens: 5
  }
];

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
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [filtroPorTipo, setFiltroPorTipo] = useState('Todos');
  const [filtroPorCombustivel, setFiltroPorCombustivel] = useState('Todos');
  const [filtroPorStatus, setFiltroPorStatus] = useState('Todos');
  const [filtroPorSecretaria, setFiltroPorSecretaria] = useState('Todas');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalVeiculoAberto, setModalVeiculoAberto] = useState(false);

  const { verificarPermissao } = useAutorizacao();
  const podeCriar = verificarPermissao({ recurso: 'veiculos', acao: 'criar', redirecionarSeNaoAutorizado: false });

  // Simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setVeiculos(veiculosMock);
      setCarregando(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filtrar veículos
  const veiculosFiltrados = veiculos.filter(veiculo => {
    // Filtro por texto de busca
    const matchFiltro = filtro === '' || 
      veiculo.placa.toLowerCase().includes(filtro.toLowerCase()) || 
      veiculo.modelo.toLowerCase().includes(filtro.toLowerCase());

    // Filtros por seleção
    const matchTipo = filtroPorTipo === 'Todos' || veiculo.tipo === filtroPorTipo;
    const matchCombustivel = filtroPorCombustivel === 'Todos' || veiculo.combustivel === filtroPorCombustivel;
    const matchStatus = filtroPorStatus === 'Todos' || veiculo.status === filtroPorStatus;
    const matchSecretaria = filtroPorSecretaria === 'Todas' || veiculo.secretaria === filtroPorSecretaria;

    return matchFiltro && matchTipo && matchCombustivel && matchStatus && matchSecretaria;
  });

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
    // Em um ambiente real, isso enviaria os dados para a API
    console.log('Salvando veículo:', data);
    
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Adicionar o novo veículo ao estado local (mock)
    const novoVeiculo = {
      id: `temp-${Date.now()}`,
      placa: data.placa,
      modelo: data.modelo,
      ano: data.ano,
      tipo: data.tipo,
      combustivel: data.combustivel,
      status: data.status === 'ativo' ? 'Ativo' : data.status === 'inativo' ? 'Inativo' : 'Em Manutenção',
      km: data.quilometragem_atual,
      secretaria: secretariasMock.find(sec => sec.id === data.secretaria_id)?.nome || '',
      ultimaManutencao: new Date().toISOString().slice(0, 10),
      proximaManutencao: '',
      documentos: ['CRLV'],
      imagens: data.foto_file ? 1 : 0
    };
    
    setVeiculos([novoVeiculo, ...veiculos]);
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

      {/* Lista de Veículos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {carregando ? (
          <div className="p-8 text-center">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div>
            <p className="mt-2 text-gray-500">Carregando veículos...</p>
          </div>
        ) : veiculosFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <Car className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">Nenhum veículo encontrado para os critérios selecionados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Placa/Modelo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo/Combustível
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Secretaria
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quilometragem
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documentos
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {veiculosFiltrados.map((veiculo) => (
                  <tr key={veiculo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Car className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{veiculo.placa}</div>
                          <div className="text-sm text-gray-500">{veiculo.modelo} ({veiculo.ano})</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{veiculo.tipo}</div>
                      <div className="text-sm text-gray-500">{veiculo.combustivel}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusBadge(veiculo.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {veiculo.secretaria}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{veiculo.km.toLocaleString('pt-BR')} km</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        {veiculo.documentos.map((doc: string, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            <FileText className="h-3 w-3 mr-1" />
                            {doc}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <AcoesDropdown 
                        itens={[
                          {
                            label: 'Detalhes',
                            icon: <Eye className="w-4 h-4" />,
                            modalContent: <VeiculoDetalhes veiculo={veiculo} />,
                            modalTitulo: `Detalhes do Veículo - ${veiculo.placa}`,
                            modalTamanho: 'lg'
                          },
                          {
                            label: 'Editar',
                            icon: <Edit className="w-4 h-4" />,
                            modalContent: <VeiculoFormulario 
                              veiculo={veiculo}
                              secretarias={secretariasMock}
                              onSave={async (data) => {
                                console.log('Editando veículo:', data);
                                // Simular atualização
                                await new Promise(resolve => setTimeout(resolve, 1000));
                                // Atualizar a lista
                                setVeiculos(veiculos.map(item => 
                                  item.id === veiculo.id 
                                    ? {
                                        ...veiculo,
                                        placa: data.placa,
                                        modelo: data.modelo,
                                        ano: data.ano,
                                        tipo: data.tipo,
                                        combustivel: data.combustivel,
                                        status: data.status === 'ativo' ? 'Ativo' : 
                                               data.status === 'inativo' ? 'Inativo' : 'Em Manutenção',
                                        km: data.quilometragem_atual,
                                        secretaria: secretariasMock.find(s => s.id === data.secretaria_id)?.nome || veiculo.secretaria
                                      } 
                                    : item
                                ));
                              }}
                              onCancel={() => {
                                console.log('Cancelando edição');
                              }}
                            />,
                            modalTitulo: 'Editar Veículo',
                            modalTamanho: 'lg'
                          },
                          {
                            label: 'Excluir',
                            icon: <Trash className="w-4 h-4" />,
                            variant: 'destructive',
                            onClick: () => {
                              console.log('Excluir veículo', veiculo.id);
                              setVeiculos(veiculos.filter(item => item.id !== veiculo.id));
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