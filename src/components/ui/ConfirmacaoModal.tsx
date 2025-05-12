'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
  mensagem: string;
  botaoConfirmarTexto?: string;
  botaoCancelarTexto?: string;
}

export default function ConfirmacaoModal({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  mensagem,
  botaoConfirmarTexto = 'Confirmar',
  botaoCancelarTexto = 'Cancelar'
}: ConfirmacaoModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay com fundo escurecido */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10">
        <div className="mb-5 flex items-center">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
        </div>
        
        <p className="text-gray-600 mb-6">{mensagem}</p>
        
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {botaoCancelarTexto}
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {botaoConfirmarTexto}
          </Button>
        </div>
      </div>
    </div>
  );
} 