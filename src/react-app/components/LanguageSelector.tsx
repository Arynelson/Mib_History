import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/react-app/contexts/LanguageContext';
import type { Language } from '@/shared/types';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; name: string }[] = [
    { code: 'pt', name: t('language.pt') },
    { code: 'en', name: t('language.en') },
    { code: 'it', name: t('language.it') },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-historia-turquoise/10 hover:bg-historia-turquoise/20 border border-historia-turquoise/20 hover:border-historia-turquoise/30 rounded-lg px-3 py-2 transition-colors"
      >
        <Globe className="w-4 h-4 text-historia-turquoise" />
        <span className="text-historia-sand text-sm font-medium">
          {currentLanguage?.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-historia-turquoise transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-historia-dark border border-historia-teal/30 rounded-xl shadow-xl z-50 min-w-[140px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-historia-teal/20 ${
                language === lang.code
                  ? 'text-historia-turquoise bg-historia-teal/10'
                  : 'text-historia-sand hover:text-historia-turquoise'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
