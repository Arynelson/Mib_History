import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useLanguage } from '@/react-app/contexts/LanguageContext';

export default function OfflineIndicator() {
  const { t } = useLanguage();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
      // Auto-hide after 5 seconds
      setTimeout(() => setShowOfflineMessage(false), 5000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineMessage && isOnline) {
    return null;
  }

  return (
    <div className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
      showOfflineMessage ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className={`rounded-xl p-3 shadow-lg backdrop-blur-sm border ${
        isOnline 
          ? 'bg-green-900/20 border-green-500/20 text-green-200'
          : 'bg-red-900/20 border-red-500/20 text-red-200'
      }`}>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="w-4 h-4" />
          ) : (
            <WifiOff className="w-4 h-4" />
          )}
          <div>
            <p className="font-medium text-sm">
              {isOnline ? 'Conectado' : t('pwa.offline.title')}
            </p>
            {!isOnline && (
              <p className="text-xs opacity-80">
                {t('pwa.offline.description')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
