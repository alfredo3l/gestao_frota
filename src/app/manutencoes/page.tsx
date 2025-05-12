'use client';

import { useState, useEffect } from 'react';
import { Wrench, Plus, Search, Filter, Calendar, FileText, Clock, CheckCircle, AlertTriangle, Car, Eye, Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAutorizacao } from '@/hooks/useAutorizacao';
import ManutencaoNovoModal from '@/components/modals/ManutencaoNovoModal';
import { ManutencaoFormData } from '@/types/Manutencao';
import AcoesDropdown from '@/components/ui/AcoesDropdown';
import ManutencaoDetalhes from '@/components/detalhes/ManutencaoDetalhes';

// Mock de dados para demonstração
const manutencoesMock = [
  {
    id: '1',
    tipo: 'Preventiva',
    titulo: 'Troca de óleo e filtros',
    dataAgendada: '2023-10-15',
    dataConclusao: null,
    veiculo: {
      id: '1',
      placa: 'ABC-1234',
      modelo: 'Toyota Corolla',
      ano: 2020
    },
    km: 45870,
    fornecedor: 'Oficina Central',
    valor: 450.00,
    status: 'Agendada',
    prioridade: 'Média',
    descricao: 'Troca de óleo do motor, filtro de óleo, filtro de ar e filtro de combustível.'
  },
  {
    id: '2',
    tipo: 'Corretiva',
    titulo: 'Substituição da embreagem',
    dataAgendada: '2023-10-05',
    dataConclusao: '2023-10-06',
    veiculo: {
      id: '2',
      placa: 'DEF-5678',
      modelo: 'Fiat Strada',
      ano: 2019
    },
    km: 68100,
    fornecedor: 'Auto Mecânica Precision',
    valor: 1250.00,
    status: 'Concluída',
    prioridade: 'Alta',
    descricao: 'Substituição do kit de embreagem completo.'
  },
  {
    id: '3',
    tipo: 'Preventiva',
    titulo: 'Revisão dos freios',
    dataAgendada: '2023-10-20',
    dataConclusao: null,
    veiculo: {
      id: '3',
      placa: 'GHI-9012',
      modelo: 'VW Gol',
      ano: 2021
    },
    km: 28320,
    fornecedor: 'Oficina Central',
    valor: 380.00,
    status: 'Agendada',
    prioridade: 'Média',
    descricao: 'Verificação e ajuste do sistema de freios, substituição das pastilhas dianteiras.'
  },
  {
    id: '4',
    tipo: 'Corretiva',
    titulo: 'Reparo no sistema elétrico',
    dataAgendada: '2023-09-25',
    dataConclusao: '2023-09-25',
    veiculo: {
      id: '4',
      placa: 'JKL-3456',
      modelo: 'Chevrolet S10',
      ano: 2018
    },
    km: 95000,
    fornecedor: 'Eletro Auto',
    valor: 750.00,
    status: 'Concluída',
    prioridade: 'Alta',
    descricao: 'Reparo do alternador e substituição da bateria.'
  },
  {
    id: '5',
    tipo: 'Corretiva',
    titulo: 'Alinhamento e balanceamento',
    dataAgendada: '2023-10-02',
    dataConclusao: null,
    veiculo: {
      id: '5',
      placa: 'MNO-7890',
      modelo: 'Renault Duster',
      ano: 2022
    },
    km: 15430,
    fornecedor: 'Pneus & Cia',
    valor: 250.00,
    status: 'Em andamento',
    prioridade: 'Baixa',
    descricao: 'Alinhamento de direção, balanceamento das rodas e calibragem dos pneus.'
  }
];

// Mock de dados de veículos
const veiculosMock = [
  { id: '1', placa: 'ABC-1234', modelo: 'Toyota Corolla' },
  { id: '2', placa: 'DEF-5678', modelo: 'Fiat Strada' },
  { id: '3', placa: 'GHI-9012', modelo: 'VW Gol' },
  { id: '4', placa: 'JKL-3456', modelo: 'Chevrolet S10' },
  { id: '5', placa: 'MNO-7890', modelo: 'Renault Duster' }
];

// Opções de filtros
const tiposManutencao = ['Todos', 'Preventiva', 'Corretiva'];
const statusManutencao = ['Todos', 'Agendada', 'Em andamento', 'Concluída', 'Cancelada'];
const prioridades = ['Todas', 'Baixa', 'Média', 'Alta'];

// Interface para Manutencao
interface Manutencao {
  id: string;
  tipo: string;
  titulo: string;
  dataAgendada: string;
  dataConclusao: string | null;
  veiculo: {
    id: string;
    placa: string;
    modelo: string;
    ano: number;
  };
  km: number;
  fornecedor: string;
  valor: number;
  status: string;
  prioridade: string;
  descricao: string;
}

