import { useState, useEffect } from 'react';
import { Calendar, Loader2, RefreshCw, Users } from 'lucide-react';
import EventCard from '@/react-app/components/EventCard';
import PersonCard from '@/react-app/components/PersonCard';
import EventModal from '@/react-app/components/EventModal';
import LanguageSelector from '@/react-app/components/LanguageSelector';
import { useLanguage } from '@/react-app/contexts/LanguageContext';
import type { HistoricalEvent, FamousPerson } from '@/shared/types';

export default function TodayInHistory() {
  const { language, t } = useLanguage();
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [births, setBirths] = useState<FamousPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/today-in-history?lang=${language}`);
      if (!response.ok) {
        throw new Error(t('today.error'));
      }
      
      const data = await response.json();
      setEvents(data.events || []);
      setBirths(data.births || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('modal.unknown.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [language]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long'
  });

  const handleEventClick = (event: HistoricalEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handlePersonClick = (person: FamousPerson) => {
    // Convert FamousPerson to HistoricalEvent for modal compatibility
    const eventFromPerson: HistoricalEvent = {
      year: person.year,
      text: person.text,
      pages: person.pages
    };
    setSelectedEvent(eventFromPerson);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-historia-dark via-historia-teal-dark to-historia-teal pb-20">
      <div className="px-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-historia-sand">
              {t('today.title')}
            </h1>
            <p className="text-historia-sand/70 text-sm mt-1">
              {formattedDate}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <div className="bg-historia-turquoise/20 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-historia-turquoise" />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 mb-4">
            <p className="text-red-200 text-sm">{error}</p>
            <button
              onClick={fetchEvents}
              className="mt-2 text-red-300 text-xs underline"
            >
              {t('today.try.again')}
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin mb-4">
              <Loader2 className="w-8 h-8 text-historia-turquoise" />
            </div>
            <p className="text-historia-sand/70 text-sm">
              {t('today.loading')}
            </p>
          </div>
        ) : events.length > 0 || births.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-historia-sand/70 text-sm">
                {t('today.events.count').replace('{events}', events.length.toString()).replace('{births}', births.length.toString())}
              </p>
              <button
                onClick={fetchEvents}
                disabled={loading}
                className="text-historia-turquoise hover:text-historia-sand transition-colors p-2"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Seção de Eventos Históricos */}
            {events.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-historia-turquoise/20 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-historia-turquoise" />
                  </div>
                  <h2 className="text-historia-sand font-semibold text-lg">
                    {t('today.historical.events')}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <EventCard 
                      key={`event-${event.year}-${index}`} 
                      event={event} 
                      onClick={() => handleEventClick(event)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Seção de Aniversariantes Famosos */}
            {births.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-historia-turquoise/20 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-historia-turquoise" />
                  </div>
                  <h2 className="text-historia-sand font-semibold text-lg">
                    {t('today.famous.births')}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {births.map((person, index) => (
                    <PersonCard 
                      key={`birth-${person.year}-${index}`} 
                      person={person} 
                      onClick={() => handlePersonClick(person)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <Calendar className="w-12 h-12 text-historia-sand/30 mx-auto mb-4" />
            <p className="text-historia-sand/70">
              {t('today.no.events')}
            </p>
            <button
              onClick={fetchEvents}
              className="mt-4 bg-historia-turquoise text-historia-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-historia-turquoise/80 transition-colors"
            >
              {t('today.try.again')}
            </button>
          </div>
        )}

        <EventModal 
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}
