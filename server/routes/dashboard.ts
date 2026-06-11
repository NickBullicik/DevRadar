import { Router, Request, Response } from 'express';
import db from '../db/database';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const totalJobs = (db.prepare('SELECT COUNT(*) as count FROM jobs').get() as { count: number }).count;

  const avgSalaryRow = db.prepare(`
    SELECT AVG((COALESCE(salary_min, 0) + COALESCE(salary_max, 0)) / 2.0) as avg
    FROM jobs WHERE salary_min IS NOT NULL OR salary_max IS NOT NULL
  `).get() as { avg: number | null };
  const avgSalary = avgSalaryRow?.avg ? Math.round(avgSalaryRow.avg) : null;

  const topTechRow = db.prepare(`
    SELECT t.name, COUNT(*) as count
    FROM job_technologies jt
    JOIN technologies t ON t.id = jt.tech_id
    GROUP BY t.id ORDER BY count DESC LIMIT 1
  `).get() as { name: string; count: number } | undefined;

  const topLocationRow = db.prepare(`
    SELECT location, COUNT(*) as count
    FROM jobs GROUP BY location ORDER BY count DESC LIMIT 1
  `).get() as { location: string; count: number } | undefined;

  const recentScrape = db.prepare(
    'SELECT * FROM scrape_logs ORDER BY timestamp DESC LIMIT 1'
  ).get();

  res.json({
    totalJobs,
    avgSalary,
    topTech: topTechRow?.name || 'N/A',
    topLocation: topLocationRow?.location || 'N/A',
    recentScrape,
  });
});

export default router;
