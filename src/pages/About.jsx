import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { number: "10+", label: t("about.stats.years") },
    { number: "5000+", label: t("about.stats.customers") },
    { number: "50+", label: t("about.stats.tours") },
    { number: "30+", label: t("about.stats.partners") },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative bg-primary-900 h-[400px] mb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop"
            alt="About Us Header"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent h-32"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-20">
          <span className="text-primary-300 font-bold tracking-[0.2em] uppercase text-sm mb-2">
            Phuket Gevalin Tour
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {t("about.hero.title")}
          </h1>
          <p className="text-gray-100 text-lg max-w-2xl font-light drop-shadow-md">
            {t("about.hero.subtitle")}
          </p>
        </div>
      </div>

      {/* Company Info Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-primary-500 font-bold tracking-[0.15em] uppercase text-xs mb-4 block">
              {t("about.company.badge") || "Our Story"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t("about.company.title")}
            </h2>
            <div className="space-y-4 text-base text-gray-600 leading-relaxed">
              <p>{t("about.company.description1")}</p>
              <p>{t("about.company.description2")}</p>
              <p>{t("about.company.description3")}</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop"
              alt="Our Team"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="text-primary-500 font-bold tracking-[0.15em] uppercase text-xs mb-2 block">
              Trusted & Certified
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("about.certifications.title")}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t("about.certifications.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                <img
                  src="/document/brc.jpg"
                  alt={t("about.certifications.brc.title")}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {t("about.certifications.brc.title")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("about.certifications.brc.department")}
                  <br />
                  <span className="text-primary-600 font-medium">{t("about.certifications.brc.number")}</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                <img
                  src="/document/dbd.jpg"
                  alt={t("about.certifications.dbd.title")}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {t("about.certifications.dbd.title")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("about.certifications.dbd.department")}
                  <br />
                  <span className="text-primary-600 font-medium">{t("about.certifications.dbd.number")}</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                <img
                  src="/document/tat_license.jpg"
                  alt={t("about.certifications.tat.title")}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {t("about.certifications.tat.title")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("about.certifications.tat.department")}
                  <br />
                  <span className="text-primary-600 font-medium">{t("about.certifications.tat.number")}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-primary-500 font-bold tracking-[0.15em] uppercase text-xs mb-2 block">
                {t("about.contact.badge") || "Get In Touch"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t("about.contact.title")}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t("about.contact.infoTitle")}
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        {t("about.contact.address")}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {t("about.contact.addressValue")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z" />
                        <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.086-1.391l-4.064-3.696z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        {t("about.contact.phone")}
                      </div>
                      <a
                        href="tel:+66992570639"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        099-257-0639
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        LINE
                      </div>
                      <a
                        href="https://line.me/ti/p/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        @phuketgevalin
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        {t("about.contact.email")}
                      </div>
                      <a
                        href="mailto:gevalin2019@gmail.com"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        gevalin2019@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">
                    {t("about.contact.businessHours")}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>{t("about.contact.weekdays")}</span>
                      <span className="font-medium text-gray-700">08:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("about.contact.weekends")}</span>
                      <span className="font-medium text-gray-700">09:00 - 18:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2744444!2d98.3886!3d7.8786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTInNDMuMCJOIDk4wrAyMycxOS4wIkU!5e0!3m2!1sen!2sth!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  ></iframe>
                </div>
                <div className="p-5">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all"
                  >
                    {t("about.contact.openMaps")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-primary-900 py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
            alt="CTA Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("about.cta.title")}
            </h2>
            <p className="text-lg mb-8 text-gray-200">
              {t("about.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg">
                {t("about.cta.contactBtn")}
              </button>
              <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                {t("about.cta.viewPackages")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
