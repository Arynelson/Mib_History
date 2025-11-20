import type { HistoricalEvent } from '@/shared/types';
import { X, ExternalLink, Clock } from 'lucide-react';
import { useLanguage } from '@/react-app/contexts/LanguageContext';

interface EventModalProps {
  event: HistoricalEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  const { t } = useLanguage();
  
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-historia-dark border border-historia-teal/30 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-historia-dark border-b border-historia-teal/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-historia-turquoise/20 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-historia-turquoise" />
            </div>
            <div>
              <h2 className="text-historia-turquoise font-bold text-xl">{event.year}</h2>
              <p className="text-historia-sand/70 text-sm">{t('modal.historical.event')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-historia-sand/70 hover:text-historia-sand transition-colors p-2 rounded-lg hover:bg-historia-teal/20"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-historia-sand text-base leading-relaxed mb-6">
            {event.text}
          </p>

          {event.pages && event.pages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-historia-turquoise font-semibold text-lg">
                {t('modal.related.pages')}
              </h3>
              
              {event.pages.map((page, index) => (
                <div key={index} className="bg-historia-teal-dark/30 border border-historia-teal/20 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-historia-sand font-medium text-lg leading-tight">
                      {page.title.replace(/_/g, ' ')}
                    </h4>
                    {page.url && (
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-historia-turquoise hover:text-historia-sand transition-colors p-1 rounded-lg hover:bg-historia-teal/20 flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  {page.extract && (
                    <p className="text-historia-sand/80 text-sm leading-relaxed">
                      {page.extract}
                    </p>
                  )}
                  
                  {page.url && (
                    <div className="mt-3 pt-3 border-t border-historia-teal/20">
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-historia-turquoise hover:text-historia-sand transition-colors text-sm"
                      >
                        <span>{t('modal.read.more')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
