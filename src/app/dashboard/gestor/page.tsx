'use client';

import { useState, useEffect } from 'react';
import { Building2, Users, ClipboardList, AlertCircle, ArrowUpRight, ArrowDownRight, Calendar, MapPin, Clock, Hash, ArrowRight, Search, Trash2, FileText } from 'lucide-react';
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
import { Inspection } from '@/types/inspection';

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
  const [filterRealEstate, setFilterRealEstate] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<InspectionStatus | ''>('');
  const [filterInspector, setFilterInspector] = useState<string>('');
  const [filterSearchTerm, setFilterSearchTerm] = useState<string>('');

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

  // Mock data para demonstração (substituir por dados reais)
  const mockInspections: Inspection[] = [
    {
      id: 1,
      company: 'Tech Field',
      inspector: 'João Silva',
      address: 'Rua das Inovações, 456',
      status: 'agendadas',
      date: '26/03/2024',
      propertyCode: 'TF001',
      time: '10:00',
      type: 'Residencial'
    },
    {
      id: 2,
      company: 'Tank Field Cinco',
      inspector: 'Maria Santos',
      address: 'Av. da Tecnologia, 789',
      status: 'finalizadas',
      date: '24/03/2024',
      propertyCode: 'TF5002',
      time: '14:30',
      type: 'Comercial'
    },
    {
      id: 3,
      company: 'Imob Premium',
      inspector: 'Pedro Costa',
      address: 'Rua das Flores, 123',
      status: 'finalizadas',
      date: '24/03/2024',
      propertyCode: '',
      time: '',
      type: ''
    },
    {
      id: 4,
      company: 'Imob Plus',
      inspector: 'Ana Oliveira',
      address: 'Av. Principal, 456',
      status: 'agendadas',
      date: '25/03/2024',
      propertyCode: '',
      time: '',
      type: ''
    },
    {
      id: 5,
      company: 'Imob Master',
      inspector: 'Carlos Souza',
      address: 'Rua do Comércio, 789',
      status: 'atrasadas',
      date: '23/03/2024',
      propertyCode: '',
      time: '',
      type: ''
    },
    {
      id: 6,
      company: 'Imob Elite',
      inspector: 'Rafael Lima',
      address: 'Av. das Palmeiras, 321',
      status: 'andamento',
      date: '25/03/2024',
      propertyCode: '',
      time: '',
      type: ''
    },
    {
      id: 7,
      company: 'Imob Prime',
      inspector: 'Mariana Costa',
      address: 'Rua dos Ipês, 567',
      status: 'liberadas',
      date: '25/03/2024',
      propertyCode: '',
      time: '',
      type: ''
    }
  ];

  const handleGenerateReport = () => {
    // Implementação básica de geração de relatório
    const filteredData = mockInspections.filter(inspection => {
      const matchRealEstate = !filterRealEstate || inspection.company === filterRealEstate;
      const matchStatus = !filterStatus || inspection.status === filterStatus;
      const matchInspector = !filterInspector || inspection.inspector === filterInspector;
      const matchSearchTerm = !filterSearchTerm || 
        inspection.address.toLowerCase().includes(filterSearchTerm.toLowerCase());

      return matchRealEstate && matchStatus && matchInspector && matchSearchTerm;
    });

    // Aqui você pode implementar a lógica real de geração de relatório
    console.log('Relatório gerado:', filteredData);
    // Exemplo: Pode ser uma chamada para uma API de geração de relatório
    // ou download direto de um arquivo
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
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleGenerateReport}
                    className="text-sm text-primary hover:text-primary-light transition-colors flex items-center gap-2 border border-primary/30 px-3 py-2 rounded-md"
                  >
                    <FileText className="w-4 h-4" />
                    Gerar Relatório
                  </button>
                  <button 
                    onClick={() => setActiveItem('vistorias')}
                    className="text-sm text-primary hover:text-primary-light transition-colors"
                  >
                    Ver todas
                  </button>
                </div>
              </div>
              
              {/* Filtros da Tabela */}
              <div className="p-4 md:p-6 border-b border-border grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Busca</label>
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Buscar por endereço..."
                      value={filterSearchTerm}
                      onChange={(e) => setFilterSearchTerm(e.target.value)}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <Search className="absolute right-3 top-3 text-gray-400" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Imobiliária</label>
                  <select 
                    value={filterRealEstate}
                    onChange={(e) => setFilterRealEstate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Todas Imobiliárias</option>
                    <option value="Tech Field">Tech Field</option>
                    <option value="Tank Field Cinco">Tank Field Cinco</option>
                    {Array.from(new Set(mockInspections.map(i => i.company)))
                      .filter(company => !['Tech Field', 'Tank Field Cinco'].includes(company))
                      .map(estate => (
                        <option key={estate} value={estate}>{estate}</option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as InspectionStatus)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Todos Status</option>
                    <option value="agendadas">Agendadas</option>
                    <option value="finalizadas">Concluídas</option>
                    <option value="atrasadas">Atrasadas</option>
                    <option value="andamento">Em Andamento</option>
                    <option value="liberadas">Liberadas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vistoriador</label>
                  <select 
                    value={filterInspector}
                    onChange={(e) => setFilterInspector(e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Todos Vistoriadores</option>
                    {Array.from(new Set(mockInspections.map(i => i.inspector))).map(inspector => (
                      <option key={inspector} value={inspector}>{inspector}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Código Vistoria
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Imobiliária
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vistoriador
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Endereço
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Tipo
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
                    {mockInspections
                      .filter(inspection => {
                        const matchRealEstate = !filterRealEstate || inspection.company === filterRealEstate;
                        const matchStatus = !filterStatus || inspection.status === filterStatus;
                        const matchInspector = !filterInspector || inspection.inspector === filterInspector;
                        const matchSearchTerm = !filterSearchTerm || 
                          inspection.address.toLowerCase().includes(filterSearchTerm.toLowerCase());

                        return matchRealEstate && matchStatus && matchInspector && matchSearchTerm;
                      })
                      .map(inspection => (
                        <tr key={inspection.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 md:px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                            {inspection.propertyCode || 'N/A'}
                          </td>
                          <td className="px-4 md:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{inspection.company}</span>
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">
                                  {inspection.inspector?.split(' ').map(n => n[0]).join('') || ''}
                                </span>
                              </div>
                              <span className="text-sm text-gray-600">{inspection.inspector || ''}</span>
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                            {inspection.address}
                          </td>
                          <td className="px-4 md:px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                            {inspection.type || 'N/A'}
                          </td>
                          <td className="px-4 md:px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium 
                              ${inspection.status === 'finalizadas' ? 'bg-green-50 text-green-700' : 
                              inspection.status === 'agendadas' ? 'bg-yellow-50 text-yellow-700' : 
                              inspection.status === 'atrasadas' ? 'bg-red-50 text-red-700' : 
                              'bg-primary/10 text-primary'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full 
                                ${inspection.status === 'finalizadas' ? 'bg-green-500' : 
                                inspection.status === 'agendadas' ? 'bg-yellow-500' : 
                                inspection.status === 'atrasadas' ? 'bg-red-500' : 
                                'bg-primary'}`}></span>
                              {inspection.status ? 
                                (inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)) : 
                                'Sem status'
                              }
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                            <span className="text-sm text-gray-600">{inspection.date}</span>
                          </td>
                        </tr>
                      ))}
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