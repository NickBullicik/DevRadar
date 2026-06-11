import { useDashboardData } from '../hooks/useDashboardData';
import StatsOverview from '../components/StatsOverview';
import TechRanking from '../components/TechRanking';
import SalaryDistribution from '../components/SalaryDistribution';
import LocationChart from '../components/LocationChart';
import FilterBar from '../components/FilterBar';
import JobsTable from '../components/JobsTable';

export default function Dashboard() {
  const { stats, techs, jobsData, loading, filters, updateFilter, triggerScrape } = useDashboardData();

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary text-lg">Cargando datos...</div>
      </div>
    );
  }

  const allJobs = jobsData?.jobs || [];
  const locations = [...new Set(allJobs.map(j => j.location))].sort();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Dev<span className="text-primary">Radar</span>
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Dashboard de tendencias del mercado tech español
          </p>
        </div>
        {stats?.recentScrape && (
          <span className="text-xs text-text-secondary">
            Última actualización: {new Date(stats.recentScrape.timestamp).toLocaleDateString('es')}
          </span>
        )}
      </div>

      {stats && (
        <StatsOverview
          totalJobs={stats.totalJobs}
          avgSalary={stats.avgSalary}
          topTech={stats.topTech}
          topLocation={stats.topLocation}
        />
      )}

      <div className="mt-6">
        <FilterBar
          techs={techs}
          locations={locations}
          filters={filters}
          onFilterChange={(key, value) => updateFilter(key as any, value)}
          onScrape={triggerScrape}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TechRanking data={techs} />
        </div>
        <div>
          <SalaryDistribution jobs={allJobs} />
        </div>
      </div>

      <div className="mt-6">
        <LocationChart jobs={allJobs} />
      </div>

      <div className="mt-6">
        <JobsTable
          jobs={allJobs}
          page={jobsData?.page || 1}
          totalPages={jobsData?.totalPages || 1}
          onPageChange={(p) => updateFilter('page', p)}
        />
      </div>
    </div>
  );
}
