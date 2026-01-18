import { Compass, Map, Car, Hotel, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Compass size={32} />,
      title: t('services.oneDayTrip.title'),
      description: t('services.oneDayTrip.description'),
      linkText: t('services.oneDayTrip.linkText'),
      href: "/one-day-trip"
    },
    {
      icon: <Map size={32} />,
      title: t('services.packageTour.title'),
      description: t('services.packageTour.description'),
      linkText: t('services.packageTour.linkText'),
      href: "/package-tour"
    },
    {
      icon: <Car size={32} />,
      title: t('services.transfer.title'),
      description: t('services.transfer.description'),
      linkText: t('services.transfer.linkText'),
      href: "/transfer"
    },
    {
      icon: <Hotel size={32} />,
      title: t('services.hotel.title'),
      description: t('services.hotel.description'),
      linkText: t('services.hotel.linkText'),
      href: "/hotel"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50 relative">
      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold tracking-wider uppercase border border-primary-100">
            {t('services.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-gray-500 text-lg font-light">
            {t('services.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.href}
              className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-primary-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 flex flex-col items-start cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative mb-6 w-16 h-16 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-primary-500/30">
                {service.icon}
              </div>

              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 group-hover:text-gray-600">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-primary-500 font-semibold text-sm group/link">
                  <span>{service.linkText}</span>
                  <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
