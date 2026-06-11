import { Router, Request, Response } from 'express';
import db from '../db/database';

const router = Router();

interface JobRow {
  id: number;
  title: string;
  company: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  description: string;
  source_url: string;
  scraped_at: string;
}

router.get('/', (req: Request, res: Response) => {
  const tech = req.query.tech as string | undefined;
  const location = req.query.location as string | undefined;
  const salaryMin = parseInt(req.query.salaryMin as string) || 0;
  const page = parseInt(req.query.page as string) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  let whereClause = 'WHERE 1=1';
  const params: (string | number)[] = [];

  if (tech) {
    whereClause += ` AND j.id IN (
      SELECT jt.job_id FROM job_technologies jt
      JOIN technologies t ON t.id = jt.tech_id
      WHERE t.name = ?
    )`;
    params.push(tech);
  }

  if (location) {
    whereClause += ' AND j.location = ?';
    params.push(location);
  }

  if (salaryMin > 0) {
    whereClause += ' AND (j.salary_min >= ? OR j.salary_max >= ?)';
    params.push(salaryMin, salaryMin);
  }

  const countRow = db.prepare(
    `SELECT COUNT(*) as count FROM jobs j ${whereClause}`
  ).get(...params) as { count: number };

  const jobs = db.prepare(`
    SELECT j.* FROM jobs j
    ${whereClause}
    ORDER BY j.scraped_at DESC
    LIMIT ? OFFSET ?
  `).all(...params, limit, offset) as JobRow[];

  // Adjuntar tecnologías a cada oferta
  const getTechs = db.prepare(`
    SELECT t.name FROM job_technologies jt
    JOIN technologies t ON t.id = jt.tech_id
    WHERE jt.job_id = ?
  `);

  const jobsWithTechs = jobs.map(job => ({
    ...job,
    technologies: (getTechs.all(job.id) as { name: string }[]).map(t => t.name),
  }));

  res.json({
    jobs: jobsWithTechs,
    total: countRow.count,
    page,
    totalPages: Math.ceil(countRow.count / limit),
  });
});

export default router;
