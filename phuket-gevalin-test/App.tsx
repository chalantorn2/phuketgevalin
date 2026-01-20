import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import HighlightSlider from './components/HighlightSlider';
import Services from './components/Services';
import TransferSection from './components/TransferSection';
import OneDayTripPage from './components/OneDayTripPage';
import HotelPage from './components/HotelPage';
import PackageTourPage from './components/PackageTourPage';
import TransferPage from './components/TransferPage';
import TourDetailPage from './components/TourDetailPage';
import PackageDetailPage from './components/PackageDetailPage';
import HotelDetailPage from './components/HotelDetailPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'onedaytrip' | 'hotels' | 'packages' | 'transfer'>('home');
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

  const handleNavigate = (target: string) => {
    // Reset specific states when navigating via navbar
    setSelectedTourId(null);
    setSelectedPackageId(null);
    setSelectedHotelId(null);
    
    if (target === 'onedaytrip') {
      setCurrentPage('onedaytrip');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'hotels') {
      setCurrentPage('hotels');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'packages') {
      setCurrentPage('packages');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'transfer') {
      setCurrentPage('transfer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target.startsWith('#')) {
      // If navigating to a section ID
      if (currentPage !== 'home') {
        setCurrentPage('home');
        // Wait for render then scroll
        setTimeout(() => {
          const element = document.getElementById(target.substring(1));
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(target.substring(1));
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectTour = (id: number) => {
    setSelectedTourId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSelectPackage = (id: number) => {
    setSelectedPackageId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHotel = (id: number) => {
    setSelectedHotelId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTourList = () => {
    setSelectedTourId(null);
  };

  const handleBackToPackageList = () => {
    setSelectedPackageId(null);
  };

  const handleBackToHotelList = () => {
    setSelectedHotelId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-brand-200 selection:text-brand-900">
      {/* Navbar will be solid white on Tour/Package/Hotel Detail page */}
      <Navbar onNavigate={handleNavigate} forceSolid={!!selectedTourId || !!selectedPackageId || !!selectedHotelId} />
      
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <TrustBar />
            <HighlightSlider />
            <TransferSection />
            <Services />
          </>
        ) : currentPage === 'onedaytrip' ? (
          selectedTourId ? (
            <TourDetailPage tourId={selectedTourId} onBack={handleBackToTourList} />
          ) : (
            <OneDayTripPage onSelectTour={handleSelectTour} />
          )
        ) : currentPage === 'hotels' ? (
          selectedHotelId ? (
            <HotelDetailPage hotelId={selectedHotelId} onBack={handleBackToHotelList} />
          ) : (
            <HotelPage onSelectHotel={handleSelectHotel} />
          )
        ) : currentPage === 'packages' ? (
           selectedPackageId ? (
            <PackageDetailPage packageId={selectedPackageId} onBack={handleBackToPackageList} />
          ) : (
            <PackageTourPage onSelectPackage={handleSelectPackage} />
          )
        ) : (
          <TransferPage />
        )}
      </main>
    </div>
  );
};

export default App;