import { useState, useEffect, useCallback } from 'react';

interface DashboardStats {
  totalJobs: number;
  avgSalary: number | null;
  topTech: string;
  topLocation: string;
  recentScrape: { timestamp: string; jobs_found: number; status: string } | null;
}

interface TechItem {
  name: string;
  category: string;
  count: number;
  percentage: number;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  source_url: string;
  technologies: string[];
}

interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
}

interface Filters {
  tech: string;
  location: string;
  salaryMin: string;
  page: number;
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [techs, setTechs] = useState<TechItem[]>([]);
  const [jobsData, setJobsData] = useState<JobsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({ tech: '', location: '', salaryMin: '', page: 1 });

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.tech) params.set('tech', filters.tech);
      if (filters.location) params.set('location', filters.location);
      if (filters.salaryMin) params.set('salaryMin', filters.salaryMin);
      params.set('page', String(filters.page));

      const [statsRes, techsRes, jobsRes] = await Promise.all([
        fetch('/api/dashboard').then(r => r.json()),
        fetch('/api/technologies?limit=20').then(r => r.json()),
        fetch(`/api/jobs?${params}`).then(r => r.json()),
      ]);

      setStats(statsRes);
      setTechs(techsRes);
      setJobsData(jobsRes);
    } catch (err) {
      console.error('Error cargando datos:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const updateFilter = (key: keyof Filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value, ...(key !== 'page' ? { page: 1 } : {}) }));
  };

  const triggerScrape = async () => {
    await fetch('/api/scrape', { method: 'POST' });
    await fetchAll();
  };

  return { stats, techs, jobsData, loading, filters, updateFilter, triggerScrape, refetch: fetchAll };
}
