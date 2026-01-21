import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { promotionsAPI } from '../../services/api';

export default function HighlightSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  // Fallback data (used when API is not available)
  const fallbackData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
      subtitle_th: "โปรโมชั่นพิเศษ",
      subtitle_en: "Special Offer",
      title_th: "ทัวร์ 4 เกาะ พร้อมดำน้ำตื้น",
      title_en: "4 Islands Tour with Snorkeling",
      location_th: "กระบี่, ประเทศไทย",
      location_en: "Krabi, Thailand",
      price: 3990,
      description_th: "สัมผัสความงดงามของหมู่เกาะทะเลกระบี่ พร้อมดำน้ำชมปะการังและปลาสีสันสดใส",
      description_en: "Experience the beauty of Krabi islands with snorkeling among colorful coral reefs and tropical fish"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
      subtitle_th: "ขายดี",
      subtitle_en: "Best Seller",
      title_th: "เกาะพีพี & เกาะไม้ไผ่",
      title_en: "Phi Phi & Bamboo Island",
      location_th: "ภูเก็ต, ประเทศไทย",
      location_en: "Phuket, Thailand",
      price: 5500,
      description_th: "ล่องเรือเร็วสู่เกาะพีพี ชมอ่าวมาหยา และเกาะไม้ไผ่ น้ำใสราวกระจก",
      description_en: "Speedboat trip to Phi Phi Islands, Maya Bay and crystal clear waters of Bamboo Island"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=2000&auto=format&fit=crop",
      subtitle_th: "แพ็กเกจสุดคุ้ม",
      subtitle_en: "Value Package",
      title_th: "แพ็กเกจทัวร์ 3 วัน 2 คืน",
      title_en: "3 Days 2 Nights Package",
      location_th: "ภูเก็ต, ประเทศไทย",
      location_en: "Phuket, Thailand",
      price: 25900,
      description_th: "รวมที่พัก อาหาร และทัวร์ครบวงจร พร้อมรถรับส่งสนามบิน",
      description_en: "All-inclusive package with accommodation, meals, tours and airport transfer"
    }
  ];

  // Fetch promotions from API
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await promotionsAPI.getAll();
        if (response.success && response.data && response.data.length > 0) {
          setPromotions(response.data);
        } else {
          setPromotions(fallbackData);
        }
      } catch (error) {
        console.error('Failed to fetch promotions:', error);
        setPromotions(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Get localized content with fallback
  const getLocalizedText = (thText, enText) => {
    return language === 'TH' ? (thText || enText) : (enText || thText);
  };

  const slides = promotions.map((promo) => ({
    id: promo.id,
    image: promo.image,
    subtitle: getLocalizedText(promo.subtitle_th, promo.subtitle_en),
    title: getLocalizedText(promo.title_th, promo.title_en),
    location: getLocalizedText(promo.location_th, promo.location_en),
    price: Number(promo.price).toLocaleString(),
    desc: getLocalizedText(promo.description_th, promo.description_en),
    link: promo.link
  }));

  const nextSlide = () => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, [current]);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [current, slides.length]);

  // Loading state
  if (loading) {
    return (
      <section className="pt-24 pb-16 md:pt-28 md:pb-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="w-full h-[550px] md:h-[650px] rounded-[2.5rem] bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">{t('loading')}</div>
          </div>
        </div>
      </section>
    );
  }

  // No promotions available
  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="pt-24 pb-16 md:pt-28 md:pb-20 bg-gray-50">
      <div className="container mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold tracking-wider uppercase border border-primary-100 mb-4">
            <Sparkles size={14} className="text-primary-500" />
            {t('highlight.badge')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {t('highlight.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-cyan-400">{t('highlight.titleHighlight')}</span>
          </h2>
          <p className="text-gray-500 text-lg">{t('highlight.description')}</p>
        </div>

        <div className="relative w-full h-[550px] md:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white">

          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                      index === current ? 'scale-110' : 'scale-100'
                    }`}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                    <div className="text-white/60 text-center">
                      <p className="text-2xl md:text-4xl font-medium">{t('awaitingImage')}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-80"></div>

              <div className="absolute bottom-6 left-4 right-4 md:bottom-12 md:left-12 md:max-w-lg">
                <div className="backdrop-blur-md bg-black/40 border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl">

                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
                            {slide.subtitle}
                        </div>

                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                            {slide.title}
                        </h2>

                        <div className="flex items-center gap-2 text-primary-200 text-sm font-medium mb-4">
                            <MapPin size={16} />
                            <span>{slide.location}</span>
                        </div>

                        <p className="text-white/90 font-light line-clamp-2 text-sm md:text-base">
                            {slide.desc}
                        </p>
                    </div>

                    <div className="h-px bg-white/10 w-full mb-5"></div>

                    <div className="flex items-end justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-white/60 font-medium uppercase tracking-wider mb-1">{t('highlight.priceLabel')}</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg text-primary-300 font-bold">฿</span>
                                <span className="text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                    {slide.price}
                                </span>
                            </div>
                        </div>
                        <Button className="!rounded-full !px-6 !py-3 !text-base shadow-lg shadow-primary-500/40 hover:!scale-105 active:!scale-95">
                            {t('highlight.bookNow')} <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white hidden md:flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white hidden md:flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
          >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div className="absolute top-8 right-8 z-20 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                  idx === current ? 'w-8 bg-primary-400' : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
