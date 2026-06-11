import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Job {
  salary_min: number | null;
  salary_max: number | null;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-surface-light border border-border rounded-lg px-3 py-2 text-sm">
      <p className="text-text font-medium">{d.range}</p>
      <p className="text-accent">{d.count} ofertas</p>
    </div>
  );
}

const colors = ['#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF'];

export default function SalaryDistribution({ jobs }: { jobs: Job[] }) {
  const ranges = [
    { range: '< 20K', min: 0, max: 20000 },
    { range: '20-30K', min: 20000, max: 30000 },
    { range: '30-40K', min: 30000, max: 40000 },
    { range: '40-50K', min: 40000, max: 50000 },
    { range: '> 50K', min: 50000, max: Infinity },
  ];

  const data = ranges.map(r => ({
    range: r.range,
    count: jobs.filter(j => {
      const salary = j.salary_min || j.salary_max;
      if (!salary) return false;
      return salary >= r.min && salary < r.max;
    }).length,
  }));

  return (
    <div className="bg-surface-light border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Distribución salarial</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <XAxis dataKey="range" stroke="#94A3B8" fontSize={12} />
          <YAxis stroke="#94A3B8" fontSize={12} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
