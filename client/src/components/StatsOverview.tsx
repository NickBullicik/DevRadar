interface Props {
  totalJobs: number;
  avgSalary: number | null;
  topTech: string;
  topLocation: string;
}

export default function StatsOverview({ totalJobs, avgSalary, topTech, topLocation }: Props) {
  const cards = [
    { label: 'Total ofertas', value: totalJobs.toLocaleString('es'), color: 'text-primary' },
    { label: 'Salario medio', value: avgSalary ? `${(avgSalary / 1000).toFixed(0)}K €` : 'N/A', color: 'text-accent' },
    { label: 'Tech más demandada', value: topTech, color: 'text-amber-400' },
    { label: 'Provincia líder', value: topLocation, color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <div key={card.label} className="p-4 bg-surface-light border border-border rounded-lg">
          <p className="text-text-secondary text-sm">{card.label}</p>
          <p className={`text-xl font-bold mt-1 ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
