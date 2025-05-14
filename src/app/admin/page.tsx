'use client';

import Link from 'next/link';
import { Building, Users } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Painel de Administração</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card para Gerenciar Secretarias */}
        <Link href="/admin/secretarias" legacyBehavior>
          <a className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
            <div className="flex items-center text-blue-600 mb-3">
              <Building size={24} className="mr-3" />
              <h2 className="text-xl font-semibold">Gerenciar Secretarias</h2>
            </div>
            <p className="text-gray-600">
              Adicionar, editar ou remover secretarias do sistema.
            </p>
          </a>
        </Link>

        {/* Placeholder para Gerenciar Usuários (futuro) */}
        <div className="block p-6 bg-white rounded-lg shadow-md opacity-50 cursor-not-allowed">
          <div className="flex items-center text-gray-400 mb-3">
            <Users size={24} className="mr-3" />
            <h2 className="text-xl font-semibold">Gerenciar Usuários</h2>
          </div>
          <p className="text-gray-500">
            (Em breve) Adicionar, editar ou remover usuários e seus tipos.
          </p>
        </div>
        
        {/* Adicione mais cards para outras seções administrativas aqui */}
      </div>
    </div>
  );
} 