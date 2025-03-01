// Dados mockados para desenvolvimento sem Supabase

// Apoiadores
export const mockApoiadores = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@exemplo.com',
    telefone: '(67) 99999-1111',
    cpf: '111.222.333-44',
    profissao: 'Engenheiro',
    bairro: 'Centro',
    cidade: 'Campo Grande',
    estado: 'MS',
    nivelEngajamento: 'Alto',
    status: 'Ativo',
    lideranca: { id: '1', nome: 'Maria Souza' },
    dataCadastro: '2023-01-15T10:30:00Z'
  },
  {
    id: '2',
    nome: 'Ana Oliveira',
    email: 'ana.oliveira@exemplo.com',
    telefone: '(67) 99999-2222',
    cpf: '222.333.444-55',
    profissao: 'Advogada',
    bairro: 'Jardim dos Estados',
    cidade: 'Campo Grande',
    estado: 'MS',
    nivelEngajamento: 'Médio',
    status: 'Ativo',
    lideranca: { id: '2', nome: 'Carlos Ferreira' },
    dataCadastro: '2023-02-20T14:45:00Z'
  },
  {
    id: '3',
    nome: 'Pedro Santos',
    email: 'pedro.santos@exemplo.com',
    telefone: '(67) 99999-3333',
    cpf: '333.444.555-66',
    profissao: 'Professor',
    bairro: 'Vila Planalto',
    cidade: 'Dourados',
    estado: 'MS',
    nivelEngajamento: 'Baixo',
    status: 'Inativo',
    lideranca: { id: '1', nome: 'Maria Souza' },
    dataCadastro: '2023-03-10T09:15:00Z'
  }
];

// Lideranças
export const mockLiderancas = [
  {
    id: '1',
    nome: 'Maria Souza',
    email: 'maria.souza@exemplo.com',
    telefone: '(67) 99999-4444',
    cargo: 'Coordenadora Regional',
    regiao: 'Zona Norte',
    status: 'Ativo'
  },
  {
    id: '2',
    nome: 'Carlos Ferreira',
    email: 'carlos.ferreira@exemplo.com',
    telefone: '(67) 99999-5555',
    cargo: 'Coordenador Municipal',
    regiao: 'Centro',
    status: 'Ativo'
  }
];

// Demandas
export const mockDemandas = [
  {
    id: '1',
    titulo: 'Melhoria na iluminação pública',
    descricao: 'Rua com postes sem iluminação há mais de 2 meses',
    categoria: 'Infraestrutura',
    prioridade: 'Alta',
    status: 'Em Análise',
    tipo: 'Externa',
    dataRegistro: '2023-04-05T08:30:00Z',
    solicitante: { id: '1', nome: 'João Silva', tipo: 'Apoiador' }
  },
  {
    id: '2',
    titulo: 'Campanha de arrecadação de alimentos',
    descricao: 'Organizar campanha para famílias carentes',
    categoria: 'Social',
    prioridade: 'Média',
    status: 'Aberta',
    tipo: 'Interna',
    dataRegistro: '2023-04-10T10:45:00Z',
    solicitante: { id: '2', nome: 'Ana Oliveira', tipo: 'Apoiador' }
  },
  {
    id: '3',
    titulo: 'Reforma da praça do bairro',
    descricao: 'Praça precisa de manutenção nos bancos e playground',
    categoria: 'Infraestrutura',
    prioridade: 'Baixa',
    status: 'Em Andamento',
    tipo: 'Externa',
    dataRegistro: '2023-04-15T14:20:00Z',
    solicitante: { id: '3', nome: 'Pedro Santos', tipo: 'Apoiador' }
  }
];

// Eventos
export const mockEventos = [
  {
    id: '1',
    titulo: 'Reunião com lideranças',
    descricao: 'Reunião para alinhar estratégias de campanha',
    tipo: 'Reunião',
    dataInicio: '2023-05-10T14:00:00Z',
    dataFim: '2023-05-10T16:00:00Z',
    local: 'Sede do Comitê',
    cidade: 'Campo Grande',
    status: 'Agendado',
    participantes: [
      { id: '1', nome: 'João Silva' },
      { id: '2', nome: 'Ana Oliveira' }
    ]
  },
  {
    id: '2',
    titulo: 'Comício no Centro',
    descricao: 'Comício de apresentação das propostas',
    tipo: 'Comício',
    dataInicio: '2023-05-15T18:00:00Z',
    dataFim: '2023-05-15T20:00:00Z',
    local: 'Praça Central',
    cidade: 'Campo Grande',
    status: 'Agendado',
    participantes: []
  },
  {
    id: '3',
    titulo: 'Visita ao Bairro Vila Nova',
    descricao: 'Visita para ouvir demandas dos moradores',
    tipo: 'Visita',
    dataInicio: '2023-05-12T09:00:00Z',
    dataFim: '2023-05-12T12:00:00Z',
    local: 'Associação de Moradores',
    cidade: 'Dourados',
    status: 'Concluído',
    participantes: [
      { id: '3', nome: 'Pedro Santos' }
    ]
  }
];

