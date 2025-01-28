'use client';

import { useState } from 'react';
import { X, Check, Bell, BellOff, Mail, Smartphone, AlertCircle, CreditCard, Sparkles, Eye, EyeOff, FileText } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

function Dialog({ isOpen, onClose, children, title }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-xl w-full mx-3.5 ${title === "Escolha seu Plano" ? "max-w-6xl" : "max-w-lg"}`}>
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border bg-white rounded-t-xl">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">{children}</div>
      </div>
    </div>
  );
}

// Diálogo de Notificações
export function NotificationsDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newInspections: true,
    statusUpdates: true,
    reports: true,
    marketing: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Configurar Notificações">
      <div className="space-y-6">
        {/* Canais */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Canais de Notificação</h3>
          <div className="space-y-3">
            <button
              onClick={() => toggleNotification('email')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-gray-600">Notificações por E-mail</span>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors ${notifications.email ? 'bg-primary' : 'bg-gray-200'} relative`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.email ? 'right-1' : 'right-5'}`} />
              </div>
            </button>

            <button
              onClick={() => toggleNotification('push')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-primary" />
                <span className="text-gray-600">Notificações Push</span>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors ${notifications.push ? 'bg-primary' : 'bg-gray-200'} relative`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.push ? 'right-1' : 'right-5'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Tipos de Notificação */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Tipos de Notificação</h3>
          <div className="space-y-3">
            <button
              onClick={() => toggleNotification('newInspections')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-600">Novas Vistorias</span>
              <div className={`w-10 h-6 rounded-full transition-colors ${notifications.newInspections ? 'bg-primary' : 'bg-gray-200'} relative`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.newInspections ? 'right-1' : 'right-5'}`} />
              </div>
            </button>

            <button
              onClick={() => toggleNotification('statusUpdates')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-600">Atualizações de Status</span>
              <div className={`w-10 h-6 rounded-full transition-colors ${notifications.statusUpdates ? 'bg-primary' : 'bg-gray-200'} relative`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.statusUpdates ? 'right-1' : 'right-5'}`} />
              </div>
            </button>

            <button
              onClick={() => toggleNotification('reports')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-600">Relatórios e Análises</span>
              <div className={`w-10 h-6 rounded-full transition-colors ${notifications.reports ? 'bg-primary' : 'bg-gray-200'} relative`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.reports ? 'right-1' : 'right-5'}`} />
              </div>
            </button>

            <button
              onClick={() => toggleNotification('marketing')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-600">Novidades e Marketing</span>
              <div className={`w-10 h-6 rounded-full transition-colors ${notifications.marketing ? 'bg-primary' : 'bg-gray-200'} relative`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.marketing ? 'right-1' : 'right-5'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors rounded-lg"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </Dialog>
  );
}

// Diálogo de Senha
export function PasswordDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Alterar Senha">
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="current"
                value={passwords.current}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="new"
                value={passwords.new}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors rounded-lg"
          >
            Alterar Senha
          </button>
        </div>
      </div>
    </Dialog>
  );
}

// Diálogo de Assinatura Digital
export function SignatureDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [signature, setSignature] = useState({
    type: 'draw', // 'draw' | 'upload' | 'type'
    data: ''
  });

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Gerenciar Assinatura Digital">
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-border">
          <div className="flex items-center gap-3 text-gray-600">
            <FileText className="w-5 h-5" />
            <div className="text-sm">
              <p className="font-medium">Assinatura Digital Ativa</p>
              <p>Válida até 31/12/2024</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSignature({ ...signature, type: 'draw' })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                signature.type === 'draw'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Desenhar
            </button>
            <button
              onClick={() => setSignature({ ...signature, type: 'upload' })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                signature.type === 'upload'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Enviar Imagem
            </button>
            <button
              onClick={() => setSignature({ ...signature, type: 'type' })}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                signature.type === 'type'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Digitar
            </button>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg h-48 flex items-center justify-center">
            {signature.type === 'draw' && (
              <p className="text-gray-500 text-sm">Área para desenhar a assinatura</p>
            )}
            {signature.type === 'upload' && (
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-2">Arraste uma imagem ou</p>
                <button className="text-primary hover:text-primary-light text-sm font-medium">
                  Escolha um arquivo
                </button>
              </div>
            )}
            {signature.type === 'type' && (
              <input
                type="text"
                placeholder="Digite sua assinatura"
                className="w-3/4 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center"
              />
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors rounded-lg"
          >
            Salvar Assinatura
          </button>
        </div>
      </div>
    </Dialog>
  );
}

// Diálogo de Tema
export function ThemeDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const primaryColor = '#264450';
  const [selectedColor, setSelectedColor] = useState(primaryColor);
  const [isCustom, setIsCustom] = useState(false);

  const predefinedColors = [
    { name: 'Primária', value: primaryColor },
    { name: 'Roxo', value: '#7C3AED' },
    { name: 'Verde', value: '#059669' },
    { name: 'Vermelho', value: '#DC2626' },
    { name: 'Laranja', value: '#EA580C' },
    { name: 'Rosa', value: '#DB2777' }
  ];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setIsCustom(false);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
    setIsCustom(true);
  };

  const handleReset = () => {
    setSelectedColor(primaryColor);
    setIsCustom(false);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Personalizar Tema">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Cores Predefinidas</h3>
            <button
              onClick={handleReset}
              className="text-sm text-primary hover:text-primary-light"
            >
              Restaurar Padrão
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {predefinedColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                className={`
                  p-3 rounded-xl border-2 transition-all text-sm
                  ${selectedColor === color.value && !isCustom
                    ? 'border-primary shadow-md'
                    : 'border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="font-medium text-gray-700">{color.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Cor Personalizada</h3>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={selectedColor}
              onChange={handleCustomColorChange}
              className="w-12 h-12 rounded-lg overflow-hidden"
            />
            <div className="flex-1">
              <input
                type="text"
                value={selectedColor.toUpperCase()}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Pré-visualização</h4>
          <div className="space-y-3">
            <button
              className="w-full px-4 py-2 rounded-lg text-white transition-colors"
              style={{ backgroundColor: selectedColor }}
            >
              Botão Primário
            </button>
            <div
              className="w-full h-2 rounded-full"
              style={{ backgroundColor: selectedColor }}
            />
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="text-sm" style={{ color: selectedColor }}>
                Texto Colorido
              </span>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg"
            style={{ backgroundColor: selectedColor }}
          >
            Aplicar Tema
          </button>
        </div>
      </div>
    </Dialog>
  );
}

