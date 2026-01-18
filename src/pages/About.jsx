import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useLanguage } from "../context/LanguageContext";
import { FaBullseye, FaStar, FaMoneyBillWave, FaHandshake } from "react-icons/fa";

export default function About() {
  const { t } = useLanguage();

  const features = [
    {
      icon: FaBullseye,
      title: t("about.features.experience.title"),
      description: t("about.features.experience.description"),
    },
    {
      icon: FaStar,
      title: t("about.features.quality.title"),
      description: t("about.features.quality.description"),
    },
    {
      icon: FaMoneyBillWave,
      title: t("about.features.price.title"),
      description: t("about.features.price.description"),
    },
    {
      icon: FaHandshake,
      title: t("about.features.support.title"),
      description: t("about.features.support.description"),
    },
  ];

  const stats = [
    { number: "10+", label: t("about.stats.years") },
    { number: "5000+", label: t("about.stats.customers") },
    { number: "50+", label: t("about.stats.tours") },
    { number: "30+", label: t("about.stats.partners") },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
              {t("about.hero.subtitle")} <br />
              {t("about.hero.description")}
            </p>
          </div>
        </Container>
      </section>

      {/* Company Info Section */}
      <section className="py-6 md:py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {t("about.company.title")}
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>{t("about.company.description1")}</p>
                <p>{t("about.company.description2")}</p>
                <p>{t("about.company.description3")}</p>
              </div>
            </div>
            <div className="bg-neutral-200 aspect-[4/3] rounded-2xl flex items-center justify-center">
              <span className="text-neutral-500">{t("about.company.imagePlaceholder")}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600 font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Certifications */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              {t("about.certifications.title")}
            </h2>
            <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
              {t("about.certifications.description")}
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="overflow-hidden">
                <div className="aspect-[3/4] bg-neutral-100 overflow-hidden">
                  <img
                    src="/document/brc.jpg"
                    alt={t("about.certifications.brc.title")}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {t("about.certifications.brc.title")}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {t("about.certifications.brc.department")}
                    <br />
                    {t("about.certifications.brc.number")}
                  </p>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="aspect-[3/4] bg-neutral-100 overflow-hidden">
                  <img
                    src="/document/dbd.jpg"
                    alt={t("about.certifications.dbd.title")}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {t("about.certifications.dbd.title")}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {t("about.certifications.dbd.department")}
                    <br />
                    {t("about.certifications.dbd.number")}
                  </p>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="aspect-[3/4] bg-neutral-100 overflow-hidden">
                  <img
                    src="/document/tat_license.jpg"
                    alt={t("about.certifications.tat.title")}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {t("about.certifications.tat.title")}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {t("about.certifications.tat.department")}
                    <br />
                    {t("about.certifications.tat.number")}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-16 bg-neutral-100">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              {t("about.contact.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <Card className="p-8">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                  {t("about.contact.infoTitle")}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 mb-1">
                        {t("about.contact.address")}
                      </div>
                      <p className="text-neutral-600 leading-relaxed">
                        {t("about.contact.addressValue")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z" />
                        <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.086-1.391l-4.064-3.696z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 mb-1">
                        {t("about.contact.phone")}
                      </div>
                      <a
                        href="tel:+66123456789"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        099-257-0639
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 mb-1">
                        LINE
                      </div>
                      <a
                        href="https://line.me/ti/p/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        @phuketgevalin
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 mb-1">
                        {t("about.contact.email")}
                      </div>
                      <a
                        href="mailto:info@phuketgevalin.com"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        gevalin2019@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-4">
                    {t("about.contact.businessHours")}
                  </h4>
                  <div className="space-y-2 text-neutral-600">
                    <div className="flex justify-between">
                      <span>{t("about.contact.weekdays")}</span>
                      <span className="font-medium">08:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("about.contact.weekends")}</span>
                      <span className="font-medium">09:00 - 18:00</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Map */}
              <Card className="p-0 overflow-hidden">
                <div className="aspect-[4/3] bg-neutral-200 flex items-center justify-center">
                  <span className="text-neutral-500">Google Maps</span>
                </div>
                <div className="p-6">
                  <Button variant="outline" className="w-full">
                    {t("about.contact.openMaps")}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-primary text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("about.cta.title")}
            </h2>
            <p className="text-lg mb-8 text-primary-100">
              {t("about.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="accent">
                {t("about.cta.contactBtn")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white"
              >
                {t("about.cta.viewPackages")}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
