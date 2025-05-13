'use client';

import { useState, useEffect } from 'react';
import { Users, User, Plus, Search, Filter, Calendar, AlertTriangle, Check, X, Eye, Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { usePermissoes } from '@/hooks/usePermissoes';
import MotoristaNovoModal from '@/components/modals/MotoristaNovoModal';
import { MotoristaFormData } from '@/types/Motorista';
import AcoesDropdown from '@/components/ui/AcoesDropdown';
import MotoristaDetalhes from '@/components/detalhes/MotoristaDetalhes';
import MotoristaFormulario from '@/components/formularios/MotoristaFormulario';

// Mock de dados para demonstração
const motoristasMock = [
  {
    id: '1',
    nome: 'João Silva',
    cpf: '123.456.789-00',
    cnh: {
      numero: '12345678901',
      categoria: 'AB',
      validade: '2025-07-15',
      status: 'Válida'
    },
    telefone: '(67) 98765-4321',
    secretaria: 'Administração',
    email: 'joao.silva@prefeitura.gov.br',
    status: 'Ativo',
    ultimaViagem: '2023-09-25'
  },
  {
    id: '2',
    nome: 'Maria Oliveira',
    cpf: '987.654.321-00',
    cnh: {
      numero: '09876543210',
      categoria: 'B',
      validade: '2023-11-20',
      status: 'Prestes a vencer'
    },
    telefone: '(67) 98123-4567',
    secretaria: 'Saúde',
    email: 'maria.oliveira@prefeitura.gov.br',
    status: 'Ativo',
    ultimaViagem: '2023-09-30'
  },
  {
    id: '3',
    nome: 'Carlos Santos',
    cpf: '456.789.123-00',
    cnh: {
      numero: '45678912345',
      categoria: 'D',
      validade: '2023-10-05',
      status: 'Vencida'
    },
    telefone: '(67) 99876-5432',
    secretaria: 'Educação',
    email: 'carlos.santos@prefeitura.gov.br',
    status: 'Inativo',
    ultimaViagem: '2023-08-15'
  },
  {
    id: '4',
    nome: 'Ana Pereira',
    cpf: '321.654.987-00',
    cnh: {
      numero: '32165498765',
      categoria: 'AB',
      validade: '2024-03-10',
      status: 'Válida'
    },
    telefone: '(67) 99123-8765',
    secretaria: 'Obras',
    email: 'ana.pereira@prefeitura.gov.br',
    status: 'Ativo',
    ultimaViagem: '2023-09-28'
  },
  {
    id: '5',
    nome: 'Pedro Souza',
    cpf: '789.123.456-00',
    cnh: {
      numero: '78912345678',
      categoria: 'AE',
      validade: '2026-05-22',
      status: 'Válida'
    },
    telefone: '(67) 98765-1234',
    secretaria: 'Agricultura',
    email: 'pedro.souza@prefeitura.gov.br',
    status: 'Ativo',
    ultimaViagem: '2023-09-20'
  }
];

// Opções de filtros
const categoriasCNH = ['Todas', 'A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE'];
const statusCNH = ['Todos', 'Válida', 'Prestes a vencer', 'Vencida'];
const secretarias = ['Todas', 'Administração', 'Saúde', 'Educação', 'Obras', 'Agricultura', 'Assistência Social'];
const statusMotorista = ['Todos', 'Ativo', 'Inativo'];

// Mock de secretarias para o modal
const secretariasMock = [
  { id: '1', nome: 'Administração' },
  { id: '2', nome: 'Saúde' },
  { id: '3', nome: 'Educação' },
  { id: '4', nome: 'Obras' },
  { id: '5', nome: 'Agricultura' },
  { id: '6', nome: 'Assistência Social' }
];

// Interface para Motorista
interface Motorista {
  id: string;
  nome: string;
  cpf: string;
  cnh: {
    numero: string;
    categoria: string;
    validade: string;
    status: string;
  };
  telefone: string;
  secretaria: string;
  email: string;
  status: string;
  ultimaViagem: string;
}

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [filtroPorCategoriaCNH, setFiltroPorCategoriaCNH] = useState('Todas');
  const [filtroPorStatusCNH, setFiltroPorStatusCNH] = useState('Todos');
  const [filtroPorSecretaria, setFiltroPorSecretaria] = useState('Todas');
  const [filtroPorStatus, setFiltroPorStatus] = useState('Todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalMotoristaAberto, setModalMotoristaAberto] = useState(false);

  const { verificarPermissao } = usePermissoes();
  const podeCriar = verificarPermissao({ recurso: 'motoristas', acao: 'criar', redirecionarSeNaoAutorizado: false });

  // Simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setMotoristas(motoristasMock);
      setCarregando(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filtrar motoristas
  const motoristasFiltrados = motoristas.filter(motorista => {
    // Filtro por texto de busca
    const matchFiltro = filtro === '' || 
      motorista.nome.toLowerCase().includes(filtro.toLowerCase()) || 
      motorista.cpf.includes(filtro) ||
      motorista.cnh.numero.includes(filtro);

    // Filtros por seleção
    const matchCategoriaCNH = filtroPorCategoriaCNH === 'Todas' || motorista.cnh.categoria.includes(filtroPorCategoriaCNH);
    const matchStatusCNH = filtroPorStatusCNH === 'Todos' || motorista.cnh.status === filtroPorStatusCNH;
    const matchSecretaria = filtroPorSecretaria === 'Todas' || motorista.secretaria === filtroPorSecretaria;
    const matchStatus = filtroPorStatus === 'Todos' || motorista.status === filtroPorStatus;

    return matchFiltro && matchCategoriaCNH && matchStatusCNH && matchSecretaria && matchStatus;
  });

  // Função para renderizar o badge de status CNH com a cor correta
  const renderStatusCNHBadge = (status: string) => {
    const statusNormalizado = status.toLowerCase();
    switch(statusNormalizado) {
      case 'válida':
      case 'valida':
        return <Badge variant="success">{status}</Badge>;
      case 'prestes a vencer':
        return <Badge variant="warning">{status}</Badge>;
      case 'vencida':
        return <Badge variant="error">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Função para renderizar o badge de status do motorista
  const renderStatusMotoristaBadge = (status: string) => {
    const statusNormalizado = status.toLowerCase();
    switch(statusNormalizado) {
      case 'ativo':
        return <Badge variant="success">{status}</Badge>;
      case 'inativo':
        return <Badge variant="error">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Função para formatar data no padrão brasileiro
  const formatarData = (dataString: string | null | undefined) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  // Handler para salvar novo motorista
  const handleSaveMotorista = async (data: MotoristaFormData) => {
    // Em um ambiente real, isso enviaria os dados para a API
    console.log('Salvando motorista:', data);
    
    // Simular um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Adicionar o novo motorista ao estado local (mock)
    const novoMotorista = {
      id: `temp-${Date.now()}`,
      nome: data.nome,
      cpf: data.cpf,
      cnh: {
        numero: data.cnh,
        categoria: data.categoria_cnh,
        validade: data.validade_cnh,
        status: 'Válida'
      },
      telefone: '(67) 99999-9999', // Mock
      secretaria: secretariasMock.find(sec => sec.id === data.secretaria_id)?.nome || '',
      email: '', // Mock
      status: data.status === 'ativo' ? 'Ativo' : 'Inativo',
      ultimaViagem: ''
    };
    
    setMotoristas([novoMotorista, ...motoristas]);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Motoristas</h1>
        
        {podeCriar && (
          <Button 
            onClick={() => setModalMotoristaAberto(true)}
            className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Motorista
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
              placeholder="Buscar por nome, CPF ou CNH..."
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
              <label htmlFor="categoriaCNH" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria CNH
              </label>
              <select
                id="categoriaCNH"
                value={filtroPorCategoriaCNH}
                onChange={(e) => setFiltroPorCategoriaCNH(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {categoriasCNH.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="statusCNH" className="block text-sm font-medium text-gray-700 mb-1">
                Status CNH
              </label>
              <select
                id="statusCNH"
                value={filtroPorStatusCNH}
                onChange={(e) => setFiltroPorStatusCNH(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {statusCNH.map((status) => (
                  <option key={status} value={status}>
                    {status}
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
                {statusMotorista.map((status) => (
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

      {/* Lista de Motoristas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {carregando ? (
          <div className="p-8 text-center">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div>
            <p className="mt-2 text-gray-500">Carregando motoristas...</p>
          </div>
        ) : motoristasFiltrados.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">Nenhum motorista encontrado para os critérios selecionados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome/CPF
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CNH
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status CNH
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Secretaria
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Viagem
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {motoristasFiltrados.map((motorista) => (
                  <tr key={motorista.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{motorista.nome}</div>
                          <div className="text-sm text-gray-500">{motorista.cpf}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{motorista.cnh.numero}</div>
                      <div className="text-sm text-gray-500">Categoria {motorista.cnh.categoria}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="mb-1">{renderStatusCNHBadge(motorista.cnh.status)}</div>
                      <div className="text-xs text-gray-500">Validade: {formatarData(motorista.cnh.validade)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {motorista.secretaria}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusMotoristaBadge(motorista.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatarData(motorista.ultimaViagem)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <AcoesDropdown 
                        itens={[
                          {
                            label: 'Detalhes',
                            icon: <Eye className="w-4 h-4" />,
                            modalContent: <MotoristaDetalhes motorista={motorista} />,
                            modalTitulo: `Detalhes do Motorista - ${motorista.nome}`,
                            modalTamanho: 'lg'
                          },
                          {
                            label: 'Editar',
                            icon: <Edit className="w-4 h-4" />,
                            modalContent: <MotoristaFormulario
                              motorista={motorista}
                              secretarias={secretariasMock}
                              onSave={async (data) => {
                                console.log('Editando motorista:', data);
                                // Simular atualização
                                await new Promise(resolve => setTimeout(resolve, 1000));
                                // Atualizar a lista
                                setMotoristas(motoristas.map(item => 
                                  item.id === motorista.id 
                                    ? {
                                        ...motorista,
                                        nome: data.nome,
                                        cpf: data.cpf,
                                        cnh: {
                                          ...motorista.cnh,
                                          numero: data.cnh,
                                          categoria: data.categoria_cnh,
                                          validade: data.validade_cnh
                                        },
                                        telefone: data.telefone || motorista.telefone,
                                        email: data.email || motorista.email,
                                        secretaria: secretariasMock.find(s => s.id === data.secretaria_id)?.nome || motorista.secretaria,
                                        status: data.status === 'ativo' ? 'Ativo' : 'Inativo'
                                      } 
                                    : item
                                ));
                              }}
                              onCancel={() => {
                                console.log('Cancelando edição');
                              }}
                            />,
                            modalTitulo: 'Editar Motorista',
                            modalTamanho: 'lg'
                          },
                          {
                            label: 'Excluir',
                            icon: <Trash className="w-4 h-4" />,
                            variant: 'destructive',
                            onClick: () => {
                              console.log('Excluir motorista', motorista.id);
                              // Aqui seria implementada a lógica para excluir o motorista
                              setMotoristas(motoristas.filter(m => m.id !== motorista.id));
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

      {/* Modal de Novo Motorista */}
      <MotoristaNovoModal
        isOpen={modalMotoristaAberto}
        onClose={() => setModalMotoristaAberto(false)}
        onSave={handleSaveMotorista}
        secretarias={secretariasMock}
      />
    </div>
  );
} 