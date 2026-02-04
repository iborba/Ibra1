import { getSupabaseClient } from './supabase';
import { ExecutionResult } from '../types/lead';
import { logger } from '../utils/logger';

export async function createExecutionLog(startedAt: Date): Promise<string | null> {
  const client = getSupabaseClient();

  const { data, error } = await client
    .from('agent_executions')
    .insert({
      started_at: startedAt.toISOString(),
      status: 'running',
    })
    .select('id')
    .single();

  if (error) {
    logger.error(`Failed to create execution log: ${error.message}`);
    return null;
  }

  return data.id;
}

export async function updateExecutionLog(
  executionId: string,
  result: ExecutionResult
): Promise<void> {
  const client = getSupabaseClient();

  const { error } = await client
    .from('agent_executions')
    .update({
      finished_at: result.finishedAt.toISOString(),
      total_search_results: result.totalSearchResults,
      sites_analyzed: result.sitesAnalyzed,
      leads_found: result.leadsFound,
      leads_saved: result.leadsSaved,
      duplicates_skipped: result.duplicatesSkipped,
      errors: result.errors,
      status: result.errors.length > 0 && result.leadsSaved === 0 ? 'failed' : 'completed',
    })
    .eq('id', executionId);

  if (error) {
    logger.error(`Failed to update execution log: ${error.message}`);
  }
}

export async function getLastExecution(): Promise<any | null> {
  const client = getSupabaseClient();

  const { data, error } = await client
    .from('agent_executions')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    logger.error(`Failed to get last execution: ${error.message}`);
    return null;
  }

  return data;
}
