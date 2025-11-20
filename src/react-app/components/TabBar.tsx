import { Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/react-app/contexts/LanguageContext';

interface TabBarProps {
  activeTab: 'today' | 'location';
  onTabChange: (tab: 'today' | 'location') => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const { t } = useLanguage();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-historia-dark border-t border-historia-teal-dark">
      <div className="flex">
        <button
          onClick={() => onTabChange('today')}
          className={`flex-1 flex flex-col items-center py-3 px-4 transition-colors ${
            activeTab === 'today'
              ? 'text-historia-turquoise bg-historia-teal-dark/20'
              : 'text-historia-sand/70 hover:text-historia-sand'
          }`}
        >
          <Calendar className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">{t('tab.today')}</span>
        </button>
        <button
          onClick={() => onTabChange('location')}
          className={`flex-1 flex flex-col items-center py-3 px-4 transition-colors ${
            activeTab === 'location'
              ? 'text-historia-turquoise bg-historia-teal-dark/20'
              : 'text-historia-sand/70 hover:text-historia-sand'
          }`}
        >
          <MapPin className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">{t('tab.location')}</span>
        </button>
      </div>
    </div>
  );
}
