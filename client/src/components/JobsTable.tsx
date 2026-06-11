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

interface Props {
  jobs: Job[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const tagColors = [
  'bg-blue-500/20 text-blue-300', 'bg-green-500/20 text-green-300',
  'bg-purple-500/20 text-purple-300', 'bg-amber-500/20 text-amber-300',
  'bg-pink-500/20 text-pink-300', 'bg-cyan-500/20 text-cyan-300',
];

function formatSalary(min: number | null, max: number | null): string {
  if (!min && !max) return '—';
  if (min && max) return `${(min / 1000).toFixed(0)}K - ${(max / 1000).toFixed(0)}K €`;
  if (min) return `${(min / 1000).toFixed(0)}K+ €`;
  return `Hasta ${(max! / 1000).toFixed(0)}K €`;
}

export default function JobsTable({ jobs, page, totalPages, onPageChange }: Props) {
  return (
    <div className="bg-surface-light border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Ofertas de empleo</h3>

      {jobs.length === 0 ? (
        <p className="text-text-secondary text-center py-8">No se encontraron ofertas con esos filtros</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-text-secondary text-left border-b border-border">
                  <th className="pb-2 pr-4 font-medium">Puesto</th>
                  <th className="pb-2 pr-4 font-medium">Empresa</th>
                  <th className="pb-2 pr-4 font-medium">Ubicación</th>
                  <th className="pb-2 pr-4 font-medium">Salario</th>
                  <th className="pb-2 font-medium">Tecnologías</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id} className="border-b border-border/50 hover:bg-surface-lighter/30">
                    <td className="py-3 pr-4">
                      <span className="text-text font-medium">{job.title}</span>
                    </td>
                    <td className="py-3 pr-4 text-text-secondary">{job.company}</td>
                    <td className="py-3 pr-4 text-text-secondary">{job.location}</td>
                    <td className="py-3 pr-4 text-text-secondary whitespace-nowrap">
                      {formatSalary(job.salary_min, job.salary_max)}
                    </td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {job.technologies.slice(0, 4).map((tech, i) => (
                          <span
                            key={tech}
                            className={`text-xs px-2 py-0.5 rounded-full font-mono ${tagColors[i % tagColors.length]}`}
                          >
                            {tech}
                          </span>
                        ))}
                        {job.technologies.length > 4 && (
                          <span className="text-xs text-text-secondary">+{job.technologies.length - 4}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="px-3 py-1 text-sm bg-surface border border-border rounded disabled:opacity-30 hover:border-primary transition-colors"
              >
                ← Anterior
              </button>
              <span className="px-3 py-1 text-sm text-text-secondary">
                Página {page} de {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="px-3 py-1 text-sm bg-surface border border-border rounded disabled:opacity-30 hover:border-primary transition-colors"
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