// Diálogo de Planos (melhorado)
export function PlansDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro' | 'premium'>('pro');

  const plans = [
    {
      id: 'basic',
      name: 'Plano Básico',
      price: 199.90,
      discount: '50% Off',
      features: [
        'Até 50 vistorias por mês',
        'Até 2 vistoriadores',
        'Suporte por email'
      ],
      bgColor: 'bg-gray-50'
    },
    {
      id: 'pro',
      name: 'Plano Pro',
      price: 449.90,
      discount: '20% Off',
      features: [
        'Vistorias ilimitadas',
        'Até 10 vistoriadores',
        'Suporte prioritário'
      ],
      bgColor: 'bg-orange-50'
    },
    {
      id: 'premium',
      name: 'Plano Premium',
      price: 1199.90,
      features: [
        'Vistorias ilimitadas',
        'Vistoriadores ilimitados',
        'Suporte 24/7'
      ],
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Escolha seu Plano">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`${plan.bgColor} rounded-xl p-3 md:p-6`}
          >
            <div className="flex flex-col h-full">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <h3 className="text-base md:text-xl font-semibold">{plan.name}</h3>
                    {plan.discount && (
                      <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 md:py-1 rounded">
                        {plan.discount}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 md:mt-2">
                    <span className="text-lg md:text-2xl font-bold">R$ {plan.price.toFixed(2)}</span>
                    <span className="text-gray-600 text-xs md:text-sm ml-1">por usuário/mês faturado anualmente</span>
                  </div>
                </div>

                <ul className="space-y-1.5 md:space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                      <span className="text-gray-600 text-xs md:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 md:mt-auto pt-3 md:pt-4">
                <button
                  onClick={() => setSelectedPlan(plan.id as typeof selectedPlan)}
                  className="w-full bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded font-medium hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  Selecionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded flex items-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          <span>Assinar {plans.find(p => p.id === selectedPlan)?.name}</span>
        </button>
      </div>
    </Dialog>
  );
}

// Diálogo de Edição de Perfil
export function ProfileDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [profile, setProfile] = useState({
    name: 'Paulo Morales',
    email: 'paulomorales@gmail.com',
    phone: '(11) 98765-4321',
    company: 'Evolução Vistoria',
    role: 'Gestor'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Editar Perfil">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <input
              type="text"
              name="company"
              value={profile.company}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors rounded-lg"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </Dialog>
  );
} 