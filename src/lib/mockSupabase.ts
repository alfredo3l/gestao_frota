import {
  mockApoiadores as importedApoiadores,
  mockLiderancas as importedLiderancas,
  mockDemandas as importedDemandas,
  mockEventos as importedEventos,
  mockApoiosPoliticos as importedApoiosPoliticos,
  mockCandidatos as importedCandidatos,
  mockRegioes as importedRegioes,
  mockConversacoesIA as importedConversacoesIA,
  mockMensagensIA as importedMensagensIA
} from './mockData';

// Definir interfaces para os tipos de dados
interface Apoiador {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  profissao: string;
  bairro: string;
  cidade: string;
  estado: string;
  nivelEngajamento: string;
  status: string;
  lideranca: { id: string; nome: string; };
  dataCadastro: string;
  [key: string]: any; // Permite acesso dinâmico às propriedades
}

interface Lideranca {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  regiao: string;
  status: string;
  [key: string]: any;
}

interface Demanda {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  prioridade: string;
  status: string;
  tipo: string;
  dataRegistro: string;
  solicitante: { id: string; nome: string; tipo: string; };
  [key: string]: any;
}

interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  tipo: string;
  dataInicio: string;
  dataFim: string;
  local: string;
  cidade: string;
  status: string;
  participantes: { id: string; nome: string; }[];
  [key: string]: any;
}

interface ApoioPolitico {
  id: string;
  apoiador: { id: string; nome: string; cargo: string; };
  candidato: { id: string; nome: string; partido: string; cargo: string; };
  tipoApoio: string;
  dataApoio: string;
  nivelInfluencia: number;
  status: string;
  [key: string]: any;
}

interface Candidato {
  id: string;
  nome: string;
  partido: string;
  cargo: string;
  numero: string;
  biografia: string;
  status: string;
  [key: string]: any;
}

interface Regiao {
  id: string;
  nome: string;
  tipo: string;
  cidade: string;
  estado: string;
  populacao: number;
  totalApoiadores: number;
  cobertura: number;
  [key: string]: any;
}

interface ConversacaoIA {
  id: string;
  titulo: string;
  dataCriacao: string;
  [key: string]: any;
}

interface MensagemIA {
  id: string;
  conversacaoId: string;
  remetente: string;
  conteudo: string;
  dataEnvio: string;
  [key: string]: any;
}

// Interface para o objeto mockMensagensIA
interface MensagensIAMap {
  [conversacaoId: string]: MensagemIA[];
}

// Criar cópias locais que podem ser modificadas
let mockApoiadores: Apoiador[] = [...importedApoiadores];
let mockLiderancas: Lideranca[] = [...importedLiderancas];
let mockDemandas: Demanda[] = [...importedDemandas];
let mockEventos: Evento[] = [...importedEventos];
let mockApoiosPoliticos: ApoioPolitico[] = [...importedApoiosPoliticos];
let mockCandidatos: Candidato[] = [...importedCandidatos];
let mockRegioes: Regiao[] = [...importedRegioes];
let mockConversacoesIA: ConversacaoIA[] = [...importedConversacoesIA];
let mockMensagensIA: MensagensIAMap = {...importedMensagensIA};

// Função para simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função para filtrar objetos com base em critérios
const filterObjects = (objects: any[], filters: Record<string, any>) => {
  return objects.filter(obj => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined) return true;
      
      // Tratamento para chaves aninhadas como 'endereco->>cidade'
      if (key.includes('->>')) {
        const [parentKey, childKey] = key.split('->>')
        return obj[childKey]?.toLowerCase().includes(value.toLowerCase());
      }
      
      // Tratamento para operadores _gte e _lte
      if (key.endsWith('_gte')) {
        const field = key.replace('_gte', '');
        return obj[field] >= value;
      }
      
      if (key.endsWith('_lte')) {
        const field = key.replace('_lte', '');
        return obj[field] <= value;
      }
      
      // Tratamento para operadores como 'in', 'eq', etc.
      if (key === 'in' && Array.isArray(value)) {
        const [field, values] = value;
        return values.includes(obj[field]);
      }
      
      if (key === 'eq') {
        const [field, val] = value;
        return obj[field] === val;
      }
      
      if (key === 'ilike') {
        const [field, val] = value;
        return obj[field]?.toLowerCase().includes(val.toLowerCase().replace(/%/g, ''));
      }
      
      // Comparação padrão
      return obj[key] === value;
    });
  });
};

