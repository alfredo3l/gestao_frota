'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MoreVertical, Edit, FileText, Trash, Eye } from 'lucide-react';
import ConfirmacaoModal from './ConfirmacaoModal';
import Modal from './Modal';

interface AcaoItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive';
  modalContent?: React.ReactNode;
  modalTitulo?: string;
  modalTamanho?: 'sm' | 'md' | 'lg' | 'xl';
  confirmacao?: {
    titulo: string;
    mensagem: string;
    onConfirm: () => void;
  };
}

interface AcoesDropdownProps {
  itens: AcaoItem[];
  align?: 'left' | 'right';
}

export default function AcoesDropdown({ itens, align = 'right' }: AcoesDropdownProps) {
  const [aberto, setAberto] = useState(false);
  const [confirmarExcluir, setConfirmarExcluir] = useState(false);
  const [acaoExcluir, setAcaoExcluir] = useState<(() => void) | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalConteudo, setModalConteudo] = useState<React.ReactNode | null>(null);
  const [modalTitulo, setModalTitulo] = useState('');
  const [modalTamanho, setModalTamanho] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [confirmacaoTitulo, setConfirmacaoTitulo] = useState('Confirmar exclusão');
  const [confirmacaoMensagem, setConfirmacaoMensagem] = useState('Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAberto(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Manipular ação de excluir
  const handleExcluir = (item: AcaoItem) => {
    // Primeiro definir valores padrão
    let titulo = 'Confirmar exclusão';
    let mensagem = 'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.';
    let onConfirm = item.onClick || (() => {});
    
    // Se tiver confirmacao definida, sobrescrever os valores padrão
    if (item.confirmacao) {
      titulo = item.confirmacao.titulo || titulo;
      mensagem = item.confirmacao.mensagem || mensagem;
      if (item.confirmacao.onConfirm) {
        onConfirm = item.confirmacao.onConfirm;
      }
    }
    
    // Atualizar o estado
    setConfirmacaoTitulo(titulo);
    setConfirmacaoMensagem(mensagem);
    setAcaoExcluir(() => onConfirm);
    setConfirmarExcluir(true);
    setAberto(false);
  };
  
  // Manipular ação de visualizar ou editar
  const handleModal = (item: AcaoItem) => {
    if (item.modalContent) {
      setModalConteudo(item.modalContent);
      setModalTitulo(item.modalTitulo || item.label);
      setModalTamanho(item.modalTamanho || 'md');
      setModalAberto(true);
      setAberto(false);
    } else if (item.onClick) {
      item.onClick();
      setAberto(false);
    }
  };
  
  // Renderizar item de ação
  const renderItem = (item: AcaoItem, index: number) => {
    const itemClass = `w-full text-left flex items-center px-4 py-2 text-sm ${
      item.variant === 'destructive' 
        ? 'text-red-600 hover:bg-red-50' 
        : 'text-gray-700 hover:bg-gray-50'
    }`;
    
    const content = (
      <>
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label}
      </>
    );
    
    // Verificar se é uma ação de exclusão
    if (item.variant === 'destructive' || item.confirmacao) {
      return (
        <button
          key={index}
          className={itemClass}
          onClick={() => handleExcluir(item)}
        >
          {content}
        </button>
      );
    }
    
    // Verificar se tem conteúdo para modal
    if (item.modalContent) {
      return (
        <button
          key={index}
          className={itemClass}
          onClick={() => handleModal(item)}
        >
          {content}
        </button>
      );
    }
    
    // Verificar se é um link externo
    if (item.href) {
      return (
        <Link 
          key={index}
          href={item.href}
          className={itemClass}
          onClick={() => setAberto(false)}
        >
          {content}
        </Link>
      );
    }
    
    // Ação regular com onClick
    return (
      <button
        key={index}
        className={itemClass}
        onClick={() => {
          if (item.onClick) item.onClick();
          setAberto(false);
        }}
      >
        {content}
      </button>
    );
  };
  
  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Botão de ações */}
        <button
          onClick={() => setAberto(!aberto)}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
          aria-label="Ações"
          aria-expanded={aberto ? 'true' : 'false'}
        >
          <MoreVertical className="w-5 h-5" />
        </button>
        
        {/* Dropdown de ações */}
        {aberto && (
          <div 
            className={`absolute z-50 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            {itens.map((item, index) => renderItem(item, index))}
          </div>
        )}
      </div>
      
      {/* Modal de confirmação de exclusão */}
      <ConfirmacaoModal
        isOpen={confirmarExcluir}
        onClose={() => setConfirmarExcluir(false)}
        onConfirm={() => {
          if (acaoExcluir) acaoExcluir();
          setConfirmarExcluir(false);
        }}
        titulo={confirmacaoTitulo}
        mensagem={confirmacaoMensagem}
        botaoConfirmarTexto="Excluir"
        botaoCancelarTexto="Cancelar"
      />
      
      {/* Modal para detalhes ou edição */}
      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        titulo={modalTitulo}
        tamanho={modalTamanho}
      >
        {modalConteudo}
      </Modal>
    </>
  );
} 