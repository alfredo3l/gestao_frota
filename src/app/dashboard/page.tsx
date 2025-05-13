'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Calendar, 
  Activity, 
  Database,
  Settings,
  Shield,
  ArrowRight,
  Car,
  Fuel,
  Wrench,
  AlertTriangle,
  FileBarChart,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Map,
  Building,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import Carregando from '@/components/ui/Carregando';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
// Removendo importações de hooks que não existem mais
// import { useLogs, LogAtividade } from '@/hooks/useLogs';
// import { usePermissoes } from '@/hooks/usePermissoes';
// import { useAutorizacao } from '@/hooks/useAutorizacao';

// Definindo o tipo LogAtividade que foi removido
interface LogAtividade {
  id: string;
  usuario: string;
  acao: 'criar' | 'editar' | 'excluir' | 'visualizar' | 'login' | 'aprovar' | 'rejeitar';
  recurso: string;
  descricao: string;
  data: Date;
}

export default function Dashboard() {
  // Substituindo o uso do hook useLogs por dados fictícios
  // const { logs, carregando: carregandoLogs, erro: erroLogs } = useLogs();
  const carregandoLogs = false;
  const erroLogs = null;
  const logs: LogAtividade[] = [
    {
      id: '1',
      usuario: 'João Silva',
      acao: 'criar',
      recurso: 'abastecimento',
      descricao: 'Registrou abastecimento do veículo ABC-1234',
      data: new Date(Date.now() - 1000 * 60 * 30) // 30 minutos atrás
    },
    {
      id: '2',
      usuario: 'Maria Oliveira',
      acao: 'editar',
      recurso: 'manutencao',
      descricao: 'Atualizou manutenção do veículo DEF-5678',
      data: new Date(Date.now() - 1000 * 60 * 120) // 2 horas atrás
    },
    {
      id: '3',
      usuario: 'Carlos Santos',
      acao: 'aprovar',
      recurso: 'solicitacao',
      descricao: 'Aprovou solicitação de uso de veículo',
      data: new Date(Date.now() - 1000 * 60 * 240) // 4 horas atrás
    }
  ];
  
  // Removendo uso do hook useAutorizacao
  // const { verificarPermissao } = useAutorizacao();
  
  // Dados fictícios para os gráficos
  const dadosConsumoVeiculos = [
    { veiculo: 'Toyota Corolla', consumo: 12.5, distancia: 1250, custo: 2800 },
    { veiculo: 'Fiat Strada', consumo: 8.7, distancia: 1800, custo: 4100 },
    { veiculo: 'VW Gol', consumo: 11.2, distancia: 950, custo: 1900 },
    { veiculo: 'Chevrolet S10', consumo: 7.5, distancia: 2100, custo: 5200 },
    { veiculo: 'Renault Duster', consumo: 9.8, distancia: 1460, custo: 3400 }
  ];
  
  const dadosManutencoesPorTipo = [
    { tipo: 'Preventiva', quantidade: 18, custo: 6800 },
    { tipo: 'Corretiva', quantidade: 12, custo: 15400 },
    { tipo: 'Revisão', quantidade: 25, custo: 3500 },
    { tipo: 'Emergencial', quantidade: 5, custo: 8700 },
    { tipo: 'Regularização', quantidade: 3, custo: 1200 }
  ];

  const dadosGastoPorSecretaria = [
    { secretaria: 'Administração', gasto: 12500 },
    { secretaria: 'Saúde', gasto: 18000 },
    { secretaria: 'Educação', gasto: 9500 },
    { secretaria: 'Obras', gasto: 21000 },
    { secretaria: 'Agricultura', gasto: 7600 }
  ];

  const dadosConsumoCombustivel = [
    { mes: 'Jan', valor: 8500 },
    { mes: 'Fev', valor: 7900 },
    { mes: 'Mar', valor: 9200 },
    { mes: 'Abr', valor: 8700 },
    { mes: 'Mai', valor: 9500 },
    { mes: 'Jun', valor: 9100 }
  ];

  // Cards de resumo
  const cardsResumo = [
    { 
      titulo: 'Veículos Ativos', 
      valor: '32', 
      descricao: '3 em manutenção', 
      icone: <Car className="w-8 h-8 text-blue-600" />, 
      cor: 'bg-blue-50'
    },
    { 
      titulo: 'Motoristas Disponíveis', 
      valor: '28', 
      descricao: '5 com CNH a vencer', 
      icone: <Users className="w-8 h-8 text-indigo-600" />, 
      cor: 'bg-indigo-50'
    },
    { 
      titulo: 'KM Rodados (Mês)', 
      valor: '15.420', 
      descricao: '+12% vs mês anterior', 
      icone: <TrendingUp className="w-8 h-8 text-green-600" />, 
      cor: 'bg-green-50'
    },
    { 
      titulo: 'Custo de Manutenção', 
      valor: 'R$ 23.800', 
      descricao: '8 manutenções pendentes', 
      icone: <Wrench className="w-8 h-8 text-amber-600" />, 
      cor: 'bg-amber-50'
    },
    { 
      titulo: 'Consumo Total (Mês)', 
      valor: 'R$ 36.400', 
      descricao: 'Combustível e lubrificantes', 
      icone: <Fuel className="w-8 h-8 text-red-600" />, 
      cor: 'bg-red-50'
    },
    { 
      titulo: 'Solicitações Ativas', 
      valor: '18', 
      descricao: '5 aguardando aprovação', 
      icone: <ClipboardList className="w-8 h-8 text-purple-600" />, 
      cor: 'bg-purple-50'
    },
  ];
  
  // Cards de navegação
  const cardsNavegacao = [
    { 
      titulo: 'Veículos', 
      descricao: 'Gerenciar frota, documentos e status', 
      icone: <Car className="w-6 h-6 text-blue-600" />, 
      cor: 'bg-blue-50 border-blue-100', 
      link: '/veiculos',
      estatistica: '32',
      detalhe: '28 ativos, 3 em manutenção, 1 inativo'
    },
    { 
      titulo: 'Motoristas', 
      descricao: 'Gerenciar cadastros de motoristas', 
      icone: <Users className="w-6 h-6 text-indigo-600" />, 
      cor: 'bg-indigo-50 border-indigo-100', 
      link: '/motoristas',
      estatistica: '28',
      detalhe: '5 motoristas com CNH a vencer'
    },
    { 
      titulo: 'Abastecimentos', 
      descricao: 'Registros de abastecimento e consumo', 
      icone: <Fuel className="w-6 h-6 text-green-600" />, 
      cor: 'bg-green-50 border-green-100', 
      link: '/abastecimentos',
      estatistica: '125',
      detalhe: '32 abastecimentos este mês'
    },
    { 
      titulo: 'Manutenções', 
      descricao: 'Controle de manutenções e revisões', 
      icone: <Wrench className="w-6 h-6 text-amber-600" />, 
      cor: 'bg-amber-50 border-amber-100', 
      link: '/manutencoes',
      estatistica: '63',
      detalhe: '8 manutenções agendadas'
    },
    { 
      titulo: 'Solicitações', 
      descricao: 'Requisições de uso de veículos', 
      icone: <ClipboardList className="w-6 h-6 text-purple-600" />, 
      cor: 'bg-purple-50 border-purple-100', 
      link: '/solicitacoes',
      estatistica: '18',
      detalhe: '5 pendentes, 13 aprovadas'
    },
    { 
      titulo: 'Relatórios', 
      descricao: 'Análises de consumo e custos', 
      icone: <FileBarChart className="w-6 h-6 text-red-600" />, 
      cor: 'bg-red-50 border-red-100', 
      link: '/relatorios',
      estatistica: '',
      detalhe: 'Gráficos e dados analíticos'
    },
    { 
      titulo: 'Rotas', 
      descricao: 'Mapeamento de trajetos frequentes', 
      icone: <Map className="w-6 h-6 text-emerald-600" />, 
      cor: 'bg-emerald-50 border-emerald-100', 
      link: '/rotas',
      estatistica: '23',
      detalhe: 'Rotas mapeadas e otimizadas'
    },
    { 
      titulo: 'Secretarias', 
      descricao: 'Departamentos e setores', 
      icone: <Building className="w-6 h-6 text-cyan-600" />, 
      cor: 'bg-cyan-50 border-cyan-100', 
      link: '/secretarias',
      estatistica: '8',
      detalhe: 'Secretarias com veículos alocados'
    },
    { 
      titulo: 'Administração', 
      descricao: 'Gerenciar usuários e permissões', 
      icone: <Shield className="w-6 h-6 text-gray-600" />, 
      cor: 'bg-gray-50 border-gray-100', 
      link: '/admin',
      estatistica: '6',
      detalhe: 'Usuários com acesso administrativo'
    },
    { 
      titulo: 'Configurações', 
      descricao: 'Configurações do sistema', 
      icone: <Settings className="w-6 h-6 text-gray-600" />, 
      cor: 'bg-gray-50 border-gray-100', 
      link: '/configuracoes',
      estatistica: '',
      detalhe: 'Personalizar sua experiência'
    }
  ];
  
  // Simplificando a função temPermissao
  const temPermissao = (recurso: string): boolean => {
    // Por padrão, todos têm permissão
    return true;
  };
  
  // Filtrar cards de navegação com base nas permissões do usuário
  const cardsNavegacaoFiltrados = cardsNavegacao.filter(card => {
    // Extrair o ID do recurso a partir do link
    const recursoId = card.link.split('/')[1];
    
    // Sempre mostrar o Dashboard
    if (recursoId === 'dashboard') return true;
    
    // Verificar permissão para os demais recursos
    return temPermissao(recursoId);
  });

  // Cores para gráficos
  const CORES = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#ec4899'];
  
  // Renderizar gráfico de barras para consumo de veículos
  const renderGraficoConsumo = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dadosConsumoVeiculos}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="veiculo" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip formatter={(value) => `${value} km/L`} />
          <Legend />
          <Bar dataKey="consumo" name="Consumo (km/L)" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  // Renderizar gráfico de pizza para manutenções por tipo
  const renderGraficoManutencoes = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dadosManutencoesPorTipo}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            dataKey="custo"
            nameKey="tipo"
            label={({ tipo, custo, percent }) => `${tipo}: ${(percent * 100).toFixed(0)}%`}
          >
            {dadosManutencoesPorTipo.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  // Renderizar gráfico de barras para gastos por secretaria
  const renderGraficoGastosSecretaria = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dadosGastoPorSecretaria}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="secretaria" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
          <Legend />
          <Bar dataKey="gasto" name="Gastos Totais (R$)" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // Renderizar gráfico de linha para consumo mensal de combustível
  const renderGraficoConsumoCombustivel = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={dadosConsumoCombustivel}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="valor" 
            name="Gastos com Combustível (R$)" 
            stroke="#ef4444" 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };
  
  const renderIconeAcao = (acao: LogAtividade['acao']) => {
    switch (acao) {
      case 'criar':
        return <Database className="w-5 h-5 text-green-500" />;
      case 'editar':
        return <FileText className="w-5 h-5 text-amber-500" />;
      case 'excluir':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'login':
        return <Users className="w-5 h-5 text-blue-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const formatarTempoRelativo = (data: Date) => {
    const agora = new Date();
    const diferencaMs = agora.getTime() - data.getTime();
    
    const minutos = Math.floor(diferencaMs / (1000 * 60));
    const horas = Math.floor(diferencaMs / (1000 * 60 * 60));
    const dias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));
    
    if (minutos < 60) {
      return `${minutos} min atrás`;
    } else if (horas < 24) {
      return `${horas} h atrás`;
    } else if (dias < 30) {
      return `${dias} dias atrás`;
    } else {
      return format(data, 'dd/MM/yyyy', { locale: ptBR });
    }
  };

  if (carregandoLogs) {
    return <Carregando />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Visão geral e principais indicadores do sistema de gestão de frotas
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cardsResumo.map((card, index) => (
          <div key={index} className={`p-4 rounded-lg border ${card.cor}`}>
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-gray-500 text-sm">{card.titulo}</h3>
                <p className="text-2xl font-bold mt-1">{card.valor}</p>
                <p className="text-sm text-gray-500 mt-1">{card.descricao}</p>
              </div>
              <div className="flex items-center justify-center">
                {card.icone}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos - primeira linha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Consumo Médio por Veículo (km/L)</h2>
          {renderGraficoConsumo()}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Custos de Manutenção por Tipo</h2>
          {renderGraficoManutencoes()}
        </div>
      </div>

      {/* Gráficos - segunda linha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Gastos por Secretaria</h2>
          {renderGraficoGastosSecretaria()}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Consumo de Combustível (Últimos 6 meses)</h2>
          {renderGraficoConsumoCombustivel()}
        </div>
      </div>

      {/* Alertas e Lembretes */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Alertas e Lembretes</h2>
          <Link href="/notificacoes" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Ver todos
          </Link>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
            <div className="p-2 bg-amber-100 rounded-full text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">5 CNHs próximas de vencer</h3>
              <p className="text-sm text-gray-600 mt-1">Verifique os motoristas que precisam renovar a CNH nos próximos 30 dias</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
            <div className="p-2 bg-red-100 rounded-full text-red-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">3 veículos com manutenção atrasada</h3>
              <p className="text-sm text-gray-600 mt-1">Veículos com manutenção preventiva programada vencida</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
            <div className="p-2 bg-blue-100 rounded-full text-blue-700">
              <Fuel className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">Consumo acima da média</h3>
              <p className="text-sm text-gray-600 mt-1">2 veículos apresentando consumo de combustível acima do esperado</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-full text-green-700">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">Revisões programadas</h3>
              <p className="text-sm text-gray-600 mt-1">8 veículos com revisão programada para os próximos 15 dias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Links de acesso rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {cardsNavegacaoFiltrados.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className={`flex flex-col p-4 rounded-lg border ${card.cor} hover:bg-opacity-80 transition-all`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 rounded-lg bg-white bg-opacity-50">
                {card.icone}
              </div>
              {card.estatistica && (
                <span className="text-lg font-bold">{card.estatistica}</span>
              )}
            </div>
            <h3 className="font-semibold mt-2">{card.titulo}</h3>
            <p className="text-sm text-gray-600 mt-1 mb-2">{card.descricao}</p>
            {card.detalhe && (
              <p className="text-xs text-gray-500 mt-auto">{card.detalhe}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Atividades recentes */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Atividades Recentes</h2>
          <Link href="/admin/logs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Ver todas
          </Link>
        </div>
        <div className="overflow-hidden">
          {logs && logs.length > 0 ? (
            <div className="space-y-4">
              {logs.slice(0, 5).map((log, index) => (
                <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                  <div className="mr-3">
                    {renderIconeAcao(log.acao)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{log.usuario}</span>
                      <span className="text-gray-600"> {log.descricao}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatarTempoRelativo(log.data)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 py-4 text-center">Nenhuma atividade recente registrada.</p>
          )}
        </div>
      </div>
    </div>
  );
} 