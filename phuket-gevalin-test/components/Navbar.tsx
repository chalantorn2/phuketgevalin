import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, ChevronDown } from 'lucide-react';
import Button from './Button';

interface NavbarProps {
  onNavigate: (target: string) => void;
  forceSolid?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, forceSolid = false }) => {
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

  // Use solid style if scrolled OR forced (e.g. on detail pages)
  const isSolid = isScrolled || forceSolid;

  const navLinks = [
    { name: 'หน้าแรก', href: 'home' },
    { 
      name: 'บริการทัวร์', 
      href: 'onedaytrip',
      subItems: [
        { name: 'วันเดย์ทริป', href: 'onedaytrip' },
        { name: 'แพ็กเกจทัวร์', href: 'packages' },
      ]
    },
    { name: 'บริการรถรับ-ส่ง', href: 'transfer' },
    { name: 'ที่พักโรงแรม', href: 'hotels' },
    { name: 'เกี่ยวกับเรา', href: '#about' },
    { name: 'ติดต่อเรา', href: '#services' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isSolid
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="home" 
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-2 group"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${isSolid ? 'bg-brand-500 text-white' : 'bg-white text-brand-600'}`}>
            <Globe className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '10s' }} />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold tracking-tight leading-none transition-colors duration-300 ${isSolid ? 'text-gray-900' : 'text-white'}`}>
              AZURE
            </span>
            <span className={`text-xs font-medium tracking-[0.2em] transition-colors duration-300 ${isSolid ? 'text-brand-500' : 'text-brand-200'}`}>
              HORIZON
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`flex items-center gap-1 text-sm font-medium transition-all duration-300 relative py-2 cursor-pointer ${
                  isSolid ? 'text-gray-600 hover:text-brand-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
                {link.subItems && (
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                )}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isSolid ? 'bg-brand-500' : 'bg-white'}`}></span>
              </a>

              {/* Dropdown Menu */}
              {link.subItems && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[200px]">
                    {link.subItems.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleLinkClick(e, sub.href);
                        }}
                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-colors border-b border-gray-50 last:border-0 whitespace-nowrap cursor-pointer"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button className={`flex items-center gap-2 text-sm font-medium transition-colors ${isSolid ? 'text-gray-600 hover:text-brand-600' : 'text-white hover:text-brand-200'}`}>
            <User size={18} />
            เข้าสู่ระบบ
          </button>
          <Button 
            variant={isSolid ? 'primary' : 'white'} 
            onClick={(e) => handleLinkClick(e, 'onedaytrip')}
          >
            จองทัวร์เลย
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isSolid ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/20'
          }`}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-xl lg:hidden flex flex-col items-center pt-24 gap-8 transition-all duration-500 overflow-y-auto ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 w-full px-6">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col items-center w-full">
              <a
                href={link.href}
                onClick={(e) => {
                   if (!link.subItems) {
                     handleLinkClick(e, link.href);
                   } else {
                     e.preventDefault(); 
                   }
                }}
                className={`text-2xl font-semibold transition-colors flex items-center gap-2 ${link.subItems ? 'text-brand-200' : 'text-white hover:text-brand-400'}`}
              >
                {link.name}
              </a>
              
              {/* Mobile Submenu */}
              {link.subItems && (
                <div className="flex flex-col items-center gap-4 mt-4 w-full bg-white/5 rounded-2xl py-4 border border-white/10">
                  {link.subItems.map((sub) => (
                    <a
                      key={sub.name}
                      href={sub.href}
                      onClick={(e) => handleLinkClick(e, sub.href)}
                      className="text-lg text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-4 mt-auto mb-12 w-64">
           <Button variant="primary" fullWidth onClick={(e) => handleLinkClick(e, 'onedaytrip')}>
            จองทัวร์เลย
          </Button>
          <button className="text-white text-sm font-medium opacity-80 hover:opacity-100 flex items-center justify-center gap-2">
            <User size={18} />
            เข้าสู่ระบบสมาชิก
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;