// Função para ordenar objetos
const sortObjects = (objects: any[], column: string, ascending: boolean = true) => {
  return [...objects].sort((a, b) => {
    if (a[column] < b[column]) return ascending ? -1 : 1;
    if (a[column] > b[column]) return ascending ? 1 : -1;
    return 0;
  });
};

// Função para paginar objetos
const paginateObjects = (objects: any[], start: number, end: number) => {
  return objects.slice(start, end + 1);
};

// Função para buscar por texto em múltiplos campos
const searchObjects = (objects: any[], searchTerm: string, fields: string[]) => {
  if (!searchTerm) return objects;
  
  const term = searchTerm.toLowerCase();
  return objects.filter(obj => {
    return fields.some(field => {
      const value = obj[field];
      return value && value.toString().toLowerCase().includes(term);
    });
  });
};

// Mock do cliente Supabase
export const mockSupabaseClient = {
  from: (table: string) => {
    let data: any[] = [];
    let filters: Record<string, any> = {};
    let orderColumn: string = 'id';
    let orderAscending: boolean = true;
    let rangeStart: number = 0;
    let rangeEnd: number = 999;
    let searchFields: string[] = [];
    let searchTerm: string = '';
    
    // Selecionar a tabela correta
    switch (table) {
      case 'apoiadores':
        data = [...mockApoiadores];
        break;
      case 'liderancas':
        data = [...mockLiderancas];
        break;
      case 'demandas':
        data = [...mockDemandas];
        break;
      case 'eventos':
        data = [...mockEventos];
        break;
      case 'apoios_politicos':
        data = [...mockApoiosPoliticos];
        break;
      case 'candidatos':
        data = [...mockCandidatos];
        break;
      case 'regioes':
        data = [...mockRegioes];
        break;
      case 'conversacoes_ia':
        data = [...mockConversacoesIA];
        break;
      case 'mensagens_ia':
        // Este é um caso especial, tratado separadamente
        break;
      default:
        data = [];
    }
    
    return {
      select: (columns: string = '*', options: any = {}) => {
        return {
          eq: (column: string, value: any) => {
            filters[column] = value;
            return mockSupabaseClient.from(table).select(columns, options);
          },
          neq: (column: string, value: any) => {
            filters[`${column}_neq`] = value;
            return mockSupabaseClient.from(table).select(columns, options);
          },
          gte: (column: string, value: any) => {
            filters[`${column}_gte`] = value;
            return mockSupabaseClient.from(table).select(columns, options);
          },
          lte: (column: string, value: any) => {
            filters[`${column}_lte`] = value;
            return mockSupabaseClient.from(table).select(columns, options);
          },
          in: (column: string, values: any[]) => {
            filters.in = [column, values];
            return mockSupabaseClient.from(table).select(columns, options);
          },
          or: (conditions: string) => {
            // Simplificação: apenas armazena os campos para busca
            searchFields = conditions
              .split(',')
              .map(c => c.split('.')[0].replace(/ilike|eq|neq/g, ''));
            return mockSupabaseClient.from(table).select(columns, options);
          },
          contains: (column: string, values: any[]) => {
            filters[`${column}_contains`] = values;
            return mockSupabaseClient.from(table).select(columns, options);
          },
          order: (column: string, options: { ascending: boolean }) => {
            orderColumn = column;
            orderAscending = options.ascending;
            return mockSupabaseClient.from(table).select(columns, options);
          },
          range: (start: number, end: number) => {
            rangeStart = start;
            rangeEnd = end;
            return mockSupabaseClient.from(table).select(columns, options);
          },
          single: () => {
            return {
              then: async () => {
                await delay(300); // Simular delay de rede
                
                let filteredData = filterObjects(data, filters);
                
                if (searchFields.length > 0 && searchTerm) {
                  filteredData = searchObjects(filteredData, searchTerm, searchFields);
                }
                
                const sortedData = sortObjects(filteredData, orderColumn, orderAscending);
                
                return {
                  data: sortedData.length > 0 ? sortedData[0] : null,
                  error: null
                };
              }
            };
          },
          ilike: (column: string, value: string) => {
            filters.ilike = [column, value];
            return mockSupabaseClient.from(table).select(columns, options);
          },
          then: async () => {
            await delay(300); // Simular delay de rede
            
            let filteredData = filterObjects(data, filters);
            
            if (searchFields.length > 0 && searchTerm) {
              filteredData = searchObjects(filteredData, searchTerm, searchFields);
            }
            
            const sortedData = sortObjects(filteredData, orderColumn, orderAscending);
            const paginatedData = paginateObjects(sortedData, rangeStart, rangeEnd);
            
            if (options.single) {
              return {
                data: paginatedData.length > 0 ? paginatedData[0] : null,
                error: null,
                count: 1
              };
            }
            
            return {
              data: paginatedData,
              error: null,
              count: filteredData.length
            };
          }
        };
      },
      insert: (records: any | any[]) => {
        // Garantir que records é um array
        const recordsArray = Array.isArray(records) ? records : [records];
        
        return {
          select: (columns: string = '*') => {
            return {
              single: () => {
                return {
                  then: async () => {
                    await delay(300); // Simular delay de rede
                    
                    const newRecords = recordsArray.map(record => {
                      const id = Math.random().toString(36).substring(2, 11);
                      return { id, ...record };
                    });
                    
                    // Adicionar aos dados mockados (na memória apenas)
                    switch (table) {
                      case 'apoiadores':
                        mockApoiadores.push(...newRecords);
                        break;
                      case 'liderancas':
                        mockLiderancas.push(...newRecords);
                        break;
                      case 'demandas':
                        mockDemandas.push(...newRecords);
                        break;
                      case 'eventos':
                        mockEventos.push(...newRecords);
                        break;
                      case 'apoios_politicos':
                        mockApoiosPoliticos.push(...newRecords);
                        break;
                      case 'candidatos':
                        mockCandidatos.push(...newRecords);
                        break;
                      case 'regioes':
                        mockRegioes.push(...newRecords);
                        break;
                      case 'conversacoes_ia':
                        mockConversacoesIA.push(...newRecords);
                        break;
                      case 'mensagens_ia':
                        // Caso especial
                        const conversacaoId = records[0].conversacaoId as string;
                        if (!mockMensagensIA[conversacaoId]) {
                          mockMensagensIA[conversacaoId] = [];
                        }
                        mockMensagensIA[conversacaoId].push(...newRecords);
                        break;
                    }
                    
                    return {
                      data: newRecords.length > 0 ? newRecords[0] : null,
                      error: null
                    };
                  }
                };
              },
              then: async () => {
                await delay(300); // Simular delay de rede
                
                const newRecords = recordsArray.map(record => {
                  const id = Math.random().toString(36).substring(2, 11);
                  return { id, ...record };
                });
                
                // Adicionar aos dados mockados (na memória apenas)
                switch (table) {
                  case 'apoiadores':
                    mockApoiadores.push(...newRecords);
                    break;
                  case 'liderancas':
                    mockLiderancas.push(...newRecords);
                    break;
                  case 'demandas':
                    mockDemandas.push(...newRecords);
                    break;
                  case 'eventos':
                    mockEventos.push(...newRecords);
                    break;
                  case 'apoios_politicos':
                    mockApoiosPoliticos.push(...newRecords);
                    break;
                  case 'candidatos':
                    mockCandidatos.push(...newRecords);
                    break;
                  case 'regioes':
                    mockRegioes.push(...newRecords);
                    break;
                  case 'conversacoes_ia':
                    mockConversacoesIA.push(...newRecords);
                    break;
                  case 'mensagens_ia':
                    // Caso especial
                    const conversacaoId = records[0].conversacaoId as string;
                    if (!mockMensagensIA[conversacaoId]) {
                      mockMensagensIA[conversacaoId] = [];
                    }
                    mockMensagensIA[conversacaoId].push(...newRecords);
                    break;
                }
                
                return {
                  data: newRecords,
                  error: null
                };
              }
            };
          },
          then: async () => {
            await delay(300); // Simular delay de rede
            
            const newRecords = recordsArray.map(record => {
              const id = Math.random().toString(36).substring(2, 11);
              return { id, ...record };
            });
            
            // Adicionar aos dados mockados (na memória apenas)
            switch (table) {
              case 'apoiadores':
                mockApoiadores.push(...newRecords);
                break;
              case 'liderancas':
                mockLiderancas.push(...newRecords);
                break;
              case 'demandas':
                mockDemandas.push(...newRecords);
                break;
              case 'eventos':
                mockEventos.push(...newRecords);
                break;
              case 'apoios_politicos':
                mockApoiosPoliticos.push(...newRecords);
                break;
              case 'candidatos':
                mockCandidatos.push(...newRecords);
                break;
              case 'regioes':
                mockRegioes.push(...newRecords);
                break;
              case 'conversacoes_ia':
                mockConversacoesIA.push(...newRecords);
                break;
              case 'mensagens_ia':
                // Caso especial
                const conversacaoId = records[0].conversacaoId as string;
                if (!mockMensagensIA[conversacaoId]) {
                  mockMensagensIA[conversacaoId] = [];
                }
                mockMensagensIA[conversacaoId].push(...newRecords);
                break;
            }
            
            return {
              data: newRecords,
              error: null
            };
          }
        };
      },
      update: (updates: any) => {
        return {
          eq: (column: string, value: any) => {
            return {
              select: () => {
                return {
                  then: async () => {
                    await delay(300); // Simular delay de rede
                    
                    let updatedRecords: any[] = [];
                    
                    // Atualizar os dados mockados (na memória apenas)
                    switch (table) {
                      case 'apoiadores':
                        mockApoiadores = mockApoiadores.map(item => {
                          if (item[column] === value) {
                            updatedRecords.push({ ...item, ...updates });
                            return { ...item, ...updates };
                          }
                          return item;
                        });
                        break;
                      case 'liderancas':
                        mockLiderancas = mockLiderancas.map(item => {
                          if (item[column] === value) {
                            updatedRecords.push({ ...item, ...updates });
                            return { ...item, ...updates };
                          }
                          return item;
                        });
                        break;
                      case 'demandas':
                        mockDemandas = mockDemandas.map(item => {
                          if (item[column] === value) {
                            updatedRecords.push({ ...item, ...updates });
                            return { ...item, ...updates };
                          }
                          return item;
                        });
                        break;
                      case 'eventos':
                        mockEventos = mockEventos.map(item => {
                          if (item[column] === value) {
                            updatedRecords.push({ ...item, ...updates });
                            return { ...item, ...updates };
                          }
                          return item;
                        });
                        break;
                      case 'apoios_politicos':
                        mockApoiosPoliticos = mockApoiosPoliticos.map(item => {
                          if (item[column] === value) {
                            updatedRecords.push({ ...item, ...updates });
                            return { ...item, ...updates };
                          }
                          return item;
                        });
                        break;
                      case 'candidatos':
                        mockCandidatos = mockCandidatos.map(item => {
                          if (item[column] === value) {
                            updatedRecords.push({ ...item, ...updates });
                            return { ...item, ...updates };
                          }
                          return item;
                        });
                        break;
                      case 'regioes':
                        mockRegioes = mockRegioes.map(item => {
                          if (item[column] === value) {
                            updatedRecords.push({ ...item, ...updates });
                            return { ...item, ...updates };
                          }
                          return item;
                        });
                        break;
                      case 'conversacoes_ia':
                        mockConversacoesIA = mockConversacoesIA.map(item => {
                          if (item[column] === value) {
                            updatedRecords.push({ ...item, ...updates });
                            return { ...item, ...updates };
                          }
                          return item;
                        });
                        break;
                    }
                    
                    return {
                      data: updatedRecords,
                      error: null
                    };
                  }
                };
              },
              then: async () => {
                await delay(300); // Simular delay de rede
                
                let updatedRecords: any[] = [];
                
                // Atualizar os dados mockados (na memória apenas)
                switch (table) {
                  case 'apoiadores':
                    mockApoiadores = mockApoiadores.map(item => {
                      if (item[column] === value) {
                        updatedRecords.push({ ...item, ...updates });
                        return { ...item, ...updates };
                      }
                      return item;
                    });
                    break;
                  case 'liderancas':
                    mockLiderancas = mockLiderancas.map(item => {
                      if (item[column] === value) {
                        updatedRecords.push({ ...item, ...updates });
                        return { ...item, ...updates };
                      }
                      return item;
                    });
                    break;
                  case 'demandas':
                    mockDemandas = mockDemandas.map(item => {
                      if (item[column] === value) {
                        updatedRecords.push({ ...item, ...updates });
                        return { ...item, ...updates };
                      }
                      return item;
                    });
                    break;
                  case 'eventos':
                    mockEventos = mockEventos.map(item => {
                      if (item[column] === value) {
                        updatedRecords.push({ ...item, ...updates });
                        return { ...item, ...updates };
                      }
                      return item;
                    });
                    break;
                  case 'apoios_politicos':
                    mockApoiosPoliticos = mockApoiosPoliticos.map(item => {
                      if (item[column] === value) {
                        updatedRecords.push({ ...item, ...updates });
                        return { ...item, ...updates };
                      }
                      return item;
                    });
                    break;
                  case 'candidatos':
                    mockCandidatos = mockCandidatos.map(item => {
                      if (item[column] === value) {
                        updatedRecords.push({ ...item, ...updates });
                        return { ...item, ...updates };
                      }
                      return item;
                    });
                    break;
                  case 'regioes':
                    mockRegioes = mockRegioes.map(item => {
                      if (item[column] === value) {
                        updatedRecords.push({ ...item, ...updates });
                        return { ...item, ...updates };
                      }
                      return item;
                    });
                    break;
                  case 'conversacoes_ia':
                    mockConversacoesIA = mockConversacoesIA.map(item => {
                      if (item[column] === value) {
                        updatedRecords.push({ ...item, ...updates });
                        return { ...item, ...updates };
                      }
                      return item;
                    });
                    break;
                }
                
                return {
                  data: updatedRecords,
                  error: null
                };
              }
            };
          }
        };
      },
      delete: () => {
        return {
          eq: (column: string, value: any) => {
            return {
              then: async () => {
                await delay(300); // Simular delay de rede
                
                // Remover dos dados mockados (na memória apenas)
                switch (table) {
                  case 'apoiadores':
                    mockApoiadores = mockApoiadores.filter(item => item[column] !== value);
                    break;
                  case 'liderancas':
                    mockLiderancas = mockLiderancas.filter(item => item[column] !== value);
                    break;
                  case 'demandas':
                    mockDemandas = mockDemandas.filter(item => item[column] !== value);
                    break;
                  case 'eventos':
                    mockEventos = mockEventos.filter(item => item[column] !== value);
                    break;
                  case 'apoios_politicos':
                    mockApoiosPoliticos = mockApoiosPoliticos.filter(item => item[column] !== value);
                    break;
                  case 'candidatos':
                    mockCandidatos = mockCandidatos.filter(item => item[column] !== value);
                    break;
                  case 'regioes':
                    mockRegioes = mockRegioes.filter(item => item[column] !== value);
                    break;
                  case 'conversacoes_ia':
                    mockConversacoesIA = mockConversacoesIA.filter(item => item[column] !== value);
                    break;
                  case 'mensagens_ia':
                    // Caso especial
                    if (column === 'conversacaoId' && mockMensagensIA[value as string]) {
                      delete mockMensagensIA[value as string];
                    }
                    break;
                }
                
                return {
                  error: null
                };
              }
            };
          }
        };
      }
    };
  },
  storage: {
    from: (bucket: string) => {
      return {
        upload: async (path: string, file: File, options?: any) => {
          await delay(300); // Simular delay de rede
          return {
            data: { path },
            error: null
          };
        },
        getPublicUrl: (path: string) => {
          return {
            data: { publicUrl: `https://mock-storage.example.com/${bucket}/${path}` },
            error: null
          };
        },
        remove: async (paths: string[]) => {
          await delay(300); // Simular delay de rede
          return {
            data: { removed: paths },
            error: null
          };
        }
      };
    }
  }
}; 