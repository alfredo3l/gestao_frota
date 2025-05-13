'use client';

import { useState, useEffect } from 'react';
import { Wrench, ArrowLeft, Calendar, Car } from 'lucide-react';
import Link from 'next/link';

// Dados de exemplo para visualização
const dadosExemplo = [
  { 
    placa: 'ABC-1234', 
    veiculo: 'Toyota Corolla', 
    tipoManutencao: 'Preventiva', 
    descricao: 'Troca de óleo e filtros',
    data: '2023-11-15',
    valor: 450.00,
    oficina: 'Auto Center Silva'
  },
  { 
    placa: 'DEF-5678', 
    veiculo: 'Honda Civic', 
    tipoManutencao: 'Corretiva', 
    descricao: 'Substituição da embreagem',
    data: '2023-10-22',
    valor: 1350.00,
    oficina: 'Mecânica Central'
  },
  { 
    placa: 'GHI-9012', 
    veiculo: 'Volkswagen Gol', 
    tipoManutencao: 'Preventiva', 
    descricao: 'Revisão de 30.000 km',
    data: '2023-10-05',
    valor: 850.00,
    oficina: 'Concessionária Volkswagen'
  },
  { 
    placa: 'JKL-3456', 
    veiculo: 'Fiat Uno', 
    tipoManutencao: 'Corretiva', 
    descricao: 'Reparo no sistema de freios',
    data: '2023-09-18',
    valor: 680.00,
    oficina: 'Freios & Cia'
  },
  { 
    placa: 'MNO-7890', 
    veiculo: 'Chevrolet Onix', 
    tipoManutencao: 'Preventiva', 
    descricao: 'Alinhamento e balanceamento',
    data: '2023-09-02',
    valor: 280.00,
    oficina: 'Auto Center Silva'
  },
];

// Função para formatar data
const formatarData = (dataString: string) => {
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR');
};

export default function ManutencoesRelatorioPpage() {
  const [periodo, setPeriodo] = useState('mes');
  const [tipoManutencao, setTipoManutencao] = useState('todas');
  const [dados, setDados] = useState(dadosExemplo);
  const [carregando, setCarregando] = useState(false);
  const [totalValor, setTotalValor] = useState(0);

  // Efeito para simular o carregamento dos dados e calcular totais
  useEffect(() => {
    setCarregando(true);
    // Simular uma chamada de API
    setTimeout(() => {
      setCarregando(false);
      
      // Calcular total
      const total = dados.reduce((acc, curr) => acc + curr.valor, 0);
      setTotalValor(total);
    }, 1000);
  }, [dados, periodo, tipoManutencao]);

  // Função para gerar o relatório com filtros
  const gerarRelatorio = () => {
    setCarregando(true);
    // Aqui seria feita uma chamada real à API
    setTimeout(() => {
      setCarregando(false);

      // Filtrar por tipo de manutenção
      let dadosFiltrados = [...dadosExemplo];
      
      if (tipoManutencao !== 'todas') {
        dadosFiltrados = dadosFiltrados.filter(item => 
          item.tipoManutencao.toLowerCase() === tipoManutencao.toLowerCase()
        );
      }
      
      // Simular filtro por período
      if (periodo === 'semana') {
        // Simular apenas os registros mais recentes
        setDados(dadosFiltrados.slice(0, 2));
      } else if (periodo === 'mes') {
        setDados(dadosFiltrados);
      } else {
        // Para trimestre, adicionar alguns registros extras
        const registrosExtras = [
          { 
            placa: 'ABC-1234', 
            veiculo: 'Toyota Corolla', 
            tipoManutencao: 'Corretiva', 
            descricao: 'Substituição da bateria',
            data: '2023-08-12',
            valor: 580.00,
            oficina: 'Auto Elétrica São José'
          },
          { 
            placa: 'DEF-5678', 
            veiculo: 'Honda Civic', 
            tipoManutencao: 'Preventiva', 
            descricao: 'Troca de pneus',
            data: '2023-08-05',
            valor: 1800.00,
            oficina: 'Pneu Center'
          },
        ];
        
        // Filtrar os registros extras pelo tipo de manutenção, se necessário
        let extrasFiltrados = [...registrosExtras];
        if (tipoManutencao !== 'todas') {
          extrasFiltrados = extrasFiltrados.filter(item => 
            item.tipoManutencao.toLowerCase() === tipoManutencao.toLowerCase()
          );
        }
        
        setDados([...dadosFiltrados, ...extrasFiltrados]);
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Link href="/relatorios" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </Link>
          <Wrench className="mr-2 w-6 h-6" />
          Relatório de Manutenções
        </h1>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="semana">Última Semana</option>
              <option value="mes">Último Mês</option>
              <option value="trimestre">Último Trimestre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Manutenção</label>
            <select
              value={tipoManutencao}
              onChange={(e) => setTipoManutencao(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="todas">Todas</option>
              <option value="preventiva">Preventiva</option>
              <option value="corretiva">Corretiva</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Veículo</label>
            <select
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="todos">Todos os veículos</option>
              {dadosExemplo.map((item, index) => (
                <option key={item.placa} value={`${item.placa}`}>
                  {item.placa} - {item.veiculo}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={gerarRelatorio}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              disabled={carregando}
            >
              {carregando ? 'Carregando...' : 'Gerar Relatório'}
            </button>
          </div>
        </div>
      </div>

      {/* Visualização Gráfica - Aqui seria implementado um gráfico real */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Distribuição de Manutenções por Tipo</h2>
        
        <div className="min-h-60 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="text-center">
            <Car className="w-12 h-12 mx-auto text-orange-600" />
            <p className="mt-2 text-gray-600">
              {carregando 
                ? 'Carregando gráfico...' 
                : 'Visualização gráfica da distribuição de manutenções por tipo e custo'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Aqui seria renderizado um gráfico com biblioteca como Chart.js ou Recharts
            </p>
          </div>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b">Manutenções Detalhadas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Placa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Oficina
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor (R$)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {carregando ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    Carregando dados...
                  </td>
                </tr>
              ) : (
                <>
                  {dados.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.placa}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.veiculo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatarData(item.data)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        item.tipoManutencao === 'Preventiva' 
                          ? 'text-green-600 font-medium' 
                          : 'text-orange-600 font-medium'
                      }`}>
                        {item.tipoManutencao}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {item.descricao}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.oficina}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        R$ {item.valor.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                  
                  {/* Linha de totais */}
                  <tr className="bg-gray-50 font-semibold">
                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      TOTAL DE MANUTENÇÕES:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                      R$ {totalValor.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 