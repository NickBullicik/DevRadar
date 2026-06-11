import { ParsedJob } from '../parser';

// Nota: En producción se usaría Cheerio para scrapear InfoJobs.
// Para la demo, los datos se cargan desde seed-data.
// Esta estructura está preparada para conectar scraping real.

export async function scrapeInfoJobs(): Promise<ParsedJob[]> {
  // Scraping real deshabilitado para la demo — usar datos seed
  console.log('[InfoJobs] Scraper preparado. Usando datos seed para la demo.');
  return [];
}
