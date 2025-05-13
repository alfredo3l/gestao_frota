'use client';

import { FileBarChart, BarChart, Building, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RelatoriosPage() {
  const router = useRouter();

  const relatoriOptions = [
    {
      title: 'Consumo por Veículo',
      description: 'Visualize o consumo de combustível por veículo ao longo do tempo',
      icon: <BarChart className="w-8 h-8 text-blue-600" />,
      href: '/relatorios/consumo',
    },
    {
      title: 'Custos por Secretaria',
      description: 'Analise os custos de frota discriminados por secretaria',
      icon: <Building className="w-8 h-8 text-green-600" />,
      href: '/relatorios/custos',
    },
    {
      title: 'Manutenções',
      description: 'Visualize estatísticas de manutenções por veículo e período',
      icon: <Wrench className="w-8 h-8 text-orange-600" />,
      href: '/relatorios/manutencoes',
    },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FileBarChart className="mr-2 w-6 h-6" />
        Relatórios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatoriOptions.map((option, index) => (
          <Link
            key={index}
            href={option.href}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-center mb-4">
              {option.icon}
              <h2 className="text-xl font-semibold ml-3">{option.title}</h2>
            </div>
            <p className="text-gray-600">{option.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 