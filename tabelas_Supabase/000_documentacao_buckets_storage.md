# Documentação dos Buckets do Supabase Storage

Esta documentação descreve os buckets a serem criados no Supabase Storage para o sistema de Gestão de Frota.

## Lista de Buckets

1.  **`fotos-veiculos`**
    *   **Conteúdo:** Fotos principais dos veículos.
    *   **Tabela Relacionada:** `veiculos` (campo `foto_url`)
    *   **Sugestão de Caminho interno (para políticas de upload/organização):** `public/{veiculo_id}/foto.{fileExt}`
    *   **Acesso Público Recomendado:** Sim (para fácil exibição), com políticas de upload/delete restritas.

2.  **`documentos-veiculos`**
    *   **Conteúdo:** Arquivos de CRLV e Apólices de Seguro dos veículos.
    *   **Tabelas Relacionadas:** `veiculos` (campos `crlv_url`, `seguro_url`)
    *   **Sugestão de Caminho interno:**
        *   CRLV: `private/{veiculo_id}/crlv.{fileExt}`
        *   Seguro: `private/{veiculo_id}/seguro.{fileExt}`
    *   **Acesso Público Recomendado:** Não (acesso via URLs assinadas ou lógica de aplicação com RLS).

3.  **`fiscais-abastecimentos`**
    *   **Conteúdo:** Imagens ou PDFs de cupons fiscais dos abastecimentos.
    *   **Tabela Relacionada:** `abastecimentos` (campo `cupom_fiscal_url`)
    *   **Sugestão de Caminho interno:** `private/{abastecimento_id}/cupom.{fileExt}`
    *   **Acesso Público Recomendado:** Não.

4.  **`fiscais-manutencoes`**
    *   **Conteúdo:** Imagens ou PDFs de notas fiscais das manutenções.
    *   **Tabela Relacionada:** `manutencoes` (campo `nota_fiscal_url`)
    *   **Sugestão de Caminho interno:** `private/{manutencao_id}/nota.{fileExt}`
    *   **Acesso Público Recomendado:** Não.

5.  **`avatars-usuarios`**
    *   **Conteúdo:** Fotos de perfil dos usuários do sistema.
    *   **Tabela Relacionada:** `usuarios` (campo `foto_perfil_url`)
    *   **Sugestão de Caminho interno:** `public/{usuario_id}/avatar.{fileExt}`
    *   **Acesso Público Recomendado:** Sim, com políticas de upload/delete restritas.

6.  **`fotos-motoristas`**
    *   **Conteúdo:** Fotos dos motoristas (se diferente do avatar do usuário).
    *   **Tabela Relacionada:** `motoristas` (campo `foto_url`)
    *   **Sugestão de Caminho interno:** `public/{motorista_id}/foto.{fileExt}`
    *   **Acesso Público Recomendado:** Sim, com políticas de upload/delete restritas.

## Considerações Importantes ao Criar os Buckets:

*   **Nomes:** Utilizar exatamente os nomes listados (com hífens) para consistência.
*   **Acesso Público (Public bucket na UI do Supabase):** Configurar conforme recomendado acima.
*   **Políticas de Bucket (Row Level Security no Storage):** Após criar os buckets, é crucial configurar políticas de segurança (RLS) nas tabelas `storage.buckets` e `storage.objects` para controlar quem pode listar, visualizar, fazer upload, atualizar e deletar arquivos em cada bucket. As políticas devem ser granulares e alinhadas com as regras de negócio do sistema. 