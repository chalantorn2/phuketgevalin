import React, { useState, useEffect } from 'react';
import { Calendar, Map, CheckCircle2, ArrowRight, Clock, Users, Coffee, Bed, Car, Plane } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: 'แอ่วเหนือสุดฟิน: เชียงใหม่ - ปาย - แม่ฮ่องสอน',
    duration: '4 วัน 3 คืน',
    category: 'ภูเขา & ธรรมชาติ',
    images: ['https://images.unsplash.com/photo-1599584742438-2325785c4b12?q=80&w=2067&auto=format&fit=crop'],
    price: '8,900',
    originalPrice: '12,500',
    includes: ['โรงแรม 4 ดาว', 'รถตู้ VIP', 'อาหาร 9 มื้อ', 'ไกด์ท้องถิ่น'],
    highlights: ['ชมทะเลหมอกห้วยน้ำดัง', 'ถนนคนเดินปาย', 'หมู่บ้านรักไทย', 'ปางอุ๋ง'],
    tag: 'Best Seller 🏆'
  },
  {
    id: 2,
    title: 'อันดามัน สวรรค์เมืองใต้: ภูเก็ต - พีพี - อ่าวพังงา',
    duration: '3 วัน 2 คืน',
    category: 'ทะเล & ชายหาด',
    images: ['https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=2001&auto=format&fit=crop'],
    price: '6,500',
    originalPrice: '9,900',
    includes: ['รีสอร์ทติดทะเล', 'เรือสปีดโบ๊ท', 'รถรับส่งสนามบิน', 'อาหารซีฟู้ด'],
    highlights: ['ดำน้ำเกาะพีพี', 'ล่องเรืออ่าวพังงา', 'แหลมพรหมเทพ', 'เมืองเก่าภูเก็ต'],
    tag: 'Summer Deal ☀️'
  },
  {
    id: 3,
    title: 'สโลว์ไลฟ์ ณ น่าน: ปัว - บ่อเกลือ - สะปัน',
    duration: '3 วัน 2 คืน',
    category: 'วัฒนธรรม & ชุมชน',
    images: ['https://images.unsplash.com/photo-1627543261772-2432c6339178?q=80&w=2070&auto=format&fit=crop'],
    price: '5,900',
    originalPrice: '7,500',
    includes: ['โฮมสเตย์วิวนา', 'รถนำเที่ยว', 'ขันโตกดินเนอร์', 'ประกันภัย'],
    highlights: ['วัดภูมินทร์', 'ถนนลอยฟ้า', 'ทำเกลือภูเขา', 'กาแฟไทลื้อ'],
    tag: null
  },
  {
    id: 4,
    title: 'ดำน้ำลึก สิมิลัน - สุรินทร์ (พักบนเรือ Liveaboard)',
    duration: '2 วัน 1 คืน',
    category: 'ทะเล & ชายหาด',
    images: ['https://images.unsplash.com/photo-1544551763-46a8723ba3f9?q=80&w=2070&auto=format&fit=crop'],
    price: '12,900',
    originalPrice: '15,000',
    includes: ['ห้องพักบนเรือ', 'อุปกรณ์ดำน้ำ', 'ครูสอนดำน้ำ', 'อาหาร 5 มื้อ'],
    highlights: ['จุดดำน้ำริเชลิว', 'กองหินม้วนเดียว', 'ฉลามวาฬ (ตามฤดู)', 'พระอาทิตย์ตกกลางทะเล'],
    tag: 'Premium 💎'
  }
];

const categories = ['ทั้งหมด', 'ภูเขา & ธรรมชาติ', 'ทะเล & ชายหาด', 'วัฒนธรรม & ชุมชน', 'ครอบครัว'];

const PackageTours: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPackages = selectedCategory === 'ทั้งหมด' 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      
      {/* Header Section */}
      <div className="bg-slate-900 text-white py-16 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                แพ็กเกจทัวร์สุดพรีเมียม
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg font-light">
                สัมผัสประสบการณ์การท่องเที่ยวที่เหนือระดับ วางแผนครบจบในที่เดียว 
                ทั้งที่พัก การเดินทาง และกิจกรรมสุดพิเศษ
            </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        
        {/* Category Filter (Pills) */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                        selectedCategory === cat 
                        ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-200 ring-offset-2' 
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Packages List (Horizontal Layout) */}
        <div className="flex flex-col gap-8">
            {filteredPackages.map((pkg) => (
                <div 
                    key={pkg.id} 
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-cyan-100/50 transition-all duration-500 flex flex-col md:flex-row min-h-[320px]"
                >
                    {/* Image Section (Left) */}
                    <div className="md:w-2/5 relative overflow-hidden">
                        <img 
                            src={pkg.images[0]} 
                            alt={pkg.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10"></div>
                        
                        {pkg.tag && (
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur text-cyan-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                    {pkg.tag}
                                </span>
                            </div>
                        )}
                        <div className="absolute bottom-4 left-4 text-white md:hidden">
                            <span className="flex items-center gap-2 text-sm font-medium">
                                <Clock size={16} /> {pkg.duration}
                            </span>
                        </div>
                    </div>

                    {/* Content Section (Right) */}
                    <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-cyan-600 text-xs font-bold tracking-wider uppercase bg-cyan-50 px-2 py-1 rounded">
                                    {pkg.category}
                                </span>
                                <div className="hidden md:flex items-center gap-1.5 text-slate-500 text-sm font-medium bg-slate-50 px-3 py-1 rounded-full">
                                    <Clock size={16} />
                                    {pkg.duration}
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-cyan-600 transition-colors">
                                {pkg.title}
                            </h3>

                            {/* Highlights Timeline */}
                            <div className="mb-6">
                                <p className="text-xs text-slate-400 font-bold uppercase mb-2">ไฮไลท์การเดินทาง</p>
                                <div className="flex flex-wrap gap-2">
                                    {pkg.highlights.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Includes Icons */}
                            <div className="flex items-center gap-6 border-t border-slate-100 pt-4 mb-4 md:mb-0">
                                <div className="flex flex-col items-center gap-1 text-slate-400">
                                    <Bed size={18} />
                                    <span className="text-[10px]">ที่พัก</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 text-slate-400">
                                    <Car size={18} />
                                    <span className="text-[10px]">รถรับส่ง</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 text-slate-400">
                                    <Coffee size={18} />
                                    <span className="text-[10px]">อาหาร</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 text-slate-400">
                                    <Users size={18} />
                                    <span className="text-[10px]">ไกด์</span>
                                </div>
                                <div className="w-px h-8 bg-slate-200 mx-2"></div>
                                <span className="text-xs text-slate-500">รวมทุกอย่างแล้ว!</span>
                            </div>
                        </div>

                        {/* Footer / Price */}
                        <div className="flex items-end justify-between mt-4">
                            <div>
                                <p className="text-xs text-slate-400 mb-1">ราคาเริ่มต้น / ท่าน</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-cyan-600">฿{pkg.price}</span>
                                    <span className="text-sm text-slate-400 line-through">฿{pkg.originalPrice}</span>
                                </div>
                            </div>
                            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-cyan-500/30 flex items-center gap-2 transform active:scale-95">
                                จองแพ็กเกจ <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default PackageTours;