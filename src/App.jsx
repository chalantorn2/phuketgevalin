import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import OneDayTrip from './pages/OneDayTrip';
import PackageTour from './pages/PackageTour';
import Transfer from './pages/Transfer';
import Hotel from './pages/Hotel';
import AdminApp from './pages/admin/AdminApp';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if we're on the admin page
    const path = window.location.pathname;
    setIsAdmin(path.startsWith('/admin'));

    // Listen for URL changes (for hash-based routing)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || hash.startsWith('#admin/')) {
        setIsAdmin(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash.startsWith('#admin')) {
      setIsAdmin(true);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Render Admin Panel
  if (isAdmin) {
    return <AdminApp />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'one-day-trip':
        return <OneDayTrip />;
      case 'package-tour':
        return <PackageTour />;
      case 'transfer':
        return <Transfer />;
      case 'hotel':
        return <Hotel />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <LanguageProvider>
      <MainLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        {renderPage()}
      </MainLayout>
    </LanguageProvider>
  );
}
