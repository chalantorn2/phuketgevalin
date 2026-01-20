import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Sparkles, Tag } from 'lucide-react';
import Button from './Button';

const HighlightSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
      subtitle: "Unseen Thailand",
      title: "สัมผัสความงามสวิตเซอร์แลนด์เมืองไทย",
      location: "ปางอุ๋ง, แม่ฮ่องสอน",
      price: "3,990",
      desc: "ล่องแพไม้ไผ่ท่ามกลางไอหมอกยามเช้า และทิวสนสามใบที่เรียงรายโอบล้อมอ่างเก็บน้ำ"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
      subtitle: "Summer Paradise",
      title: "ดำน้ำดูปะการัง เกาะหลีเป๊ะ",
      location: "สตูล, ไทย",
      price: "5,500",
      desc: "มัลดีฟส์เมืองไทย น้ำใสไหลเย็นเห็นตัวปลา พร้อมที่พักติดหาดทรายขาวละเอียด"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=2000&auto=format&fit=crop",
      subtitle: "Cultural Heritage",
      title: "เดินเล่นเมืองเก่า ชมวัดสวย",
      location: "เกียวโต, ญี่ปุ่น",
      price: "25,900",
      desc: "ซึมซับบรรยากาศความเป็นญี่ปุ่นแท้ๆ ในเมืองหลวงเก่าที่เต็มไปด้วยเสน่ห์และวัฒนธรรม"
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, [current]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section id="packages" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        
        {/* Header - Centered as requested */}
        <div className="text-center max-w-3xl mx-auto mb-12">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold tracking-wider uppercase border border-brand-100 mb-4 animate-bounce-slow">
             <Sparkles size={14} className="text-brand-500" />
             Special Offers
           </div>
           <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
             โปรโมชั่นแนะนำ <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyan-400">ห้ามพลาด</span>
           </h2>
           <p className="text-gray-500 text-lg">คัดสรรดีลที่ดีที่สุดเพื่อวันพักผ่อนสุดพิเศษของคุณ</p>
        </div>

        {/* Slider Container */}
        <div className="relative w-full h-[550px] md:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white">
          
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Image with Ken Burns Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                    index === current ? 'scale-110' : 'scale-100'
                  }`}
                />
              </div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent opacity-80"></div>

              {/* Content Card - RESTORED TO CARD STYLE (Left Aligned) */}
              <div className={`absolute bottom-6 left-4 right-4 md:bottom-12 md:left-12 md:max-w-lg transition-all duration-700 delay-300 ${
                  index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="backdrop-blur-xl bg-black/30 border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                    
                    {/* Top Section: Badge & Text */}
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
                            {slide.subtitle}
                        </div>
                        
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                            {slide.title}
                        </h2>
                        
                        <div className="flex items-center gap-2 text-brand-200 text-sm font-medium mb-4">
                            <MapPin size={16} />
                            <span>{slide.location}</span>
                        </div>

                        <p className="text-white/90 font-light line-clamp-2 text-sm md:text-base">
                            {slide.desc}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/10 w-full mb-5"></div>

                    {/* Bottom Section: BIG PRICE & Button */}
                    <div className="flex items-end justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-white/60 font-medium uppercase tracking-wider mb-1">ราคาเริ่มต้นเพียง</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg text-brand-300 font-bold">฿</span>
                                <span className="text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                    {slide.price}
                                </span>
                            </div>
                        </div>
                        <Button className="!rounded-full !px-6 !py-3 !text-base shadow-lg shadow-brand-500/40 hover:!scale-105 active:!scale-95">
                            จองเลย <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 group hidden md:flex"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 group hidden md:flex"
          >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute top-8 right-8 z-20 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                  idx === current ? 'w-8 bg-brand-400' : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightSlider;