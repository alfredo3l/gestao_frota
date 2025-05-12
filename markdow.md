# Sistema de Gestão de Frotas Públicas - Funcionalidades

Este documento descreve as funcionalidades principais do Sistema de Gestão de Frotas Públicas Multiempresa, idealizado para uso em prefeituras e órgãos públicos, utilizando Supabase como backend e Cursor (Next.js) como frontend.

---

## 1. Autenticação e Controle Multiempresa

- Cadastro e login via Supabase Auth.
- Isolamento completo por `empresa_id` (cada prefeitura possui seus dados).
- Papéis de usuário:
  - `admin`: acesso total
  - `gestor_frota`: gerencia veículos, manutenções, abastecimentos
  - `motorista`: registra abastecimentos e solicita veículos
  - `leitor`: acesso apenas à visualização

---

## 2. Dashboard Geral

- KPIs operacionais: total de veículos, consumo médio, veículos inativos, etc.
- Gráficos por secretaria, tipo de veículo ou custo.
- Alertas de:
  - Licenciamento vencido
  - CNH vencida
  - Manutenções pendentes

---

## 3. Veículos

- Cadastro de veículos com:
  - Placa, modelo, tipo, ano, combustível, status
  - Quilometragem atual e secretaria vinculada
- Upload de documentos: CRLV, seguro, fotos
- Histórico de manutenções e abastecimentos

---

## 4. Motoristas

- Cadastro com dados pessoais e CNH
- Associação a secretarias
- Histórico de uso de veículos
- Alerta de CNH vencida

---

## 5. Abastecimentos

- Registro de:
  - Data, litros, valor, combustível, km atual
  - Upload de cupom fiscal
- Atualização automática da quilometragem do veículo
- Cálculo de consumo médio (km/l)

---

## 6. Manutenções

- Cadastro de manutenções preventivas ou corretivas
- Dados registrados:
  - Tipo, descrição, valor, fornecedor, status
- Histórico completo por veículo
- Alertas automáticos por quilometragem ou vencimento

---

## 7. Solicitações de Uso

- Solicitação de veículos por secretarias
- Acompanhamento e aprovação pela gestão
- Histórico de viagens, destinos, responsáveis

---

## 8. Relatórios

- Relatórios por período, veículo, motorista, secretaria
- Indicadores:
  - Consumo médio
  - Gasto por km
  - Ranking de veículos
- Exportação em PDF e Excel

---

## 9. Usuários e Permissões

- Cadastro e edição de usuários
- Controle de permissões por `role`
- Interface adaptada ao perfil do usuário

---

## 10. Configurações

- Cadastro de:
  - Secretarias
  - Tipos de veículos
  - Fornecedores
  - Combustíveis

---

## 11. Mobile/Motorista

- Tela simplificada para registro de abastecimento
- Interface responsiva para uso via celular
- Cadastro rápido com poucos campos

---

## 12. Segurança e Boas Práticas

- RLS ativa no Supabase (segurança por empresa)
- Middleware de autenticação no Cursor
- JWT contendo `empresa_id` e `role`
- Logs e auditoria 