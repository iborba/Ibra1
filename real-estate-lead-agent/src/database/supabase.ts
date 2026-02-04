import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';
import { Lead } from '../types/lead';
import { logger } from '../utils/logger';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createClient(config.supabase.url, config.supabase.serviceRoleKey || config.supabase.anonKey);
  }
  return supabaseClient;
}

export async function insertLead(lead: Omit<Lead, 'id' | 'captured_at'>): Promise<Lead | null> {
  const client = getSupabaseClient();

  // Check for duplicates by URL
  const { data: existing } = await client
    .from('leads')
    .select('id')
    .eq('website_url', lead.website_url)
    .single();

  if (existing) {
    logger.info(`Lead already exists for URL: ${lead.website_url}`);
    return null;
  }

  const { data, error } = await client
    .from('leads')
    .insert({
      ...lead,
      captured_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    logger.error(`Failed to insert lead: ${error.message}`);
    throw error;
  }

  logger.info(`Lead saved: ${lead.company_name} (${lead.website_url})`);
  return data as Lead;
}

export async function getLeadByUrl(url: string): Promise<Lead | null> {
  const client = getSupabaseClient();

  const { data, error } = await client
    .from('leads')
    .select('*')
    .eq('website_url', url)
    .single();

  if (error && error.code !== 'PGRST116') {
    logger.error(`Failed to fetch lead by URL: ${error.message}`);
    throw error;
  }

  return data as Lead | null;
}

export async function getAllLeads(): Promise<Lead[]> {
  const client = getSupabaseClient();

  const { data, error } = await client
    .from('leads')
    .select('*')
    .order('captured_at', { ascending: false });

  if (error) {
    logger.error(`Failed to fetch leads: ${error.message}`);
    throw error;
  }

  return data as Lead[];
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<void> {
  const client = getSupabaseClient();

  const { error } = await client
    .from('leads')
    .update({ status })
    .eq('id', id);

  if (error) {
    logger.error(`Failed to update lead status: ${error.message}`);
    throw error;
  }
}

export async function getLeadsCount(): Promise<number> {
  const client = getSupabaseClient();

  const { count, error } = await client
    .from('leads')
    .select('*', { count: 'exact', head: true });

  if (error) {
    logger.error(`Failed to count leads: ${error.message}`);
    throw error;
  }

  return count || 0;
}
