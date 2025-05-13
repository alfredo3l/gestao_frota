-- Tabela: notificacoes
CREATE TABLE notificacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    tipo TEXT DEFAULT 'info',
    lida BOOLEAN DEFAULT FALSE,
    link TEXT,
    referencia_id UUID,
    referencia_tabela TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
); 