import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './Home.css';

export default function Home() {
  const services = [
    {
      title: 'วันเดย์ทริป',
      description: 'ทัวร์เที่ยวสถานที่ท่องเที่ยวยอดนิยม แบบไป-กลับภายในวันเดียว',
      icon: '🏝️',
      href: '/one-day-trip',
    },
    {
      title: 'แพ็กเกจทัวร์',
      description: 'แพ็กเกจทัวร์หลายวัน พร้อมที่พักและมัคคุเทศก์มืออาชีพ',
      icon: '🎒',
      href: '/package-tour',
    },
    {
      title: 'บริการรถรับ-ส่ง',
      description: 'บริการรถรับ-ส่งสนามบิน โรงแรม และสถานที่ท่องเที่ยว',
      icon: '🚗',
      href: '/transfer',
    },
    {
      title: 'ที่พักโรงแรม',
      description: 'โรงแรมคุณภาพ ทำเลดี ราคาเหมาะสม พร้อมบริการครบครัน',
      icon: '🏨',
      href: '/hotel',
    },
  ];

  const recommendedTours = [
    {
      image: '/images/tours/phi-phi.jpg',
      title: 'เกาะพีพี + เกาะไข่',
      location: 'กระบี่',
      price: '1,500',
      originalPrice: '1,800',
    },
    {
      image: '/images/tours/james-bond.jpg',
      title: 'เกาะเจมส์บอนด์ + พังงา',
      location: 'พังงา',
      price: '1,200',
      originalPrice: '1,500',
    },
    {
      image: '/images/tours/similan.jpg',
      title: 'เกาะสิมิลัน',
      location: 'พังงา',
      price: '2,500',
      originalPrice: '2,800',
    },
  ];

  const popularTransfers = [
    {
      route: 'สนามบิน → โรงแรม (ในเมือง)',
      price: '600',
    },
    {
      route: 'สนามบิน → ป่าตอง',
      price: '800',
    },
    {
      route: 'สนามบิน → กะตะ/กะรน',
      price: '900',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section hero-shine">
        <div className="absolute inset-0 overlay-dark"></div>
        <div className="absolute inset-0 hero-pattern"></div>

        {/* Floating decorative elements */}
        <div className="hero-float-1"></div>
        <div className="hero-float-2"></div>

        <Container className="relative py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fadeInUp">
              สัมผัสประสบการณ์ท่องเที่ยวภูเก็ตที่น่าประทับใจ
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-50 leading-relaxed animate-fadeInUp animation-delay-200">
              บริการทัวร์ รถรับ-ส่ง และที่พักโรงแรมครบวงจร
              พร้อมทีมงานมืออาชีพและราคายุติธรรม
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-400">
              <Button size="lg" variant="accent">
                ดูทัวร์ทั้งหมด
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white">
                ติดต่อสอบถาม
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              บริการของเรา
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              เลือกบริการที่ตรงกับความต้องการของคุณ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.title} hover className="p-6 text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <a
                  href={service.href}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors cursor-pointer"
                >
                  ดูเพิ่มเติม
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Tours Section */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                แพ็กเกจแนะนำ
              </h2>
              <p className="text-lg text-neutral-600">
                ทัวร์ยอดนิยมที่ไม่ควรพลาด
              </p>
            </div>
            <Button variant="outline" className="hidden md:inline-flex">
              ดูทั้งหมด
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedTours.map((tour) => (
              <Card key={tour.title} hover>
                <div className="aspect-[4/3] bg-neutral-300 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
                    รูปภาพทัวร์
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-neutral-500 mb-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {tour.location}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {tour.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      ฿{tour.price}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      ฿{tour.originalPrice}
                    </span>
                  </div>
                  <Button variant="primary" className="w-full">
                    ดูรายละเอียด
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full sm:w-auto">
              ดูทั้งหมด
            </Button>
          </div>
        </Container>
      </section>

      {/* Popular Transfers Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                บริการรับ-ส่งยอดนิยม
              </h2>
              <p className="text-lg text-neutral-600">
                บริการรถรับ-ส่งจากสนามบินไปยังจุดหมายต่างๆ
              </p>
            </div>
            <div className="space-y-4">
              {popularTransfers.map((transfer, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xl flex-shrink-0">
                        🚗
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 text-lg">
                          {transfer.route}
                        </h3>
                        <p className="text-neutral-500 text-sm">
                          รถเก๋งส่วนตัว ปรับอากาศ
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          ฿{transfer.price}
                        </div>
                        <div className="text-xs text-neutral-500">
                          ราคาเริ่มต้น
                        </div>
                      </div>
                      <Button size="sm">จองเลย</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                ดูบริการทั้งหมด
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-accent text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              พร้อมเริ่มต้นการเดินทางแล้วหรือยัง?
            </h2>
            <p className="text-lg mb-8 text-accent-50 leading-relaxed">
              ติดต่อเราเพื่อขอคำแนะนำและวางแผนการเดินทางที่เหมาะสมกับคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+66123456789"
                className="flex items-center gap-2 px-6 py-3 bg-white text-accent-600 rounded-lg font-medium hover:bg-accent-50 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z" />
                  <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.086-1.391l-4.064-3.696z" />
                </svg>
                โทร: 012-345-6789
              </a>
              <a
                href="https://line.me/ti/p/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white text-accent-600 rounded-lg font-medium hover:bg-accent-50 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                แอดไลน์: @phuketgevalin
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
