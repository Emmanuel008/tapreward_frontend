import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './DashboardLayout.css';

function DashboardLayout({ session, onLogout }) {
  return (
    <div className="dashboard">
      <Sidebar session={session} onLogout={onLogout} />
      <main className="dashboard__content">
        <Outlet context={{ session }} />
      </main>
    </div>
  );
}

export default DashboardLayout;
