'use client';

import { useState, useEffect } from 'react';
import { useNotificacoes, Notificacao } from '@/hooks/useNotificacoes';
import { 
  Bell, 
  Check, 
  Trash2, 
  Info, 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

export default function Notificacoes() {
  const { 
    notificacoes, 
    carregando, 
    erro, 
    marcarComoLida, 
    marcarTodasComoLidas, 
    excluirNotificacao,
    getNotificacoesNaoLidas
  } = useNotificacoes();

  const notificacoesNaoLidas = getNotificacoesNaoLidas();

  // Renderizar ícone baseado no tipo da notificação
  const renderIconeTipo = (tipo: string) => {
    switch (tipo) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'sucesso':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'aviso':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'erro':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
          <p className="text-gray-500 mt-1">
            Gerencie suas notificações do sistema de frotas
          </p>
        </div>

        {notificacoesNaoLidas.length > 0 && (
          <Button 
            variant="outline" 
            className="mt-4 sm:mt-0"
            onClick={() => marcarTodasComoLidas()}
          >
            <Check className="w-4 h-4 mr-2" />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      {carregando ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : erro ? (
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar notificações</h3>
          <p className="text-gray-500">{erro}</p>
        </Card>
      ) : notificacoes.length === 0 ? (
        <Card className="p-8 text-center">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notificação</h3>
          <p className="text-gray-500">Você não tem notificações para visualizar</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {notificacoes.map((notificacao: Notificacao) => (
            <Card 
              key={notificacao.id} 
              className={`overflow-hidden ${!notificacao.lida ? 'border-l-4 border-l-blue-500' : ''}`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {renderIconeTipo(notificacao.tipo)}
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-medium text-gray-900 mb-1 sm:mb-0">
                        {notificacao.titulo}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {format(notificacao.timestamp, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 my-2">{notificacao.mensagem}</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      {notificacao.link && (
                        <Link
                          href={notificacao.link}
                          className="text-sm text-primary hover:text-primary-dark"
                        >
                          {notificacao.acao || 'Ver detalhes'}
                        </Link>
                      )}
                      
                      <div className="flex gap-2">
                        {!notificacao.lida && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => marcarComoLida(notificacao.id)}
                            className="text-xs"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Marcar como lida
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => excluirNotificacao(notificacao.id)}
                          className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 