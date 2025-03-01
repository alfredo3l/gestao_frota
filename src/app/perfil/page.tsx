'use client';

import { useState, useEffect, useRef } from 'react';
import { User, Save, Upload, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/layout/Sidebar';
import Image from 'next/image';
import { useUsuario } from '@/contexts/UsuarioContext';

const ClientHeader = dynamic(() => import('@/components/layout/ClientHeader'), {
  ssr: false
});

export default function PaginaPerfil() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('perfil');
  const [fotoPerfilTemp, setFotoPerfilTemp] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const { usuario, carregando, erro, atualizarPerfil, removerFotoPerfil } = useUsuario();

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth >= 768);
    
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Atualizar o estado local quando o usuário for carregado
  useEffect(() => {
    if (usuario) {
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        cargo: usuario.cargo
      });
      
      if (usuario.fotoPerfil) {
        setFotoPerfilTemp(usuario.fotoPerfil);
      }
    }
  }, [usuario]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfilTemp(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFotoPerfilTemp('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      const fotoAlterada = usuario?.fotoPerfil !== fotoPerfilTemp;
      
      const dadosAtualizados: {
        nome: string;
        email: string;
        telefone: string;
        cargo: string;
        fotoPerfil?: string;
      } = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        cargo: formData.cargo
      };
      
      // Se a foto foi alterada, incluir no update
      if (fotoAlterada) {
        dadosAtualizados.fotoPerfil = fotoPerfilTemp || undefined;
      }
      
      const sucesso = await atualizarPerfil(dadosAtualizados);
      
      if (sucesso) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onMenuItemClick={setActiveItem}
        activeItem={activeItem}
      />
      <ClientHeader 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        isMenuOpen={isSidebarOpen} 
      />

      <main className="pl-0 md:pl-20 lg:pl-64 pt-16 transition-all duration-300">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Meu Perfil</h1>
          
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Informações do Perfil</h3>
              
              {carregando ? (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="rounded-full bg-gray-200 h-24 w-24 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Campo de foto do usuário */}
                  <div className="mb-6">
                    <label htmlFor="foto-perfil" className="block text-sm font-medium text-gray-700 mb-2">
                      Foto do Perfil
                    </label>
                    <div className="flex items-center gap-4">
                      {fotoPerfilTemp ? (
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200 group">
                          <Image
                            src={fotoPerfilTemp}
                            alt="Foto de perfil"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remover foto"
                          >
                            <X className="w-6 h-6 text-white" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                          <User className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <label 
                        htmlFor="foto-input"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 cursor-pointer transition-all"
                      >
                        <Upload className="w-4 h-4" />
                        Escolher foto
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="foto-input"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Recomendado: JPG, PNG. Tamanho máximo 2MB.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="nome"
                        className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                        value={formData.nome}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                        value={formData.telefone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                        Cargo
                      </label>
                      <input
                        type="text"
                        id="cargo"
                        className="w-full h-10 px-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                        value={formData.cargo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={handleSaveProfile}
                      disabled={isSaving || carregando}
                      className={`px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 ${(isSaving || carregando) ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                    {saveSuccess && (
                      <p className="mt-2 text-sm text-green-600">Alterações salvas com sucesso!</p>
                    )}
                    {erro && (
                      <p className="mt-2 text-sm text-red-600">{erro}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 