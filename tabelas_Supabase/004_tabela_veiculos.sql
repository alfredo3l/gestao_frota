-- Tabela: veiculos
CREATE TABLE veiculos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placa TEXT NOT NULL UNIQUE,
    modelo TEXT,
    tipo TEXT,
    ano INTEGER,
    combustivel TEXT,
    status TEXT DEFAULT 'ativo',
    quilometragem_atual INTEGER DEFAULT 0,
    secretaria_id UUID REFERENCES secretarias (id) ON DELETE SET NULL,
    foto_url TEXT,
    crlv_url TEXT,
    seguro_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
); 