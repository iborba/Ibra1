import puppeteer, { Browser, Page } from 'puppeteer';
import { WebsiteAnalysis } from '../types/lead';
import { config } from '../config';
import { logger } from '../utils/logger';
import { delay } from '../utils/delay';

let browserInstance: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
  if (!browserInstance || !browserInstance.connected) {
    browserInstance = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--window-size=1920,1080',
      ],
    });
  }
  return browserInstance;
}

export async function closeBrowser(): Promise<void> {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
}

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  const analysis: WebsiteAnalysis = {
    url,
    hasPropertyFilter: false,
    hasContactForm: false,
    companyName: null,
    emails: [],
    phones: [],
    filterDetails: [],
    formDetails: [],
  };

  let page: Page | null = null;

  try {
    const browser = await getBrowser();
    page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.setViewport({ width: 1920, height: 1080 });

    logger.info(`Analyzing website: ${url}`);

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: config.agent.browserTimeoutMs,
    });

    // Aguardar um pouco para conteúdo dinâmico carregar
    await delay(2000);

    // Extrair informações da página principal
    const mainPageData = await extractPageData(page);

    analysis.companyName = mainPageData.companyName;
    analysis.emails.push(...mainPageData.emails);
    analysis.phones.push(...mainPageData.phones);
    analysis.hasPropertyFilter = mainPageData.hasPropertyFilter;
    analysis.filterDetails = mainPageData.filterDetails;
    analysis.hasContactForm = mainPageData.hasContactForm;
    analysis.formDetails = mainPageData.formDetails;

    // Se não encontrou formulário de contato na página principal, verificar /contato
    if (!analysis.hasContactForm) {
      const contactPageData = await checkContactPage(page, url);
      if (contactPageData) {
        analysis.hasContactForm = contactPageData.hasContactForm;
        analysis.formDetails.push(...contactPageData.formDetails);
        analysis.emails.push(...contactPageData.emails);
        analysis.phones.push(...contactPageData.phones);
      }
    }

    // Se não encontrou filtro, verificar páginas de imóveis
    if (!analysis.hasPropertyFilter) {
      const propertyPageData = await checkPropertyPages(page, url);
      if (propertyPageData) {
        analysis.hasPropertyFilter = propertyPageData.hasPropertyFilter;
        analysis.filterDetails.push(...propertyPageData.filterDetails);
      }
    }

    // Deduplicar emails e telefones
    analysis.emails = [...new Set(analysis.emails)];
    analysis.phones = [...new Set(analysis.phones)];

    logger.info(
      `Analysis complete for ${url}: ` +
        `filter=${analysis.hasPropertyFilter}, ` +
        `form=${analysis.hasContactForm}, ` +
        `emails=${analysis.emails.length}, ` +
        `phones=${analysis.phones.length}`
    );
  } catch (error: any) {
    logger.error(`Failed to analyze ${url}: ${error.message}`);
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
  }

  return analysis;
}

interface PageData {
  companyName: string | null;
  emails: string[];
  phones: string[];
  hasPropertyFilter: boolean;
  filterDetails: string[];
  hasContactForm: boolean;
  formDetails: string[];
}

