'use client';

import { useState, useEffect } from 'react';
import { ClipboardList, Plus, Search, Filter, Calendar, Car, User, Clock, CheckCircle, XCircle, Eye, Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAutorizacao } from '@/hooks/useAutorizacao';
import SolicitacaoNovoModal from '@/components/modals/SolicitacaoNovoModal';
import { SolicitacaoFormData } from '@/types/Solicitacao';
import AcoesDropdown from '@/components/ui/AcoesDropdown';
import SolicitacaoDetalhes from '@/components/detalhes/SolicitacaoDetalhes';

// Mock de dados para demonstração
const solicitacoesMock = [
  {
    id: '1',
    numero: 'SOL-2023-001',
    dataRequisicao: '2023-10-02',
    dataInicio: '2023-10-10',
    dataFim: '2023-10-10',
    solicitante: {
      id: '1',
      nome: 'Maria Silva',
      cargo: 'Diretora',
      departamento: 'Educação'
    },
    secretaria: 'Educação',
    motivo: 'Visita técnica às escolas municipais',
    destino: 'Escolas da zona rural',
    distanciaEstimada: 120,
    passageiros: 3,
    veiculo: {
      id: '3',
      placa: 'GHI-9012',
      modelo: 'VW Gol'
    },
    motorista: {
      id: '2',
      nome: 'Maria Oliveira'
    },
    status: 'Aprovada',
    prioridade: 'Normal'
  },
  {
    id: '2',
    numero: 'SOL-2023-002',
    dataRequisicao: '2023-10-03',
    dataInicio: '2023-10-15',
    dataFim: '2023-10-17',
    solicitante: {
      id: '2',
      nome: 'João Santos',
      cargo: 'Coordenador',
      departamento: 'Saúde'
    },
    secretaria: 'Saúde',
    motivo: 'Transporte de equipe médica para campanha de vacinação',
    destino: 'Postos de saúde dos bairros',
    distanciaEstimada: 80,
    passageiros: 5,
    veiculo: null,
    motorista: null,
    status: 'Pendente',
    prioridade: 'Alta'
  },
  {
    id: '3',
    numero: 'SOL-2023-003',
    dataRequisicao: '2023-10-01',
    dataInicio: '2023-10-08',
    dataFim: '2023-10-08',
    solicitante: {
      id: '3',
      nome: 'Carlos Ferreira',
      cargo: 'Engenheiro',
      departamento: 'Obras'
    },
    secretaria: 'Obras',
    motivo: 'Vistoria de obras municipais',
    destino: 'Obra da nova creche municipal',
    distanciaEstimada: 45,
    passageiros: 2,
    veiculo: {
      id: '2',
      placa: 'DEF-5678',
      modelo: 'Fiat Strada'
    },
    motorista: {
      id: '4',
      nome: 'Ana Pereira'
    },
    status: 'Concluída',
    prioridade: 'Normal'
  },
  {
    id: '4',
    numero: 'SOL-2023-004',
    dataRequisicao: '2023-09-28',
    dataInicio: '2023-10-05',
    dataFim: '2023-10-05',
    solicitante: {
      id: '4',
      nome: 'Ana Paula',
      cargo: 'Assistente Social',
      departamento: 'Assistência Social'
    },
    secretaria: 'Assistência Social',
    motivo: 'Visita domiciliar a famílias cadastradas',
    destino: 'Bairros periféricos',
    distanciaEstimada: 60,
    passageiros: 3,
    veiculo: {
      id: '5',
      placa: 'MNO-7890',
      modelo: 'Renault Duster'
    },
    motorista: {
      id: '5',
      nome: 'Pedro Souza'
    },
    status: 'Aprovada',
    prioridade: 'Normal'
  },
  {
    id: '5',
    numero: 'SOL-2023-005',
    dataRequisicao: '2023-10-04',
    dataInicio: '2023-10-20',
    dataFim: '2023-10-20',
    solicitante: {
      id: '5',
      nome: 'Roberto Alves',
      cargo: 'Secretário',
      departamento: 'Administração'
    },
    secretaria: 'Administração',
    motivo: 'Reunião com representantes estaduais',
    destino: 'Capital do estado',
    distanciaEstimada: 200,
    passageiros: 2,
    veiculo: {
      id: '1',
      placa: 'ABC-1234',
      modelo: 'Toyota Corolla'
    },
    motorista: {
      id: '1',
      nome: 'João Silva'
    },
    status: 'Aprovada',
    prioridade: 'Alta'
  },
  {
    id: '6',
    numero: 'SOL-2023-006',
    dataRequisicao: '2023-09-25',
    dataInicio: '2023-10-04',
    dataFim: '2023-10-04',
    solicitante: {
      id: '6',
      nome: 'Marcos Lima',
      cargo: 'Supervisor',
      departamento: 'Agricultura'
    },
    secretaria: 'Agricultura',
    motivo: 'Visita a produtores rurais',
    destino: 'Assentamentos rurais',
    distanciaEstimada: 150,
    passageiros: 4,
    veiculo: null,
    motorista: null,
    status: 'Cancelada',
    prioridade: 'Normal'
  }
];

