'use client';

import { useState } from 'react';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import RealEstateModal from '@/components/modals/RealEstateModal';
import DeleteConfirm from '@/components/modals/DeleteConfirm';

interface BaseRealEstate {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
  logo?: string;
  prazoContestacao: number;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}

interface RealEstate extends BaseRealEstate {
  id: string;
}

const mockRealEstates: RealEstate[] = [
  {
    id: '1',
    nome: 'Imobiliária Premium',
    email: 'contato@premium.com',
    telefone: '(11) 99999-9999',
    cnpj: '12.345.678/0001-90',
    logo: 'https://img.freepik.com/vetores-premium/logotipo-imobiliario-amarelo-profissional_919186-1.jpg',
    prazoContestacao: 30,
    endereco: {
      cep: '01234-567',
      logradouro: 'Rua das Flores',
      numero: '123',
      complemento: 'Sala 456',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  },
  {
    id: '2',
    nome: 'Imobiliária Elite',
    email: 'contato@elite.com',
    telefone: '(11) 98888-8888',
    cnpj: '98.765.432/0001-10',
    logo: 'https://img.freepik.com/vetores-premium/logotipo-imobiliario-amarelo-profissional_919186-1.jpg',
    prazoContestacao: 30,
    endereco: {
      cep: '04321-765',
      logradouro: 'Av. Principal',
      numero: '789',
      bairro: 'Jardins',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  },
  {
    id: '3',
    nome: 'Imobiliária Luxo',
    email: 'contato@luxo.com',
    telefone: '(11) 97777-7777',
    cnpj: '45.678.901/0001-23',
    logo: 'https://img.freepik.com/vetores-premium/logotipo-imobiliario-amarelo-profissional_919186-1.jpg',
    prazoContestacao: 30,
    endereco: {
      cep: '05678-901',
      logradouro: 'Rua dos Diamantes',
      numero: '456',
      complemento: 'Andar 10',
      bairro: 'Vila Nova',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  },
  {
    id: '4',
    nome: 'Imobiliária Master',
    email: 'contato@master.com',
    telefone: '(11) 96666-6666',
    cnpj: '34.567.890/0001-12',
    logo: 'https://img.freepik.com/vetores-premium/logotipo-imobiliario-amarelo-profissional_919186-1.jpg',
    prazoContestacao: 30,
    endereco: {
      cep: '06789-012',
      logradouro: 'Av. das Palmeiras',
      numero: '789',
      bairro: 'Morumbi',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  },
  {
    id: '5',
    nome: 'Imobiliária Prime',
    email: 'contato@prime.com',
    telefone: '(11) 95555-5555',
    cnpj: '23.456.789/0001-01',
    logo: 'https://img.freepik.com/vetores-premium/logotipo-imobiliario-amarelo-profissional_919186-1.jpg',
    prazoContestacao: 30,
    endereco: {
      cep: '07890-123',
      logradouro: 'Rua dos Ipês',
      numero: '321',
      complemento: 'Conjunto 789',
      bairro: 'Itaim',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  },
  {
    id: '6',
    nome: 'Imobiliária Gold',
    email: 'contato@gold.com',
    telefone: '(11) 94444-4444',
    cnpj: '12.345.678/0001-34',
    logo: 'https://img.freepik.com/vetores-premium/logotipo-imobiliario-amarelo-profissional_919186-1.jpg',
    prazoContestacao: 30,
    endereco: {
      cep: '08901-234',
      logradouro: 'Av. das Araucárias',
      numero: '654',
      bairro: 'Pinheiros',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  },
  {
    id: '7',
    nome: 'Imobiliária Diamond',
    email: 'contato@diamond.com',
    telefone: '(11) 93333-3333',
    cnpj: '89.012.345/0001-56',
    logo: 'https://img.freepik.com/vetores-premium/logotipo-imobiliario-amarelo-profissional_919186-1.jpg',
    prazoContestacao: 30,
    endereco: {
      cep: '09012-345',
      logradouro: 'Rua das Esmeraldas',
      numero: '987',
      complemento: 'Sala 123',
      bairro: 'Vila Mariana',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  },
  {
    id: '8',
    nome: 'Imobiliária Royal',
    email: 'contato@royal.com',
    telefone: '(11) 92222-2222',
    cnpj: '78.901.234/0001-78',
    logo: 'https://img.freepik.com/vetores-premium/logotipo-imobiliario-amarelo-profissional_919186-1.jpg',
    prazoContestacao: 30,
    endereco: {
      cep: '10123-456',
      logradouro: 'Av. dos Rubis',
      numero: '159',
      bairro: 'Moema',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  },
  {
    id: '9',
    nome: 'Imobiliária Platinum',
    email: 'contato@platinum.com',
    telefone: '(11) 91111-1111',
    cnpj: '67.890.123/0001-45',
    logo: 'https://img.freepik.com/vetores-premium/logotipo-imobiliario-amarelo-profissional_919186-1.jpg',
    prazoContestacao: 30,
    endereco: {
      cep: '11234-567',
      logradouro: 'Rua dos Cristais',
      numero: '753',
      complemento: 'Andar 15',
      bairro: 'Brooklin',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  },
  {
    id: '10',
    nome: 'Imobiliária Crystal',
    email: 'contato@crystal.com',
    telefone: '(11) 90000-0000',
    cnpj: '56.789.012/0001-67',
    logo: 'https://img.freepik.com/vetores-premium/logotipo-imobiliario-amarelo-profissional_919186-1.jpg',
    prazoContestacao: 30,
    endereco: {
      cep: '12345-678',
      logradouro: 'Av. das Safiras',
      numero: '951',
      bairro: 'Vila Olímpia',
      cidade: 'São Paulo',
      estado: 'SP',
    },
  },
];

export default function RealEstateList(): React.JSX.Element {
  const [realEstates, setRealEstates] = useState<RealEstate[]>(mockRealEstates);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedRealEstate, setSelectedRealEstate] = useState<RealEstate | undefined>(undefined);

  const handleAdd = (data: BaseRealEstate): void => {
    const newRealEstate: RealEstate = {
      ...data,
      id: String(realEstates.length + 1),
    };
    setRealEstates([...realEstates, newRealEstate]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (data: BaseRealEstate): void => {
    if (selectedRealEstate) {
      const updatedRealEstate: RealEstate = {
        ...data,
        id: selectedRealEstate.id,
      };
      setRealEstates(realEstates.map(re => re.id === selectedRealEstate.id ? updatedRealEstate : re));
      setIsAddModalOpen(false);
      setSelectedRealEstate(undefined);
    }
  };

  const handleDelete = (): void => {
    if (selectedRealEstate) {
      setRealEstates(realEstates.filter(re => re.id !== selectedRealEstate.id));
      setIsDeleteModalOpen(false);
      setSelectedRealEstate(undefined);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Imobiliárias</h1>
          <p className="text-gray-600">Gerencie as imobiliárias cadastradas</p>
        </div>
        <button 
          onClick={() => {
            setSelectedRealEstate(undefined);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar</span>
        </button>
      </div>

      {/* Lista de Imobiliárias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {realEstates.map((realEstate) => (
            <div
              key={realEstate.id}
            className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-16 h-16 flex-shrink-0">
                  {realEstate.logo && (
                    <Image
                    src={realEstate.logo}
                      alt={realEstate.nome}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover border border-border"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{realEstate.nome}</h3>
                  <p className="text-sm text-gray-600 truncate">{realEstate.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                <button className="p-1.5 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedRealEstate(realEstate);
                    setIsAddModalOpen(true);
                  }}
                  className="p-1.5 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setSelectedRealEstate(realEstate);
                    setIsDeleteModalOpen(true);
                  }}
                  className="p-1.5 text-gray-600 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Telefone</p>
                <p className="text-sm text-gray-600 truncate">{realEstate.telefone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">CNPJ</p>
                <p className="text-sm text-gray-600 truncate">{realEstate.cnpj}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-900">Endereço</p>
                <p className="text-sm text-gray-600">
                  {realEstate.endereco.logradouro}, {realEstate.endereco.numero}
                  {realEstate.endereco.complemento && ` - ${realEstate.endereco.complemento}`}
                  <br />
                  {realEstate.endereco.bairro} - {realEstate.endereco.cidade}/{realEstate.endereco.estado}
                </p>
              </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal de Adicionar/Editar */}
      <RealEstateModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedRealEstate(undefined);
        }}
        realEstate={selectedRealEstate}
        onSubmit={selectedRealEstate ? handleEdit : handleAdd}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirm
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRealEstate(undefined);
        }}
        onConfirm={handleDelete}
        title="Excluir Imobiliária"
        description={`Tem certeza que deseja excluir a imobiliária "${selectedRealEstate?.nome}"? Esta ação não poderá ser desfeita.`}
      />
    </div>
  );
} 