import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, ArrowRight, PlayCircle } from 'lucide-react';
import Button from './Button';

const Hero: React.FC = () => {
  // Use a specific high-quality travel image
  const bgImage = "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=2000&auto=format&fit=crop"; 

  return (
    <section className="relative w-full h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-20">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide">อันดับ 1 เว็บไซต์จองทัวร์ยอดนิยม</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-fade-in-up delay-100">
          เปิดโลกกว้าง <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-white">
            ในแบบที่คุณฝัน
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl text-lg md:text-xl text-brand-100 mb-10 font-light leading-relaxed animate-fade-in-up delay-200">
          ค้นพบประสบการณ์การท่องเที่ยวสุดพิเศษที่คุณจะไม่มีวันลืม 
          เราคัดสรรแพ็คเกจทัวร์ที่ดีที่สุดทั่วทุกมุมโลกมาเพื่อคุณโดยเฉพาะ
        </p>

        {/* Floating Glass Search Widget */}
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-6 shadow-2xl animate-fade-in-up delay-300">
            <form className="flex flex-col lg:flex-row gap-4">
                
                {/* Location Input */}
                <div className="flex-1 bg-white/90 rounded-2xl px-5 py-4 flex items-center gap-4 transition-transform hover:scale-[1.01] group cursor-text">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                        <MapPin size={20} />
                    </div>
                    <div className="flex flex-col flex-1 text-left">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">ปลายทาง</label>
                        <input 
                            type="text" 
                            placeholder="คุณอยากไปที่ไหน?" 
                            className="bg-transparent border-none p-0 text-gray-900 font-semibold placeholder-gray-400 focus:ring-0 w-full outline-none"
                        />
                    </div>
                </div>

                {/* Date Input */}
                <div className="flex-1 bg-white/90 rounded-2xl px-5 py-4 flex items-center gap-4 transition-transform hover:scale-[1.01] group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                        <Calendar size={20} />
                    </div>
                    <div className="flex flex-col flex-1 text-left">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">วันเดินทาง</label>
                        <input 
                            type="text" 
                            placeholder="เลือกวันที่" 
                            onFocus={(e) => (e.target.type = 'date')}
                            onBlur={(e) => (e.target.type = 'text')}
                            className="bg-transparent border-none p-0 text-gray-900 font-semibold placeholder-gray-400 focus:ring-0 w-full outline-none cursor-pointer"
                        />
                    </div>
                </div>

                 {/* Guests Input */}
                 <div className="flex-1 bg-white/90 rounded-2xl px-5 py-4 flex items-center gap-4 transition-transform hover:scale-[1.01] group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                        <Users size={20} />
                    </div>
                    <div className="flex flex-col flex-1 text-left">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">ผู้เดินทาง</label>
                        <select className="bg-transparent border-none p-0 text-gray-900 font-semibold focus:ring-0 w-full outline-none cursor-pointer appearance-none">
                            <option>2 ท่าน</option>
                            <option>1 ท่าน</option>
                            <option>3 - 5 ท่าน</option>
                            <option>6+ ท่าน</option>
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <button type="button" className="lg:w-auto w-full bg-brand-500 hover:bg-brand-600 text-white rounded-2xl px-8 py-4 font-bold text-lg shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95">
                    <Search size={22} />
                    <span>ค้นหา</span>
                </button>
            </form>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex items-center gap-8 text-white/80 animate-fade-in-up delay-500">
            <div className="flex -space-x-4">
                {[1,2,3,4].map((i) => (
                    <img 
                        key={i}
                        src={`https://i.pravatar.cc/100?img=${10+i}`} 
                        alt="User" 
                        className="w-10 h-10 rounded-full border-2 border-white/50 object-cover"
                    />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white/50 bg-brand-600 flex items-center justify-center text-xs font-bold text-white">
                    +2k
                </div>
            </div>
            <div className="flex flex-col text-left">
                <div className="flex text-yellow-400 text-sm">★★★★★</div>
                <span className="text-sm font-light">นักเดินทางไว้วางใจกว่า 2,000+ รีวิว</span>
            </div>
        </div>

      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-400 rounded-full mix-blend-overlay filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-300 rounded-full mix-blend-overlay filter blur-[128px] opacity-10"></div>
    </section>
  );
};

export default Hero;