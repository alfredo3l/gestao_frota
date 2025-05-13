'use client';

import { useState, useEffect } from 'react';
import { Building, ArrowLeft, DollarSign } from 'lucide-react';
import Link from 'next/link';

// Dados de exemplo para visualização
const dadosExemplo = [
  { secretaria: 'Secretaria de Saúde', totalVeiculos: 12, combustivel: 12500, manutencao: 5600, total: 18100 },
  { secretaria: 'Secretaria de Educação', totalVeiculos: 8, combustivel: 8200, manutencao: 3800, total: 12000 },
  { secretaria: 'Secretaria de Obras', totalVeiculos: 15, combustivel: 22300, manutencao: 9400, total: 31700 },
  { secretaria: 'Secretaria de Serviços Urbanos', totalVeiculos: 10, combustivel: 14700, manutencao: 6800, total: 21500 },
  { secretaria: 'Secretaria de Cultura e Turismo', totalVeiculos: 3, combustivel: 3200, manutencao: 1500, total: 4700 },
];

export default function CustosSecretariaPage() {
  const [periodo, setPeriodo] = useState('mes');
  const [dados, setDados] = useState(dadosExemplo);
  const [carregando, setCarregando] = useState(false);
  const [totalGeral, setTotalGeral] = useState({
    veiculos: 0,
    combustivel: 0,
    manutencao: 0,
    total: 0,
  });

  // Efeito para simular o carregamento dos dados e calcular totais
  useEffect(() => {
    setCarregando(true);
    // Simular uma chamada de API
    setTimeout(() => {
      setCarregando(false);
      
      // Calcular totais
      const totais = dados.reduce(
        (acc, curr) => {
          return {
            veiculos: acc.veiculos + curr.totalVeiculos,
            combustivel: acc.combustivel + curr.combustivel,
            manutencao: acc.manutencao + curr.manutencao,
            total: acc.total + curr.total,
          };
        },
        { veiculos: 0, combustivel: 0, manutencao: 0, total: 0 }
      );
      
      setTotalGeral(totais);
    }, 1000);
  }, [dados, periodo]);

  // Função para gerar o relatório com filtros
  const gerarRelatorio = () => {
    setCarregando(true);
    // Aqui seria feita uma chamada real à API
    setTimeout(() => {
      setCarregando(false);
      // Simular filtro por período
      if (periodo === 'semana') {
        setDados(dadosExemplo.slice(0, 2));
      } else if (periodo === 'mes') {
        setDados(dadosExemplo);
      } else {
        // Simular dados para trimestre (aumentando valores)
        setDados(dadosExemplo.map(item => ({
          ...item,
          combustivel: Math.round(item.combustivel * 2.8),
          manutencao: Math.round(item.manutencao * 2.5),
          total: Math.round((item.combustivel * 2.8) + (item.manutencao * 2.5))
        })));
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
          <Building className="mr-2 w-6 h-6" />
          Custos por Secretaria
        </h1>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Secretaria</label>
            <select
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="todas">Todas as secretarias</option>
              {dadosExemplo.map((item, index) => (
                <option key={index} value={item.secretaria}>
                  {item.secretaria}
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
        <h2 className="text-lg font-semibold mb-4">Distribuição de Custos por Secretaria</h2>
        
        <div className="min-h-60 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="text-center">
            <DollarSign className="w-12 h-12 mx-auto text-green-600" />
            <p className="mt-2 text-gray-600">
              {carregando 
                ? 'Carregando gráfico...' 
                : 'Visualização gráfica da distribuição de custos por secretaria'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Aqui seria renderizado um gráfico com biblioteca como Chart.js ou Recharts
            </p>
          </div>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b">Dados Detalhados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Secretaria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total de Veículos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Custo Combustível (R$)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Custo Manutenção (R$)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Custo Total (R$)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {carregando ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    Carregando dados...
                  </td>
                </tr>
              ) : (
                <>
                  {dados.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.secretaria}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.totalVeiculos}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        R$ {item.combustivel.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        R$ {item.manutencao.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        R$ {item.total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  
                  {/* Linha de totais */}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      TOTAL GERAL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {totalGeral.veiculos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {totalGeral.combustivel.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {totalGeral.manutencao.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 font-bold">
                      R$ {totalGeral.total.toLocaleString()}
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