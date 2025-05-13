-- Tabela: manutencoes
CREATE TABLE manutencoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    veiculo_id UUID NOT NULL REFERENCES veiculos (id) ON DELETE RESTRICT, -- Evita excluir veículo com manutenção
    data_agendamento DATE,
    data_realizacao DATE,
    tipo_manutencao TEXT NOT NULL,
    descricao_servico TEXT NOT NULL,
    custo NUMERIC(10, 2),
    local_servico TEXT,
    status TEXT DEFAULT 'agendada',
    nota_fiscal_url TEXT,
    observacoes TEXT,
    registrado_por_usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
); 