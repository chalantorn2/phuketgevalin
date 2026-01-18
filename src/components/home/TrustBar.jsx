import { ShieldCheck, Headphones, CreditCard, Award } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function TrustBar() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t('trustBar.safe'),
      desc: t('trustBar.safeDesc'),
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t('trustBar.bestPrice'),
      desc: t('trustBar.bestPriceDesc'),
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: t('trustBar.support'),
      desc: t('trustBar.supportDesc'),
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: t('trustBar.payment'),
      desc: t('trustBar.paymentDesc'),
    },
  ];

  return (
    <div className="bg-white border-b border-gray-100 relative z-20 -mt-6 mx-6 rounded-2xl shadow-xl lg:mx-auto lg:max-w-6xl lg:-mt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-center gap-3 p-6 text-center md:text-left group cursor-default hover:bg-gray-50 transition-colors first:rounded-l-2xl last:rounded-r-2xl"
          >
            <div className="p-3 bg-primary-50 text-primary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm md:text-base">
                {item.title}
              </h4>
              <p className="text-gray-500 text-xs hidden md:block">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
