import { useState, useEffect } from 'react';
import TripCard from './TripCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { onedayTripsAPI } from '../../services/api';

export default function FeaturedTrips() {
  const { t, language } = useLanguage();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data
  const fallbackData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop",
      title_th: "มหัศจรรย์ถ้ำพระยานคร & เขาสามร้อยยอด จุดชมวิวสุด Unseen",
      title_en: "Phraya Nakhon Cave & Khao Sam Roi Yot Unseen Viewpoint",
      location_th: "ประจวบคีรีขันธ์",
      location_en: "Prachuap Khiri Khan",
      duration_th: "1 วัน (08:00 - 18:00)",
      duration_en: "1 Day (08:00 - 18:00)",
      rating: 4.8,
      reviews: 124,
      price: 1590,
      discount_price: 2200
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1598895015795-c49c55b5d141?q=80&w=1000&auto=format&fit=crop",
      title_th: "ล่องเรือยอร์ช ดำน้ำเกาะเฮ ภูเก็ต สัมผัสความหรูหรากลางทะเล",
      title_en: "Yacht Cruise & Snorkeling at Coral Island, Phuket",
      location_th: "ภูเก็ต",
      location_en: "Phuket",
      duration_th: "1 วัน (09:00 - 17:00)",
      duration_en: "1 Day (09:00 - 17:00)",
      rating: 4.9,
      reviews: 856,
      price: 2490,
      discount_price: 3500
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop",
      title_th: "ย้อนรอยประวัติศาสตร์ วัดไชยวัฒนาราม & ตลาดน้ำอโยธยา",
      title_en: "Historical Journey: Wat Chaiwatthanaram & Ayothaya Floating Market",
      location_th: "พระนครศรีอยุธยา",
      location_en: "Ayutthaya",
      duration_th: "1 วัน (07:30 - 16:30)",
      duration_en: "1 Day (07:30 - 16:30)",
      rating: 4.7,
      reviews: 342,
      price: 890,
      discount_price: 1290
    }
  ];

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await onedayTripsAPI.getAll();
        if (response.success && response.data && response.data.length > 0) {
          // Get top 3 bestseller or highest rated trips
          const sortedTrips = response.data
            .sort((a, b) => (b.bestseller || 0) - (a.bestseller || 0) || (b.rating || 0) - (a.rating || 0))
            .slice(0, 3);
          setTrips(sortedTrips);
        } else {
          setTrips(fallbackData);
        }
      } catch (error) {
        console.error('Failed to fetch trips:', error);
        setTrips(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Get localized trip data
  const getLocalizedTrip = (trip) => ({
    id: trip.id,
    image: trip.image,
    title: language === 'TH' ? (trip.title_th || trip.title_en) : (trip.title_en || trip.title_th),
    location: language === 'TH' ? (trip.location_th || trip.location_en) : (trip.location_en || trip.location_th),
    duration: language === 'TH' ? (trip.duration_th || trip.duration_en) : (trip.duration_en || trip.duration_th),
    rating: trip.rating || 4.5,
    reviews: trip.reviews || 0,
    price: Math.floor(Number(trip.price)),
    discountPrice: trip.discount_price ? Math.floor(Number(trip.discount_price)) : null
  });

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-3xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-50/50 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-50/50 rounded-full blur-[100px] opacity-40 translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} className="text-primary-500" />
              <span className="text-primary-500 font-bold tracking-widest uppercase text-xs">{t('featuredTrips.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {t('featuredTrips.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-300">{t('featuredTrips.titleHighlight')}</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              {t('featuredTrips.description')}
            </p>
          </div>

          <button className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 hover:bg-primary-50 text-gray-900 hover:text-primary-600 font-semibold transition-all duration-300">
            <span>{t('featuredTrips.viewAll')}</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all">
              <ArrowRight size={16} />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {trips.map((trip) => (
            <TripCard key={trip.id} {...getLocalizedTrip(trip)} />
          ))}
        </div>
      </div>
    </section>
  );
}
