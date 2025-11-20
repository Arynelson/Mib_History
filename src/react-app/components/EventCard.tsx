import type { HistoricalEvent } from '@/shared/types';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/react-app/contexts/LanguageContext';

interface EventCardProps {
  event: HistoricalEvent;
  onClick: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const { t } = useLanguage();
  return (
    <div 
      onClick={onClick}
      className="bg-historia-teal-dark/30 backdrop-blur-sm border border-historia-teal/20 rounded-xl p-4 mb-4 cursor-pointer hover:border-historia-turquoise/40 transition-all duration-200 hover:bg-historia-teal-dark/40"
    >
      <div className="flex items-start gap-3">
        <div className="bg-historia-turquoise/20 p-2 rounded-lg flex-shrink-0">
          <Clock className="w-5 h-5 text-historia-turquoise" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-historia-turquoise font-bold text-lg">
              {event.year}
            </span>
          </div>
          <p className="text-historia-sand text-sm leading-relaxed mb-3">
            {event.text}
          </p>
          {event.pages && event.pages.length > 0 && (
            <div className="space-y-2">
              {event.pages.slice(0, 2).map((page, index) => (
                <div key={index} className="bg-historia-teal/20 rounded-lg p-3">
                  <h4 className="text-historia-sand font-medium text-sm mb-1">
                    {page.title.replace(/_/g, ' ')}
                  </h4>
                  {page.extract && (
                    <p className="text-historia-sand/70 text-xs leading-relaxed">
                      {page.extract.slice(0, 120)}...
                    </p>
                  )}
                </div>
              ))}
              <p className="text-historia-turquoise text-xs">
                {t('today.click.details')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
