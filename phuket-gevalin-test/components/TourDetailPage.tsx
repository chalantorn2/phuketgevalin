
import React, { useState } from 'react';
import { 
  MapPin, Clock, Star, Users, CheckCircle2, XCircle, 
  Calendar, ChevronLeft, ShieldCheck, Info, Heart, Share2, Camera
} from 'lucide-react';
import Button from './Button';

interface TourDetailPageProps {
  tourId: number;
  onBack: () => void;
}

const TourDetailPage: React.FC<TourDetailPageProps> = ({ tourId, onBack }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(2);

  // Mock Data (In a real app, fetch by tourId)
  const tourData = {
    title: "ทัวร์เกาะพีพี & อ่าวมาหยา เต็มวัน ด้วยเรือสปีดโบ๊ทพรีเมียม",
    location: "กระบี่ / ภูเก็ต",
    rating: 4.9,
    reviews: 1240,
    price: 1990,
    discountPrice: 2800,
    duration: "8 ชั่วโมง (08:00 - 16:30)",
    images: [
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537956965359-3578dd3e846c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=1000&auto=format&fit=crop"
    ],
    highlights: [
      "ชมความงามของ 'อ่าวมาหยา' สถานที่ถ่ายทำภาพยนตร์ The Beach",
      "ดำน้ำดูปะการังที่จุดไฮไลท์ น้ำใสแจ๋ว",
      "รับประทานอาหารกลางวันบุฟเฟต์ริมชายหาด",
      "บริการเรือสปีดโบ๊ทลำใหม่ สะอาด ปลอดภัย"
    ],
    itinerary: [
      { time: "07:30 - 08:00", title: "รับท่านจากโรงแรม", desc: "รถตู้ปรับอากาศรอรับที่ล็อบบี้โรงแรม" },
      { time: "08:30", title: "เดินทางถึงท่าเรือ", desc: "เช็คอิน รับอุปกรณ์ดำน้ำ รับประทานของว่างชา/กาแฟ" },
      { time: "09:00", title: "ออกเดินทางสู่อ่าวมาหยา", desc: "ชมทัศนียภาพที่สวยงามระดับโลก เดินเล่นบนหาดทรายขาวละเอียด" },
      { time: "10:30", title: "อ่าวปิเละ (Pi Leh Lagoon)", desc: "กระโดดน้ำเล่นน้ำในลากูนสีมรกตที่โอบล้อมด้วยภูเขาหินปูน" },
      { time: "12:00", title: "รับประทานอาหารกลางวัน", desc: "บุฟเฟต์อาหารไทย-อินเตอร์ ณ ร้านอาหารบนเกาะพีพีดอน" },
      { time: "13:30", title: "ดำน้ำตื้น (Snorkeling)", desc: "จุดดำน้ำหน้าถ้ำไวกิ้ง ชมปะการังและฝูงปลา" },
      { time: "15:00", title: "เกาะไข่", desc: "พักผ่อนบนชายหาด เล่นน้ำ หรือขับเจ็ทสกี (มีค่าใช้จ่ายเพิ่ม)" },
      { time: "16:30", title: "เดินทางกลับ", desc: "ถึงท่าเรือและส่งท่านกลับโรงแรมโดยสวัสดิภาพ" }
    ],
    included: [
      "รถรับ-ส่ง โรงแรม-ท่าเรือ",
      "อาหารกลางวันบุฟเฟต์",
      "ผลไม้และเครื่องดื่มตลอดการเดินทาง",
      "อุปกรณ์ดำน้ำ (หน้ากาก, เสื้อชูชีพ)",
      "ไกด์นำเที่ยวอาชีพ",
      "ประกันอุบัติเหตุวงเงิน 1 ล้านบาท"
    ],
    excluded: [
      "ค่าธรรมเนียมอุทยานฯ (ชาวต่างชาติ)",
      "ทิปไกด์และคนขับรถ (ตามความพึงพอใจ)",
      "ค่าใช้จ่ายส่วนตัวอื่นๆ"
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 pt-20 animate-fade-in">
      
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors font-medium"
        >
            <ChevronLeft size={20} /> ย้อนกลับไปหน้าค้นหา
        </button>
      </div>

      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {tourData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-brand-500" />
                    {tourData.location}
                </div>
                <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">{tourData.rating}</span>
                    <span>({tourData.reviews} รีวิว)</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={16} className="text-blue-500" />
                    {tourData.duration}
                </div>
            </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-10 relative">
            <div className="md:col-span-2 h-full">
                <img src={tourData.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" alt="Main" />
            </div>
            <div className="md:col-span-1 flex flex-col gap-2 h-full">
                <div className="h-1/2 overflow-hidden">
                    <img src={tourData.images[1]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" alt="Sub 1" />
                </div>
                <div className="h-1/2 overflow-hidden">
                    <img src={tourData.images[2]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" alt="Sub 2" />
                </div>
            </div>
            <div className="md:col-span-1 h-full overflow-hidden relative group cursor-pointer">
                <img src={tourData.images[3]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Sub 3" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                        <Camera size={16} /> ดูรูปทั้งหมด
                    </div>
                </div>
            </div>
            
            {/* Action Buttons Overlay */}
            <div className="absolute top-4 right-4 flex gap-2">
                 <button className="p-2.5 bg-white rounded-full shadow-md text-gray-700 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                 </button>
                 <button className="p-2.5 bg-white rounded-full shadow-md text-gray-700 hover:text-brand-500 transition-colors">
                    <Share2 size={20} />
                 </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
            
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-10">
                
                {/* Highlights */}
                <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Star size={24} className="text-yellow-400 fill-yellow-400" /> 
                        ไฮไลท์ทัวร์นี้
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tourData.highlights.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 size={14} />
                                </div>
                                <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Itinerary Redesigned - Simplified as requested */}
                <section className="relative">
                    <div className="absolute left-[23px] md:left-[108px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-200 to-gray-100"></div>
                    
                    <div className="space-y-6">
                        {tourData.itinerary.map((item, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row gap-4 md:gap-0 group">
                                
                                {/* Time Column */}
                                <div className="pl-12 md:pl-0 md:w-[108px] flex-shrink-0 flex md:justify-end md:pr-8 items-start pt-1">
                                    <span className="text-brand-600 font-bold font-mono text-base md:text-lg bg-gray-50 md:bg-transparent px-2 md:px-0 rounded-md inline-block">
                                        {item.time.split(' - ')[0]}
                                    </span>
                                </div>

                                {/* Simple Dot Marker (No Icons) */}
                                <div className="absolute left-3 md:left-[108px] md:-translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-brand-200 z-10 group-hover:scale-125 group-hover:border-brand-500 transition-all shadow-sm"></div>

                                {/* Content Card */}
                                <div className="pl-12 md:pl-8 flex-1">
                                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-100 hover:-translate-y-1 transition-all duration-300">
                                         {/* No h4 header, just styled text */}
                                         <div className="text-lg font-bold text-gray-900 mb-1">
                                            {item.title}
                                         </div>
                                         <p className="text-gray-500 text-sm leading-relaxed">
                                            {item.desc}
                                         </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inclusions */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="text-green-500" /> สิ่งที่รวมในแพ็กเกจ
                        </h3>
                        <ul className="space-y-3">
                            {tourData.included.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <XCircle className="text-red-400" /> สิ่งที่ไม่รวม
                        </h3>
                        <ul className="space-y-3">
                            {tourData.excluded.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <XCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                 {/* Additional Info */}
                 <div className="bg-brand-50/50 rounded-2xl p-6 border border-brand-100 flex gap-4 items-start">
                    <Info className="text-brand-500 flex-shrink-0 mt-1" />
                    <div className="text-sm text-gray-600">
                        <p className="font-bold text-gray-900 mb-1">ข้อแนะนำเพิ่มเติม</p>
                        <p>โปรแกรมอาจมีการเปลี่ยนแปลงตามสภาพอากาศและระดับน้ำขึ้น-ลง โดยคำนึงถึงความปลอดภัยของนักท่องเที่ยวเป็นสำคัญ สตรีมีครรภ์ไม่แนะนำให้เดินทางโดยเรือสปีดโบ๊ท</p>
                    </div>
                 </div>
            </div>

            {/* Right Sticky Sidebar (Booking Widget) */}
            <div className="lg:col-span-1">
                <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 overflow-hidden">
                    {/* Decorative Top */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-400 to-cyan-300"></div>

                    {/* Price Header */}
                    <div className="flex flex-col mb-6 pb-6 border-b border-gray-100">
                         <span className="text-sm text-gray-400 font-medium mb-1">ราคาเริ่มต้นต่อท่าน</span>
                         <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold text-brand-600">฿{tourData.price.toLocaleString()}</span>
                            <span className="text-sm text-gray-400 line-through">฿{tourData.discountPrice.toLocaleString()}</span>
                         </div>
                         <div className="mt-2 inline-flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md w-max">
                            <ShieldCheck size={12} /> การันตีราคาดีที่สุด
                         </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">วันที่เดินทาง</label>
                            <div className="relative">
                                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-200 focus:border-brand-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">จำนวนผู้เดินทาง</label>
                             <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3">
                                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Users size={18} className="text-gray-400" /> ผู้ใหญ่
                                </span>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => setGuests(Math.max(1, guests - 1))}
                                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-brand-300 hover:text-brand-500 disabled:opacity-50"
                                        disabled={guests <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="w-4 text-center font-bold text-gray-900">{guests}</span>
                                    <button 
                                        onClick={() => setGuests(guests + 1)}
                                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-brand-300 hover:text-brand-500"
                                    >
                                        +
                                    </button>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Total & Action */}
                    <div className="bg-brand-50/50 rounded-xl p-4 mb-6 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-600">ราคารวมสุทธิ</span>
                        <span className="text-xl font-bold text-brand-700">฿{(tourData.price * guests).toLocaleString()}</span>
                    </div>

                    <Button fullWidth className="!py-3.5 !text-base shadow-lg shadow-brand-500/30 mb-3">
                        จองทันที
                    </Button>
                    <button className="w-full py-3 text-sm font-bold text-gray-500 hover:text-brand-600 transition-colors bg-transparent border border-gray-200 rounded-xl hover:border-brand-200">
                        สอบถามข้อมูลเพิ่มเติม
                    </button>
                    
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;
