import { useState, useEffect } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import "./Header.css";

export default function Header({ setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "หน้าแรก", page: "home" },
    { name: "วันเดย์ทริป", page: "one-day-trip" },
    { name: "แพ็กเกจทัวร์", page: "package-tour" },
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "navbar-solid shadow-lg border-b border-primary-100"
          : "navbar-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <img
                src="/logo.png"
                alt="Phuket Gevalin Logo"
                className="h-14 w-14 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight group-hover:text-primary-800 transition-colors text-primary-700">
                  Phuket Gevalin
                </span>
                <span className="text-xs text-left leading-tight transition-colors text-primary-500">
                  Travel & Tours
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Button size="sm" variant="accent">
              ติดต่อเรา
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors text-neutral-700 hover:bg-neutral-100 cursor-pointer"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav
            className={`md:hidden py-4 border-t ${
              isScrolled
                ? "border-neutral-200 bg-white"
                : "border-white-20 mobile-menu-transparent"
            }`}
          >
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className="block w-full text-left py-3 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 px-4 rounded-lg transition-colors font-medium cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            <div className="mt-4 px-4">
              <Button size="md" variant="accent" className="w-full">
                ติดต่อเรา
              </Button>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