export default function Manutencoes() {
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [filtroPorTipo, setFiltroPorTipo] = useState('Todos');
  const [filtroPorStatus, setFiltroPorStatus] = useState('Todos');
  const [filtroPorPrioridade, setFiltroPorPrioridade] = useState('Todas');
  const [filtroPorDataInicio, setFiltroPorDataInicio] = useState('');
  const [filtroPorDataFim, setFiltroPorDataFim] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalNovaManutencaoAberto, setModalNovaManutencaoAberto] = useState(false);

  const { verificarPermissao } = useAutorizacao();
  const podeCriar = verificarPermissao({ recurso: 'manutencoes', acao: 'criar', redirecionarSeNaoAutorizado: false });

  // Simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setManutencoes(manutencoesMock);
      setCarregando(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Função para salvar nova manutenção
  const salvarNovaManutencao = async (dados: ManutencaoFormData) => {
    try {
      // Em uma aplicação real, você enviaria os dados para o servidor aqui
      console.log('Enviando dados de nova manutenção:', dados);
      
      // Simular um atraso para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar a lista (simulação)
      const novaManutencao = {
        id: Math.random().toString(36).substring(2, 9),
        tipo: dados.tipo === 'preventiva' ? 'Preventiva' : 'Corretiva',
        titulo: dados.descricao.substring(0, 50) + (dados.descricao.length > 50 ? '...' : ''),
        dataAgendada: dados.data_inicio,
        dataConclusao: dados.data_fim,
        veiculo: veiculosMock.find(v => v.id === dados.veiculo_id) || veiculosMock[0],
        km: dados.quilometragem,
        fornecedor: dados.fornecedor,
        valor: dados.valor,
        status: dados.status === 'agendada' ? 'Agendada' 
              : dados.status === 'em_andamento' ? 'Em andamento'
              : dados.status === 'concluida' ? 'Concluída'
              : 'Cancelada',
        prioridade: 'Média', // valor padrão para demonstração
        descricao: dados.descricao
      };
      
      setManutencoes((prev: any) => [novaManutencao, ...prev]);
      return Promise.resolve();
    } catch (error) {
      console.error('Erro ao salvar manutenção:', error);
      return Promise.reject(error);
    }
  };

  // Filtrar manutenções
  const manutencoesFiltradas = manutencoes.filter(manutencao => {
    // Filtro por texto de busca
    const matchFiltro = filtro === '' || 
      manutencao.titulo.toLowerCase().includes(filtro.toLowerCase()) || 
      manutencao.veiculo.placa.toLowerCase().includes(filtro.toLowerCase()) ||
      manutencao.veiculo.modelo.toLowerCase().includes(filtro.toLowerCase()) ||
      manutencao.fornecedor.toLowerCase().includes(filtro.toLowerCase());

    // Filtros por seleção
    const matchTipo = filtroPorTipo === 'Todos' || manutencao.tipo === filtroPorTipo;
    const matchStatus = filtroPorStatus === 'Todos' || manutencao.status === filtroPorStatus;
    const matchPrioridade = filtroPorPrioridade === 'Todas' || manutencao.prioridade === filtroPorPrioridade;
    
    // Filtro por data agendada
    const dataAgendada = new Date(manutencao.dataAgendada);
    const matchDataInicio = filtroPorDataInicio === '' || new Date(filtroPorDataInicio) <= dataAgendada;
    const matchDataFim = filtroPorDataFim === '' || dataAgendada <= new Date(filtroPorDataFim);

    return matchFiltro && matchTipo && matchStatus && matchPrioridade && matchDataInicio && matchDataFim;
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

  // Função para renderizar o badge de status com a cor correta
  const renderStatusBadge = (status: string) => {
    const statusNormalizado = status.toLowerCase();
    switch(statusNormalizado) {
      case 'agendada':
        return <Badge variant="info">{status}</Badge>;
      case 'em andamento':
        return <Badge variant="warning">{status}</Badge>;
      case 'concluída':
      case 'concluida':
        return <Badge variant="success">{status}</Badge>;
      case 'cancelada':
        return <Badge variant="error">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Função para renderizar o badge de prioridade
  const renderPrioridadeBadge = (prioridade: string) => {
    const prioridadeNormalizada = prioridade.toLowerCase();
    switch(prioridadeNormalizada) {
      case 'baixa':
        return <Badge variant="info">{prioridade}</Badge>;
      case 'média':
      case 'media':
        return <Badge variant="warning">{prioridade}</Badge>;
      case 'alta':
        return <Badge variant="error">{prioridade}</Badge>;
      default:
        return <Badge>{prioridade}</Badge>;
    }
  };

  // Calcular totais para exibir no topo
  const totalManutencoes = manutencoesFiltradas.length;
  const totalValor = manutencoesFiltradas.reduce((total, item) => total + item.valor, 0);
  const manutencoesPendentes = manutencoesFiltradas.filter(m => m.status !== 'Concluída' && m.status !== 'Cancelada').length;
  const manutencoesPreventivas = manutencoesFiltradas.filter(m => m.tipo === 'Preventiva').length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manutenções</h1>
        
        {podeCriar && (
          <Button
            onClick={() => setModalNovaManutencaoAberto(true)}
            className="mt-3 sm:mt-0 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Manutenção
          </Button>
        )}
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Total de Manutenções</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Wrench className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalManutencoes}</p>
          <p className="text-sm text-gray-600 mt-1">
            {manutencoesPreventivas} preventivas, {totalManutencoes - manutencoesPreventivas} corretivas
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
            Média: {formatarValor(totalManutencoes > 0 ? totalValor / totalManutencoes : 0)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Pendentes</h3>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{manutencoesPendentes}</p>
          <p className="text-sm text-gray-600 mt-1">
            {manutencoesPendentes > 0 ? "Aguardando conclusão" : "Nenhuma manutenção pendente"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Concluídas</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {manutencoesFiltradas.filter(m => m.status === 'Concluída').length}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {totalManutencoes > 0 ? 
              `${Math.round((manutencoesFiltradas.filter(m => m.status === 'Concluída').length / totalManutencoes) * 100)}% do total` : 
              '0% do total'}
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
              placeholder="Buscar por título, placa, modelo ou fornecedor..."
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                id="tipo"
                value={filtroPorTipo}
                onChange={(e) => setFiltroPorTipo(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {tiposManutencao.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
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
                {statusManutencao.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                id="prioridade"
                value={filtroPorPrioridade}
                onChange={(e) => setFiltroPorPrioridade(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {prioridades.map((prioridade) => (
                  <option key={prioridade} value={prioridade}>
                    {prioridade}
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

      {/* Lista de Manutenções */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {carregando ? (
          <div className="p-8 text-center">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div>
            <p className="mt-2 text-gray-500">Carregando manutenções...</p>
          </div>
        ) : manutencoesFiltradas.length === 0 ? (
          <div className="p-8 text-center">
            <Wrench className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">Nenhuma manutenção encontrada para os critérios selecionados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviço
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Veículo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {manutencoesFiltradas.map((manutencao) => (
                  <tr key={manutencao.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                          <Wrench className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{manutencao.titulo}</div>
                          <div className="text-sm text-gray-500">{manutencao.fornecedor}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{manutencao.veiculo.placa}</div>
                      <div className="text-sm text-gray-500">
                        {manutencao.veiculo.modelo} ({manutencao.veiculo.ano})
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        manutencao.tipo === 'Preventiva' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {manutencao.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatarData(manutencao.dataAgendada)}
                      </div>
                      {manutencao.dataConclusao && (
                        <div className="text-xs text-gray-500">
                          Concluída: {formatarData(manutencao.dataConclusao)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusBadge(manutencao.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderPrioridadeBadge(manutencao.prioridade)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatarValor(manutencao.valor)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <AcoesDropdown 
                        itens={[
                          {
                            label: 'Detalhes',
                            icon: <Eye className="w-4 h-4" />,
                            modalContent: <ManutencaoDetalhes manutencao={manutencao} />,
                            modalTitulo: `Detalhes da Manutenção - ${manutencao.veiculo.placa}`,
                            modalTamanho: 'lg'
                          },
                          {
                            label: 'Editar',
                            icon: <Edit className="w-4 h-4" />,
                            onClick: () => {
                              console.log('Editar manutenção:', manutencao.id);
                            }
                          },
                          {
                            label: 'Excluir',
                            icon: <Trash className="w-4 h-4" />,
                            variant: 'destructive',
                            onClick: () => {
                              console.log('Excluir manutenção', manutencao.id);
                              // Aqui seria implementada a lógica para excluir a manutenção
                              setManutencoes(manutencoes.filter(m => m.id !== manutencao.id));
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

      {/* Modal de Nova Manutenção */}
      <ManutencaoNovoModal
        isOpen={modalNovaManutencaoAberto}
        onClose={() => setModalNovaManutencaoAberto(false)}
        onSave={salvarNovaManutencao}
        veiculos={veiculosMock}
      />
    </div>
  );
} 