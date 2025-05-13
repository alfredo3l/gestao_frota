-- Tabela: usuarios (depende de auth.users, que já existe no Supabase)
CREATE TABLE usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    nome TEXT,
    email TEXT UNIQUE,
    telefone TEXT,
    cargo TEXT,
    foto_perfil_url TEXT,
    perfil_acesso TEXT NOT NULL DEFAULT 'usuario_comum', -- Ex: admin, gestor_frota, usuario_comum
    secretaria_id UUID REFERENCES secretarias (id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
); 