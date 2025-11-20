import { useState, useEffect } from 'react';
import { MapPin, Loader2, Navigation, AlertCircle } from 'lucide-react';
import LocationCard from '@/react-app/components/LocationCard';
import LanguageSelector from '@/react-app/components/LanguageSelector';
import { useGeolocation } from '@/react-app/hooks/useGeolocation';
import { useLanguage } from '@/react-app/contexts/LanguageContext';
import type { LocationHistory } from '@/shared/types';

export default function HereInHistory() {
  const { language, t } = useLanguage();
  const { location, error: locationError, loading: locationLoading, requestLocation } = useGeolocation();
  const [history, setHistory] = useState<LocationHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocationHistory = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/location-history?lat=${lat}&lon=${lon}&lang=${language}`);
      if (!response.ok) {
        throw new Error(t('here.location.error'));
      }
      
      const data = await response.json();
      setHistory(data.history || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('modal.unknown.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchLocationHistory(location.latitude, location.longitude);
    }
  }, [location, language]);

  const hasPermissionError = locationError?.includes(t('here.location.denied').toLowerCase()) || locationError?.includes('negada') || locationError?.includes('denied');
  const showLocationPrompt = !location && !locationLoading && !hasPermissionError;
  const isLoading = locationLoading || loading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-historia-dark via-historia-teal-dark to-historia-teal pb-20">
      <div className="px-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-historia-sand">
              {t('here.title')}
            </h1>
            <p className="text-historia-sand/70 text-sm mt-1">
              {t('here.description')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <div className="bg-historia-turquoise/20 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-historia-turquoise" />
            </div>
          </div>
        </div>

        {locationError && (
          <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-200 text-sm mb-2">{locationError}</p>
                {hasPermissionError && (
                  <div className="text-red-300 text-xs">
                    <p className="mb-2">{t('here.permission.steps')}</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>{t('here.permission.step1')}</li>
                      <li>{t('here.permission.step2')}</li>
                      <li>{t('here.permission.step3')}</li>
                    </ol>
                  </div>
                )}
                <button
                  onClick={requestLocation}
                  className="mt-3 text-red-300 text-xs underline"
                >
                  {t('today.try.again')}
                </button>
              </div>
            </div>
          </div>
        )}

        {showLocationPrompt && (
          <div className="bg-historia-turquoise/10 border border-historia-turquoise/20 rounded-xl p-6 mb-6 text-center">
            <Navigation className="w-12 h-12 text-historia-turquoise mx-auto mb-4" />
            <h3 className="text-historia-sand font-semibold mb-2">
              {t('here.allow.location')}
            </h3>
            <p className="text-historia-sand/70 text-sm mb-4">
              {t('here.allow.description')}
            </p>
            <button
              onClick={requestLocation}
              className="bg-historia-turquoise text-historia-dark px-6 py-3 rounded-lg font-medium hover:bg-historia-turquoise/80 transition-colors"
            >
              {t('here.allow.button')}
            </button>
          </div>
        )}

        {location && (
          <div className="bg-historia-teal/20 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-historia-turquoise" />
              <span className="text-historia-turquoise font-medium text-sm">
                {t('here.current.location')}
              </span>
            </div>
            <p className="text-historia-sand/70 text-xs">
              📍 {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </p>
            <button
              onClick={requestLocation}
              className="mt-2 text-historia-turquoise text-xs underline"
            >
              {t('here.update.location')}
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 mb-4">
            <p className="text-red-200 text-sm">{error}</p>
            {location && (
              <button
                onClick={() => fetchLocationHistory(location.latitude, location.longitude)}
                className="mt-2 text-red-300 text-xs underline"
              >
                {t('today.try.again')}
              </button>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin mb-4">
              <Loader2 className="w-8 h-8 text-historia-turquoise" />
            </div>
            <p className="text-historia-sand/70 text-sm">
              {locationLoading ? t('here.getting.location') : t('here.searching.history')}
            </p>
          </div>
        ) : location && history.length > 0 ? (
          <div>
            <p className="text-historia-sand/70 text-sm mb-4">
              {t('here.locations.found').replace('{count}', history.length.toString())}
            </p>
            
            <div className="space-y-4">
              {history.map((loc, index) => (
                <LocationCard key={`${loc.title}-${index}`} location={loc} />
              ))}
            </div>
          </div>
        ) : location && history.length === 0 && !isLoading ? (
          <div className="text-center py-20">
            <MapPin className="w-12 h-12 text-historia-sand/30 mx-auto mb-4" />
            <p className="text-historia-sand/70 mb-4">
              {t('here.no.history')}
            </p>
            <button
              onClick={() => fetchLocationHistory(location.latitude, location.longitude)}
              className="bg-historia-turquoise text-historia-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-historia-turquoise/80 transition-colors"
            >
              {t('here.search.again')}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
