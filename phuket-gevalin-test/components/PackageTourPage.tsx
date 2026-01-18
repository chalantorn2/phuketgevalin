import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Star, Check, Plane, Filter, Search, RotateCcw, ArrowRight, Globe } from 'lucide-react';
import Button from './Button';

const PackageTourPage: React.FC = () => {
  // Filter States
  const [activeZone, setActiveZone] = useState("ทั้งหมด");
  const [activeDuration, setActiveDuration] = useState("ทั้งหมด");
  const [maxPrice, setMaxPrice] = useState<number>(100000);

  const zones = ["ทั้งหมด", "เอเชีย", "ยุโรป", "ประเทศไทย", "อเมริกา"];
  const durations = ["ทั้งหมด", "3-4 วัน", "5-7 วัน", "8 วันขึ้นไป"];

  const packages = [
    {
      id: 1,
      name: "ทัวร์ญี่ปุ่น โตเกียว ฟูจิ คาวากูจิโกะ",
      location: "ญี่ปุ่น",
      zone: "เอเชีย",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop",
      duration: "5 วัน 3 คืน",
      durationCategory: "5-7 วัน",
      rating: 4.9,
      reviews: 215,
      price: 29900,
      discountPrice: 35900,
      highlights: ["บินการบินไทย", "อิสระ 1 วัน", "บุฟเฟต์ขาปู"],
      airline: "Thai Airways",
      upcoming: "15 ต.ค. - 19 ต.ค."
    },
    {
      id: 2,
      name: "มหัศจรรย์สวิตเซอร์แลนด์ อิตาลี ฝรั่งเศส",
      location: "ยุโรป",
      zone: "ยุโรป",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
      duration: "9 วัน 6 คืน",
      durationCategory: "8 วันขึ้นไป",
      rating: 4.8,
      reviews: 120,
      price: 89900,
      discountPrice: 95000,
      highlights: ["พิชิตยอดเขาจุงเฟรา", "ล่องเรือกอนโดล่า", "ช้อปปิ้งปารีส"],
      airline: "Emirates",
      upcoming: "20 พ.ย. - 28 พ.ย."
    },
    {
      id: 3,
      name: "ทัวร์เวียดนาม ดานัง ฮอยอัน บาน่าฮิลล์",
      location: "เวียดนาม",
      zone: "เอเชีย",
      image: "https://images.unsplash.com/photo-1559592413-7cec430aa669?q=80&w=1000&auto=format&fit=crop",
      duration: "3 วัน 2 คืน",
      durationCategory: "3-4 วัน",
      rating: 4.7,
      reviews: 340,
      price: 12900,
      discountPrice: 15900,
      highlights: ["สะพานมือทองคำ", "พักบนบาน่าฮิลล์", "ล่องเรือกระด้ง"],
      airline: "AirAsia",
      upcoming: "ทุกวันศุกร์-อาทิตย์"
    },
    {
      id: 4,
      name: "เชียงใหม่ ม่อนแจ่ม แม่กำปอง",
      location: "ประเทศไทย",
      zone: "ประเทศไทย",
      image: "https://images.unsplash.com/photo-1596711683515-e2746416b240?q=80&w=1000&auto=format&fit=crop",
      duration: "3 วัน 2 คืน",
      durationCategory: "3-4 วัน",
      rating: 4.8,
      reviews: 85,
      price: 5990,
      discountPrice: 7900,
      highlights: ["ทะเลหมอก", "กาแฟแม่กำปอง", "ไหว้พระธาตุดอยสุเทพ"],
      airline: "Van VIP",
      upcoming: "ออกเดินทางทุกวัน"
    },
    {
      id: 5,
      name: "ทัวร์จีน จางเจียเจี้ย อวตาร ประตูสวรรค์",
      location: "จีน",
      zone: "เอเชีย",
      image: "https://images.unsplash.com/photo-1474401915567-938829158739?q=80&w=1000&auto=format&fit=crop",
      duration: "4 วัน 3 คืน",
      durationCategory: "3-4 วัน",
      rating: 4.6,
      reviews: 95,
      price: 19900,
      discountPrice: 25900,
      highlights: ["สะพานกระจก", "เขาอวตาร", "โชว์จิ้งจอกขาว"],
      airline: "China Southern",
      upcoming: "12 ต.ค. - 15 ต.ค."
    },
    {
      id: 6,
      name: "ทัวร์ไต้หวัน ไทเป จิ่วเฟิ่น ทะเลสาบสุริยันจันทรา",
      location: "ไต้หวัน",
      zone: "เอเชีย",
      image: "https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=1000&auto=format&fit=crop",
      duration: "4 วัน 3 คืน",
      durationCategory: "3-4 วัน",
      rating: 4.8,
      reviews: 150,
      price: 15900,
      discountPrice: 19900,
      highlights: ["ปล่อยโคมลอย", "ตลาดกลางคืน", "บุฟเฟต์ชาบู"],
      airline: "EVA Air",
      upcoming: "25 ต.ค. - 28 ต.ค."
    }
  ];

  // Filter Logic
  const filteredPackages = packages.filter(pkg => {
    const matchZone = activeZone === "ทั้งหมด" || pkg.zone === activeZone;
    const matchDuration = activeDuration === "ทั้งหมด" || pkg.durationCategory === activeDuration;
    const matchPrice = pkg.price <= maxPrice;
    return matchZone && matchDuration && matchPrice;
  });

  const resetFilters = () => {
    setActiveZone("ทั้งหมด");
    setActiveDuration("ทั้งหมด");
    setMaxPrice(100000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative bg-brand-900 h-[400px] mb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
            alt="Package Tour Header"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-32"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-20">
          <span className="text-brand-300 font-bold tracking-[0.2em] uppercase text-sm mb-2 animate-fade-in-up">
            World Wide Travel
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up delay-100 drop-shadow-lg">
            แพ็กเกจทัวร์ท่องเที่ยว
          </h1>
          <p className="text-gray-100 text-lg max-w-2xl font-light animate-fade-in-up delay-200 drop-shadow-md">
            เปิดประสบการณ์ใหม่ทั่วโลก กับแพ็กเกจทัวร์คุณภาพที่เราคัดสรรมาเพื่อคุณ เดินทางสะดวก กินหรู อยู่สบาย
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Sidebar Filter */}
            <aside className="w-full lg:w-80 flex-shrink-0">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                            <Filter size={18} /> ตัวกรองแพ็กเกจ
                        </h3>
                        <button 
                            onClick={resetFilters}
                            className="text-xs text-brand-500 font-semibold hover:text-brand-600 flex items-center gap-1 transition-colors"
                        >
                            <RotateCcw size={12} /> ล้างค่า
                        </button>
                    </div>

                    {/* Zone Filter */}
                    <div className="mb-8">
                        <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Globe size={16} className="text-brand-500"/> โซนท่องเที่ยว
                        </h4>
                        <div className="space-y-2">
                            {zones.map((zone) => (
                                <label 
                                    key={zone} 
                                    className={`flex items-center gap-3 cursor-pointer group p-2 rounded-lg transition-all ${
                                        activeZone === zone ? 'bg-brand-50' : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                        activeZone === zone
                                        ? 'bg-brand-500 border-brand-500' 
                                        : 'border-gray-300 group-hover:border-brand-400 bg-white'
                                    }`}>
                                        {activeZone === zone && <Check size={12} className="text-white" />}
                                    </div>
                                    <input 
                                        type="radio" 
                                        name="zone" 
                                        className="hidden"
                                        checked={activeZone === zone}
                                        onChange={() => setActiveZone(zone)}
                                    />
                                    <span className={`text-sm ${activeZone === zone ? 'font-bold text-brand-700' : 'text-gray-600'}`}>
                                        {zone}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Duration Filter */}
                    <div className="mb-8">
                         <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock size={16} className="text-brand-500"/> ระยะเวลา
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {durations.map((dur) => (
                                <button
                                    key={dur}
                                    onClick={() => setActiveDuration(dur)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                        activeDuration === dur
                                        ? 'bg-brand-500 text-white border-brand-500'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
                                    }`}
                                >
                                    {dur}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Slider */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Search size={16} className="text-brand-500"/> งบประมาณ
                            </h4>
                            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-lg border border-brand-100">
                                สูงสุด ฿{maxPrice.toLocaleString()}
                            </span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100000" 
                            step="1000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                            <span>฿0</span>
                            <span>฿100,000+</span>
                        </div>
                    </div>

                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 w-full">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        โปรแกรมทัวร์แนะนำ
                        <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-normal">
                             {filteredPackages.length} รายการ
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPackages.map((pkg) => (
                        <div key={pkg.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-1 cursor-pointer">
                            
                            {/* Image Area */}
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                                    <MapPin size={12} className="text-brand-500" />
                                    {pkg.location}
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                     <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-medium flex items-center gap-2 border border-white/10">
                                        <Calendar size={12} /> {pkg.upcoming}
                                     </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                     <span className="text-[10px] uppercase tracking-wider font-bold text-brand-500 bg-brand-50 px-2 py-1 rounded-md">
                                        {pkg.duration}
                                     </span>
                                     <div className="flex items-center gap-1">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs font-bold">{pkg.rating}</span>
                                        <span className="text-[10px] text-gray-400">({pkg.reviews})</span>
                                     </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-4 group-hover:text-brand-600 transition-colors line-clamp-2">
                                    {pkg.name}
                                </h3>

                                {/* Highlights */}
                                <div className="space-y-2 mb-6">
                                    {pkg.highlights.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                            <Check size={12} className="text-green-500 flex-shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                         <Plane size={12} className="text-blue-500 flex-shrink-0" />
                                         สายการบิน: {pkg.airline}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 mb-0.5">ราคาเริ่มต้น/ท่าน</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-bold text-brand-600">฿{pkg.price.toLocaleString()}</span>
                                            <span className="text-xs text-gray-400 line-through">฿{pkg.discountPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="!rounded-xl !px-4 !py-2 !text-xs !h-9">
                                        ดูรายละเอียด
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {filteredPackages.length === 0 && (
                     <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-gray-300">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">ไม่พบแพ็กเกจทัวร์</h3>
                        <p className="text-gray-500 mb-6 text-sm">ลองปรับเปลี่ยนตัวกรองดูนะครับ</p>
                        <Button variant="outline" onClick={resetFilters} className="!text-sm">
                            ล้างตัวกรอง
                        </Button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PackageTourPage;