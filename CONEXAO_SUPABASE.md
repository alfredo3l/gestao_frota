# Conectando ao Banco de Dados Supabase

## Configuração das Variáveis de Ambiente

Para conectar o sistema ao banco de dados Supabase, você precisa configurar as seguintes variáveis de ambiente:

1. Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```
# Configurações do Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ysglptzbokezzyvtnroz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzZ2xwdHpib2tlenp5dnRucm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjU1MDgsImV4cCI6MjA2MjY0MTUwOH0.hJwoOKggtE4xwpZZGWZuBK8LU88a2jR1CvZEr82GaXI
```

2. Substitua os valores pelos fornecidos no console do Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL`: URL do seu projeto Supabase (encontrado em "Settings" > "API")
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anônima do seu projeto (encontrada em "Settings" > "API")

## Verificando a Conexão

O sistema está configurado para usar o cliente Supabase real (não o mockado). Você pode verificar isso observando o console do navegador ao iniciar a aplicação:

- Se estiver vendo uma mensagem verde indicando "Usando cliente Supabase real", a conexão está usando o cliente real.
- Caso veja uma mensagem amarela indicando "Usando cliente Supabase mockado", verifique o arquivo `src/lib/supabase.ts` e certifique-se de que a variável `isUsingMock` está definida como `false`.

## Buckets de Armazenamento

É necessário criar os seguintes buckets no Supabase Storage:

1. **fotos-veiculos**: Para fotos principais dos veículos (público)
2. **documentos-veiculos**: Para arquivos CRLV e apólices de seguro (privado)
3. **fiscais-abastecimentos**: Para cupons fiscais de abastecimentos (privado)
4. **fiscais-manutencoes**: Para notas fiscais de manutenções (privado)
5. **avatars-usuarios**: Para fotos de perfil dos usuários (público)
6. **fotos-motoristas**: Para fotos dos motoristas (público)

Para criar estes buckets:
1. Acesse o console do Supabase
2. Vá para a seção "Storage"
3. Clique em "New Bucket"
4. Insira o nome exato do bucket
5. Configure a visibilidade conforme indicado acima (público ou privado)
6. Repita para cada bucket

## Segurança e Row Level Security (RLS)

As tabelas já estão configuradas com RLS (Row Level Security) conforme os scripts na pasta `tabelas_Supabase`. Certifique-se de:

1. Habilitar o RLS para cada tabela no painel do Supabase
2. Aplicar as políticas de segurança definidas nos scripts SQL

## Testando a Conexão

Para testar se a conexão está funcionando corretamente, você pode:

1. Iniciar a aplicação com `npm run dev`
2. Verificar no console do navegador se há erros relacionados à conexão
3. Testar operações básicas como login ou leitura de dados

Se você encontrar erros de conexão, verifique:
- Se as variáveis de ambiente estão configuradas corretamente
- Se o URL e a chave do Supabase estão corretos
- Se a configuração RLS não está bloqueando operações necessárias 