import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const inspirationImages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    alt: 'Beach',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
    alt: 'Switzerland',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
    alt: 'Camping',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2686&auto=format&fit=crop',
    alt: 'Cinque Terre',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    alt: 'Resort',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
    alt: 'Mountain View',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop',
    alt: 'Food',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2668&auto=format&fit=crop',
    alt: 'Beach Sunset',
  },
];

const BrowseInspiration: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Distance to scroll
      const container = scrollContainerRef.current;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        // Check if we've reached the end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
           // Loop back to start smoothly
           container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
           // Scroll next
           scroll('right');
        }
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6">
        
        {/* Multi-Image Carousel (No Text) */}
        <div 
            className="relative group/slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Scroll Buttons */}
            <button 
                onClick={() => scroll('left')}
                className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:scale-110 transition-all opacity-0 group-hover/slider:opacity-100"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={() => scroll('right')}
                className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:scale-110 transition-all opacity-0 group-hover/slider:opacity-100"
            >
                <ChevronRight size={24} />
            </button>

            {/* Image Container */}
            <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 snap-x snap-mandatory scrollbar-hide -mx-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {inspirationImages.map((img) => (
                    <div 
                        key={img.id}
                        className="flex-none w-[280px] md:w-[320px] h-[400px] snap-center relative rounded-3xl overflow-hidden shadow-lg shadow-slate-100 group cursor-pointer"
                    >
                        <img 
                            src={img.image} 
                            alt={img.alt} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        {/* Subtle Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default BrowseInspiration;