import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // ดึงค่าจาก localStorage ถ้ามี
    const saved = localStorage.getItem('language');
    return saved || 'TH';
  });

  useEffect(() => {
    // บันทึกภาษาลง localStorage เมื่อมีการเปลี่ยน
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'TH' ? 'EN' : 'TH');
  };

  // ฟังก์ชัน t สำหรับแปลข้อความ
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // ถ้าไม่เจอ key ให้ return key เดิม
        return key;
      }
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
