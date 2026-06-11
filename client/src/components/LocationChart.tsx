import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Job {
  location: string;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-surface-light border border-border rounded-lg px-3 py-2 text-sm">
      <p className="text-text font-medium">{d.location}</p>
      <p className="text-primary">{d.count} ofertas</p>
    </div>
  );
}

export default function LocationChart({ jobs }: { jobs: Job[] }) {
  const countMap: Record<string, number> = {};
  for (const j of jobs) {
    countMap[j.location] = (countMap[j.location] || 0) + 1;
  }

  const data = Object.entries(countMap)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="bg-surface-light border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Ofertas por provincia</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 70, right: 20, top: 5, bottom: 5 }}>
          <XAxis type="number" stroke="#94A3B8" fontSize={12} />
          <YAxis dataKey="location" type="category" stroke="#94A3B8" fontSize={12} width={65} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={`hsl(${210 + i * 15}, 70%, ${55 - i * 2}%)`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
