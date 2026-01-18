import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Briefcase, CheckCircle2, Car, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

const locations = [
  'เลือกสถานที่',
  'สนามบินภูเก็ต (HKT)',
  'ตัวเมืองภูเก็ต',
  'หาดป่าตอง',
  'สนามบินกระบี่ (KBV)',
  'อ่าวนาง (กระบี่)',
  'ตัวเมืองกระบี่',
  'เขาหลัก (พังงา)'
];

const fleet = [
  {
    id: 'sedan',
    name: 'Standard Sedan',
    model: 'Toyota Camry / Altis',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2672&auto=format&fit=crop',
    passengers: 3,
    luggage: 2,
    baseMultiplier: 1, // Price multiplier
    features: ['แอร์เย็นฉ่ำ', 'น้ำดื่มฟรี', 'เบาะหนัง', 'USB Charger']
  },
  {
    id: 'suv',
    name: 'Premium SUV',
    model: 'Toyota Fortuner',
    image: 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2186&auto=format&fit=crop',
    passengers: 4,
    luggage: 4,
    baseMultiplier: 1.3,
    features: ['กว้างขวาง', 'ขับเคลื่อน 4 ล้อ', 'เหมาะกับขึ้นเขา', 'WiFi']
  },
  {
    id: 'van',
    name: 'Luxury Van',
    model: 'Toyota Commuter VIP',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=2070&auto=format&fit=crop',
    passengers: 9,
    luggage: 8,
    baseMultiplier: 1.6,
    features: ['เบาะนวดไฟฟ้า', 'TV/Karaoke', 'พื้นที่กว้างมาก', 'หลังคาสูง']
  }
];

