import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import OneDayTrip from './pages/OneDayTrip';
import PackageTour from './pages/PackageTour';
import Transfer from './pages/Transfer';
import Hotel from './pages/Hotel';
import TourDetailPage from './pages/TourDetailPage';
import PackageDetailPage from './pages/PackageDetailPage';
import HotelDetailPage from './pages/HotelDetailPage';
import AdminApp from './pages/admin/AdminApp';

// Parse hash to get page and itemId (e.g., #one-day-trip or #tour-detail/123)
const parseHash = () => {
  const hash = window.location.hash.slice(1); // Remove #
  if (!hash || hash === '') return { page: 'home', itemId: null };

  const [page, itemId] = hash.split('/');
  return { page: page || 'home', itemId: itemId || null };
};

export default function App() {
  const initialState = parseHash();
  const [currentPage, setCurrentPage] = useState(initialState.page);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(initialState.itemId);

  // Update URL hash when page changes
  const updatePage = (page, itemId = null) => {
    const hash = itemId ? `#${page}/${itemId}` : `#${page}`;
    window.history.pushState(null, '', page === 'home' ? window.location.pathname : hash);
    setCurrentPage(page);
    setSelectedItemId(itemId);
  };

  useEffect(() => {
    // Check if we're on the admin page
    const path = window.location.pathname;
    setIsAdmin(path.startsWith('/admin'));

    // Listen for URL changes (for hash-based routing)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || hash.startsWith('#admin/')) {
        setIsAdmin(true);
      } else {
        // Handle regular page navigation
        const { page, itemId } = parseHash();
        setCurrentPage(page);
        setSelectedItemId(itemId);
      }
    };

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const { page, itemId } = parseHash();
      setCurrentPage(page);
      setSelectedItemId(itemId);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);

    if (window.location.hash.startsWith('#admin')) {
      setIsAdmin(true);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Render Admin Panel
  if (isAdmin) {
    return <AdminApp />;
  }

  // Navigate to detail page with item ID
  const navigateToDetail = (page, itemId) => {
    updatePage(page, itemId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate back to list page
  const navigateBack = (page) => {
    updatePage(page, null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if current page is a detail page (for forceSolid navbar)
  const isDetailPage = ['tour-detail', 'package-detail', 'hotel-detail'].includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'one-day-trip':
        return <OneDayTrip onViewDetail={(id) => navigateToDetail('tour-detail', id)} />;
      case 'tour-detail':
        return <TourDetailPage tourId={selectedItemId} onBack={() => navigateBack('one-day-trip')} />;
      case 'package-tour':
        return <PackageTour onViewDetail={(id) => navigateToDetail('package-detail', id)} />;
      case 'package-detail':
        return <PackageDetailPage packageId={selectedItemId} onBack={() => navigateBack('package-tour')} />;
      case 'transfer':
        return <Transfer />;
      case 'hotel':
        return <Hotel onViewDetail={(id) => navigateToDetail('hotel-detail', id)} />;
      case 'hotel-detail':
        return <HotelDetailPage hotelId={selectedItemId} onBack={() => navigateBack('hotel')} />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <LanguageProvider>
      <MainLayout
        currentPage={currentPage}
        setCurrentPage={updatePage}
        forceSolid={isDetailPage}
      >
        {renderPage()}
      </MainLayout>
    </LanguageProvider>
  );
}
