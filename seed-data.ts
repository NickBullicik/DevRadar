import db from './server/db/database';
import { detectTechnologies } from './server/scraper/techDetector';

interface SeedJob {
  title: string;
  company: string;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  description: string;
}

const seedJobs: SeedJob[] = [
  // Madrid — hub principal
  { title: 'Desarrollador Full Stack React + Node.js', company: 'Acme Tech', location: 'Madrid', salaryMin: 30000, salaryMax: 40000, description: 'Buscamos desarrollador fullstack con experiencia en React, Node.js, TypeScript y PostgreSQL. Trabajo con REST API, Docker y CI/CD. Metodología Agile/Scrum.' },
  { title: 'Backend Developer Java Spring Boot', company: 'FinTech Solutions', location: 'Madrid', salaryMin: 35000, salaryMax: 45000, description: 'Desarrollo de microservicios con Java, Spring Boot, PostgreSQL y Docker. Experiencia con Kubernetes y AWS. Equipo ágil con Scrum.' },
  { title: 'Frontend Developer Angular + TypeScript', company: 'Digital Wave', location: 'Madrid', salaryMin: 28000, salaryMax: 38000, description: 'Posición frontend con Angular, TypeScript, HTML, CSS y Tailwind CSS. Integración con REST API. Git obligatorio.' },
  { title: 'DevOps Engineer', company: 'CloudFirst', location: 'Madrid', salaryMin: 40000, salaryMax: 55000, description: 'Gestión de infraestructura con AWS, Docker, Kubernetes, Terraform. CI/CD con Jenkins. Experiencia con Linux y scripting en Python.' },
  { title: 'Desarrollador Python Django', company: 'DataCore', location: 'Madrid', salaryMin: 32000, salaryMax: 42000, description: 'Backend con Python, Django, PostgreSQL. REST API y despliegue en AWS. Conocimientos de Docker valorables.' },
  { title: 'Programador .NET C#', company: 'Enterprise Systems', location: 'Madrid', salaryMin: 30000, salaryMax: 40000, description: 'Desarrollo con C#, .NET, SQL Server y Azure. Arquitectura de microservicios. Metodología Scrum.' },
  { title: 'Mobile Developer Flutter', company: 'AppFactory', location: 'Madrid', salaryMin: 28000, salaryMax: 36000, description: 'Desarrollo de apps móviles con Flutter y Dart. Experiencia con Android e iOS. Firebase y REST API.' },
  { title: 'Full Stack JavaScript Developer', company: 'StartupHub', location: 'Madrid', salaryMin: 25000, salaryMax: 33000, description: 'React, Node.js, Express, MongoDB. Desarrollo ágil, Git, despliegue en cloud. Junior-mid level.' },

  // Barcelona
  { title: 'Senior React Developer', company: 'TechBCN', location: 'Barcelona', salaryMin: 38000, salaryMax: 50000, description: 'Frontend avanzado con React, TypeScript, Next.js, Tailwind CSS. GraphQL y testing. Docker para desarrollo.' },
  { title: 'Backend Python FastAPI', company: 'AI Solutions', location: 'Barcelona', salaryMin: 35000, salaryMax: 45000, description: 'Python, FastAPI, PostgreSQL, Redis, Docker. Machine learning integrations. AWS deployment.' },
  { title: 'Java Developer', company: 'Banking Corp', location: 'Barcelona', salaryMin: 33000, salaryMax: 43000, description: 'Java, Spring, Oracle, microservicios. Sector bancario. SQL Server y CI/CD. Agile/Scrum.' },
  { title: 'Desarrollador Vue.js + Laravel', company: 'WebCraft', location: 'Barcelona', salaryMin: 27000, salaryMax: 35000, description: 'Frontend Vue.js con backend Laravel (PHP). MySQL, REST API, Git. Diseño responsive con Bootstrap.' },
  { title: 'DevOps / SRE Engineer', company: 'ScaleUp Tech', location: 'Barcelona', salaryMin: 42000, salaryMax: 52000, description: 'Kubernetes, Docker, AWS, Terraform, CI/CD. Monitorización y Linux. Python para automatización.' },
  { title: 'Full Stack TypeScript', company: 'InnovateBCN', location: 'Barcelona', salaryMin: 30000, salaryMax: 40000, description: 'TypeScript fullstack: React + Node.js + Express + PostgreSQL. Docker, Git, Agile.' },

  // Valencia
  { title: 'Programador Web PHP Laravel', company: 'Valencia Digital', location: 'Valencia', salaryMin: 22000, salaryMax: 30000, description: 'Desarrollo web con PHP, Laravel, MySQL, JavaScript, HTML, CSS. Git y metodología Agile.' },
  { title: 'Desarrollador Java Spring', company: 'SoftVLC', location: 'Valencia', salaryMin: 28000, salaryMax: 36000, description: 'Java, Spring Boot, PostgreSQL, Docker. REST API y microservicios. CI/CD básico.' },
  { title: 'Frontend React Junior', company: 'CreativeApps', location: 'Valencia', salaryMin: 20000, salaryMax: 26000, description: 'React, JavaScript, TypeScript, HTML, CSS, Tailwind CSS. Primera experiencia profesional valorable. Git.' },
  { title: 'Full Stack Node.js + Angular', company: 'TechValencia', location: 'Valencia', salaryMin: 26000, salaryMax: 34000, description: 'Node.js, Express, Angular, TypeScript, MongoDB. Docker y despliegue en Google Cloud.' },
  { title: 'Desarrollador Python', company: 'DataVLC', location: 'Valencia', salaryMin: 25000, salaryMax: 33000, description: 'Python, Django, Flask, PostgreSQL. REST API. Conocimientos de Docker y Linux.' },

  // Sevilla
  { title: 'Programador Java Junior', company: 'AndalucíaTech', location: 'Sevilla', salaryMin: 20000, salaryMax: 26000, description: 'Java, Spring, MySQL. Formación continua. Scrum. Git. Ganas de aprender.' },
  { title: 'Desarrollador Web Full Stack', company: 'SevillaSoft', location: 'Sevilla', salaryMin: 24000, salaryMax: 32000, description: 'JavaScript, React, Node.js, Express, PostgreSQL. Tailwind CSS. Docker valorable.' },
  { title: 'Backend .NET Developer', company: 'CorpTech', location: 'Sevilla', salaryMin: 26000, salaryMax: 34000, description: 'C#, .NET, SQL Server, Azure. Microservicios y REST API. Agile.' },

  // Bilbao
  { title: 'Desarrollador C# .NET', company: 'BasqueTech', location: 'Bilbao', salaryMin: 30000, salaryMax: 38000, description: 'C#, .NET, Azure, SQL Server. Docker y Kubernetes. CI/CD.' },
  { title: 'Full Stack Developer', company: 'BilbaoWeb', location: 'Bilbao', salaryMin: 28000, salaryMax: 36000, description: 'React, TypeScript, Node.js, PostgreSQL. Docker, Git, Scrum.' },
  { title: 'Backend Java + Kotlin', company: 'IndustrySoft', location: 'Bilbao', salaryMin: 32000, salaryMax: 42000, description: 'Java, Kotlin, Spring Boot, PostgreSQL, Docker. Microservicios en AWS. CI/CD y Linux.' },

  // Málaga
  { title: 'Frontend Developer React', company: 'SunTech', location: 'Málaga', salaryMin: 25000, salaryMax: 33000, description: 'React, TypeScript, Tailwind CSS, HTML, CSS. REST API. Git y Agile.' },
  { title: 'Programador Python Django', company: 'MálagaDev', location: 'Málaga', salaryMin: 24000, salaryMax: 30000, description: 'Python, Django, PostgreSQL, Docker. Linux y REST API.' },
  { title: 'Desarrollador PHP + JavaScript', company: 'CostaDigital', location: 'Málaga', salaryMin: 22000, salaryMax: 28000, description: 'PHP, Laravel, JavaScript, MySQL, HTML, CSS, Bootstrap. Git.' },

  // Alicante
  { title: 'Desarrollador Web React + Node', company: 'AlicanTech', location: 'Alicante', salaryMin: 23000, salaryMax: 30000, description: 'React, Node.js, Express, MongoDB. JavaScript, TypeScript, Tailwind CSS. Git.' },
  { title: 'Programador Java', company: 'MediterráneoSoft', location: 'Alicante', salaryMin: 24000, salaryMax: 32000, description: 'Java, Spring Boot, MySQL, Docker. REST API y Agile/Scrum.' },

  // Remoto
  { title: 'Senior TypeScript Full Stack', company: 'RemoteFirst', location: 'Remoto', salaryMin: 40000, salaryMax: 55000, description: 'TypeScript, React, Next.js, Node.js, PostgreSQL, Docker, AWS. GraphQL. Kubernetes. CI/CD. 100% remoto.' },
  { title: 'Backend Go Developer', company: 'CloudNative', location: 'Remoto', salaryMin: 42000, salaryMax: 55000, description: 'Go, PostgreSQL, Docker, Kubernetes, AWS, Terraform. Microservicios. CI/CD. Linux.' },
  { title: 'Desarrollador React Native', company: 'MobileFirst', location: 'Remoto', salaryMin: 30000, salaryMax: 40000, description: 'React Native, TypeScript, JavaScript. Android e iOS. REST API. Git.' },
  { title: 'Python Data Engineer', company: 'DataRemote', location: 'Remoto', salaryMin: 35000, salaryMax: 48000, description: 'Python, PostgreSQL, AWS, Docker. Elasticsearch, Redis. CI/CD y Linux.' },
  { title: 'Full Stack Ruby on Rails', company: 'StartRemote', location: 'Remoto', salaryMin: 32000, salaryMax: 42000, description: 'Ruby, Ruby on Rails, PostgreSQL, Redis, Docker. HTML, CSS, JavaScript. Heroku/AWS.' },
  { title: 'Frontend Vue.js Developer', company: 'DesignTech', location: 'Remoto', salaryMin: 28000, salaryMax: 36000, description: 'Vue.js, TypeScript, Tailwind CSS, HTML, CSS. REST API. Git y Scrum.' },
  { title: 'Desarrollador Kotlin Android', company: 'AppRemote', location: 'Remoto', salaryMin: 30000, salaryMax: 38000, description: 'Kotlin, Android, Firebase, REST API. Git. Diseño Material Design.' },
  { title: 'Desarrollador Svelte + Node.js', company: 'ModernWeb', location: 'Remoto', salaryMin: 28000, salaryMax: 37000, description: 'Svelte, SvelteKit, TypeScript, Node.js, PostgreSQL. Tailwind CSS. Docker.' },
  { title: 'Ingeniero DevOps AWS', company: 'InfraRemote', location: 'Remoto', salaryMin: 38000, salaryMax: 50000, description: 'AWS, Docker, Kubernetes, Terraform, Jenkins, CI/CD. Python, Linux. Monitorización.' },
  { title: 'Desarrollador Rust Backend', company: 'PerformanceTech', location: 'Remoto', salaryMin: 45000, salaryMax: 55000, description: 'Rust, PostgreSQL, Docker, Linux. Microservicios de alto rendimiento. CI/CD.' },

  // Más variedad en ciudades principales
  { title: 'Analista Programador Java', company: 'ConsultingPro', location: 'Madrid', salaryMin: 28000, salaryMax: 35000, description: 'Java, Spring, Oracle, SQL. Microservicios. Sector seguros. Scrum.' },
  { title: 'Desarrollador iOS Swift', company: 'AppleDev Madrid', location: 'Madrid', salaryMin: 32000, salaryMax: 42000, description: 'Swift, iOS, Xcode. REST API. Git. Diseño UI/UX. Agile.' },
  { title: 'Full Stack PHP + React', company: 'MediaTech', location: 'Barcelona', salaryMin: 26000, salaryMax: 34000, description: 'PHP, Laravel, React, MySQL, JavaScript, TypeScript. Docker. Git.' },
  { title: 'Desarrollador Angular + Java', company: 'BancaSoft', location: 'Madrid', salaryMin: 30000, salaryMax: 40000, description: 'Angular, TypeScript, Java, Spring Boot, Oracle. Microservicios. Docker. Scrum.' },
  { title: 'Programador Scala', company: 'BigDataBCN', location: 'Barcelona', salaryMin: 38000, salaryMax: 50000, description: 'Scala, Java, PostgreSQL, Docker, Kubernetes, AWS. Procesamiento de datos. CI/CD.' },
  { title: 'Desarrollador NestJS + React', company: 'ModernStack', location: 'Remoto', salaryMin: 32000, salaryMax: 42000, description: 'NestJS, TypeScript, React, PostgreSQL, Docker. GraphQL. Git y CI/CD. Scrum.' },
];

