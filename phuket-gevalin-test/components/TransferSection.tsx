import React from 'react';
import { ArrowRight, Users, Briefcase, Shield, Car } from 'lucide-react';
import Button from './Button';

const TransferSection: React.FC = () => {
  const fleet = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1000&auto=format&fit=crop",
      title: "Standard Sedan",
      model: "Toyota Altis / Camry",
      capacity: 3,
      luggage: 2,
      price: 790,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?q=80&w=1000&auto=format&fit=crop",
      title: "Standard SUV",
      model: "Toyota Fortuner / Pajero",
      capacity: 4,
      luggage: 4,
      price: 1100,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45f7?q=80&w=1000&auto=format&fit=crop",
      title: "Commuter Van",
      model: "Toyota Commuter",
      capacity: 12,
      luggage: 8,
      price: 1500,
    }
  ];

  return (
    <section id="transfer" className="py-24 bg-brand-50/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
                <Car size={20} className="text-brand-500" />
                <span className="text-brand-500 font-bold tracking-widest uppercase text-xs">Transport Service</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              บริการรถรับ-ส่ง <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-300">สนามบิน & ท่องเที่ยว</span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              เดินทางสะดวก ปลอดภัย ด้วยรถมาตรฐาน คนขับชำนาญเส้นทาง ราคามาตรฐานไม่มีบวกเพิ่ม
            </p>
          </div>
          
          <button className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-brand-500 text-gray-900 hover:text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg border border-gray-100 hover:border-brand-500">
            <span>ดูราคาและจองรถ</span>
            <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center shadow-sm group-hover:bg-white/20 group-hover:text-white transition-all">
                <ArrowRight size={16} />
            </div>
          </button>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleet.map((car) => (
            <div key={car.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-500/20 transition-all duration-500 border border-gray-100 relative flex flex-col">
              
              {/* Car Image Area */}
              <div className="relative h-60 overflow-hidden bg-gray-100">
                 <img 
                    src={car.image} 
                    alt={car.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                    <Shield size={14} className="text-green-500" />
                    <span>รวมคนขับ + น้ำมัน</span>
                 </div>
                 
                 {/* Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80"></div>
                 
                 <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold leading-tight mb-1">{car.title}</h3>
                    <p className="text-white/80 text-sm">{car.model}</p>
                 </div>
              </div>

              {/* Specs Only (Capacity & Luggage) */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-2xl border border-gray-100 text-gray-600 group-hover:border-brand-100 group-hover:bg-brand-50/50 transition-colors">
                        <Users size={24} className="text-brand-500 mb-1" />
                        <span className="font-bold text-lg text-gray-900">{car.capacity}</span>
                        <span className="text-xs text-gray-400">ผู้โดยสาร</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-gray-50 p-3 rounded-2xl border border-gray-100 text-gray-600 group-hover:border-brand-100 group-hover:bg-brand-50/50 transition-colors">
                        <Briefcase size={24} className="text-brand-500 mb-1" />
                        <span className="font-bold text-lg text-gray-900">{car.luggage}</span>
                        <span className="text-xs text-gray-400">กระเป๋า</span>
                    </div>
                </div>

                {/* Price & Action */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 mb-1">ราคาเริ่มต้น</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-brand-600">฿{car.price.toLocaleString()}</span>
                            <span className="text-xs text-gray-400">/ เที่ยว</span>
                        </div>
                    </div>
                    <Button variant="primary" className="!rounded-full shadow-brand-500/20 px-6">
                        จองรถ
                    </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransferSection;