-- CRIAÇÃO DE ÍNDICES (Exemplos)

-- Tabela veiculos
CREATE INDEX idx_veiculos_secretaria_id ON veiculos(secretaria_id);
CREATE INDEX idx_veiculos_status ON veiculos(status);
CREATE INDEX idx_veiculos_tipo ON veiculos(tipo);

-- Tabela motoristas
CREATE INDEX idx_motoristas_secretaria_id ON motoristas(secretaria_id);
CREATE INDEX idx_motoristas_usuario_id ON motoristas(usuario_id);

-- Tabela abastecimentos
CREATE INDEX idx_abastecimentos_veiculo_id ON abastecimentos(veiculo_id);
CREATE INDEX idx_abastecimentos_motorista_id ON abastecimentos(motorista_id);
CREATE INDEX idx_abastecimentos_data ON abastecimentos(data);
CREATE INDEX idx_abastecimentos_registrado_por ON abastecimentos(registrado_por_usuario_id);

-- Tabela manutencoes
CREATE INDEX idx_manutencoes_veiculo_id ON manutencoes(veiculo_id);
CREATE INDEX idx_manutencoes_status ON manutencoes(status);
CREATE INDEX idx_manutencoes_data_agendamento ON manutencoes(data_agendamento);
CREATE INDEX idx_manutencoes_registrado_por ON manutencoes(registrado_por_usuario_id);

-- Tabela solicitacoes_veiculos
CREATE INDEX idx_solicitacoes_solicitante_id ON solicitacoes_veiculos(solicitante_usuario_id);
CREATE INDEX idx_solicitacoes_veiculo_id ON solicitacoes_veiculos(veiculo_id);
CREATE INDEX idx_solicitacoes_motorista_id ON solicitacoes_veiculos(motorista_id);
CREATE INDEX idx_solicitacoes_status ON solicitacoes_veiculos(status);
CREATE INDEX idx_solicitacoes_data_saida_prevista ON solicitacoes_veiculos(data_saida_prevista);

-- Tabela notificacoes
CREATE INDEX idx_notificacoes_usuario_id ON notificacoes(usuario_id);
CREATE INDEX idx_notificacoes_lida ON notificacoes(lida); 