# Evolução Vistoria

Sistema de gestão política desenvolvido com Next.js e TypeScript.

## Sobre o Projeto

É uma plataforma especializada em gerenciamento de informações políticas que atende diferentes perfis de usuários:

### Perfis de Usuário

- **Admin**: Administra o sistema, gerenciando os usuários e os níveis de acesso.
- **Coordenador**: Visualiza as informações de acordo com o nível de acesso.
- **Liderança**: Cadastra as informações de apoiadores vinculado a sua liderança.
- **Apoiador**: Apenas se cadastra no sistema para alimentar a base de dados.

## Tecnologias

- Next.js 15
- TypeScript
- Tailwind CSS
- Geist UI

## Configuração do Ambiente

```bash
# Instalar dependências
npm install

# Iniciar ambiente de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Iniciar em produção
npm start
```

## Estrutura do Projeto

- `/src/app`: Páginas e layouts da aplicação
- `/src/components`: Componentes reutilizáveis
- `/src/lib`: Utilitários e configurações
- `/src/types`: Definições de tipos TypeScript

## Design System

O projeto utiliza um design system consistente com:

- Cores principais:
  - Primária: `#264450`
  - Primária (light): `#3a5f6f`

## Funcionalidades Principais

- Consulta resultado de eleições;
- Cadastramento e controle de coordenadores políticos;
- Cadastramento e controle de apoiadores;
- Realização e documentação de inspeções
- Geração de relatórios
- Dashboard personalizado por perfil

## Licença

Este projeto é proprietário e confidencial.
