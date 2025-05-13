-- Tabela: abastecimentos
CREATE TABLE abastecimentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    veiculo_id UUID NOT NULL REFERENCES veiculos (id) ON DELETE RESTRICT, -- Evita excluir veículo com abastecimento
    motorista_id UUID REFERENCES motoristas (id) ON DELETE SET NULL,
    data DATE NOT NULL,
    litros NUMERIC(10, 2) NOT NULL,
    valor_total NUMERIC(10, 2) NOT NULL,
    tipo_combustivel TEXT,
    quilometragem INTEGER NOT NULL,
    cupom_fiscal_url TEXT,
    observacoes TEXT,
    registrado_por_usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
); 