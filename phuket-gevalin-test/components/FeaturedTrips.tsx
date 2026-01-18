import React from 'react';
import TripCard from './TripCard';
import { ArrowRight, Sparkles } from 'lucide-react';

const FeaturedTrips: React.FC = () => {
  const trips = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop",
      title: "มหัศจรรย์ถ้ำพระยานคร & เขาสามร้อยยอด จุดชมวิวสุด Unseen",
      location: "ประจวบคีรีขันธ์",
      duration: "1 วัน (08:00 - 18:00)",
      rating: 4.8,
      reviews: 124,
      price: 1590,
      discountPrice: 2200
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1598895015795-c49c55b5d141?q=80&w=1000&auto=format&fit=crop",
      title: "ล่องเรือยอร์ช ดำน้ำเกาะเฮ ภูเก็ต สัมผัสความหรูหรากลางทะเล",
      location: "ภูเก็ต",
      duration: "1 วัน (09:00 - 17:00)",
      rating: 4.9,
      reviews: 856,
      price: 2490,
      discountPrice: 3500
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop",
      title: "ย้อนรอยประวัติศาสตร์ วัดไชยวัฒนาราม & ตลาดน้ำอโยธยา",
      location: "พระนครศรีอยุธยา",
      duration: "1 วัน (07:30 - 16:30)",
      rating: 4.7,
      reviews: 342,
      price: 890,
      discountPrice: 1290
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-50/50 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-50/50 rounded-full blur-[100px] opacity-40 translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} className="text-brand-500" />
                <span className="text-brand-500 font-bold tracking-widest uppercase text-xs">Recommended Trips</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              ทริปวันเดียว <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-300">เที่ยวสุดคุ้ม</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              เวลาน้อยก็เที่ยวได้! รวมทริปไปเช้า-เย็นกลับยอดนิยม ที่จะทำให้วันหยุดสั้นๆ ของคุณพิเศษกว่าที่เคย
            </p>
          </div>
          
          <button className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 hover:bg-brand-50 text-gray-900 hover:text-brand-600 font-semibold transition-all duration-300">
            <span>ดูทริปทั้งหมด</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all">
                <ArrowRight size={16} />
            </div>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {trips.map((trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;