import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  serpapi: {
    key: process.env.SERPAPI_KEY || '',
  },
  agent: {
    maxResultsPerQuery: parseInt(process.env.AGENT_MAX_RESULTS_PER_QUERY || '20', 10),
    maxPagesToAnalyze: parseInt(process.env.AGENT_MAX_PAGES_TO_ANALYZE || '50', 10),
    requestDelayMs: parseInt(process.env.AGENT_REQUEST_DELAY_MS || '2000', 10),
    browserTimeoutMs: parseInt(process.env.AGENT_BROWSER_TIMEOUT_MS || '30000', 10),
  },
  cron: {
    schedule: process.env.CRON_SCHEDULE || '0 8 * * *',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

export const SEARCH_QUERIES = [
  'imobiliária site oficial',
  'imobiliárias com site próprio',
  'imobiliária compra venda aluguel site',
  'imobiliária digital filtro imóveis',
  'melhores imobiliárias online Brasil',
  'imobiliária site busca imóveis',
  'portal imobiliário empresa',
  'imobiliária site profissional contato',
  'imobiliárias regionais site próprio',
  'imobiliária site cadastro imóveis venda aluguel',
];

export function validateConfig(): void {
  const required = [
    { key: 'SUPABASE_URL', value: config.supabase.url },
    { key: 'SUPABASE_ANON_KEY', value: config.supabase.anonKey },
    { key: 'SERPAPI_KEY', value: config.serpapi.key },
  ];

  const missing = required.filter((r) => !r.value);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.map((m) => m.key).join(', ')}`
    );
  }
}
