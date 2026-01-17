import { useState, useEffect } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import "./Header.css";

export default function Header({ setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [language, setLanguage] = useState("TH");

  const FlagIcon = ({ lang }) => {
    if (lang === "TH") {
      return (
        <svg className="w-6 h-4" viewBox="0 0 28 20" fill="none">
          <rect width="28" height="3.33" fill="#A51931" />
          <rect y="3.33" width="28" height="3.33" fill="#fff" />
          <rect y="6.66" width="28" height="6.67" fill="#2D2A4A" />
          <rect y="13.33" width="28" height="3.33" fill="#fff" />
          <rect y="16.66" width="28" height="3.34" fill="#A51931" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-4" viewBox="0 0 28 20" fill="none">
        <rect width="28" height="20" fill="#012169" />
        <path d="M0 0L28 20M28 0L0 20" stroke="#fff" strokeWidth="3.5" />
        <path d="M0 0L28 20M28 0L0 20" stroke="#C8102E" strokeWidth="2" />
        <path d="M14 0V20M0 10H28" stroke="#fff" strokeWidth="6" />
        <path d="M14 0V20M0 10H28" stroke="#C8102E" strokeWidth="3.5" />
      </svg>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "หน้าแรก", page: "home" },
    {
      name: "บริการทัวร์",
      isDropdown: true,
      items: [
        { name: "วันเดย์ทริป", page: "one-day-trip" },
        { name: "แพ็กเกจทัวร์", page: "package-tour" },
      ],
    },
    { name: "บริการรถรับ-ส่ง", page: "transfer" },
    { name: "ที่พักโรงแรม", page: "hotel" },
    { name: "เกี่ยวกับเรา", page: "about" },
  ];

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-4"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <img
                src="/logo.png"
                alt="Phuket Gevalin Logo"
                className="h-12 w-12 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className={`text-lg font-bold leading-tight transition-colors duration-300 ${isScrolled ? 'text-primary-700 group-hover:text-primary-800' : 'text-white'}`}>
                  Phuket Gevalin
                </span>
                <span className={`text-xs text-left leading-tight transition-colors duration-300 ${isScrolled ? 'text-primary-500' : 'text-primary-200'}`}>
                  Travel & Tours
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navigation.map((item) =>
              item.isDropdown ? (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className={`transition-all duration-300 font-semibold cursor-pointer flex items-center gap-1.5 py-2 ${
                    isScrolled ? 'text-neutral-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
                  }`}>
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 min-w-[180px] bg-white backdrop-blur-lg rounded-lg shadow-xl py-2 animate-slideDown overflow-hidden">
                      {item.items.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavClick(subItem.page)}
                          className="block w-full text-left px-4 py-3 text-neutral-700 hover:bg-primary-100 hover:text-primary-700 transition-all duration-200 font-medium cursor-pointer"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.page)}
                  className={`transition-all duration-300 font-semibold cursor-pointer relative group py-2 ${
                    isScrolled ? 'text-neutral-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-primary-600' : 'bg-white'}`}></span>
                </button>
              )
            )}
          </nav>

          {/* Language Switcher & Contact Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "TH" ? "EN" : "TH")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
                isScrolled
                  ? 'bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-primary-300 text-neutral-700'
                  : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
              }`}
            >
              <FlagIcon lang={language} />
              <span>{language}</span>
            </button>
            <Button
              size="sm"
              variant="primary"
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              ติดต่อเรา
            </Button>
          </div>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "TH" ? "EN" : "TH")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer shadow-sm ${
                isScrolled
                  ? 'bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700'
                  : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
              }`}
            >
              <FlagIcon lang={language} />
              <span>{language}</span>
            </button>
            <button
              className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? 'text-neutral-700 hover:bg-neutral-100'
                  : 'text-white hover:bg-white/20'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-neutral-900/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <nav className="flex flex-col items-center gap-6">
            {navigation.map((item) =>
              item.isDropdown ? (
                <div key={item.name} className="flex flex-col items-center gap-3">
                  <div className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
                    {item.name}
                  </div>
                  {item.items.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => handleNavClick(subItem.page)}
                      className="text-xl font-semibold text-white hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.page)}
                  className="text-2xl font-semibold text-white hover:text-primary-400 transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              )
            )}
          </nav>
          <div className="flex flex-col gap-4 mt-8 w-64">
            <Button
              size="md"
              variant="primary"
              className="w-full shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              ติดต่อเรา
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
