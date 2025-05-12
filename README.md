# Sistema de Gestão de Frotas Públicas

Sistema completo para gestão de frotas públicas, veículos, motoristas, abastecimentos e manutenções para prefeituras e órgãos públicos.

## Visão Geral

O Sistema de Gestão de Frotas Públicas é uma plataforma web desenvolvida com Next.js, React e TypeScript, projetada para auxiliar prefeituras e órgãos públicos na gestão eficiente de todos os aspectos relacionados a frotas públicas. O sistema oferece funcionalidades para gerenciar veículos, motoristas, abastecimentos, manutenções e solicitações de uso, além de contar com dashboards analíticos e relatórios detalhados.

## Funcionalidades Principais

- **Dashboard**: Visão geral da frota com métricas e indicadores importantes
- **Veículos**: Cadastro e gestão de veículos, com histórico completo e documentação
- **Motoristas**: Controle de motoristas, CNHs e histórico de uso
- **Abastecimentos**: Registro e acompanhamento de abastecimentos com cálculo automático de médias
- **Manutenções**: Controle de manutenções preventivas e corretivas
- **Solicitações de Uso**: Gestão de solicitações de veículos pelas secretarias
- **Relatórios**: Geração de relatórios detalhados e exportação em múltiplos formatos

## Tecnologias Utilizadas

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Autenticação, Storage)
- **Estilização**: TailwindCSS, Lucide Icons
- **Gráficos**: Recharts
- **UI Components**: Componentes personalizados com Radix UI
- **Gerenciamento de Estado**: React Hooks

## Estrutura do Projeto

```
src/
├── app/                  # Páginas da aplicação (Next.js App Router)
│   ├── veiculos/         # Páginas de gestão de veículos
│   ├── motoristas/       # Páginas de gestão de motoristas
│   ├── dashboard/        # Dashboard principal
│   ├── abastecimentos/   # Páginas de gestão de abastecimentos
│   ├── manutencoes/      # Páginas de gestão de manutenções
│   ├── solicitacoes/     # Páginas de solicitações de uso
│   └── relatorios/       # Páginas de relatórios
├── components/           # Componentes reutilizáveis
│   ├── charts/           # Componentes de gráficos e visualizações
│   ├── forms/            # Componentes de formulários
│   ├── layout/           # Componentes de layout (Sidebar, Header)
│   └── modals/           # Componentes de modais e diálogos
├── hooks/                # Custom hooks para lógica de negócio
│   ├── useVeiculos.ts    # Hook para gestão de veículos
│   ├── useMotoristas.ts  # Hook para gestão de motoristas
│   ├── useAbastecimentos.ts # Hook para gestão de abastecimentos
│   ├── useManutencoes.ts # Hook para gestão de manutenções
│   ├── useSolicitacoes.ts # Hook para gestão de solicitações
│   └── useRelatorios.ts  # Hook para geração de relatórios
└── types/                # Definições de tipos TypeScript
```

## Hooks Implementados

Os hooks são responsáveis pela lógica de negócio e comunicação com o backend:

- **useVeiculos**: Gerencia operações CRUD para veículos, com filtros por secretaria e status
- **useMotoristas**: Gerencia operações CRUD para motoristas, com alertas de CNH
- **useAbastecimentos**: Gerencia operações CRUD para abastecimentos, com cálculos de consumo
- **useManutencoes**: Gerencia operações CRUD para manutenções, com alertas automáticos
- **useSolicitacoes**: Gerencia operações CRUD para solicitações de uso de veículos
- **useRelatorios**: Gerencia geração e exportação de relatórios em diferentes formatos

## Páginas Implementadas

- **Dashboard**: Visão geral da frota com KPIs operacionais e alertas importantes
- **Veículos**: Lista de veículos com filtros e detalhamento completo
- **Motoristas**: Lista de motoristas com dados de CNH e histórico
- **Abastecimentos**: Registro e histórico de abastecimentos com cálculo de médias
- **Manutenções**: Controle de manutenções preventivas e corretivas
- **Solicitações**: Gestão de solicitações de veículos por secretarias
- **Relatórios**: Geração de relatórios personalizados com exportação

## Componentes de Layout

- **Sidebar**: Menu lateral com navegação entre as diferentes seções do sistema
- **ClientHeader**: Cabeçalho com barra de pesquisa, notificações e menu do usuário

## Segurança e Multiempresa

- Isolamento completo por empresa_id (cada prefeitura possui seus dados isolados)
- RLS ativa no Supabase para segurança por empresa
- Middleware de autenticação
- Controle granular de permissões por perfil de usuário
- Logs de auditoria para todas as operações

## Licença

Este projeto é proprietário e confidencial. Todos os direitos reservados.
