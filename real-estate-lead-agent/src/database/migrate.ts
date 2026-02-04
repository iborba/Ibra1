import { getSupabaseClient } from './supabase';
import { logger } from '../utils/logger';
import { config, validateConfig } from '../config';

/**
 * SQL para criar a tabela de leads no Supabase.
 * Execute este SQL diretamente no SQL Editor do Supabase Dashboard
 * ou use este script de migração.
 */
export const MIGRATION_SQL = `
-- Tabela principal de leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  website_url TEXT NOT NULL UNIQUE,
  email TEXT,
  phone TEXT,
  has_property_filter BOOLEAN DEFAULT FALSE,
  has_contact_form BOOLEAN DEFAULT FALSE,
  search_query TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'verified', 'contacted', 'discarded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para buscas eficientes
CREATE INDEX IF NOT EXISTS idx_leads_website_url ON leads(website_url);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_captured_at ON leads(captured_at);

-- Tabela de log de execuções do agente
CREATE TABLE IF NOT EXISTS agent_executions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  started_at TIMESTAMPTZ NOT NULL,
  finished_at TIMESTAMPTZ,
  total_search_results INTEGER DEFAULT 0,
  sites_analyzed INTEGER DEFAULT 0,
  leads_found INTEGER DEFAULT 0,
  leads_saved INTEGER DEFAULT 0,
  duplicates_skipped INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]'::JSONB,
  status TEXT DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - ativar para segurança
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_executions ENABLE ROW LEVEL SECURITY;

-- Policy para permitir todas as operações via service_role
CREATE POLICY IF NOT EXISTS "Service role full access on leads"
  ON leads FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Service role full access on agent_executions"
  ON agent_executions FOR ALL
  USING (true)
  WITH CHECK (true);
`;

async function runMigration(): Promise<void> {
  try {
    validateConfig();
    logger.info('Running database migration...');

    const client = getSupabaseClient();

    // Executar as queries SQL individualmente
    const statements = MIGRATION_SQL
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      const { error } = await client.rpc('exec_sql', { sql: statement + ';' });
      if (error) {
        // Se o RPC não existir, loggar instrução para execução manual
        logger.warn(`Could not execute via RPC. Run this SQL manually in Supabase Dashboard:\n${statement};`);
      }
    }

    logger.info('Migration completed. If any statements failed, run them manually in the Supabase SQL Editor.');
    logger.info('Migration SQL:\n' + MIGRATION_SQL);
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  runMigration();
}

export { runMigration };
