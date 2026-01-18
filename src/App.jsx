import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import OneDayTrip from './pages/OneDayTrip';
import PackageTour from './pages/PackageTour';
import Transfer from './pages/Transfer';
import Hotel from './pages/Hotel';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
