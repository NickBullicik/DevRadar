import { normalizeLocation, parseSalary, normalizeCompany } from '../utils/normalizer';

export interface ParsedJob {
  title: string;
  company: string;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  description: string;
  sourceUrl: string;
}

export function parseJob(raw: {
  title: string;
  company: string;
  location: string;
  salaryText: string;
  description: string;
  sourceUrl: string;
}): ParsedJob {
  const { min, max } = parseSalary(raw.salaryText || raw.description || '');

  return {
    title: raw.title.trim(),
    company: normalizeCompany(raw.company),
    location: normalizeLocation(raw.location),
    salaryMin: min,
    salaryMax: max,
    description: raw.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
    sourceUrl: raw.sourceUrl,
  };
}
