import axios from 'axios';
import { config } from '../config';
import { SearchResult } from '../types/lead';
import { logger } from '../utils/logger';
import { delay } from '../utils/delay';

const SERPAPI_BASE_URL = 'https://serpapi.com/search.json';

export async function searchGoogle(
  query: string,
  maxResults: number = 20
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  let start = 0;
  const resultsPerPage = 10;

  logger.info(`Searching Google for: "${query}"`);

  while (results.length < maxResults) {
    try {
      const response = await axios.get(SERPAPI_BASE_URL, {
        params: {
          q: query,
          api_key: config.serpapi.key,
          engine: 'google',
          google_domain: 'google.com.br',
          gl: 'br',
          hl: 'pt',
          start,
          num: resultsPerPage,
        },
        timeout: 15000,
      });

      const organicResults = response.data.organic_results || [];

      if (organicResults.length === 0) {
        logger.info(`No more results found for query: "${query}"`);
        break;
      }

      for (const result of organicResults) {
        if (results.length >= maxResults) break;

        // Filtrar resultados que parecem ser imobiliárias
        if (isLikelyRealEstateWebsite(result)) {
          results.push({
            title: result.title || '',
            url: result.link || '',
            snippet: result.snippet || '',
          });
        }
      }

      start += resultsPerPage;

      // Respeitar rate limits
      await delay(config.agent.requestDelayMs);
    } catch (error: any) {
      if (error.response?.status === 429) {
        logger.warn('SerpAPI rate limit hit. Waiting 60 seconds...');
        await delay(60000);
        continue;
      }
      logger.error(`Search error for query "${query}": ${error.message}`);
      break;
    }
  }

  logger.info(`Found ${results.length} potential real estate websites for: "${query}"`);
  return results;
}

function isLikelyRealEstateWebsite(result: any): boolean {
  const url = (result.link || '').toLowerCase();
  const title = (result.title || '').toLowerCase();
  const snippet = (result.snippet || '').toLowerCase();
  const combined = `${url} ${title} ${snippet}`;

  // Excluir portais grandes / agregadores / redes sociais
  const excludePatterns = [
    'facebook.com',
    'instagram.com',
    'twitter.com',
    'youtube.com',
    'linkedin.com',
    'olx.com.br',
    'zapimoveis.com.br',
    'vivareal.com.br',
    'imovelweb.com.br',
    'quintoandar.com.br',
    'wikipedia.org',
    'reclameaqui.com.br',
    'google.com',
  ];

  if (excludePatterns.some((pattern) => url.includes(pattern))) {
    return false;
  }

  // Incluir se contém termos imobiliários
  const includeTerms = [
    'imobiliaria',
    'imobiliária',
    'imoveis',
    'imóveis',
    'corretora',
    'corretor',
    'aluguel',
    'venda',
    'apartamento',
    'casa',
    'terreno',
    'empreendimento',
    'real estate',
    'realty',
  ];

  return includeTerms.some((term) => combined.includes(term));
}

export async function searchGoogleMultipleQueries(
  queries: string[],
  maxResultsPerQuery: number
): Promise<SearchResult[]> {
  const allResults: SearchResult[] = [];
  const seenUrls = new Set<string>();

  for (const query of queries) {
    const results = await searchGoogle(query, maxResultsPerQuery);

    for (const result of results) {
      // Extrair domínio para deduplicação
      const domain = extractDomain(result.url);
      if (!seenUrls.has(domain)) {
        seenUrls.add(domain);
        allResults.push(result);
      }
    }

    // Delay entre queries
    await delay(config.agent.requestDelayMs * 2);
  }

  logger.info(`Total unique results after all queries: ${allResults.length}`);
  return allResults;
}

function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}
