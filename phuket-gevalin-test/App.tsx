import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import HighlightSlider from './components/HighlightSlider';
import Services from './components/Services';
import FeaturedTrips from './components/FeaturedTrips';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-brand-200 selection:text-brand-900">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <HighlightSlider />
        <FeaturedTrips />
        <Services />
      </main>
    </div>
  );
};

export default App;