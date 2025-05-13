-- HABILITAÇÃO DE ROW LEVEL SECURITY (RLS) E POLÍTICAS
-- (Políticas de exemplo - DEVEM SER REVISADAS E ADAPTADAS)

-- Lembre-se de habilitar RLS para cada tabela no painel do Supabase também (geralmente já vem habilitado em novos projetos)

ALTER TABLE secretarias ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE veiculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE motoristas ENABLE ROW LEVEL SECURITY;
ALTER TABLE abastecimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE manutencoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitacoes_veiculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificacoes ENABLE ROW LEVEL SECURITY;

-- Políticas de Exemplo:

-- SECRETARIAS
CREATE POLICY "Publico pode ler secretarias" ON secretarias FOR SELECT USING (true);
CREATE POLICY "Admins podem gerenciar secretarias" ON secretarias FOR ALL USING ( (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) = 'admin' ) WITH CHECK ( (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) = 'admin' );

-- USUARIOS
CREATE POLICY "Usuarios podem ver seus proprios dados" ON usuarios FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuarios podem atualizar seus proprios dados" ON usuarios FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    NOT (NEW.perfil_acesso IS DISTINCT FROM OLD.perfil_acesso AND (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) <> 'admin') AND
    NOT (NEW.secretaria_id IS DISTINCT FROM OLD.secretaria_id AND (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) <> 'admin')
  );
CREATE POLICY "Admins podem gerenciar todos os usuarios" ON usuarios FOR ALL USING ((SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Usuarios autenticados podem criar seu perfil se nao existir" ON usuarios FOR INSERT WITH CHECK (auth.uid() = id);

-- VEICULOS
CREATE POLICY "Usuarios autenticados podem ver veiculos" ON veiculos FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Gestores de frota e admins podem gerenciar veiculos" ON veiculos FOR ALL
    USING ( (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota') )
    WITH CHECK ( (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota') );

-- MOTORISTAS
CREATE POLICY "Usuarios autenticados podem ver motoristas" ON motoristas FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Gestores de frota e admins podem gerenciar motoristas" ON motoristas FOR ALL
    USING ( (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota') )
    WITH CHECK ( (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota') );

-- ABASTECIMENTOS
CREATE POLICY "Usuarios autenticados podem ver abastecimentos" ON abastecimentos FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Usuarios autenticados podem registrar abastecimentos" ON abastecimentos FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND registrado_por_usuario_id = auth.uid());
CREATE POLICY "Usuarios podem gerenciar seus abastecimentos ou gestores podem gerenciar todos" ON abastecimentos FOR ALL
    USING (
        registrado_por_usuario_id = auth.uid() OR
        (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota')
    )
    WITH CHECK (
        registrado_por_usuario_id = auth.uid() OR
        (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota')
    );

-- MANUTENCOES
CREATE POLICY "Usuarios autenticados podem ver manutencoes" ON manutencoes FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Usuarios autenticados podem registrar manutencoes" ON manutencoes FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND registrado_por_usuario_id = auth.uid());
CREATE POLICY "Usuarios podem gerenciar suas manutencoes ou gestores podem gerenciar todas" ON manutencoes FOR ALL
    USING (
        registrado_por_usuario_id = auth.uid() OR
        (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota')
    )
    WITH CHECK (
        registrado_por_usuario_id = auth.uid() OR
        (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota')
    );

-- SOLICITACOES_VEICULOS
CREATE POLICY "Usuarios podem criar e ver suas solicitacoes" ON solicitacoes_veiculos FOR ALL
    USING ( solicitante_usuario_id = auth.uid() )
    WITH CHECK ( solicitante_usuario_id = auth.uid() AND status = 'pendente' );
CREATE POLICY "Gestores/Admins podem ver e gerenciar todas as solicitacoes" ON solicitacoes_veiculos FOR ALL
    USING ( (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota') );
CREATE POLICY "Gestores/Admins podem atualizar status das solicitacoes" ON solicitacoes_veiculos FOR UPDATE
    USING ( (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota') )
    WITH CHECK (
      (SELECT perfil_acesso FROM usuarios WHERE id = auth.uid()) IN ('admin', 'gestor_frota') AND
      status IN ('pendente', 'em_uso', 'concluida', 'cancelada')
    );

-- NOTIFICACOES
CREATE POLICY "Usuarios podem ver suas notificacoes" ON notificacoes FOR SELECT USING (usuario_id = auth.uid());
CREATE POLICY "Usuarios podem marcar suas notificacoes como lidas" ON notificacoes FOR UPDATE
    USING (usuario_id = auth.uid())
    WITH CHECK (usuario_id = auth.uid() AND lida = true); 