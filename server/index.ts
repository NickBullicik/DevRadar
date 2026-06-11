import express from 'express';
import cors from 'cors';
import path from 'path';

import './db/database';

import dashboardRoutes from './routes/dashboard';
import technologiesRoutes from './routes/technologies';
import jobsRoutes from './routes/jobs';
import scraperRoutes from './routes/scraper';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/technologies', technologiesRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/scrape', scraperRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Servidor DevRadar en http://localhost:${PORT}`);
});