async function extractPageData(page: Page): Promise<PageData> {
  const rawData = await page.evaluate(() => {
    const text = document.body?.innerText || '';

    // --- Extrair nome da empresa ---
    let companyName: string | null = null;

    const ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (ogSiteName) {
      companyName = ogSiteName.getAttribute('content');
    }

    if (!companyName) {
      const title = document.title || '';
      companyName = title
        .split(/[|\-–—]/)[0]
        .trim()
        .replace(/imóveis|imoveis/gi, '')
        .trim();
    }

    if (!companyName || companyName.length < 3) {
      const logo = document.querySelector('header img, .logo img, a.logo img, .navbar-brand img');
      if (logo) {
        companyName = logo.getAttribute('alt') || null;
      }
    }

    // --- Extrair emails ---
    const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
    const emailMatches = text.match(emailRegex) || [];
    const emailSet = new Set(emailMatches);
    const emails: string[] = Array.from(emailSet).filter(
      (e: string) => !e.includes('example.com') && !e.includes('sentry.io')
    );

    const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
    for (let i = 0; i < mailtoLinks.length; i++) {
      const link = mailtoLinks[i];
      const href = link.getAttribute('href');
      if (href) {
        const email = href.replace('mailto:', '').split('?')[0];
        if (email && !emails.includes(email)) {
          emails.push(email);
        }
      }
    }

    // --- Extrair telefones ---
    const phoneRegex = /(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}[\-\s]?\d{4}/g;
    const phoneMatches = text.match(phoneRegex) || [];
    const phoneSet = new Set(phoneMatches);
    const phones: string[] = Array.from(phoneSet).map((p: string) =>
      p.replace(/\s+/g, ' ').trim()
    );

    const telLinks = document.querySelectorAll('a[href^="tel:"]');
    for (let i = 0; i < telLinks.length; i++) {
      const link = telLinks[i];
      const href = link.getAttribute('href');
      if (href) {
        const phone = href.replace('tel:', '').replace(/\D/g, '');
        if (phone && phone.length >= 10) {
          const formatted = phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
          if (!phones.includes(formatted)) {
            phones.push(formatted);
          }
        }
      }
    }

    // --- Detectar filtro de imóveis ---
    let hasPropertyFilter = false;
    const filterDetails: string[] = [];

    const selects = document.querySelectorAll('select');
    for (let i = 0; i < selects.length; i++) {
      const select = selects[i] as HTMLSelectElement;
      const options = Array.from(select.options).map((o: HTMLOptionElement) => o.text.toLowerCase());
      const allText = options.join(' ');
      const filterTerms = [
        'apartamento', 'casa', 'terreno', 'comercial', 'kitnet',
        'cobertura', 'sala', 'galpão', 'galp', 'sobrado', 'chácara',
        'sítio', 'fazenda', 'flat', 'loft', 'studio', 'lote',
        'comprar', 'alugar', 'venda', 'aluguel', 'temporada',
        'quartos', 'dormitórios', 'suítes', 'banheiros', 'vagas',
      ];

      if (filterTerms.some((term: string) => allText.includes(term))) {
        hasPropertyFilter = true;
        filterDetails.push('Select: ' + (select.name || select.id || 'unnamed'));
      }
    }

    const inputs = document.querySelectorAll('input[type="text"], input[type="search"], input[type="number"]');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
      const inputName = (input.getAttribute('name') || '').toLowerCase();
      const inputId = (input.getAttribute('id') || '').toLowerCase();
      const combined = placeholder + ' ' + inputName + ' ' + inputId;

      const filterTerms = [
        'cidade', 'bairro', 'localização', 'localizacao', 'região',
        'regiao', 'tipo', 'imóvel', 'imovel', 'quartos', 'preço',
        'preco', 'valor', 'área', 'area', 'buscar imóvel',
      ];

      if (filterTerms.some((term: string) => combined.includes(term))) {
        hasPropertyFilter = true;
        filterDetails.push('Input: ' + (placeholder || inputName || inputId));
      }
    }

    const rangeInputs = document.querySelectorAll('input[type="range"]');
    if (rangeInputs.length > 0) {
      let rangeNearProperty = false;
      for (let i = 0; i < rangeInputs.length; i++) {
        const r = rangeInputs[i];
        const parent = r.closest('div, section, form');
        const parentText = (parent?.textContent || '').toLowerCase();
        if (/preço|preco|valor|área|area|quartos/.test(parentText)) {
          rangeNearProperty = true;
          break;
        }
      }
      if (rangeNearProperty) {
        hasPropertyFilter = true;
        filterDetails.push('Range slider for property attributes');
      }
    }

    const forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      const formText = (form.textContent || '').toLowerCase();
      const formHtml = form.innerHTML.toLowerCase();
      const searchTerms = [
        'buscar imóv', 'buscar imov', 'pesquisar imóv', 'pesquisar imov',
        'encontrar imóv', 'encontrar imov', 'filtrar imóv', 'filtrar imov',
        'tipo de imóvel', 'tipo de imovel',
      ];

      if (searchTerms.some((term: string) => formText.includes(term) || formHtml.includes(term))) {
        hasPropertyFilter = true;
        filterDetails.push('Search form: ' + (form.action || form.id || 'unnamed'));
      }
    }

    // --- Detectar formulário de contato ---
    let hasContactForm = false;
    const formDetails: string[] = [];

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      const formText = (form.textContent || '').toLowerCase();
      const formHtml = form.innerHTML.toLowerCase();

      const hasNameField = formHtml.includes('name') || formHtml.includes('nome');
      const hasEmailField = formHtml.includes('email') || formHtml.includes('e-mail');
      const hasMessageField =
        formHtml.includes('textarea') ||
        formHtml.includes('mensagem') ||
        formHtml.includes('message');
      const hasPhoneField =
        formHtml.includes('telefone') ||
        formHtml.includes('phone') ||
        formHtml.includes('celular') ||
        formHtml.includes('whatsapp');
      const hasSubmitButton =
        formHtml.includes('submit') ||
        formHtml.includes('enviar') ||
        formHtml.includes('contato') ||
        formHtml.includes('contate');

      const contactFormTerms = [
        'contato', 'contate', 'fale conosco', 'entre em contato',
        'envie uma mensagem', 'formulário', 'atendimento',
      ];

      const isContactForm =
        contactFormTerms.some((term: string) => formText.includes(term)) ||
        (hasEmailField && hasMessageField) ||
        (hasNameField && hasEmailField && hasSubmitButton) ||
        (hasNameField && hasPhoneField && hasSubmitButton);

      if (isContactForm) {
        hasContactForm = true;
        formDetails.push('Contact form: ' + (form.action || form.id || 'unnamed'));
      }
    }

    const iframes = document.querySelectorAll('iframe');
    for (let i = 0; i < iframes.length; i++) {
      const iframe = iframes[i];
      const src = (iframe.getAttribute('src') || '').toLowerCase();
      if (src.includes('form') || src.includes('contato') || src.includes('contact')) {
        hasContactForm = true;
        formDetails.push('Contact form in iframe: ' + src);
      }
    }

    return {
      companyName,
      emails,
      phones,
      hasPropertyFilter,
      filterDetails,
      hasContactForm,
      formDetails,
    };
  });

  return rawData as PageData;
}

