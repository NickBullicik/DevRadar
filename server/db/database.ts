import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, 'devradar.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema);

// Insertar tecnologías base si la tabla está vacía
const techCount = db.prepare('SELECT COUNT(*) as count FROM technologies').get() as { count: number };

if (techCount.count === 0) {
  const techs: [string, string][] = [
    // Lenguajes
    ['JavaScript', 'Lenguaje'], ['TypeScript', 'Lenguaje'], ['Python', 'Lenguaje'],
    ['Java', 'Lenguaje'], ['C#', 'Lenguaje'], ['PHP', 'Lenguaje'],
    ['Go', 'Lenguaje'], ['Rust', 'Lenguaje'], ['Kotlin', 'Lenguaje'],
    ['Swift', 'Lenguaje'], ['Ruby', 'Lenguaje'], ['Scala', 'Lenguaje'],
    ['C++', 'Lenguaje'], ['Dart', 'Lenguaje'],
    // Frontend
    ['React', 'Frontend'], ['Angular', 'Frontend'], ['Vue.js', 'Frontend'],
    ['Next.js', 'Frontend'], ['Svelte', 'Frontend'], ['Tailwind CSS', 'Frontend'],
    ['HTML', 'Frontend'], ['CSS', 'Frontend'], ['Bootstrap', 'Frontend'],
    // Backend
    ['Node.js', 'Backend'], ['Spring', 'Backend'], ['Django', 'Backend'],
    ['Flask', 'Backend'], ['Express', 'Backend'], ['.NET', 'Backend'],
    ['Laravel', 'Backend'], ['FastAPI', 'Backend'], ['NestJS', 'Backend'],
    // Bases de datos
    ['PostgreSQL', 'Base de datos'], ['MySQL', 'Base de datos'], ['MongoDB', 'Base de datos'],
    ['Redis', 'Base de datos'], ['SQLite', 'Base de datos'], ['Oracle', 'Base de datos'],
    ['SQL Server', 'Base de datos'], ['Elasticsearch', 'Base de datos'],
    // DevOps / Cloud
    ['Docker', 'DevOps'], ['Kubernetes', 'DevOps'], ['AWS', 'Cloud'],
    ['Azure', 'Cloud'], ['Google Cloud', 'Cloud'], ['CI/CD', 'DevOps'],
    ['Jenkins', 'DevOps'], ['Terraform', 'DevOps'], ['Linux', 'DevOps'],
    // Mobile
    ['Flutter', 'Mobile'], ['React Native', 'Mobile'], ['Android', 'Mobile'],
    ['iOS', 'Mobile'],
    // Otros
    ['Git', 'Herramienta'], ['GraphQL', 'API'], ['REST API', 'API'],
    ['Microservicios', 'Arquitectura'], ['Agile', 'Metodología'], ['Scrum', 'Metodología'],
  ];

  const insert = db.prepare('INSERT INTO technologies (name, category) VALUES (?, ?)');
  const insertMany = db.transaction((items: [string, string][]) => {
    for (const [name, category] of items) {
      insert.run(name, category);
    }
  });
  insertMany(techs);
}

export default db;
