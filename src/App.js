import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import DashboardPage from './components/Dashboard/DashboardPage';
import PurchasersPage from './components/Purchasers/PurchasersPage';
import BulkSmsPage from './components/BulkSms/BulkSmsPage';
import LoginPage from './components/Login/LoginPage';
import { clearSession, getSession, saveSession } from './utils/session';
import { showConfirm, showSuccess } from './utils/sweetAlert';
import './App.css';

function AppRoutes() {
  const [session, setSession] = useState(() => getSession());
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = await showConfirm({
      title: 'Log out?',
      text: 'Are you sure you want to sign out?',
      confirmText: 'Log out',
    });

    if (!confirmed) return;

    clearSession();
    setSession(null);
    setSearchQuery('');
    navigate('/');
    showSuccess('Signed out', 'You have been logged out successfully.');
  };

  const handleLogin = (user) => {
    setSession(saveSession(user));
    navigate('/dashboard');
    showSuccess('Welcome back!', `Signed in as ${user.name || user.email}.`);
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage onLoginSuccess={handleLogin} />} />
      <Route
        element={
          session ? (
            <DashboardLayout session={session} onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          }
        />
        <Route
          path="/purchase"
          element={
            <PurchasersPage
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          }
        />
        <Route path="/sms" element={<BulkSmsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
export { AppRoutes };