async function checkContactPage(page: Page, baseUrl: string): Promise<PageData | null> {
  const contactPaths = ['/contato', '/fale-conosco', '/contact', '/atendimento'];
  const baseUrlObj = new URL(baseUrl);

  for (const path of contactPaths) {
    try {
      const contactUrl = `${baseUrlObj.origin}${path}`;
      const response = await page.goto(contactUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });

      if (response && response.status() === 200) {
        await delay(1500);
        const data = await extractPageData(page);
        if (data.hasContactForm || data.emails.length > 0) {
          logger.debug(`Found contact info at ${contactUrl}`);
          return data;
        }
      }
    } catch {
      // Página não existe, continuar
    }
  }

  return null;
}

async function checkPropertyPages(
  page: Page,
  baseUrl: string
): Promise<{ hasPropertyFilter: boolean; filterDetails: string[] } | null> {
  const propertyPaths = [
    '/imoveis',
    '/busca',
    '/pesquisa',
    '/comprar',
    '/alugar',
    '/venda',
    '/aluguel',
    '/properties',
    '/listings',
  ];
  const baseUrlObj = new URL(baseUrl);

  for (const path of propertyPaths) {
    try {
      const propertyUrl = `${baseUrlObj.origin}${path}`;
      const response = await page.goto(propertyUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });

      if (response && response.status() === 200) {
        await delay(1500);
        const data = await extractPageData(page);
        if (data.hasPropertyFilter) {
          logger.debug(`Found property filter at ${propertyUrl}`);
          return {
            hasPropertyFilter: true,
            filterDetails: data.filterDetails,
          };
        }
      }
    } catch {
      // Página não existe, continuar
    }
  }

  return null;
}
