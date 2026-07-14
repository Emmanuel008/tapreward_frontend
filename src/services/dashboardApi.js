const DASHBOARD_STATS_URL = `${process.env.REACT_APP_API_URL || ''}/api/dashboard/stats`;

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.error || 'Request failed.');
  }

  return data;
}

export async function fetchDashboardStats() {
  const data = await parseResponse(await fetch(DASHBOARD_STATS_URL));
  return data.stats ?? {
    customers: 0,
    redeemedCards: 0,
    totalPurchases: 0,
    untappedScores: 0,
  };
}

export function getDashboardApiErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Could not load dashboard stats.';
}
