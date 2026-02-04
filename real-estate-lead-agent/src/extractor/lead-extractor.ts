import { Lead, SearchResult, WebsiteAnalysis } from '../types/lead';
import { logger } from '../utils/logger';

export function buildLeadFromAnalysis(
  searchResult: SearchResult,
  analysis: WebsiteAnalysis,
  searchQuery: string
): Lead | null {
  // Validar critérios obrigatórios
  if (!analysis.hasPropertyFilter) {
    logger.debug(`Skipping ${analysis.url}: no property filter detected`);
    return null;
  }

  if (!analysis.hasContactForm) {
    logger.debug(`Skipping ${analysis.url}: no contact form detected`);
    return null;
  }

  // Extrair nome da empresa
  const companyName = extractCompanyName(searchResult, analysis);
  if (!companyName) {
    logger.debug(`Skipping ${analysis.url}: could not determine company name`);
    return null;
  }

  // Selecionar melhor email
  const email = selectBestEmail(analysis.emails);

  // Selecionar melhor telefone
  const phone = selectBestPhone(analysis.phones);

  return {
    company_name: companyName,
    website_url: normalizeUrl(analysis.url),
    email,
    phone,
    has_property_filter: analysis.hasPropertyFilter,
    has_contact_form: analysis.hasContactForm,
    search_query: searchQuery,
    status: 'new',
  };
}

function extractCompanyName(
  searchResult: SearchResult,
  analysis: WebsiteAnalysis
): string | null {
  // Prioridade 1: nome extraído do site
  if (analysis.companyName && analysis.companyName.length >= 3) {
    return cleanCompanyName(analysis.companyName);
  }

  // Prioridade 2: título do resultado do Google
  if (searchResult.title) {
    const name = searchResult.title
      .split(/[|\-–—]/)[0]
      .trim();

    if (name.length >= 3) {
      return cleanCompanyName(name);
    }
  }

  return null;
}

function cleanCompanyName(name: string): string {
  return name
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/g, '')
    .replace(/^[-–—|]\s*/, '')
    .replace(/\s*[-–—|]$/, '')
    .trim();
}

function selectBestEmail(emails: string[]): string | null {
  if (emails.length === 0) return null;

  // Priorizar emails de contato/comercial
  const priorityPrefixes = [
    'contato',
    'comercial',
    'vendas',
    'atendimento',
    'info',
    'imobiliaria',
    'faleconosco',
  ];

  for (const prefix of priorityPrefixes) {
    const match = emails.find((e) => e.toLowerCase().startsWith(prefix));
    if (match) return match;
  }

  // Retornar primeiro email que não seja genérico
  const genericDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
  const businessEmail = emails.find(
    (e) => !genericDomains.some((d) => e.includes(d))
  );

  return businessEmail || emails[0];
}

function selectBestPhone(phones: string[]): string | null {
  if (phones.length === 0) return null;

  // Priorizar números com 9 dígitos (celular) - mais provável de ser WhatsApp
  const cellPhone = phones.find((p) => {
    const digits = p.replace(/\D/g, '');
    return digits.length >= 11; // DDD + 9 dígitos
  });

  return cellPhone || phones[0];
}

function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Remover trailing slash
    let normalized = urlObj.origin + urlObj.pathname.replace(/\/$/, '');
    return normalized;
  } catch {
    return url;
  }
}
