'use client';

import { useState, useEffect } from 'react';
import { BarChart, Car, Fuel, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Dados de exemplo para visualização
const dadosExemplo = [
  { placa: 'ABC-1234', veiculo: 'Toyota Corolla', kmRodados: 1250, litrosConsumidos: 125, consumoMedio: 10.0 },
  { placa: 'DEF-5678', veiculo: 'Honda Civic', kmRodados: 980, litrosConsumidos: 82, consumoMedio: 11.95 },
  { placa: 'GHI-9012', veiculo: 'Volkswagen Gol', kmRodados: 1560, litrosConsumidos: 156, consumoMedio: 10.0 },
  { placa: 'JKL-3456', veiculo: 'Fiat Uno', kmRodados: 890, litrosConsumidos: 98, consumoMedio: 9.08 },
  { placa: 'MNO-7890', veiculo: 'Chevrolet Onix', kmRodados: 1320, litrosConsumidos: 110, consumoMedio: 12.0 },
];

export default function ConsumoVeiculoPage() {
  const [periodo, setPeriodo] = useState('mes');
  const [veiculos, setVeiculos] = useState<string[]>([]);
  const [dados, setDados] = useState(dadosExemplo);
  const [carregando, setCarregando] = useState(false);

  // Efeito para simular o carregamento dos dados
  useEffect(() => {
    setCarregando(true);
    // Simular uma chamada de API
    setTimeout(() => {
      setCarregando(false);
    }, 1000);
  }, [periodo]);

  // Função para gerar o relatório com filtros
  const gerarRelatorio = () => {
    setCarregando(true);
    // Aqui seria feita uma chamada real à API
    setTimeout(() => {
      setCarregando(false);
      // Simular filtro por período
      if (periodo === 'semana') {
        setDados(dadosExemplo.slice(0, 3));
      } else if (periodo === 'mes') {
        setDados(dadosExemplo);
      } else {
        setDados(dadosExemplo.concat(dadosExemplo.slice(0, 2)));
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
          <BarChart className="mr-2 w-6 h-6" />
          Consumo por Veículo
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Veículos</label>
            <select
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="todos">Todos os veículos</option>
              {dadosExemplo.map((item) => (
                <option key={item.placa} value={item.placa}>
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
        <h2 className="text-lg font-semibold mb-4">Consumo por Veículo</h2>
        
        <div className="min-h-60 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="text-center">
            <Fuel className="w-12 h-12 mx-auto text-blue-600" />
            <p className="mt-2 text-gray-600">
              {carregando 
                ? 'Carregando gráfico...' 
                : 'Visualização gráfica do consumo médio (km/l) por veículo'}
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
                  Placa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KM Rodados
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Litros Consumidos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Consumo Médio (km/l)
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
                dados.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.placa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.veiculo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.kmRodados.toLocaleString()} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.litrosConsumidos.toLocaleString()} L
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.consumoMedio.toFixed(2)} km/L
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 