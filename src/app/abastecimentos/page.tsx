'use client';

import { useState, useEffect } from 'react';
import { Fuel, Plus, Search, Filter, Calendar, FileText, TrendingUp, TrendingDown, Eye, Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AbastecimentoNovoModal from '@/components/modals/AbastecimentoNovoModal';
import { AbastecimentoFormData, Abastecimento } from '@/types/Abastecimento';
import AcoesDropdown from '@/components/ui/AcoesDropdown';
import AbastecimentoDetalhes from '@/components/detalhes/AbastecimentoDetalhes';
import AbastecimentoFormulario from '@/components/formularios/AbastecimentoFormulario';

// Mock de dados para demonstração
const abastecimentosMock = [
  {
    id: '1',
    data: '2023-09-28',
    veiculo: {
      id: '1',
      placa: 'ABC-1234',
      modelo: 'Toyota Corolla'
    },
    motorista: {
      id: '1',
      nome: 'João Silva'
    },
    combustivel: 'Gasolina',
    litros: 45.7,
    valor: 310.76,
    kmAtual: 45870,
    kmAnterior: 45230,
    kmRodados: 640,
    consumoMedio: 14.0,
    cupomFiscal: true,
    secretaria: 'Administração',
    observacoes: 'Abastecimento normal'
  },
  {
    id: '2',
    data: '2023-09-25',
    veiculo: {
      id: '2',
      placa: 'DEF-5678',
      modelo: 'Fiat Strada'
    },
    motorista: {
      id: '4',
      nome: 'Ana Pereira'
    },
    combustivel: 'Diesel',
    litros: 60.5,
    valor: 362.39,
    kmAtual: 68100,
    kmAnterior: 67800,
    kmRodados: 300,
    consumoMedio: 4.95,
    cupomFiscal: true,
    secretaria: 'Obras',
    observacoes: ''
  },
  {
    id: '3',
    data: '2023-09-30',
    veiculo: {
      id: '3',
      placa: 'GHI-9012',
      modelo: 'VW Gol'
    },
    motorista: {
      id: '2',
      nome: 'Maria Oliveira'
    },
    combustivel: 'Etanol',
    litros: 40.0,
    valor: 196.80,
    kmAtual: 28320,
    kmAnterior: 28000,
    kmRodados: 320,
    consumoMedio: 8.0,
    cupomFiscal: false,
    secretaria: 'Saúde',
    observacoes: 'Cupom fiscal será enviado posteriormente'
  },
  {
    id: '4',
    data: '2023-09-27',
    veiculo: {
      id: '5',
      placa: 'MNO-7890',
      modelo: 'Renault Duster'
    },
    motorista: {
      id: '5',
      nome: 'Pedro Souza'
    },
    combustivel: 'Gasolina',
    litros: 50.2,
    valor: 341.36,
    kmAtual: 15430,
    kmAnterior: 15000,
    kmRodados: 430,
    consumoMedio: 8.57,
    cupomFiscal: true,
    secretaria: 'Educação',
    observacoes: ''
  },
  {
    id: '5',
    data: '2023-09-26',
    veiculo: {
      id: '1',
      placa: 'ABC-1234',
      modelo: 'Toyota Corolla'
    },
    motorista: {
      id: '1',
      nome: 'João Silva'
    },
    combustivel: 'Gasolina',
    litros: 42.8,
    valor: 291.04,
    kmAtual: 45230,
    kmAnterior: 44680,
    kmRodados: 550,
    consumoMedio: 12.85,
    cupomFiscal: true,
    secretaria: 'Administração',
    observacoes: ''
  }
];

// Opções de filtros
const tiposCombustivel = ['Todos', 'Gasolina', 'Diesel', 'Etanol', 'GNV'];
const secretarias = ['Todas', 'Administração', 'Saúde', 'Educação', 'Obras', 'Agricultura', 'Assistência Social'];

// Mock de veículos para o modal
const veiculosMock = [
  { id: '1', placa: 'ABC-1234', modelo: 'Toyota Corolla' },
  { id: '2', placa: 'DEF-5678', modelo: 'Fiat Strada' },
  { id: '3', placa: 'GHI-9012', modelo: 'VW Gol' },
  { id: '5', placa: 'MNO-7890', modelo: 'Renault Duster' }
];

// Mock de motoristas para o modal
const motoristasMock = [
  { id: '1', nome: 'João Silva' },
  { id: '2', nome: 'Maria Oliveira' },
  { id: '4', nome: 'Ana Pereira' },
  { id: '5', nome: 'Pedro Souza' }
];

export default function Abastecimentos() {
  const [abastecimentos, setAbastecimentos] = useState<Abastecimento[]>([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [filtroPorCombustivel, setFiltroPorCombustivel] = useState('Todos');
  const [filtroPorSecretaria, setFiltroPorSecretaria] = useState('Todas');
  const [filtroPorDataInicio, setFiltroPorDataInicio] = useState('');
  const [filtroPorDataFim, setFiltroPorDataFim] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalAbastecimentoAberto, setModalAbastecimentoAberto] = useState(false);

  const podeCriar = true; // Por padrão, todos podem criar abastecimentos

  // Simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setAbastecimentos(abastecimentosMock);
      setCarregando(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filtrar abastecimentos
  const abastecimentosFiltrados = abastecimentos.filter(abastecimento => {
    // Filtro por texto de busca
    const matchFiltro = filtro === '' || 
      abastecimento.veiculo.placa.toLowerCase().includes(filtro.toLowerCase()) || 
      abastecimento.veiculo.modelo.toLowerCase().includes(filtro.toLowerCase()) ||
      abastecimento.motorista.nome.toLowerCase().includes(filtro.toLowerCase());

    // Filtros por seleção
    const matchCombustivel = filtroPorCombustivel === 'Todos' || abastecimento.combustivel === filtroPorCombustivel;
    const matchSecretaria = filtroPorSecretaria === 'Todas' || abastecimento.secretaria === filtroPorSecretaria;
    
    // Filtro por data
    const data = new Date(abastecimento.data);
    const matchDataInicio = filtroPorDataInicio === '' || new Date(filtroPorDataInicio) <= data;
    const matchDataFim = filtroPorDataFim === '' || data <= new Date(filtroPorDataFim);

    return matchFiltro && matchCombustivel && matchSecretaria && matchDataInicio && matchDataFim;
  });

  // Função para formatar data no padrão brasileiro
  const formatarData = (dataString: string | null | undefined) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  // Função para formatar valores monetários
  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Handler para salvar novo abastecimento
  const handleSaveAbastecimento = async (data: AbastecimentoFormData) => {
    // Em um ambiente real, isso enviaria os dados para a API
    console.log('Salvando abastecimento:', data);
    
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Adicionar o novo abastecimento ao estado local (mock)
    const novoAbastecimento = {
      id: `temp-${Date.now()}`,
      data: data.data,
      veiculo: {
        id: data.veiculo_id,
        placa: veiculosMock.find(v => v.id === data.veiculo_id)?.placa || '',
        modelo: veiculosMock.find(v => v.id === data.veiculo_id)?.modelo || ''
      },
      motorista: {
        id: data.motorista_id,
        nome: motoristasMock.find(m => m.id === data.motorista_id)?.nome || ''
      },
      combustivel: data.tipo_combustivel,
      litros: data.litros,
      valor: data.valor_total,
      kmAtual: data.quilometragem,
      kmAnterior: data.quilometragem - 300, // Mock: simular km anterior
      kmRodados: 300, // Mock: simular km rodados
      consumoMedio: Number((300 / data.litros).toFixed(2)), // Mock: calcular consumo médio
      cupomFiscal: Boolean(data.cupom_fiscal_file),
      secretaria: 'Administração', // Mock
      observacoes: data.observacoes ?? ''
    };
    
    setAbastecimentos([novoAbastecimento, ...abastecimentos]);
  };

  // Calcular totais para exibir no topo
  const totalLitros = abastecimentosFiltrados.reduce((total, item) => total + item.litros, 0);
  const totalValor = abastecimentosFiltrados.reduce((total, item) => total + item.valor, 0);
  const totalKmRodados = abastecimentosFiltrados.reduce((total, item) => total + item.kmRodados, 0);
  
  // Calcular consumo médio geral
  const consumoMedioGeral = totalLitros > 0 ? Number((totalKmRodados / totalLitros).toFixed(2)) : 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Abastecimentos</h1>
        
        {podeCriar && (
          <Button 
            onClick={() => setModalAbastecimentoAberto(true)}
            className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Abastecimento
          </Button>
        )}
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Total de Litros</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Fuel className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalLitros.toFixed(1)} L</p>
          <p className="text-sm text-gray-600 mt-1">
            {abastecimentosFiltrados.length} abastecimentos
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Valor Total</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatarValor(totalValor)}</p>
          <p className="text-sm text-gray-600 mt-1">
            Preço médio: {formatarValor(totalLitros > 0 ? totalValor / totalLitros : 0)}/L
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Km Rodados</h3>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalKmRodados.toLocaleString('pt-BR')} km</p>
          <p className="text-sm text-gray-600 mt-1">
            Custo por km: {formatarValor(totalKmRodados > 0 ? totalValor / totalKmRodados : 0)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Consumo Médio</h3>
            <div className="p-2 bg-amber-50 rounded-lg">
              <TrendingDown className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{consumoMedioGeral} km/L</p>
          <p className="text-sm text-gray-600 mt-1">
            Desempenho médio dos veículos
          </p>
        </div>
      </div>

      {/* Barra de busca e filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar por placa, modelo ou motorista..."
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

            <div>
              <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700 mb-1">
                Data Inicial
              </label>
              <Input
                type="date"
                id="dataInicio"
                value={filtroPorDataInicio}
                onChange={(e) => setFiltroPorDataInicio(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700 mb-1">
                Data Final
              </label>
              <Input
                type="date"
                id="dataFim"
                value={filtroPorDataFim}
                onChange={(e) => setFiltroPorDataFim(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Lista de Abastecimentos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {carregando ? (
          <div className="p-8 text-center">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div>
            <p className="mt-2 text-gray-500">Carregando abastecimentos...</p>
          </div>
        ) : abastecimentosFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <Fuel className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">Nenhum abastecimento encontrado para os critérios selecionados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Veículo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Motorista
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Combustível
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Litros
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Km Atual
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consumo
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {abastecimentosFiltrados.map((abastecimento) => (
                  <tr key={abastecimento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{formatarData(abastecimento.data)}</div>
                          <div className="text-sm text-gray-500">{abastecimento.secretaria}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{abastecimento.veiculo.placa}</div>
                      <div className="text-sm text-gray-500">{abastecimento.veiculo.modelo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {abastecimento.motorista.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {abastecimento.combustivel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{abastecimento.litros.toFixed(1)} L</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatarValor(abastecimento.valor)}</div>
                      <div className="text-xs text-gray-500">
                        {formatarValor(abastecimento.valor / abastecimento.litros)}/L
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{abastecimento.kmAtual.toLocaleString('pt-BR')} km</div>
                      <div className="text-xs text-gray-500">
                        +{abastecimento.kmRodados.toLocaleString('pt-BR')} km
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {abastecimento.consumoMedio.toFixed(2)} km/L
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <AcoesDropdown 
                        itens={[
                          {
                            label: 'Detalhes',
                            icon: <Eye className="w-4 h-4" />,
                            modalContent: <AbastecimentoDetalhes abastecimento={abastecimento} />,
                            modalTitulo: `Detalhes do Abastecimento - ${abastecimento.veiculo.placa}`,
                            modalTamanho: 'lg'
                          },
                          {
                            label: 'Editar',
                            icon: <Edit className="w-4 h-4" />,
                            modalContent: <AbastecimentoFormulario 
                              abastecimento={abastecimento}
                              veiculos={veiculosMock}
                              motoristas={motoristasMock}
                              onSave={async (data) => {
                                console.log('Editando abastecimento:', data);
                                // Simular atualização
                                await new Promise(resolve => setTimeout(resolve, 1000));
                                // Atualizar a lista
                                setAbastecimentos(abastecimentos.map(item => 
                                  item.id === abastecimento.id 
                                    ? {
                                        ...abastecimento,
                                        data: data.data,
                                        veiculo: {
                                          ...abastecimento.veiculo,
                                          id: data.veiculo_id
                                        },
                                        motorista: {
                                          ...abastecimento.motorista,
                                          id: data.motorista_id
                                        },
                                        combustivel: data.tipo_combustivel,
                                        litros: data.litros,
                                        valor: data.valor_total,
                                        kmAtual: data.quilometragem,
                                        observacoes: data.observacoes ?? ''
                                      } 
                                    : item
                                ));
                              }}
                              onCancel={() => {
                                console.log('Cancelando edição');
                              }}
                            />,
                            modalTitulo: 'Editar Abastecimento',
                            modalTamanho: 'lg'
                          },
                          {
                            label: 'Excluir',
                            icon: <Trash className="w-4 h-4" />,
                            variant: 'destructive',
                            onClick: () => {
                              console.log('Excluir abastecimento', abastecimento.id);
                              setAbastecimentos(abastecimentos.filter(item => item.id !== abastecimento.id));
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

      {/* Modal de Novo Abastecimento */}
      <AbastecimentoNovoModal
        isOpen={modalAbastecimentoAberto}
        onClose={() => setModalAbastecimentoAberto(false)}
        onSave={handleSaveAbastecimento}
        veiculos={veiculosMock}
        motoristas={motoristasMock}
      />
    </div>
  );
} 