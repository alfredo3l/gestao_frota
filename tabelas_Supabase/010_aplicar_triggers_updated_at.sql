-- APLICAÇÃO DOS TRIGGERS 'updated_at'

CREATE TRIGGER set_secretarias_updated_at
BEFORE UPDATE ON secretarias
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_usuarios_updated_at
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_veiculos_updated_at
BEFORE UPDATE ON veiculos
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_motoristas_updated_at
BEFORE UPDATE ON motoristas
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_abastecimentos_updated_at
BEFORE UPDATE ON abastecimentos
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_manutencoes_updated_at
BEFORE UPDATE ON manutencoes
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_solicitacoes_veiculos_updated_at
BEFORE UPDATE ON solicitacoes_veiculos
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp(); 