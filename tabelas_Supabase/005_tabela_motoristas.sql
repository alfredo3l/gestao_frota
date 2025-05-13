-- Tabela: motoristas
CREATE TABLE motoristas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    cnh_numero TEXT UNIQUE,
    cnh_validade DATE,
    telefone TEXT,
    secretaria_id UUID REFERENCES secretarias (id) ON DELETE SET NULL,
    usuario_id UUID UNIQUE REFERENCES usuarios (id) ON DELETE SET NULL,
    foto_url TEXT,
    status TEXT DEFAULT 'ativo',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
); 