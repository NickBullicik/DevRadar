import { Router, Request, Response } from 'express';
import { runScrape } from '../scraper/scheduler';

const router = Router();

router.post('/', async (_req: Request, res: Response) => {
  const result = await runScrape();
  res.json(result);
});

export default router;
