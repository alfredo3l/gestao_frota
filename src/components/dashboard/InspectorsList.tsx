'use client';

import { useState } from 'react';
import { Eye, Edit2, Trash2, MapPin, Phone, Mail, Star, Plus } from 'lucide-react';
import InspectorModal from '../modals/InspectorModal';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';

const INSPECTOR_AVATARS = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVyiI1XClbT2Ue-7CGVAp8sKoqe_068R9zw&s',
  'https://static.vecteezy.com/ti/fotos-gratis/t2/47462753-positivo-homem-em-limpar-limpo-fundo-foto.jpg',
  'https://blog.unyleya.edu.br/wp-content/uploads/2017/12/saiba-como-a-educacao-ajuda-voce-a-ser-uma-pessoa-melhor.jpeg'
];

// Dados simulados
const inspectors = [
  {
    id: 1,
    name: 'João Silva',
    avatar: INSPECTOR_AVATARS[0],
    region: 'Zona Sul',
    phone: '(11) 99999-9999',
    email: 'joao.silva@evolucao.com.br',
    rating: 4.8,
    completedInspections: 128,
    pendingInspections: 5,
  },
  {
    id: 2,
    name: 'Maria Santos',
    avatar: INSPECTOR_AVATARS[1],
    region: 'Zona Norte',
    phone: '(11) 98888-8888',
    email: 'maria.santos@evolucao.com.br',
    rating: 4.9,
    completedInspections: 95,
    pendingInspections: 3,
  },
  {
    id: 3,
    name: 'Pedro Costa',
    avatar: INSPECTOR_AVATARS[2],
    region: 'Centro',
    phone: '(11) 97777-7777',
    email: 'pedro.costa@evolucao.com.br',
    rating: 4.7,
    completedInspections: 76,
    pendingInspections: 4,
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    avatar: INSPECTOR_AVATARS[0],
    region: 'Zona Leste',
    phone: '(11) 96666-6666',
    email: 'ana.oliveira@evolucao.com.br',
    rating: 4.9,
    completedInspections: 142,
    pendingInspections: 6,
  },
  {
    id: 5,
    name: 'Carlos Ferreira',
    avatar: INSPECTOR_AVATARS[1],
    region: 'Zona Oeste',
    phone: '(11) 95555-5555',
    email: 'carlos.ferreira@evolucao.com.br',
    rating: 4.6,
    completedInspections: 89,
    pendingInspections: 4,
  },
  {
    id: 6,
    name: 'Beatriz Lima',
    avatar: INSPECTOR_AVATARS[2],
    region: 'Centro-Sul',
    phone: '(11) 94444-4444',
    email: 'beatriz.lima@evolucao.com.br',
    rating: 4.8,
    completedInspections: 115,
    pendingInspections: 5,
  },
  {
    id: 7,
    name: 'Rafael Souza',
    avatar: INSPECTOR_AVATARS[0],
    region: 'Centro-Norte',
    phone: '(11) 93333-3333',
    email: 'rafael.souza@evolucao.com.br',
    rating: 4.7,
    completedInspections: 98,
    pendingInspections: 3,
  },
  {
    id: 8,
    name: 'Juliana Martins',
    avatar: INSPECTOR_AVATARS[1],
    region: 'Zona Sul-Leste',
    phone: '(11) 92222-2222',
    email: 'juliana.martins@evolucao.com.br',
    rating: 4.9,
    completedInspections: 134,
    pendingInspections: 5,
  },
  {
    id: 9,
    name: 'Lucas Almeida',
    avatar: INSPECTOR_AVATARS[2],
    region: 'Zona Norte-Oeste',
    phone: '(11) 91111-1111',
    email: 'lucas.almeida@evolucao.com.br',
    rating: 4.8,
    completedInspections: 108,
    pendingInspections: 4,
  },
];

export default function InspectorsList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInspector, setSelectedInspector] = useState<any>(null);

  const handleAdd = (data: any) => {
    console.log('Adicionar:', data);
    // Aqui você vai implementar a lógica de adicionar no Supabase
  };

  const handleEdit = (data: any) => {
    console.log('Editar:', data);
    // Aqui você vai implementar a lógica de editar no Supabase
  };

  const handleDelete = () => {
    console.log('Excluir:', selectedInspector?.id);
    // Aqui você vai implementar a lógica de excluir no Supabase
  };

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      <div className="p-4 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Vistoriadores</h2>
          <p className="text-sm text-gray-600">Gerencie os vistoriadores cadastrados</p>
        </div>
        <button 
          onClick={() => {
            setSelectedInspector(null);
            setIsAddModalOpen(true);
          }}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="sm:block">Adicionar Vistoriador</span>
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspectors.map((inspector) => (
            <div
              key={inspector.id}
              className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={inspector.avatar}
                    alt={inspector.name}
                    className="w-16 h-16 rounded-full object-cover border border-border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{inspector.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{inspector.region}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-primary">{inspector.rating}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{inspector.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{inspector.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div>
                  <span className="font-medium text-primary">{inspector.completedInspections}</span> vistorias realizadas
                </div>
                <div>
                  <span className="font-medium text-primary">{inspector.pendingInspections}</span> pendentes
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedInspector(inspector);
                    setIsAddModalOpen(true);
                  }}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedInspector(inspector);
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
      <InspectorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        inspector={selectedInspector}
        onSubmit={selectedInspector ? handleEdit : handleAdd}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Excluir Vistoriador"
        description={`Tem certeza que deseja excluir o vistoriador "${selectedInspector?.name}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  );
} 