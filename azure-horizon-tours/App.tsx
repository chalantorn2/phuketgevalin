import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-brand-200 selection:text-brand-900">
      <Navbar />
      <main>
        <Hero />
        {/* Placeholder content to demonstrate scrolling effect on Navbar */}
        <section className="py-20 px-4 text-center text-gray-400">
          <p className="text-sm uppercase tracking-widest mb-4">Discover More</p>
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 mx-auto text-brand-500" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
          <div className="h-[800px] flex items-center justify-center">
            <h2 className="text-3xl font-light opacity-30">Content continues below...</h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;