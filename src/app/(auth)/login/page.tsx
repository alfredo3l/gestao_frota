'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import dynamic from 'next/dynamic';

interface NoSSRProps {
  children: React.ReactNode;
}

const NoSSR = dynamic(() => Promise.resolve((props: NoSSRProps) => <>{props.children}</>), {
  ssr: false
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular autenticação bem-sucedida
    const usuarioMock = {
      id: '1',
      nome: 'Usuário Teste',
      email: formData.email,
      telefone: '(67) 99999-9999',
      cargo: 'Coordenador de Campanha',
      fotoPerfil: '/images/avatar-default.svg'
    };
    
    // Salvar dados do usuário no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuarioMock));
    
    // Redirecionar para a página de validação
    router.push('/validate');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Imagem de fundo com efeito de vidro fosco */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://asmontech.com.br/wp-content/uploads/2020/07/gestao-de-frotas.jpg")',
        }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />
      </div>

      {/* Modal de Esqueceu sua senha */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
            <button 
              onClick={() => setShowForgotPasswordModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Recuperação de senha</h3>
            <p className="text-gray-700">Entre em contato com o administrador do sistema</p>
            <button
              onClick={() => setShowForgotPasswordModal(false)}
              className="mt-6 w-full py-2 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg relative">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta!</h1>
          <p className="mt-2 text-gray-600">
           Plataforma de gestão de frota
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Seu e-mail"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Sua senha"
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setShowForgotPasswordModal(true)}
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              Esqueceu sua senha?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
} 