// Apoios Políticos
export const mockApoiosPoliticos = [
  {
    id: '1',
    apoiador: {
      id: '101',
      nome: 'Roberto Almeida',
      cargo: 'Vereador'
    },
    candidato: {
      id: '201',
      nome: 'Luiz Henrique',
      partido: 'PXX',
      cargo: 'Prefeito'
    },
    tipoApoio: 'Público',
    dataApoio: '2023-03-15T10:00:00Z',
    nivelInfluencia: 75,
    status: 'Confirmado'
  },
  {
    id: '2',
    apoiador: {
      id: '102',
      nome: 'Fernanda Costa',
      cargo: 'Deputada Estadual'
    },
    candidato: {
      id: '201',
      nome: 'Luiz Henrique',
      partido: 'PXX',
      cargo: 'Prefeito'
    },
    tipoApoio: 'Financeiro',
    dataApoio: '2023-03-20T14:30:00Z',
    nivelInfluencia: 60,
    status: 'Em Negociação'
  },
  {
    id: '3',
    apoiador: {
      id: '103',
      nome: 'Marcos Pereira',
      cargo: 'Líder Comunitário'
    },
    candidato: {
      id: '202',
      nome: 'Carla Rodrigues',
      partido: 'PYY',
      cargo: 'Vereadora'
    },
    tipoApoio: 'Mobilização',
    dataApoio: '2023-03-25T09:15:00Z',
    nivelInfluencia: 40,
    status: 'Confirmado'
  }
];

// Candidatos
export const mockCandidatos = [
  {
    id: '201',
    nome: 'Luiz Henrique',
    partido: 'PXX',
    cargo: 'Prefeito',
    numero: '10',
    biografia: 'Candidato a prefeito com experiência em gestão pública',
    status: 'Ativo'
  },
  {
    id: '202',
    nome: 'Carla Rodrigues',
    partido: 'PYY',
    cargo: 'Vereadora',
    numero: '10123',
    biografia: 'Candidata a vereadora com foco em políticas sociais',
    status: 'Ativo'
  },
  {
    id: '203',
    nome: 'Ricardo Gomes',
    partido: 'PZZ',
    cargo: 'Vereador',
    numero: '20456',
    biografia: 'Candidato a vereador com foco em infraestrutura',
    status: 'Ativo'
  }
];

// Regiões
export const mockRegioes = [
  {
    id: '1',
    nome: 'Centro',
    tipo: 'Bairro',
    cidade: 'Campo Grande',
    estado: 'MS',
    populacao: 25000,
    totalApoiadores: 150,
    cobertura: 65
  },
  {
    id: '2',
    nome: 'Jardim dos Estados',
    tipo: 'Bairro',
    cidade: 'Campo Grande',
    estado: 'MS',
    populacao: 18000,
    totalApoiadores: 90,
    cobertura: 45
  },
  {
    id: '3',
    nome: 'Dourados',
    tipo: 'Cidade',
    cidade: 'Dourados',
    estado: 'MS',
    populacao: 220000,
    totalApoiadores: 800,
    cobertura: 30
  }
];

// Conversações IA
export const mockConversacoesIA = [
  {
    id: '1',
    titulo: 'Estratégias para campanha',
    dataCriacao: '2023-06-10T09:30:00Z'
  },
  {
    id: '2',
    titulo: 'Análise de dados de apoiadores',
    dataCriacao: '2023-06-15T14:45:00Z'
  }
];

// Mensagens IA
export const mockMensagensIA = {
  '1': [
    {
      id: '101',
      conversacaoId: '1',
      remetente: 'usuario',
      conteudo: 'Quais são as melhores estratégias para engajar apoiadores?',
      dataEnvio: '2023-06-10T09:30:00Z'
    },
    {
      id: '102',
      conversacaoId: '1',
      remetente: 'assistente',
      conteudo: 'Para engajar apoiadores efetivamente, recomendo:\n\n1. Comunicação regular através de grupos de WhatsApp e e-mail\n2. Eventos presenciais como reuniões e encontros\n3. Delegação de responsabilidades específicas\n4. Reconhecimento público das contribuições\n5. Compartilhamento de resultados e conquistas\n\nQual dessas estratégias você gostaria de explorar mais a fundo?',
      dataEnvio: '2023-06-10T09:31:00Z'
    }
  ],
  '2': [
    {
      id: '201',
      conversacaoId: '2',
      remetente: 'usuario',
      conteudo: 'Como posso analisar os dados dos apoiadores para identificar padrões?',
      dataEnvio: '2023-06-15T14:45:00Z'
    },
    {
      id: '202',
      conversacaoId: '2',
      remetente: 'assistente',
      conteudo: 'Para analisar dados de apoiadores e identificar padrões úteis, sugiro:\n\n1. Segmentação por região: Identifique onde estão concentrados seus apoiadores\n2. Análise demográfica: Verifique faixas etárias, profissões e interesses\n3. Histórico de engajamento: Quem participa mais ativamente\n4. Redes de influência: Mapeie conexões entre apoiadores\n5. Análise de crescimento: Taxas de adesão por período e região\n\nPosso ajudar a criar visualizações desses dados se você tiver informações específicas.',
      dataEnvio: '2023-06-15T14:47:00Z'
    }
  ]
}; 