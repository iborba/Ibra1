# Real Estate Lead Agent

Agente automatizado para captura de leads de imobiliárias brasileiras. O agente busca no Google por imobiliárias que possuam site próprio com filtro de imóveis e formulário de contato, extraindo informações de contato e salvando no Supabase.

## Critérios de Qualificação de Leads

O agente busca imobiliárias que atendam **todos** os critérios:

1. **Possuem site próprio** (exclui portais agregadores como ZAP, VivaReal, OLX)
2. **Site com filtro de imóveis** (selects por tipo, bairro, preço, quartos, etc.)
3. **Site com formulário de contato** (formulário com campos de nome, email, mensagem)

## Dados Capturados

Para cada lead qualificado:

| Campo | Descrição |
|-------|-----------|
| `company_name` | Nome da imobiliária |
| `website_url` | URL do site (única) |
| `email` | Email de contato (prioriza comercial/contato) |
| `phone` | Telefone de contato (prioriza celular) |
| `has_property_filter` | Se o site possui filtro de imóveis |
| `has_contact_form` | Se o site possui formulário de contato |
| `search_query` | Query de busca que originou o lead |
| `status` | Status do lead: `new`, `verified`, `contacted`, `discarded` |

## Arquitetura

```
src/
├── agent/          # Orquestrador principal do agente
├── analyzer/       # Análise de websites (Puppeteer)
├── config/         # Configurações e variáveis de ambiente
├── database/       # Integração com Supabase
├── extractor/      # Extração de dados de leads
├── scheduler/      # Agendamento com node-cron
├── search/         # Busca no Google via SerpAPI
├── types/          # Tipos TypeScript
├── utils/          # Utilitários (logger, delay)
└── index.ts        # Entry point
```

## Pré-requisitos

- Node.js >= 18
- Conta no [Supabase](https://supabase.com) (gratuito)
- Chave da [SerpAPI](https://serpapi.com) (100 buscas/mês gratuitas)
- Docker (opcional, para deploy)

## Setup

### 1. Instalar dependências

```bash
cd real-estate-lead-agent
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
SERPAPI_KEY=sua-serpapi-key
```

### 3. Criar tabelas no Supabase

Execute o SQL abaixo no **SQL Editor** do Supabase Dashboard:

```sql
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

CREATE INDEX IF NOT EXISTS idx_leads_website_url ON leads(website_url);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_captured_at ON leads(captured_at);

-- Tabela de log de execuções
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

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 4. Compilar o projeto

```bash
npm run build
```

## Modos de Execução

### Execução Única
Roda o agente uma vez e encerra:
```bash
npm run agent:run
```

### Modo Agendado
Roda o agente em loop com cron (padrão: diariamente às 08:00):
```bash
npm run agent:schedule
```

### Dry Run (Teste)
Executa sem salvar no banco — útil para validar configuração:
```bash
npm run agent:dry-run
```

## Estratégia de Execução

O agente segue uma estratégia em 4 fases:

### Fase 1 — Busca no Google
- Executa múltiplas queries de busca otimizadas para imobiliárias
- Filtra resultados excluindo portais agregadores e redes sociais
- Deduplica resultados por domínio

### Fase 2 — Análise de Website
- Acessa cada site com Puppeteer (headless browser)
- Detecta filtros de imóveis: selects, inputs de busca, range sliders
- Detecta formulários de contato: campos nome/email/mensagem
- Navega em páginas internas (`/contato`, `/imoveis`, `/busca`)

### Fase 3 — Extração de Dados
- Extrai nome da empresa (og:site_name, título, logo)
- Extrai emails (regex no texto + links mailto:)
- Extrai telefones (regex + links tel:)
- Prioriza emails corporativos e celulares

### Fase 4 — Persistência
- Verifica duplicatas por URL no Supabase
- Insere leads qualificados com status `new`
- Registra log de execução na tabela `agent_executions`

### Agendamento

| Execução | Horário | Dias |
|----------|---------|------|
| Principal | 08:00 UTC (05:00 BRT) | Todos os dias |
| Secundária | 14:00 UTC (11:00 BRT) | Segunda a Sexta |

O agendamento pode ser configurado via:
- **Variável de ambiente** `CRON_SCHEDULE` (modo `schedule`)
- **GitHub Actions** (workflow `scheduled-agent.yml`)
- **Docker** com `docker-compose up -d`

## Deploy

### Docker

```bash
# Build
docker build -t real-estate-lead-agent .

# Run (modo agendado)
docker run -d --name lead-agent --env-file .env real-estate-lead-agent

# Run (execução única)
docker run --rm --env-file .env real-estate-lead-agent node dist/index.js --mode=run
```

### Docker Compose

```bash
docker-compose up -d
```

### GitHub Actions

1. Configure os secrets no repositório:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SERPAPI_KEY`

2. O agente executará automaticamente nos horários configurados

3. Para execução manual: Actions > "Scheduled Lead Agent Execution" > Run workflow

## Configuração Avançada

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `AGENT_MAX_RESULTS_PER_QUERY` | 20 | Máximo de resultados por query |
| `AGENT_MAX_PAGES_TO_ANALYZE` | 50 | Máximo de sites para analisar por execução |
| `AGENT_REQUEST_DELAY_MS` | 2000 | Delay entre requisições (ms) |
| `AGENT_BROWSER_TIMEOUT_MS` | 30000 | Timeout para carregar páginas (ms) |
| `CRON_SCHEDULE` | `0 8 * * *` | Expressão cron para agendamento |
| `LOG_LEVEL` | info | Nível de log (debug, info, warn, error) |

## Monitoramento

- **Logs**: `logs/agent.log` e `logs/agent-error.log`
- **Supabase Dashboard**: Consultar tabelas `leads` e `agent_executions`
- **GitHub Actions**: Logs e artefatos de cada execução
