interface Props {
  techs: { name: string }[];
  locations: string[];
  filters: { tech: string; location: string; salaryMin: string };
  onFilterChange: (key: string, value: string) => void;
  onScrape: () => void;
}

export default function FilterBar({ techs, locations, filters, onFilterChange, onScrape }: Props) {
  return (
    <div className="flex flex-wrap gap-3 items-end p-4 bg-surface-light border border-border rounded-lg">
      <div className="flex-1 min-w-[150px]">
        <label className="block text-xs text-text-secondary mb-1">Tecnología</label>
        <select
          value={filters.tech}
          onChange={e => onFilterChange('tech', e.target.value)}
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text text-sm focus:outline-none focus:border-primary"
        >
          <option value="">Todas</option>
          {techs.map(t => (
            <option key={t.name} value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <label className="block text-xs text-text-secondary mb-1">Provincia</label>
        <select
          value={filters.location}
          onChange={e => onFilterChange('location', e.target.value)}
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text text-sm focus:outline-none focus:border-primary"
        >
          <option value="">Todas</option>
          {locations.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[120px]">
        <label className="block text-xs text-text-secondary mb-1">Salario mínimo</label>
        <input
          type="number"
          value={filters.salaryMin}
          onChange={e => onFilterChange('salaryMin', e.target.value)}
          placeholder="Ej: 25000"
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-primary"
        />
      </div>

      <button
        onClick={onScrape}
        className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg text-sm hover:bg-primary/30 transition-colors"
      >
        Actualizar datos
      </button>
    </div>
  );
}
