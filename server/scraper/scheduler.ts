import db from '../db/database';
import { scrapeInfoJobs } from './sources/infojobs';
import { detectTechnologies } from './techDetector';

export async function runScrape(): Promise<{ jobsFound: number; status: string }> {
  try {
    const jobs = await scrapeInfoJobs();

    const insertJob = db.prepare(`
      INSERT INTO jobs (title, company, location, salary_min, salary_max, description, source_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertJobTech = db.prepare(`
      INSERT OR IGNORE INTO job_technologies (job_id, tech_id) VALUES (?, ?)
    `);

    const insertMany = db.transaction(() => {
      for (const job of jobs) {
        const result = insertJob.run(
          job.title, job.company, job.location,
          job.salaryMin, job.salaryMax, job.description, job.sourceUrl
        );

        const techIds = detectTechnologies(`${job.title} ${job.description}`);
        for (const techId of techIds) {
          insertJobTech.run(result.lastInsertRowid, techId);
        }
      }
    });

    insertMany();

    db.prepare(
      'INSERT INTO scrape_logs (jobs_found, status) VALUES (?, ?)'
    ).run(jobs.length, 'ok');

    return { jobsFound: jobs.length, status: 'ok' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    db.prepare(
      'INSERT INTO scrape_logs (jobs_found, status) VALUES (?, ?)'
    ).run(0, `error: ${message}`);

    return { jobsFound: 0, status: `error: ${message}` };
  }
}
