import React from 'react';
import { ShieldCheck, Headphones, CreditCard, Award } from 'lucide-react';

const TrustBar: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "ปลอดภัย 100%",
      desc: "ได้รับใบอนุญาตถูกต้อง"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "การันตีราคาดีที่สุด",
      desc: "ไม่บวกเพิ่มจุกจิก"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "ดูแล 24 ชม.",
      desc: "ทีมงานพร้อมช่วยเหลือ"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "ชำระเงินง่าย",
      desc: "รองรับทุกธนาคาร"
    }
  ];

  return (
    <div className="bg-white border-b border-gray-100 relative z-20 -mt-8 mx-6 rounded-2xl shadow-xl lg:mx-auto lg:max-w-6xl lg:-mt-16">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center justify-center gap-3 p-6 text-center md:text-left group cursor-default hover:bg-gray-50 transition-colors first:rounded-l-2xl last:rounded-r-2xl">
            <div className="p-3 bg-brand-50 text-brand-500 rounded-full group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm md:text-base">{item.title}</h4>
              <p className="text-gray-500 text-xs hidden md:block">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;