// Opções de filtros
const statusSolicitacao = ['Todos', 'Pendente', 'Aprovada', 'Em andamento', 'Concluída', 'Cancelada'];
const prioridades = ['Todas', 'Baixa', 'Normal', 'Alta', 'Urgente'];
const secretarias = ['Todas', 'Administração', 'Saúde', 'Educação', 'Obras', 'Agricultura', 'Assistência Social'];

// Interface para Solicitacao
interface Solicitacao {
  id: string;
  numero: string;
  dataRequisicao: string;
  dataInicio: string;
  dataFim: string;
  solicitante: {
    id: string;
    nome: string;
    cargo: string;
    departamento: string;
  };
  secretaria: string;
  motivo: string;
  destino: string;
  distanciaEstimada: number;
  passageiros: number;
  veiculo: {
    id: string;
    placa: string;
    modelo: string;
  } | null;
  motorista: {
    id: string;
    nome: string;
  } | null;
  status: string;
  prioridade: string;
}

// Interface para o formulário
interface SolicitacaoFormData {
  solicitante: string;
  data_inicio: string;
  data_fim?: string;
  destino: string;
  motivo: string;
  distancia_estimada: number;
  passageiros: number;
  prioridade: string;
}

export default function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [filtroPorStatus, setFiltroPorStatus] = useState('Todos');
  const [filtroPorPrioridade, setFiltroPorPrioridade] = useState('Todas');
  const [filtroPorSecretaria, setFiltroPorSecretaria] = useState('Todas');
  const [filtroPorDataInicio, setFiltroPorDataInicio] = useState('');
  const [filtroPorDataFim, setFiltroPorDataFim] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalSolicitacaoAberto, setModalSolicitacaoAberto] = useState(false);

  const { verificarPermissao } = useAutorizacao();
  const podeCriar = verificarPermissao({ recurso: 'solicitacoes', acao: 'criar', redirecionarSeNaoAutorizado: false });

  // Simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setSolicitacoes(solicitacoesMock);
      setCarregando(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filtrar solicitações
  const solicitacoesFiltradas = solicitacoes.filter(solicitacao => {
    // Filtro por texto de busca
    const matchFiltro = filtro === '' || 
      solicitacao.numero.toLowerCase().includes(filtro.toLowerCase()) || 
      solicitacao.solicitante.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      solicitacao.motivo.toLowerCase().includes(filtro.toLowerCase()) ||
      solicitacao.destino.toLowerCase().includes(filtro.toLowerCase()) ||
      (solicitacao.veiculo && solicitacao.veiculo.placa.toLowerCase().includes(filtro.toLowerCase())) ||
      (solicitacao.motorista && solicitacao.motorista.nome.toLowerCase().includes(filtro.toLowerCase()));

    // Filtros por seleção
    const matchStatus = filtroPorStatus === 'Todos' || solicitacao.status === filtroPorStatus;
    const matchPrioridade = filtroPorPrioridade === 'Todas' || solicitacao.prioridade === filtroPorPrioridade;
    const matchSecretaria = filtroPorSecretaria === 'Todas' || solicitacao.secretaria === filtroPorSecretaria;
    
    // Filtro por data da viagem
    const dataInicio = new Date(solicitacao.dataInicio);
    const matchDataInicio = filtroPorDataInicio === '' || new Date(filtroPorDataInicio) <= dataInicio;
    const matchDataFim = filtroPorDataFim === '' || dataInicio <= new Date(filtroPorDataFim);

    return matchFiltro && matchStatus && matchPrioridade && matchSecretaria && matchDataInicio && matchDataFim;
  });

  // Função para formatar data no padrão brasileiro
  const formatarData = (dataString: string | null | undefined) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  // Função para renderizar o badge de status com a cor correta
  const renderStatusBadge = (status: string) => {
    const statusNormalizado = status.toLowerCase();
    switch(statusNormalizado) {
      case 'pendente':
        return <Badge variant="warning">{status}</Badge>;
      case 'aprovada':
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
      case 'alta':
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>;
      case 'média':
      case 'media':
        return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>;
      case 'baixa':
        return <Badge className="bg-green-100 text-green-800">Baixa</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{prioridade}</Badge>;
    }
  };

  // Calcular estatísticas para os cards de resumo
  const totalSolicitacoes = solicitacoesFiltradas.length;
  const solicitacoesPendentes = solicitacoesFiltradas.filter(s => s.status === 'Pendente').length;
  const solicitacoesAprovadas = solicitacoesFiltradas.filter(s => s.status === 'Aprovada').length;
  const solicitacoesConcluidas = solicitacoesFiltradas.filter(s => s.status === 'Concluída').length;
  const distanciaTotal = solicitacoesFiltradas.reduce((total, item) => {
    if (item.status !== 'Cancelada') {
      return total + item.distanciaEstimada;
    }
    return total;
  }, 0);

  // Handler para salvar nova solicitação
  const handleSaveSolicitacao = async (data: SolicitacaoFormData) => {
    // Em um ambiente real, isso enviaria os dados para a API
    console.log('Salvando solicitação:', data);
    
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Adicionar a nova solicitação ao estado local (mock)
    const novaSolicitacao = {
      id: `temp-${Date.now()}`,
      numero: `SOL-${Math.floor(Math.random() * 1000)}`,
      solicitante: {
        nome: data.solicitante,
        cargo: 'Funcionário'
      },
      secretaria: 'Administração',
      dataInicio: data.data_inicio,
      dataFim: data.data_fim || data.data_inicio,
      destino: data.destino,
      motivoViagem: data.motivo,
      distanciaEstimada: data.distancia_estimada,
      passageiros: data.passageiros,
      status: 'Pendente',
      prioridade: data.prioridade,
      veiculo: null,
      motorista: null
    };
    
    setSolicitacoes([novaSolicitacao, ...solicitacoes]);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Solicitações de Veículos</h1>
        
        {podeCriar && (
          <Link href="/solicitacoes/nova" 
            className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nova Solicitação
          </Link>
        )}
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Total de Solicitações</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalSolicitacoes}</p>
          <p className="text-sm text-gray-600 mt-1">
            Distância total: {distanciaTotal} km
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Pendentes</h3>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{solicitacoesPendentes}</p>
          <p className="text-sm text-gray-600 mt-1">
            Aguardando aprovação
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Aprovadas</h3>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Car className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{solicitacoesAprovadas}</p>
          <p className="text-sm text-gray-600 mt-1">
            Viagens agendadas
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Concluídas</h3>
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{solicitacoesConcluidas}</p>
          <p className="text-sm text-gray-600 mt-1">
            Viagens realizadas
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
              placeholder="Buscar por número, solicitante, motivo ou destino..."
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
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={filtroPorStatus}
                onChange={(e) => setFiltroPorStatus(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {statusSolicitacao.map((status) => (
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

      {/* Lista de Solicitações */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {carregando ? (
          <div className="p-8 text-center">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div>
            <p className="mt-2 text-gray-500">Carregando solicitações...</p>
          </div>
        ) : solicitacoesFiltradas.length === 0 ? (
          <div className="p-8 text-center">
            <ClipboardList className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">Nenhuma solicitação encontrada para os critérios selecionados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número/Secretaria
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solicitante
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destino
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Veículo/Motorista
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridade
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {solicitacoesFiltradas.map((solicitacao) => (
                  <tr key={solicitacao.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <ClipboardList className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{solicitacao.numero}</div>
                          <div className="text-sm text-gray-500">{solicitacao.secretaria}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{solicitacao.solicitante.nome}</div>
                      <div className="text-sm text-gray-500">{solicitacao.solicitante.cargo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatarData(solicitacao.dataInicio)}
                      </div>
                      {solicitacao.dataInicio !== solicitacao.dataFim && (
                        <div className="text-xs text-gray-500">
                          até {formatarData(solicitacao.dataFim)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{solicitacao.destino}</div>
                      <div className="text-xs text-gray-500">{solicitacao.distanciaEstimada} km, {solicitacao.passageiros} passageiros</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {solicitacao.veiculo ? (
                        <div>
                          <div className="text-sm text-gray-900">{solicitacao.veiculo.placa}</div>
                          <div className="text-xs text-gray-500">{solicitacao.motorista?.nome || 'Sem motorista'}</div>
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Não atribuído
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusBadge(solicitacao.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderPrioridadeBadge(solicitacao.prioridade)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <AcoesDropdown 
                        itens={[
                          {
                            label: 'Detalhes',
                            icon: <Eye className="w-4 h-4" />,
                            modalContent: <SolicitacaoDetalhes solicitacao={solicitacao} />,
                            modalTitulo: `Detalhes da Solicitação - ${solicitacao.numero}`,
                            modalTamanho: 'lg'
                          },
                          {
                            label: 'Editar',
                            icon: <Edit className="w-4 h-4" />,
                            onClick: () => {
                              console.log('Editar solicitação:', solicitacao.id);
                            }
                          },
                          {
                            label: 'Excluir',
                            icon: <Trash className="w-4 h-4" />,
                            variant: 'destructive',
                            onClick: () => {
                              console.log('Excluir solicitação', solicitacao.id);
                              // Aqui seria implementada a lógica para excluir a solicitação
                              setSolicitacoes(solicitacoes.filter(s => s.id !== solicitacao.id));
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

      {/* Modal de Nova Solicitação */}
      <SolicitacaoNovoModal
        isOpen={modalSolicitacaoAberto}
        onClose={() => setModalSolicitacaoAberto(false)}
        onSave={handleSaveSolicitacao}
        veiculos={veiculosMock}
        motoristas={motoristasMock}
      />
    </div>
  );
} 