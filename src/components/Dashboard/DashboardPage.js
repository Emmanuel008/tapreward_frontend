import { useCallback, useEffect, useMemo, useState } from 'react';
import { dashboardStatConfig } from '../../data/navItems';
import {
  fetchDashboardStats,
  getDashboardApiErrorMessage,
} from '../../services/dashboardApi';
import { showError } from '../../utils/sweetAlert';
import PageHeader from '../PageHeader/PageHeader';
import StatCard from './StatCard';
import './DashboardPage.css';

function formatStatValue(value) {
  return Number(value ?? 0).toLocaleString();
}

function DashboardPage({ searchQuery, onSearchChange }) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (error) {
      setStats({
        customers: 0,
        redeemedCards: 0,
        totalPurchases: 0,
        untappedScores: 0,
      });
      showError('Could not load stats', getDashboardApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const statCards = useMemo(
    () =>
      dashboardStatConfig.map((stat) => ({
        ...stat,
        value: formatStatValue(stats?.[stat.key]),
      })),
    [stats]
  );

  return (
    <div className="dashboard-page">
      <PageHeader
        title="Dashboard"
        subtitle="Overview for customer"
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      {isLoading ? (
        <p className="dashboard-page__loading">Loading dashboard stats...</p>
      ) : (
        <div className="dashboard-page__stats">
          {statCards.map((stat, index) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              chartIndex={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
