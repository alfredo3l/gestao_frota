-- Tabela: solicitacoes_veiculos
CREATE TABLE solicitacoes_veiculos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    solicitante_usuario_id UUID NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
    veiculo_id UUID REFERENCES veiculos (id) ON DELETE SET NULL,
    motorista_id UUID REFERENCES motoristas (id) ON DELETE SET NULL,
    data_solicitacao TIMESTAMPTZ DEFAULT NOW(),
    data_saida_prevista TIMESTAMPTZ NOT NULL,
    data_retorno_prevista TIMESTAMPTZ NOT NULL,
    data_saida_efetiva TIMESTAMPTZ,
    data_retorno_efetiva TIMESTAMPTZ,
    destino TEXT NOT NULL,
    motivo TEXT NOT NULL,
    status TEXT DEFAULT 'pendente',
    observacoes_aprovacao TEXT,
    quilometragem_saida INTEGER,
    quilometragem_retorno INTEGER,
    aprovado_por_usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
); 