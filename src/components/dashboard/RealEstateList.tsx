'use client';

import { useState } from 'react';
import { Eye, Edit2, Trash2, MapPin, Phone, Mail, Plus } from 'lucide-react';
import RealEstateModal from '../modals/RealEstateModal';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';

const REAL_ESTATE_LOGOS = [
  'https://img.freepik.com/vetores-gratis/logotipo-para-solucoes-imobiliarias-domesticas-que-e-uma-solucao-domestica_527952-33.jpg?semt=ais_hybrid',
  'https://i.pinimg.com/550x/1f/f6/8d/1ff68d3800d83663d66d8b3bad059e75.jpg',
  'https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2022%2F02%2F18%2F17%2FLogo-276326_141343_171423295_576408745.jpg'
];

// Dados simulados
const realEstates = [
  {
    id: 1,
    name: 'Imob Premium',
    logo: REAL_ESTATE_LOGOS[0],
    address: 'Rua das Flores, 123',
    phone: '(11) 99999-9999',
    email: 'contato@imobpremium.com.br',
    activeListings: 45,
    completedInspections: 128,
  },
  {
    id: 2,
    name: 'Imob Plus',
    logo: REAL_ESTATE_LOGOS[1],
    address: 'Av. Principal, 456',
    phone: '(11) 98888-8888',
    email: 'contato@imobplus.com.br',
    activeListings: 32,
    completedInspections: 95,
  },
  {
    id: 3,
    name: 'Imob Master',
    logo: REAL_ESTATE_LOGOS[2],
    address: 'Rua do Comércio, 789',
    phone: '(11) 97777-7777',
    email: 'contato@imobmaster.com.br',
    activeListings: 28,
    completedInspections: 76,
  },
  {
    id: 4,
    name: 'Imob Elite',
    logo: REAL_ESTATE_LOGOS[0],
    address: 'Av. das Palmeiras, 321',
    phone: '(11) 96666-6666',
    email: 'contato@imobelite.com.br',
    activeListings: 52,
    completedInspections: 145,
  },
  {
    id: 5,
    name: 'Imob Prime',
    logo: REAL_ESTATE_LOGOS[1],
    address: 'Rua dos Ipês, 654',
    phone: '(11) 95555-5555',
    email: 'contato@imobprime.com.br',
    activeListings: 38,
    completedInspections: 112,
  },
  {
    id: 6,
    name: 'Imob Select',
    logo: REAL_ESTATE_LOGOS[2],
    address: 'Av. Central, 987',
    phone: '(11) 94444-4444',
    email: 'contato@imobselect.com.br',
    activeListings: 41,
    completedInspections: 98,
  },
  {
    id: 7,
    name: 'Imob Gold',
    logo: REAL_ESTATE_LOGOS[0],
    address: 'Rua das Acácias, 741',
    phone: '(11) 93333-3333',
    email: 'contato@imobgold.com.br',
    activeListings: 35,
    completedInspections: 89,
  },
  {
    id: 8,
    name: 'Imob Diamond',
    logo: REAL_ESTATE_LOGOS[1],
    address: 'Av. dos Jardins, 852',
    phone: '(11) 92222-2222',
    email: 'contato@imobdiamond.com.br',
    activeListings: 48,
    completedInspections: 134,
  },
  {
    id: 9,
    name: 'Imob Royal',
    logo: REAL_ESTATE_LOGOS[2],
    address: 'Rua das Orquídeas, 963',
    phone: '(11) 91111-1111',
    email: 'contato@imobroyal.com.br',
    activeListings: 43,
    completedInspections: 118,
  },
];

export default function RealEstateList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRealEstate, setSelectedRealEstate] = useState<any>(null);

  const handleAdd = (data: any) => {
    console.log('Adicionar:', data);
    // Aqui você vai implementar a lógica de adicionar no Supabase
  };

  const handleEdit = (data: any) => {
    console.log('Editar:', data);
    // Aqui você vai implementar a lógica de editar no Supabase
  };

  const handleDelete = () => {
    console.log('Excluir:', selectedRealEstate?.id);
    // Aqui você vai implementar a lógica de excluir no Supabase
  };

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      <div className="p-4 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Imobiliárias</h2>
          <p className="text-sm text-gray-600">Gerencie as imobiliárias cadastradas</p>
        </div>
        <button 
          onClick={() => {
            setSelectedRealEstate(null);
            setIsAddModalOpen(true);
          }}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="sm:block">Adicionar Imobiliária</span>
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realEstates.map((realEstate) => (
            <div
              key={realEstate.id}
              className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={realEstate.logo}
                    alt={realEstate.name}
                    className="w-16 h-16 rounded-lg object-cover border border-border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{realEstate.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{realEstate.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{realEstate.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{realEstate.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div>
                  <span className="font-medium text-primary">{realEstate.activeListings}</span> imóveis ativos
                </div>
                <div>
                  <span className="font-medium text-primary">{realEstate.completedInspections}</span> vistorias realizadas
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedRealEstate(realEstate);
                    setIsAddModalOpen(true);
                  }}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedRealEstate(realEstate);
                    setIsDeleteModalOpen(true);
                  }}
                  className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Adicionar/Editar */}
      <RealEstateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        realEstate={selectedRealEstate}
        onSubmit={selectedRealEstate ? handleEdit : handleAdd}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Excluir Imobiliária"
        description={`Tem certeza que deseja excluir a imobiliária "${selectedRealEstate?.name}"? Esta ação também removerá todos os dados associados a esta imobiliária.`}
      />
    </div>
  );
} 