import { useState, useEffect } from 'react';
import { useLanguage } from '@/react-app/contexts/LanguageContext';
import type { GeolocationData } from '@/shared/types';

interface UseGeolocationReturn {
  location: GeolocationData | null;
  error: string | null;
  loading: boolean;
  requestLocation: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const { t } = useLanguage();
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(
          err.code === 1
            ? t('here.location.denied')
            : err.code === 2
            ? t('here.location.unavailable')
            : t('here.location.timeout')
        );
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  useEffect(() => {
    // Automatically request location on mount if permissions are already granted
    navigator.permissions?.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        requestLocation();
      }
    });
  }, []);

  return { location, error, loading, requestLocation };
}
