import React from 'react';
import { Compass, Map, Car, Hotel, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Compass size={32} />,
      title: "วันเดย์ทริป",
      description: "ทัวร์เที่ยวสถานที่ท่องเที่ยวยอดนิยม แบบไป-กลับภายในวันเดียว สนุกครบจบในวันเดียว",
      linkText: "ดูโปรแกรมทัวร์"
    },
    {
      icon: <Map size={32} />,
      title: "แพ็กเกจทัวร์",
      description: "แพ็กเกจทัวร์หลายวัน พร้อมที่พักและมัคคุเทศก์มืออาชีพ ดูแลตลอดการเดินทาง",
      linkText: "ดูแพ็กเกจทั้งหมด"
    },
    {
      icon: <Car size={32} />,
      title: "บริการรถรับ-ส่ง",
      description: "บริการรถรับ-ส่งสนามบิน โรงแรม และสถานที่ท่องเที่ยว ด้วยรถคุณภาพดี สะอาด ปลอดภัย",
      linkText: "จองรถรับ-ส่ง"
    },
    {
      icon: <Hotel size={32} />,
      title: "ที่พักโรงแรม",
      description: "ดีลโรงแรมที่พักคุณภาพ ทำเลดี ราคาเหมาะสม พร้อมบริการเสริมครบครัน",
      linkText: "ค้นหาที่พัก"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold tracking-wider uppercase border border-brand-100">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            บริการของเรา
          </h2>
          <p className="text-gray-500 text-lg font-light">
            เลือกบริการที่ตรงกับความต้องการของคุณ เพื่อประสบการณ์การท่องเที่ยวที่ดีที่สุด
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-brand-100 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col items-start cursor-pointer relative overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon */}
              <div className="relative mb-6 w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-brand-500/30">
                {service.icon}
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 group-hover:text-gray-600">
                  {service.description}
                </p>
                
                {/* Link/Action */}
                <div className="flex items-center gap-2 text-brand-500 font-semibold text-sm group/link">
                  <span>{service.linkText}</span>
                  <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;