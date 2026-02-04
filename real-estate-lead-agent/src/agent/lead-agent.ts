import { searchGoogleMultipleQueries } from '../search/google-search';
import { analyzeWebsite, closeBrowser } from '../analyzer/website-analyzer';
import { buildLeadFromAnalysis } from '../extractor/lead-extractor';
import { insertLead, getLeadByUrl } from '../database/supabase';
import { createExecutionLog, updateExecutionLog } from '../database/execution-log';
import { config, SEARCH_QUERIES } from '../config';
import { ExecutionResult, Lead, SearchResult } from '../types/lead';
import { logger } from '../utils/logger';
import { delay } from '../utils/delay';

export class LeadAgent {
  private dryRun: boolean;

  constructor(dryRun: boolean = false) {
    this.dryRun = dryRun;
  }

  async execute(): Promise<ExecutionResult> {
    const startedAt = new Date();
    let executionId: string | null = null;

    const result: ExecutionResult = {
      totalSearchResults: 0,
      sitesAnalyzed: 0,
      leadsFound: 0,
      leadsSaved: 0,
      duplicatesSkipped: 0,
      errors: [],
      startedAt,
      finishedAt: new Date(),
    };

    try {
      logger.info('=== Real Estate Lead Agent Starting ===');
      logger.info(`Mode: ${this.dryRun ? 'DRY RUN' : 'PRODUCTION'}`);
      logger.info(`Search queries: ${SEARCH_QUERIES.length}`);
      logger.info(`Max results per query: ${config.agent.maxResultsPerQuery}`);

      // Criar log de execução
      if (!this.dryRun) {
        executionId = await createExecutionLog(startedAt);
      }

      // FASE 1: Buscar no Google
      logger.info('\n--- Phase 1: Google Search ---');
      const searchResults = await searchGoogleMultipleQueries(
        SEARCH_QUERIES,
        config.agent.maxResultsPerQuery
      );
      result.totalSearchResults = searchResults.length;
      logger.info(`Total unique search results: ${searchResults.length}`);

      // Limitar número de páginas para analisar
      const toAnalyze = searchResults.slice(0, config.agent.maxPagesToAnalyze);

      // FASE 2: Analisar sites
      logger.info('\n--- Phase 2: Website Analysis ---');
      for (let i = 0; i < toAnalyze.length; i++) {
        const searchResult = toAnalyze[i];
        logger.info(`\n[${i + 1}/${toAnalyze.length}] Analyzing: ${searchResult.url}`);

        try {
          // Verificar se já existe no banco
          if (!this.dryRun) {
            const existing = await getLeadByUrl(searchResult.url);
            if (existing) {
              logger.info(`  -> Already in database, skipping`);
              result.duplicatesSkipped++;
              continue;
            }
          }

          // Analisar o site
          const analysis = await analyzeWebsite(searchResult.url);
          result.sitesAnalyzed++;

          // FASE 3: Extrair lead
          const lead = buildLeadFromAnalysis(
            searchResult,
            analysis,
            SEARCH_QUERIES[0] // Query principal
          );

          if (lead) {
            result.leadsFound++;
            logger.info(`  -> LEAD FOUND: ${lead.company_name}`);
            logger.info(`     URL: ${lead.website_url}`);
            logger.info(`     Email: ${lead.email || 'N/A'}`);
            logger.info(`     Phone: ${lead.phone || 'N/A'}`);
            logger.info(`     Filter: ${analysis.filterDetails.join(', ')}`);
            logger.info(`     Form: ${analysis.formDetails.join(', ')}`);

            // FASE 4: Salvar no Supabase
            if (!this.dryRun) {
              const saved = await this.saveLead(lead);
              if (saved) {
                result.leadsSaved++;
              } else {
                result.duplicatesSkipped++;
              }
            } else {
              logger.info(`  -> [DRY RUN] Would save lead`);
            }
          } else {
            logger.info(`  -> Not a qualifying lead (missing filter or form)`);
          }

          // Delay entre análises
          await delay(config.agent.requestDelayMs);
        } catch (error: any) {
          const errorMsg = `Error analyzing ${searchResult.url}: ${error.message}`;
          logger.error(errorMsg);
          result.errors.push(errorMsg);
        }
      }

      result.finishedAt = new Date();
      const duration = (result.finishedAt.getTime() - startedAt.getTime()) / 1000;

      // Resumo
      logger.info('\n=== Execution Summary ===');
      logger.info(`Duration: ${duration.toFixed(1)}s`);
      logger.info(`Search results: ${result.totalSearchResults}`);
      logger.info(`Sites analyzed: ${result.sitesAnalyzed}`);
      logger.info(`Leads found: ${result.leadsFound}`);
      logger.info(`Leads saved: ${result.leadsSaved}`);
      logger.info(`Duplicates skipped: ${result.duplicatesSkipped}`);
      logger.info(`Errors: ${result.errors.length}`);

      // Atualizar log de execução
      if (!this.dryRun && executionId) {
        await updateExecutionLog(executionId, result);
      }
    } catch (error: any) {
      logger.error(`Agent execution failed: ${error.message}`);
      result.errors.push(error.message);
      result.finishedAt = new Date();

      if (!this.dryRun && executionId) {
        await updateExecutionLog(executionId, result);
      }
    } finally {
      await closeBrowser();
    }

    return result;
  }

  private async saveLead(lead: Lead): Promise<boolean> {
    try {
      const saved = await insertLead(lead);
      return saved !== null;
    } catch (error: any) {
      logger.error(`Failed to save lead ${lead.company_name}: ${error.message}`);
      return false;
    }
  }
}
