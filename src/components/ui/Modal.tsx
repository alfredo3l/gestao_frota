'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  children: React.ReactNode;
  tamanho?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  isOpen,
  onClose,
  titulo,
  children,
  tamanho = 'md'
}: ModalProps) {
  if (!isOpen) return null;
  
  const tamanhoClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Overlay com fundo escurecido */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-lg shadow-xl w-full ${tamanhoClasses[tamanho]} z-10 max-h-[90vh] flex flex-col`}>
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
} 