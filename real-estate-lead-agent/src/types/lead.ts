export interface Lead {
  id?: string;
  company_name: string;
  website_url: string;
  email: string | null;
  phone: string | null;
  has_property_filter: boolean;
  has_contact_form: boolean;
  search_query: string;
  captured_at?: string;
  status: LeadStatus;
}

export type LeadStatus = 'new' | 'verified' | 'contacted' | 'discarded';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface WebsiteAnalysis {
  url: string;
  hasPropertyFilter: boolean;
  hasContactForm: boolean;
  companyName: string | null;
  emails: string[];
  phones: string[];
  filterDetails: string[];
  formDetails: string[];
}

export interface AgentConfig {
  maxResultsPerQuery: number;
  maxPagesToAnalyze: number;
  requestDelayMs: number;
  browserTimeoutMs: number;
  searchQueries: string[];
}

export interface ExecutionResult {
  totalSearchResults: number;
  sitesAnalyzed: number;
  leadsFound: number;
  leadsSaved: number;
  duplicatesSkipped: number;
  errors: string[];
  startedAt: Date;
  finishedAt: Date;
}
