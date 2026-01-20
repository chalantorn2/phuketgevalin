import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Car, Users, Briefcase, Shield, CheckCircle2, Info, ChevronDown, Sparkles, Clock } from 'lucide-react';
import Button from './Button';

const TransferPage: React.FC = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  // Base price for route logic (Standard Sedan price)
  const [baseRoutePrice, setBaseRoutePrice] = useState<number | null>(null);

  const locations = ["ภูเก็ต (สนามบิน/ตัวเมือง)", "กระบี่ (อ่าวนาง/ตัวเมือง)", "พังงา (เขาหลัก)", "สุราษฎร์ธานี (ท่าเรือดอนสัก)"];

  const calculateBasePrice = (from: string, to: string) => {
    if (!from || !to || from === to) return null;
    const isPhuket = from.includes("ภูเก็ต");
    const isKrabi = from.includes("กระบี่");
    const isPhangNga = from.includes("พังงา");
    const toPhuket = to.includes("ภูเก็ต");
    const toKrabi = to.includes("กระบี่");
    const toPhangNga = to.includes("พังงา");

    if ((isPhuket && toKrabi) || (isKrabi && toPhuket)) return 2500;
    if ((isPhuket && toPhangNga) || (isPhangNga && toPhuket)) return 1800;
    if ((isKrabi && toPhangNga) || (isPhangNga && toKrabi)) return 2200;
    return 3500; // Default long distance
  };

  useEffect(() => {
    // Real-time calculation when inputs change
    const price = calculateBasePrice(origin, destination);
    setBaseRoutePrice(price);
    if (!origin || !destination) setIsSearching(false);
  }, [origin, destination]);

  const handleSearch = () => {
    if (origin && destination) {
        setIsSearching(true);
        // Scroll to results slightly
        const element = document.getElementById('fleet-results');
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
  };

  const fleet = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1000&auto=format&fit=crop",
      title: "Standard Sedan",
      model: "Toyota Altis / Camry",
      capacity: 3,
      luggage: 2,
      priceMultiplier: 1, // Base price * 1
      desc: "เหมาะสำหรับคู่รักหรือครอบครัวเล็ก",
      features: ["แอร์เย็นฉ่ำ", "เบาะหนัง", "น้ำดื่มฟรี"],
      tag: "Economy"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?q=80&w=1000&auto=format&fit=crop",
      title: "Premium SUV",
      model: "Toyota Fortuner",
      capacity: 4,
      luggage: 4,
      priceMultiplier: 1.3, // 30% more expensive
      desc: "พื้นที่กว้างขวาง นั่งสบาย ลุยได้ทุกที่",
      features: ["เบาะปรับเอน", "พื้นที่กว้าง", "ขับเคลื่อน 4 ล้อ"],
      tag: "Best Seller"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45f7?q=80&w=1000&auto=format&fit=crop",
      title: "VIP Van",
      model: "Toyota Commuter VIP",
      capacity: 10,
      luggage: 8,
      priceMultiplier: 1.6, // 60% more expensive
      desc: "เดินทางเป็นหมู่คณะ หรูหรา สะดวกสบาย",
      features: ["เบาะ VIP", "คาราโอเกะ", "WiFi ฟรี"],
      tag: "Luxury"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      
      {/* Modern Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop"
            alt="Transfer Hero"
            className="w-full h-full object-cover brightness-[0.65]"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white mt-[-80px]">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide">Available 24/7 Service</span>
           </div>
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight animate-fade-in-up delay-100">
             Your Private <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">Journey Begins Here</span>
           </h1>
           <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
             บริการรถรับ-ส่งระดับพรีเมียม ราคามาตรฐาน ปลอดภัยทุกการเดินทาง
           </p>
        </div>

        {/* Floating Search Bar (Overlap) */}
        <div className="absolute bottom-0 translate-y-1/2 w-full px-4 z-20 container mx-auto max-w-5xl animate-fade-in-up delay-300">
            <div className="bg-white rounded-3xl shadow-2xl p-2 md:p-4 border border-gray-100 flex flex-col md:flex-row items-center gap-2 md:gap-4">
                
                {/* Origin Input */}
                <div className="flex-1 w-full bg-gray-50 rounded-2xl px-4 py-3 md:py-4 flex items-center gap-3 border border-transparent focus-within:border-brand-300 focus-within:bg-white transition-all group cursor-pointer relative">
                     <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MapPin size={20} />
                     </div>
                     <div className="flex flex-col flex-1 min-w-0 relative">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">รับจาก (ต้นทาง)</label>
                        <select 
                            className="w-full bg-transparent font-bold text-gray-800 outline-none appearance-none cursor-pointer z-10"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                        >
                            <option value="">เลือกจุดรับ...</option>
                            {locations.map(loc => (
                                <option key={loc} value={loc} disabled={loc === destination}>{loc}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-0 top-1/2 translate-y-1 text-gray-400 pointer-events-none" />
                     </div>
                </div>

                {/* Divider / Icon */}
                <div className="hidden md:flex items-center justify-center text-gray-300">
                    <ArrowRight size={20} />
                </div>

                {/* Destination Input */}
                <div className="flex-1 w-full bg-gray-50 rounded-2xl px-4 py-3 md:py-4 flex items-center gap-3 border border-transparent focus-within:border-brand-300 focus-within:bg-white transition-all group cursor-pointer relative">
                     <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MapPin size={20} />
                     </div>
                     <div className="flex flex-col flex-1 min-w-0 relative">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">ส่งที่ (ปลายทาง)</label>
                        <select 
                            className="w-full bg-transparent font-bold text-gray-800 outline-none appearance-none cursor-pointer z-10"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        >
                            <option value="">เลือกจุดส่ง...</option>
                            {locations.map(loc => (
                                <option key={loc} value={loc} disabled={loc === origin}>{loc}</option>
                            ))}
                        </select>
                         <ChevronDown size={14} className="absolute right-0 top-1/2 translate-y-1 text-gray-400 pointer-events-none" />
                     </div>
                </div>

                {/* Search Button */}
                <button 
                    onClick={handleSearch}
                    disabled={!origin || !destination}
                    className={`w-full md:w-auto h-16 md:h-full px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${
                        origin && destination 
                        ? 'bg-brand-500 text-white hover:bg-brand-600 hover:scale-105 shadow-brand-500/30' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    <Car size={24} />
                    <span className="md:hidden lg:inline">คำนวณราคา</span>
                </button>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-32 md:mt-24">
        
        {/* Result Feedback Text */}
        {isSearching && baseRoutePrice && (
            <div id="fleet-results" className="text-center mb-10 animate-fade-in">
                <div className="inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100">
                    <span className="font-medium text-gray-500">{origin}</span>
                    <ArrowRight size={16} className="text-brand-400" />
                    <span className="font-medium text-gray-500">{destination}</span>
                    <div className="h-4 w-px bg-gray-200 mx-2"></div>
                    <span className="text-brand-600 font-bold flex items-center gap-1">
                        <CheckCircle2 size={16} /> พร้อมให้บริการ
                    </span>
                </div>
            </div>
        )}

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {fleet.map((car, index) => {
             // Calculate specific price for this car
             const carPrice = baseRoutePrice ? Math.round(baseRoutePrice * car.priceMultiplier / 100) * 100 : car.priceMultiplier * 1000; // Mock default price if no route

             return (
                <div 
                    key={car.id} 
                    className={`group relative bg-white rounded-[2rem] overflow-hidden border transition-all duration-500 flex flex-col ${
                        isSearching 
                        ? 'shadow-xl shadow-brand-500/5 hover:-translate-y-2 border-brand-100 hover:border-brand-300 ring-4 ring-transparent hover:ring-brand-50' 
                        : 'shadow-md border-gray-100 opacity-80 hover:opacity-100 grayscale hover:grayscale-0'
                    }`}
                >
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
                            car.tag === "Best Seller" ? 'bg-brand-500 text-white' : 'bg-white/90 text-gray-800'
                        }`}>
                            {car.tag}
                        </span>
                    </div>

                    {/* Image */}
                    <div className="relative h-56 bg-gray-50 overflow-hidden">
                        <img 
                            src={car.image} 
                            alt={car.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                         {/* Capacity Overlay */}
                         <div className="absolute bottom-3 right-3 flex gap-2">
                             <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1 shadow-sm">
                                 <Users size={12} className="text-brand-500"/> {car.capacity}
                             </div>
                             <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1 shadow-sm">
                                 <Briefcase size={12} className="text-brand-500"/> {car.luggage}
                             </div>
                         </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{car.title}</h3>
                            <p className="text-sm text-gray-400 font-medium">{car.model}</p>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                            {car.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-5 h-5 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 size={12} />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Pricing Area */}
                        <div className="mt-auto pt-6 border-t border-dashed border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase mb-0.5">
                                        {isSearching ? 'ราคารวมสุทธิ' : 'ราคาเริ่มต้น'}
                                    </p>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-3xl font-extrabold tracking-tight transition-colors ${isSearching ? 'text-brand-600' : 'text-gray-400'}`}>
                                            ฿{carPrice.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-gray-400">/ เที่ยว</span>
                                    </div>
                                </div>
                            </div>
                            
                            <Button 
                                fullWidth 
                                variant={isSearching ? 'primary' : 'outline'}
                                className={`!rounded-xl !py-3 !text-sm font-bold shadow-lg ${isSearching ? 'shadow-brand-500/30' : ''}`}
                                onClick={() => {
                                    if(!isSearching) {
                                        const element = document.querySelector('select');
                                        element?.focus();
                                        window.scrollTo({top: 0, behavior: 'smooth'});
                                    } else {
                                        alert(`จอง ${car.title} เส้นทาง ${origin} -> ${destination} ราคา ฿${carPrice}`);
                                    }
                                }}
                            >
                                {isSearching ? 'จองคันนี้เลย' : 'เลือกเส้นทางก่อน'}
                            </Button>
                        </div>
                    </div>
                </div>
             );
          })}
        </div>

        {/* Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
                { icon: <Clock size={24} />, title: "ตรงต่อเวลา", desc: "คนขับมารอรับก่อนเวลานัดหมาย 15 นาทีเสมอ" },
                { icon: <Shield size={24} />, title: "ปลอดภัยสูงสุด", desc: "รถตรวจสภาพทุกเดือน พร้อมประกันภัยชั้น 1" },
                { icon: <Sparkles size={24} />, title: "ราคาโปร่งใส", desc: "รวมค่าน้ำมัน ทางด่วน ไม่มีบวกเพิ่มหน้างาน" }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-gray-50 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
                        {item.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default TransferPage;