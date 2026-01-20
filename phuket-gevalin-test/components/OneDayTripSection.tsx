import React, { useState } from 'react';
import { MapPin, Clock, Star, Heart, Filter, Utensils, Bus, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from './Button';

const OneDayTripSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");

  const categories = ["ทั้งหมด", "ทะเล & เกาะ", "วัฒนธรรม & วัด", "ผจญภัย", "ล่องเรือ"];

  const trips = [
    {
      id: 1,
      category: "ทะเล & เกาะ",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop",
      title: "ถ้ำพระยานคร & เขาสามร้อยยอด",
      location: "ประจวบคีรีขันธ์",
      duration: "08:00 - 18:00",
      rating: 4.8,
      reviews: 124,
      price: 1590,
      discountPrice: 2200,
      tags: ["รวมอาหารเที่ยง", "รับส่งโรงแรม"],
      bestseller: true
    },
    {
      id: 2,
      category: "ทะเล & เกาะ",
      image: "https://images.unsplash.com/photo-1598895015795-c49c55b5d141?q=80&w=1000&auto=format&fit=crop",
      title: "ล่องเรือยอร์ช ดำน้ำเกาะเฮ ภูเก็ต",
      location: "ภูเก็ต",
      duration: "09:00 - 17:00",
      rating: 4.9,
      reviews: 856,
      price: 2490,
      discountPrice: 3500,
      tags: ["บุฟเฟต์ซีฟู้ด", "อุปกรณ์ดำน้ำ"],
      bestseller: true
    },
    {
      id: 3,
      category: "วัฒนธรรม & วัด",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop",
      title: "ย้อนรอยประวัติศาสตร์ อยุธยา",
      location: "อยุธยา",
      duration: "07:30 - 16:30",
      rating: 4.7,
      reviews: 342,
      price: 890,
      discountPrice: 1290,
      tags: ["ไกด์นำเที่ยว", "ชุดไทย"],
      bestseller: false
    },
    {
      id: 4,
      category: "ผจญภัย",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop",
      title: "ล่องแก่ง & ขี่ ATV นครนายก",
      location: "นครนายก",
      duration: "09:00 - 16:00",
      rating: 4.6,
      reviews: 215,
      price: 1800,
      discountPrice: 2500,
      tags: ["ประกันอุบัติเหตุ", "อาหารกลางวัน"],
      bestseller: false
    },
     {
      id: 5,
      category: "ล่องเรือ",
      image: "https://images.unsplash.com/photo-1621244249243-436b79b5eea8?q=80&w=1000&auto=format&fit=crop",
      title: "ดินเนอร์หรู ล่องเรือเจ้าพระยา",
      location: "กรุงเทพฯ",
      duration: "19:00 - 21:00",
      rating: 4.8,
      reviews: 550,
      price: 1200,
      discountPrice: 1800,
      tags: ["ดนตรีสด", "บุฟเฟต์นานาชาติ"],
      bestseller: true
    },
    {
      id: 6,
      category: "ทะเล & เกาะ",
      image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1000&auto=format&fit=crop",
      title: "เกาะพีพี & อ่าวมาหยา เต็มวัน",
      location: "กระบี่/ภูเก็ต",
      duration: "08:30 - 17:00",
      rating: 4.9,
      reviews: 1120,
      price: 1990,
      discountPrice: 2800,
      tags: ["สปีดโบ๊ท", "ผลไม้เครื่องดื่ม"],
      bestseller: true
    }
  ];

  const filteredTrips = activeCategory === "ทั้งหมด" 
    ? trips 
    : trips.filter(trip => trip.category === activeCategory);

  return (
    <section className="py-24 bg-gray-50" id="onedaytrip">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="text-brand-500 font-bold tracking-widest uppercase text-xs mb-2 block">
               Discover Day Trips
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              วันเดย์ทริป <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-300">ยอดนิยม</span>
            </h2>
            <p className="text-gray-500 text-lg font-light">
              คัดสรรทริปไปเช้า-เย็นกลับ ที่จะทำให้คุณได้สัมผัสประสบการณ์สุดพิเศษในเวลาจำกัด
            </p>
          </div>
          
          <Button variant="outline" className="hidden md:flex">
             ดูทริปทั้งหมด
          </Button>
        </div>

        {/* Categories / Filter Bar */}
        <div className="mb-10 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 scrollbar-hide">
            <div className="flex items-center gap-3 w-max">
                <div className="mr-2 p-2 bg-white rounded-full border border-gray-100 shadow-sm text-gray-400">
                    <Filter size={18} />
                </div>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                            activeCategory === cat 
                            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 ring-2 ring-brand-200 ring-offset-2' 
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => (
                <div key={trip.id} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 relative flex flex-col h-full">
                    
                    {/* Image Header */}
                    <div className="relative h-64 overflow-hidden">
                        <img 
                            src={trip.image} 
                            alt={trip.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Tags / Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                             {trip.bestseller && (
                                <span className="px-3 py-1 rounded-full bg-yellow-400 text-yellow-950 text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                                    <Star size={10} className="fill-yellow-950" /> Best Seller
                                </span>
                             )}
                             <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-gray-700 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                {trip.category}
                             </span>
                        </div>

                        {/* Wishlist Button */}
                        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all flex items-center justify-center">
                            <Heart size={18} />
                        </button>

                        {/* Location Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                             <div className="flex items-center gap-1.5 text-white/90 text-sm font-medium">
                                <MapPin size={16} className="text-brand-400" />
                                {trip.location}
                             </div>
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-brand-600 transition-colors">
                                {trip.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock size={16} className="text-brand-500" />
                                <span>{trip.duration}</span>
                                <span className="text-gray-300">|</span>
                                <div className="flex items-center gap-1">
                                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-gray-900 font-bold">{trip.rating}</span>
                                    <span className="text-xs">({trip.reviews})</span>
                                </div>
                            </div>
                        </div>

                        {/* Service Tags (UX Feature) */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {trip.tags.map((tag, i) => (
                                <div key={i} className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-500 text-xs font-medium flex items-center gap-1.5">
                                    <CheckCircle2 size={12} className="text-brand-500" />
                                    {tag}
                                </div>
                            ))}
                        </div>

                        {/* Footer Price & Action */}
                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 line-through">฿{trip.discountPrice.toLocaleString()}</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-brand-600">฿{trip.price.toLocaleString()}</span>
                                    <span className="text-xs text-gray-500">/ท่าน</span>
                                </div>
                            </div>
                            <button className="w-10 h-10 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all shadow-sm group-hover:shadow-brand-500/30">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            ))}
        </div>

        <div className="mt-12 text-center md:hidden">
            <Button variant="outline" fullWidth>
                ดูทริปทั้งหมด
            </Button>
        </div>

      </div>
    </section>
  );
};

export default OneDayTripSection;