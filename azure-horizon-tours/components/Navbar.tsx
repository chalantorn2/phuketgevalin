import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'หน้าแรก', href: '#' },
    { name: 'แพ็คเกจทัวร์', href: '#' },
    { name: 'สถานที่ยอดฮิต', href: '#' },
    { name: 'รีวิว', href: '#' },
    { name: 'เกี่ยวกับเรา', href: '#' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${isScrolled ? 'bg-brand-500 text-white' : 'bg-white text-brand-600'}`}>
            <Globe className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '10s' }} />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold tracking-tight leading-none transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              AZURE
            </span>
            <span className={`text-xs font-medium tracking-[0.2em] transition-colors duration-300 ${isScrolled ? 'text-brand-500' : 'text-brand-200'}`}>
              HORIZON
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                isScrolled ? 'text-gray-600 hover:text-brand-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-brand-500' : 'bg-white'}`}></span>
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button className={`flex items-center gap-2 text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-brand-600' : 'text-white hover:text-brand-200'}`}>
            <User size={18} />
            เข้าสู่ระบบ
          </button>
          <Button variant={isScrolled ? 'primary' : 'white'}>
            จองทัวร์เลย
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/20'
          }`}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-semibold text-white hover:text-brand-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-4 mt-8 w-64">
           <Button variant="primary" fullWidth onClick={() => setIsMobileMenuOpen(false)}>
            จองทัวร์เลย
          </Button>
          <button className="text-white text-sm font-medium opacity-80 hover:opacity-100">
            เข้าสู่ระบบสมาชิก
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;