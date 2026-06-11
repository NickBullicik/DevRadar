import db from '../db/database';

interface TechRow {
  id: number;
  name: string;
  category: string;
}

// Diccionario de variantes para detectar tecnologías
const variants: Record<string, string[]> = {
  'JavaScript': ['javascript', 'js', 'ecmascript'],
  'TypeScript': ['typescript', 'ts'],
  'Python': ['python'],
  'Java': ['java'],
  'C#': ['c#', 'csharp', 'c sharp', '.net c#'],
  'PHP': ['php'],
  'Go': ['golang', 'go lang'],
  'Rust': ['rust', 'rustlang'],
  'Kotlin': ['kotlin'],
  'Swift': ['swift'],
  'Ruby': ['ruby'],
  'Scala': ['scala'],
  'C++': ['c++', 'cpp'],
  'Dart': ['dart'],
  'React': ['react', 'reactjs', 'react.js'],
  'Angular': ['angular', 'angularjs'],
  'Vue.js': ['vue', 'vuejs', 'vue.js'],
  'Next.js': ['next.js', 'nextjs', 'next js'],
  'Svelte': ['svelte', 'sveltekit'],
  'Tailwind CSS': ['tailwind', 'tailwindcss'],
  'HTML': ['html', 'html5'],
  'CSS': ['css', 'css3'],
  'Bootstrap': ['bootstrap'],
  'Node.js': ['node', 'nodejs', 'node.js'],
  'Spring': ['spring', 'spring boot', 'springboot'],
  'Django': ['django'],
  'Flask': ['flask'],
  'Express': ['express', 'expressjs'],
  '.NET': ['.net', 'dotnet', 'asp.net'],
  'Laravel': ['laravel'],
  'FastAPI': ['fastapi'],
  'NestJS': ['nestjs', 'nest.js'],
  'PostgreSQL': ['postgresql', 'postgres', 'psql'],
  'MySQL': ['mysql'],
  'MongoDB': ['mongodb', 'mongo'],
  'Redis': ['redis'],
  'SQLite': ['sqlite'],
  'Oracle': ['oracle'],
  'SQL Server': ['sql server', 'mssql', 'sqlserver'],
  'Elasticsearch': ['elasticsearch', 'elastic'],
  'Docker': ['docker'],
  'Kubernetes': ['kubernetes', 'k8s'],
  'AWS': ['aws', 'amazon web services'],
  'Azure': ['azure', 'microsoft azure'],
  'Google Cloud': ['gcp', 'google cloud'],
  'CI/CD': ['ci/cd', 'cicd', 'integración continua'],
  'Jenkins': ['jenkins'],
  'Terraform': ['terraform'],
  'Linux': ['linux', 'ubuntu', 'debian'],
  'Flutter': ['flutter'],
  'React Native': ['react native'],
  'Android': ['android'],
  'iOS': ['ios', 'iphone'],
  'Git': ['git', 'github', 'gitlab'],
  'GraphQL': ['graphql'],
  'REST API': ['rest api', 'restful', 'api rest'],
  'Microservicios': ['microservicio', 'microservicios', 'microservice'],
  'Agile': ['agile', 'ágil'],
  'Scrum': ['scrum'],
};

const allTechs = db.prepare('SELECT * FROM technologies').all() as TechRow[];
const techMap = new Map<string, number>();
for (const tech of allTechs) {
  techMap.set(tech.name, tech.id);
}

export function detectTechnologies(text: string): number[] {
  const lower = text.toLowerCase();
  const detected = new Set<number>();

  for (const [techName, keywords] of Object.entries(variants)) {
    const techId = techMap.get(techName);
    if (!techId) continue;

    for (const keyword of keywords) {
      // Buscar como palabra completa para evitar falsos positivos
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(lower)) {
        detected.add(techId);
        break;
      }
    }
  }

  return Array.from(detected);
}
