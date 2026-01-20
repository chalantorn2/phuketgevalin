import React, { useState } from 'react';
import { 
  MapPin, Clock, Star, Users, CheckCircle2, XCircle, 
  Calendar, ChevronLeft, ShieldCheck, Info, Heart, Share2, Camera, Plane,
  Coffee, Utensils, Moon, Bed
} from 'lucide-react';
import Button from './Button';

interface PackageDetailPageProps {
  packageId: number;
  onBack: () => void;
}

const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ packageId, onBack }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(2);

  // Mock Data (In a real app, fetch by packageId)
  const packageData = {
    title: "ทัวร์ญี่ปุ่น โตเกียว ฟูจิ คาวากูจิโกะ โอซาก้า 5 วัน 3 คืน",
    location: "ญี่ปุ่น",
    airline: "Thai Airways (TG)",
    rating: 4.9,
    reviews: 215,
    price: 29900,
    discountPrice: 35900,
    duration: "5 วัน 3 คืน",
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528360983277-13d9b152c611?q=80&w=1000&auto=format&fit=crop"
    ],
    highlights: [
      "บินตรงการบินไทย บริการแบบ Full Service สะสมไมล์ได้",
      "พักโรงแรมหรูระดับ 4 ดาว ย่านแหล่งช้อปปิ้ง",
      "บุฟเฟต์ขาปูยักษ์ไม่อั้น พร้อมน้ำจิ้มซีฟู้ดรสเด็ด",
      "อิสระช้อปปิ้งย่านชินจูกุ 1 วันเต็ม",
      "ชมภูเขาไฟฟูจิที่โออิชิพาร์ค"
    ],
    itinerary: [
      { 
        day: "01", 
        title: "กรุงเทพฯ (สนามบินสุวรรณภูมิ) - สนามบินฮาเนดะ", 
        desc: "พร้อมกันที่สนามบินสุวรรณภูมิ เคาน์เตอร์การบินไทย เจ้าหน้าที่คอยให้การต้อนรับและอำนวยความสะดวก ตรวจเช็คสัมภาระและเอกสารการเดินทาง",
        meals: { b: false, l: false, d: false, note: "อิสระตามอัธยาศัย" },
        accommodation: "Narita Excel Hotel Tokyu หรือเทียบเท่า"
      },
      { 
        day: "02", 
        title: "โตเกียว - วัดอาซากุสะ - ถ่ายรูปโตเกียวสกายทรี - ชินจูกุ", 
        desc: "เดินทางถึงสนามบินฮาเนดะ นำท่านสู่วัดอาซากุสะ นมัสการเจ้าแม่กวนอิมทองคำ เดินเล่นถนนนากามิเสะ จากนั้นอิสระช้อปปิ้งย่านชินจูกุ แหล่งช้อปปิ้งที่ใหญ่ที่สุดในโตเกียว",
        meals: { b: true, l: true, d: true, note: "เย็น: บุฟเฟต์ขาปู" },
        accommodation: "Fujisan Station Hotel หรือเทียบเท่า"
      },
      { 
        day: "03", 
        title: "ภูเขาไฟฟูจิ - โออิชิพาร์ค - หมู่บ้านน้ำใส - โกเทมบะ เอาท์เล็ท", 
        desc: "นำท่านเดินทางสู่ภูเขาไฟฟูจิ ชมความงามที่สวนโออิชิพาร์ค จากนั้นเยี่ยมชมหมู่บ้านน้ำใส โอชิโนะฮัคไค และปิดท้ายด้วยการช้อปปิ้งสินค้าแบรนด์เนมที่โกเทมบะ พรีเมียม เอาท์เล็ท",
        meals: { b: true, l: true, d: false, note: "เย็น: อิสระตามอัธยาศัย" },
        accommodation: "Sunshine City Prince Hotel หรือเทียบเท่า"
      },
      { 
        day: "04", 
        title: "อิสระท่องเที่ยวตามอัธยาศัย หรือ ซื้อทัวร์เสริมดิสนีย์แลนด์", 
        desc: "อิสระท่องเที่ยวเต็มวัน ให้ท่านได้สัมผัสบรรยากาศกรุงโตเกียวด้วยตัวเอง หรือเลือกซื้อทัวร์เสริมสวนสนุกระดับโลก โตเกียวดิสนีย์แลนด์ (ไม่รวมค่าตั๋ว)",
        meals: { b: true, l: false, d: false, note: "อิสระอาหารกลางวันและเย็น" },
        accommodation: "Sunshine City Prince Hotel หรือเทียบเท่า"
      },
      { 
        day: "05", 
        title: "สนามบินนาริตะ - กรุงเทพฯ", 
        desc: "รับประทานอาหารเช้า เดินทางสู่สนามบินนาริตะ เพื่อเดินทางกลับกรุงเทพฯ โดยสวัสดิภาพ ถึงกรุงเทพฯ โดยสวัสดิภาพพร้อมความประทับใจ",
        meals: { b: true, l: false, d: false, note: "" },
        accommodation: ""
      }
    ],
    included: [
      "ตั๋วเครื่องบินไป-กลับ ชั้นประหยัด รวมน้ำหนักกระเป๋า 30 กก.",
      "ค่าที่พักโรงแรมระดับ 4 ดาว (พักห้องละ 2-3 ท่าน)",
      "ค่าอาหารตามที่ระบุในรายการ",
      "ค่ารถโค้ชปรับอากาศนำเที่ยวตามรายการ",
      "ค่าเข้าชมสถานที่ตามรายการ",
      "ประกันอุบัติเหตุวงเงิน 1 ล้านบาท"
    ],
    excluded: [
      "ค่าทิปไกด์และคนขับรถ 1,500 บาท/ท่าน",
      "ค่าใช้จ่ายส่วนตัวนอกเหนือรายการ",
      "ค่าอาหารมื้อที่ไม่ได้ระบุ",
      "ภาษีมูลค่าเพิ่ม 7%"
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
            <ChevronLeft size={20} /> ย้อนกลับไปหน้าแพ็กเกจ
        </button>
      </div>

      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
                 <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-bold">
                    {packageData.duration}
                 </span>
                 <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Plane size={12} /> {packageData.airline}
                 </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {packageData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-brand-500" />
                    {packageData.location}
                </div>
                <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">{packageData.rating}</span>
                    <span>({packageData.reviews} รีวิว)</span>
                </div>
            </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-10 relative">
            <div className="md:col-span-2 h-full">
                <img src={packageData.images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" alt="Main" />
            </div>
            <div className="md:col-span-1 flex flex-col gap-2 h-full">
                <div className="h-1/2 overflow-hidden">
                    <img src={packageData.images[1]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" alt="Sub 1" />
                </div>
                <div className="h-1/2 overflow-hidden">
                    <img src={packageData.images[2]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" alt="Sub 2" />
                </div>
            </div>
            <div className="md:col-span-1 h-full overflow-hidden relative group cursor-pointer">
                <img src={packageData.images[3]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Sub 3" />
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
                        ไฮไลท์แพ็กเกจ
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {packageData.highlights.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 size={14} />
                                </div>
                                <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Itinerary (Enhanced Timeline) */}
                <section className="relative pl-2 md:pl-4">
                     <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <Clock size={24} className="text-brand-500" /> 
                        ตารางการเดินทาง
                    </h2>

                    <div className="space-y-8">
                        {packageData.itinerary.map((item, index) => (
                            <div key={index} className="relative flex gap-6 md:gap-8 group">
                                
                                {/* Timeline Line */}
                                {index !== packageData.itinerary.length - 1 && (
                                    <div className="absolute left-[19px] md:left-[23px] top-10 bottom-[-32px] w-[2px] bg-gray-200 group-hover:bg-brand-200 transition-colors"></div>
                                )}

                                {/* Day Badge (Number) */}
                                <div className="flex-shrink-0 z-10">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm md:text-base shadow-lg shadow-brand-500/20 ring-4 ring-white group-hover:scale-110 transition-transform">
                                        {item.day}
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="flex-1 pb-2">
                                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                         
                                         {/* Decorative Corner */}
                                         <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-brand-50 to-transparent -mr-8 -mt-8 rounded-full pointer-events-none"></div>

                                         <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-snug">
                                            {item.title}
                                         </h3>
                                         
                                         <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                            {item.desc}
                                         </p>

                                         {/* Info Section (Meals & Accommodation) */}
                                         <div className="space-y-4 pt-5 border-t border-gray-100 mt-2">
                                            
                                            {/* Accommodation Row */}
                                            {item.accommodation && (
                                                <div className="flex items-start md:items-center gap-3">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[70px] flex items-center gap-1.5 mt-1 md:mt-0">
                                                        <Bed size={14} className="text-brand-400" /> ที่พัก:
                                                    </span>
                                                    <span className="text-sm font-bold text-brand-800 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100 w-full md:w-auto">
                                                        {item.accommodation}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Meals Row */}
                                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider min-w-[70px] flex items-center gap-1.5">
                                                    <Utensils size={14} className="text-brand-400" /> มื้ออาหาร:
                                                </span>
                                                
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${item.meals.b ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                                        <Coffee size={14} /> เช้า
                                                    </div>
                                                    
                                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${item.meals.l ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                                        <Utensils size={14} /> กลางวัน
                                                    </div>

                                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${item.meals.d ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                                        <Moon size={14} /> เย็น
                                                    </div>

                                                    {item.meals.note && (
                                                        <span className="text-xs text-gray-500 italic md:ml-2 md:border-l md:pl-3 border-gray-200">
                                                            {item.meals.note}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                         </div>
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
                            <CheckCircle2 className="text-green-500" /> อัตราค่าบริการรวม
                        </h3>
                        <ul className="space-y-3">
                            {packageData.included.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <XCircle className="text-red-400" /> อัตราค่าบริการไม่รวม
                        </h3>
                        <ul className="space-y-3">
                            {packageData.excluded.map((item, i) => (
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
                        <p className="font-bold text-gray-900 mb-1">เงื่อนไขสำคัญ</p>
                        <p>กรุณาจองล่วงหน้าอย่างน้อย 30 วันก่อนการเดินทาง / โปรแกรมอาจมีการเปลี่ยนแปลงตามความเหมาะสมของเที่ยวบินและสภาพอากาศ</p>
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
                            <span className="text-3xl font-extrabold text-brand-600">฿{packageData.price.toLocaleString()}</span>
                            <span className="text-sm text-gray-400 line-through">฿{packageData.discountPrice.toLocaleString()}</span>
                         </div>
                         <div className="mt-2 inline-flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md w-max">
                            <ShieldCheck size={12} /> รวมตั๋วเครื่องบินแล้ว
                         </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 ml-1">รอบเดินทาง</label>
                            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-brand-200 focus:border-brand-500 outline-none cursor-pointer">
                                <option>เลือกวันเดินทาง...</option>
                                <option>15 ต.ค. - 19 ต.ค.</option>
                                <option>25 ต.ค. - 29 ต.ค.</option>
                                <option>01 พ.ย. - 05 พ.ย.</option>
                            </select>
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
                        <span className="text-xl font-bold text-brand-700">฿{(packageData.price * guests).toLocaleString()}</span>
                    </div>

                    <Button fullWidth className="!py-3.5 !text-base shadow-lg shadow-brand-500/30 mb-3">
                        จองแพ็กเกจ
                    </Button>
                    <button className="w-full py-3 text-sm font-bold text-gray-500 hover:text-brand-600 transition-colors bg-transparent border border-gray-200 rounded-xl hover:border-brand-200">
                        ดาวน์โหลดโปรแกรมทัวร์ (PDF)
                    </button>
                    
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;