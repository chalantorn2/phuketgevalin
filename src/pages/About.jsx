import Container from '../components/ui/Container';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function About() {
  const features = [
    {
      icon: '🎯',
      title: 'ประสบการณ์ยาวนาน',
      description: 'มากกว่า 10 ปีในธุรกิจการท่องเที่ยว ด้วยทีมงานมืออาชีพที่มีประสบการณ์',
    },
    {
      icon: '⭐',
      title: 'บริการคุณภาพ',
      description: 'ให้บริการด้วยมาตรฐานสูง เน้นความปลอดภัยและความพึงพอใจของลูกค้า',
    },
    {
      icon: '💰',
      title: 'ราคายุติธรรม',
      description: 'ราคาโปร่งใส คุ้มค่า ไม่มีค่าใช้จ่ายแอบแฝง',
    },
    {
      icon: '🤝',
      title: 'ดูแลตลอด 24/7',
      description: 'ทีมงานพร้อมให้คำปรึกษาและดูแลตลอดการเดินทาง',
    },
  ];

  const stats = [
    { number: '10+', label: 'ปีประสบการณ์' },
    { number: '5000+', label: 'ลูกค้าพึงพอใจ' },
    { number: '50+', label: 'โปรแกรมทัวร์' },
    { number: '30+', label: 'พันธมิตรโรงแรม' },
  ];

  const team = [
    {
      name: 'คุณสมชาย',
      role: 'ผู้จัดการทั่วไป',
      description: 'ประสบการณ์ 15 ปีด้านการท่องเที่ยว',
    },
    {
      name: 'คุณสมหญิง',
      role: 'หัวหน้าทีมมัคคุเทศก์',
      description: 'มัคคุเทศก์ใบอนุญาตระดับชาติ',
    },
    {
      name: 'คุณสมศักดิ์',
      role: 'ผู้จัดการฝ่ายปฏิบัติการ',
      description: 'ดูแลคุณภาพและความปลอดภัย',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white hero-shine overflow-hidden">
        <div className="absolute inset-0 overlay-dark"></div>
        <div className="absolute inset-0 hero-pattern"></div>
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              เกี่ยวกับเรา
            </h1>
            <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
              ผู้ให้บริการด้านการท่องเที่ยวครบวงจรที่ภูเก็ต
              พร้อมมอบประสบการณ์ที่น่าประทับใจในทุกการเดินทาง
            </p>
          </div>
        </Container>
      </section>

      {/* Company Info Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Phuket Gevalin
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>
                  เราเป็นบริษัทที่ให้บริการด้านการท่องเที่ยวครบวงจร
                  ตั้งอยู่ใจกลางเมืองภูเก็ต
                  พร้อมมอบบริการทัวร์ รถรับ-ส่ง และที่พักโรงแรมคุณภาพ
                </p>
                <p>
                  ด้วยประสบการณ์กว่า 10 ปีในธุรกิจการท่องเที่ยว
                  เราเข้าใจความต้องการของนักท่องเที่ยวทั้งชาวไทยและต่างชาติ
                  และมุ่งมั่นมอบประสบการณ์การท่องเที่ยวที่ปลอดภัย สะดวกสบาย
                  และน่าประทับใจ
                </p>
                <p>
                  ทีมงานของเรามีความเชี่ยวชาญในพื้นที่ภูเก็ตและจังหวัดใกล้เคียง
                  พร้อมให้คำแนะนำและดูแลคุณตลอดการเดินทาง
                </p>
              </div>
            </div>
            <div className="bg-neutral-200 aspect-[4/3] rounded-2xl flex items-center justify-center">
              <span className="text-neutral-500">รูปภาพบริษัท</span>
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

          {/* Features */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              ทำไมต้องเลือกเรา
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              ทีมงานของเรา
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <div className="aspect-square bg-neutral-200 flex items-center justify-center">
                    <span className="text-neutral-500">รูปภาพ</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                      {member.name}
                    </h3>
                    <div className="text-primary-600 font-medium mb-3">
                      {member.role}
                    </div>
                    <p className="text-neutral-600 text-sm">
                      {member.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-12">
              ติดต่อเรา
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <Card className="p-8">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                  ข้อมูลติดต่อ
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
                        ที่อยู่
                      </div>
                      <p className="text-neutral-600 leading-relaxed">
                        123 ถนนภูเก็ต ตำบลตลาดใหญ่<br />
                        อำเภอเมือง จังหวัดภูเก็ต 83000
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
                        โทรศัพท์
                      </div>
                      <a
                        href="tel:+66123456789"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        012-345-6789
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
                        อีเมล
                      </div>
                      <a
                        href="mailto:info@phuketgevalin.com"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        info@phuketgevalin.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-4">
                    เวลาทำการ
                  </h4>
                  <div className="space-y-2 text-neutral-600">
                    <div className="flex justify-between">
                      <span>จันทร์ - ศุกร์</span>
                      <span className="font-medium">08:00 - 20:00 น.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>เสาร์ - อาทิตย์</span>
                      <span className="font-medium">09:00 - 18:00 น.</span>
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
                    เปิดใน Google Maps
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
              พร้อมที่จะเริ่มต้นการเดินทางกับเรา?
            </h2>
            <p className="text-lg mb-8 text-primary-100">
              ติดต่อเราวันนี้เพื่อรับคำปรึกษาและวางแผนการท่องเที่ยวที่สมบูรณ์แบบ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="accent">
                ติดต่อเราเลย
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white"
              >
                ดูแพ็กเกจทัวร์
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