// Insertar datos seed
const existingJobs = (db.prepare('SELECT COUNT(*) as count FROM jobs').get() as { count: number }).count;

if (existingJobs === 0) {
  console.log('Insertando datos de ejemplo...');

  const insertJob = db.prepare(`
    INSERT INTO jobs (title, company, location, salary_min, salary_max, description, source_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertJobTech = db.prepare(`
    INSERT OR IGNORE INTO job_technologies (job_id, tech_id) VALUES (?, ?)
  `);

  const insertAll = db.transaction(() => {
    for (const job of seedJobs) {
      const result = insertJob.run(
        job.title, job.company, job.location,
        job.salaryMin, job.salaryMax, job.description,
        `https://example.com/job/${Math.random().toString(36).slice(2, 8)}`
      );

      const techIds = detectTechnologies(`${job.title} ${job.description}`);
      for (const techId of techIds) {
        insertJobTech.run(result.lastInsertRowid, techId);
      }
    }
  });

  insertAll();

  // Registrar un log de "scrape" para que el dashboard tenga datos
  db.prepare(
    'INSERT INTO scrape_logs (jobs_found, status) VALUES (?, ?)'
  ).run(seedJobs.length, 'ok (datos de ejemplo)');

  console.log(`✓ ${seedJobs.length} ofertas insertadas con tecnologías detectadas.`);
} else {
  console.log(`Base de datos ya tiene ${existingJobs} ofertas. Saltando seed.`);
}
