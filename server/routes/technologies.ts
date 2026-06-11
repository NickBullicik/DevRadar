import { Router, Request, Response } from 'express';
import db from '../db/database';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 20;

  const totalJobs = (db.prepare('SELECT COUNT(*) as count FROM jobs').get() as { count: number }).count;

  const techs = db.prepare(`
    SELECT t.name, t.category, COUNT(jt.job_id) as count
    FROM technologies t
    JOIN job_technologies jt ON jt.tech_id = t.id
    GROUP BY t.id
    ORDER BY count DESC
    LIMIT ?
  `).all(limit) as { name: string; category: string; count: number }[];

  const result = techs.map(t => ({
    name: t.name,
    category: t.category,
    count: t.count,
    percentage: totalJobs > 0 ? Math.round((t.count / totalJobs) * 100) : 0,
  }));

  res.json(result);
});

export default router;