const Transfers: React.FC = () => {
  const [from, setFrom] = useState('เลือกสถานที่');
  const [to, setTo] = useState('เลือกสถานที่');
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simple pricing logic for demo purposes
  useEffect(() => {
    if (from === 'เลือกสถานที่' || to === 'เลือกสถานที่' || from === to) {
      setPrice(null);
      return;
    }

    let basePrice = 0;
    const isPhuket = from.includes('ภูเก็ต') || from.includes('ป่าตอง');
    const isKrabi = to.includes('กระบี่') || to.includes('อ่าวนาง');
    const isPhuketToKrabi = (isPhuket && isKrabi) || ((from.includes('กระบี่') || from.includes('อ่าวนาง')) && (to.includes('ภูเก็ต') || to.includes('ป่าตอง')));

    if (isPhuketToKrabi) {
      basePrice = 2500;
    } else if ((from.includes('สนามบิน') && to.includes('เมือง')) || (from.includes('เมือง') && to.includes('สนามบิน'))) {
      basePrice = 800; // Airport transfer same city
    } else {
      basePrice = 1500; // General transfer
    }

    setPrice(basePrice);
  }, [from, to]);

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      
      {/* Hero / Booking Widget Section */}
      <div className="relative bg-slate-900 h-[600px] flex items-center justify-center overflow-hidden mb-20">
         {/* Background */}
         <div className="absolute inset-0 opacity-40">
            <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/10"></div>

         <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
                บริการรถรับ-ส่ง ส่วนตัว <br/>
                <span className="text-cyan-400 text-3xl md:text-4xl mt-2 block">สะดวก ปลอดภัย ราคามาตรฐาน</span>
            </h1>

            {/* Widget Card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* From */}
                    <div className="relative group">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">รับจาก (Pick-up)</label>
                        <div className="flex items-center gap-3 border bg-slate-50 border-slate-200 rounded-xl px-4 py-3 group-focus-within:border-cyan-500 group-focus-within:ring-1 group-focus-within:ring-cyan-500 transition-all">
                            <MapPin className="text-cyan-500 flex-shrink-0" size={20} />
                            <select 
                                value={from} 
                                onChange={(e) => setFrom(e.target.value)}
                                className="w-full bg-transparent outline-none text-slate-700 font-medium cursor-pointer"
                            >
                                {locations.map(loc => (
                                    <option key={loc} value={loc} disabled={loc === to}>{loc}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* To */}
                    <div className="relative group">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ส่งที่ (Drop-off)</label>
                        <div className="flex items-center gap-3 border bg-slate-50 border-slate-200 rounded-xl px-4 py-3 group-focus-within:border-cyan-500 group-focus-within:ring-1 group-focus-within:ring-cyan-500 transition-all">
                            <MapPin className="text-rose-500 flex-shrink-0" size={20} />
                            <select 
                                value={to} 
                                onChange={(e) => setTo(e.target.value)}
                                className="w-full bg-transparent outline-none text-slate-700 font-medium cursor-pointer"
                            >
                                {locations.map(loc => (
                                    <option key={loc} value={loc} disabled={loc === from}>{loc}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Date & Pax (Visual Only for now) */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                     <div className="flex items-center gap-3 border-b border-slate-200 py-2">
                        <Calendar size={18} className="text-slate-400" />
                        <input type="date" className="bg-transparent outline-none text-slate-600 text-sm w-full" />
                     </div>
                     <div className="flex items-center gap-3 border-b border-slate-200 py-2">
                        <Users size={18} className="text-slate-400" />
                        <select className="bg-transparent outline-none text-slate-600 text-sm w-full">
                            <option>1-3 ท่าน</option>
                            <option>4-9 ท่าน</option>
                            <option>10+ ท่าน</option>
                        </select>
                     </div>
                 </div>

                {/* Price Display & Call to Action */}
                <div className={`transition-all duration-500 overflow-hidden ${price ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-cyan-50 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-cyan-100">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-cyan-800 font-medium mb-1">ราคาเริ่มต้นสำหรับเส้นทางนี้</p>
                            <div className="flex items-baseline gap-2 justify-center md:justify-start">
                                <span className="text-3xl font-bold text-cyan-600">฿{price?.toLocaleString()}</span>
                                <span className="text-xs text-slate-400">/ เที่ยว (รถเก๋ง)</span>
                            </div>
                        </div>
                        <button className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-cyan-500/30 hover:bg-cyan-700 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                            จองรถทันที <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {!price && (
                    <div className="text-center text-slate-400 text-sm py-2">
                        กรุณาเลือกต้นทางและปลายทางเพื่อดูราคา
                    </div>
                )}
            </div>
         </div>
      </div>

      {/* Fleet Section */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Fleet</span>
            <h2 className="text-3xl font-bold text-slate-900">ประเภทรถให้บริการ</h2>
            <p className="text-slate-500 mt-2">รถใหม่ สะอาด คนขับสุภาพ ชำนาญเส้นทาง</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fleet.map((car) => (
                <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
                    <div className="h-56 overflow-hidden bg-slate-100 relative">
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                            {car.model}
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">{car.name}</h3>
                        
                        {/* Capacity */}
                        <div className="flex items-center gap-6 mb-6">
                            <div className="flex items-center gap-2 text-slate-600">
                                <Users size={18} className="text-cyan-500" />
                                <span className="text-sm font-medium">{car.passengers} ท่าน</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Briefcase size={18} className="text-cyan-500" />
                                <span className="text-sm font-medium">{car.luggage} ใบ</span>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            {car.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                                    <CheckCircle2 size={14} className="text-green-500" />
                                    {feature}
                                </div>
                            ))}
                        </div>

                        {/* Specific Price for this car if calculated */}
                        {price && (
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between animate-fade-in-up">
                                <span className="text-sm text-slate-400">ราคาสุทธิ</span>
                                <span className="text-xl font-bold text-cyan-600">฿{(price * car.baseMultiplier).toLocaleString()}</span>
                            </div>
                        )}
                        
                        {!price && (
                             <div className="pt-4 border-t border-slate-100 flex items-center justify-center text-slate-400 text-sm">
                                เลือกเส้นทางเพื่อดูราคา
                             </div>
                        )}
                    </div>
                </div>
            ))}
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 mb-1">ปลอดภัย 100%</h4>
                    <p className="text-sm text-slate-500">รถทุกคันมีประกันภัยชั้น 1 และคนขับผ่านการตรวจสอบประวัติอาชญากรรม</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl">
                    <Clock size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 mb-1">ตรงต่อเวลา</h4>
                    <p className="text-sm text-slate-500">การันตีไปรับตรงเวลา หากเครื่องบินดีเลย์ เรารอให้ฟรี 60 นาที</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl">
                    <Car size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 mb-1">รถใหม่ สะอาด</h4>
                    <p className="text-sm text-slate-500">รถทุกคันอายุไม่เกิน 5 ปี และทำความสะอาดฆ่าเชื้อก่อนรับผู้โดยสารทุกครั้ง</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Transfers;