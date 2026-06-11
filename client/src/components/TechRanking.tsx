import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Tech {
  name: string;
  count: number;
  percentage: number;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-surface-light border border-border rounded-lg px-3 py-2 text-sm">
      <p className="text-text font-medium">{d.name}</p>
      <p className="text-primary">{d.count} ofertas ({d.percentage}%)</p>
    </div>
  );
}

export default function TechRanking({ data }: { data: Tech[] }) {
  return (
    <div className="bg-surface-light border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Top tecnologías</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
          <XAxis type="number" stroke="#94A3B8" fontSize={12} />
          <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={12} width={75} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={`hsl(${160 - i * 6}, 70%, ${50 - i}%)`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
