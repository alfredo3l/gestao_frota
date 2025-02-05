'use client';

import { useState, useEffect } from 'react';
import { Building2, Users, ClipboardList, AlertCircle, ArrowUpRight, ArrowDownRight, Calendar, MapPin, Clock, Hash, ArrowRight, Search, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Sidebar from '../../../components/layout/Sidebar';
import Charts from '../../../components/dashboard/Charts';
import RealEstateList from '../../../components/dashboard/RealEstateList';
import InspectorsList from '../../../components/dashboard/InspectorsList';
import InspectionsList from '../../../components/dashboard/InspectionsList';
import InspectionsTabBar, { InspectionStatus } from '../../../components/dashboard/InspectionsTabBar';
import SettingsManager from '../../../components/dashboard/SettingsManager';
import InspectionModal, { InspectionFormData } from '../../../components/modals/InspectionModal';
import DeleteConfirm from '../../../components/modals/DeleteConfirm';

const ClientHeader = dynamic(() => import('@/components/layout/ClientHeader'), {
  ssr: false
});

export default function DashGestor() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [activeInspectionTab, setActiveInspectionTab] = useState<InspectionStatus>('agendadas');
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isContestacao, setIsContestacao] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth >= 768);
    
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddInspection = () => {
    setIsInspectionModalOpen(true);
  };

  const handleSubmitInspection = (data: InspectionFormData) => {
    // TODO: Implementar lógica para salvar a vistoria
    console.log('Nova vistoria:', data);
  };

  const handleDelete = () => {
    if (selectedInspection) {
      // Aqui você implementaria a lógica real de exclusão
      console.log('Excluindo vistoria:', selectedInspection.id);
      setIsDeleteModalOpen(false);
      setSelectedInspection(null);
    }
  };

  const canDelete = (status: InspectionStatus) => {
    return status === 'agendadas' || status === 'atribuidas';
  };

  const renderContent = () => {
    switch (activeItem.toLowerCase()) {
      case 'imobiliárias':
        return <RealEstateList />;
      case 'vistoriadores':
        return <InspectorsList />;
      case 'vistorias':
        return (
          <div className="space-y-6">
            <InspectionsTabBar
              activeTab={activeInspectionTab}
              onTabChange={setActiveInspectionTab}
              onAddInspection={handleAddInspection}
            />
            <InspectionsList status={activeInspectionTab} />
            <InspectionModal
              isOpen={isInspectionModalOpen}
              onClose={() => setIsInspectionModalOpen(false)}
              onSubmit={handleSubmitInspection}
            />
          </div>
        );
      case 'configurações':
        return <SettingsManager />;
      default:
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Card - Total de Imobiliárias */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    12.5%
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">152</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm">Imobiliárias Ativas</p>
                    <span className="text-xs text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                      +8 novas
                    </span>
                  </div>
                </div>
              </div>

              {/* Card - Total de Vistoriadores */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    8.2%
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">48</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm">Vistoriadores Ativos</p>
                    <span className="text-xs text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                      +3 novos
                    </span>
                  </div>
                </div>
              </div>

              {/* Card - Vistorias Agendadas */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ClipboardList className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                    <ArrowUpRight className="w-4 h-4" />
                    23.1%
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">89</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm">Vistorias Agendadas</p>
                    <span className="text-xs text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                      Hoje: 12
                    </span>
                  </div>
                </div>
              </div>

              {/* Card - Vistorias Atrasadas */}
              <div className="bg-white p-4 md:p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertCircle className="w-5 md:w-6 h-5 md:h-6 text-red-500" />
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-red-500">
                    <ArrowDownRight className="w-4 h-4" />
                    5.4%
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">12</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm">Vistorias Atrasadas</p>
                    <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                      Crítico
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="overflow-x-auto">
              <Charts />
            </div>

            {/* Tabela de Vistorias Recentes */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Vistorias Recentes</h2>
                  <p className="text-sm text-gray-600">Últimas vistorias registradas no sistema</p>
                </div>
                <button 
                  onClick={() => setActiveItem('vistorias')}
                  className="text-sm text-primary hover:text-primary-light transition-colors"
                >
                  Ver todas
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Imobiliária
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vistoriador
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Endereço
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Imob Premium</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">JS</span>
                          </div>
                          <span className="text-sm text-gray-600">João Silva</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                        Rua das Flores, 123
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Concluída
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-sm text-gray-600">24/03/2024</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Imob Plus</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">MS</span>
                          </div>
                          <span className="text-sm text-gray-600">Maria Santos</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                        Av. Principal, 456
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                          Agendada
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-sm text-gray-600">25/03/2024</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Imob Master</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">PC</span>
                          </div>
                          <span className="text-sm text-gray-600">Pedro Costa</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                        Rua do Comércio, 789
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          Atrasada
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-sm text-gray-600">23/03/2024</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Imob Elite</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">RL</span>
                          </div>
                          <span className="text-sm text-gray-600">Rafael Lima</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                        Av. das Palmeiras, 321
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                          Em Andamento
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-sm text-gray-600">25/03/2024</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Imob Prime</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">CA</span>
                          </div>
                          <span className="text-sm text-gray-600">Carlos Almeida</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                        Rua dos Ipês, 567
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          Atribuída
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-sm text-gray-600">25/03/2024</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Imob Select</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">LF</span>
                          </div>
                          <span className="text-sm text-gray-600">Lucas Ferreira</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                        Av. Central, 890
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Liberada
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-sm text-gray-600">25/03/2024</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onMenuItemClick={setActiveItem}
        activeItem={activeItem.toLowerCase()}
      />
      <ClientHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isMenuOpen={isSidebarOpen} />

      <main className="pl-0 md:pl-20 lg:pl-64 pt-16 transition-all duration-300">
        <div className="p-4 md:p-6 space-y-6">
          {renderContent()}
        </div>
      </main>

      {/* Modal de Adicionar Vistoria */}
      <InspectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitInspection}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirm
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedInspection(null);
        }}
        onConfirm={handleDelete}
        title="Excluir Vistoria"
        description={`Tem certeza que deseja excluir esta vistoria? Esta ação não poderá ser desfeita.`}
      />
    </div>
  );
} 