import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { useLanguage } from '@/react-app/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA install accepted');
    } else {
      console.log('PWA install dismissed');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showInstallPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-historia-teal-dark border border-historia-turquoise/30 rounded-xl p-4 z-40 shadow-xl backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="bg-historia-turquoise/20 p-2 rounded-lg flex-shrink-0">
          <Download className="w-5 h-5 text-historia-turquoise" />
        </div>
        <div className="flex-1">
          <h3 className="text-historia-sand font-semibold text-sm mb-1">
            {t('pwa.install.title')}
          </h3>
          <p className="text-historia-sand/70 text-xs mb-3">
            {t('pwa.install.description')}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-historia-turquoise text-historia-dark px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-historia-turquoise/80 transition-colors"
            >
              {t('pwa.install.button')}
            </button>
            <button
              onClick={handleDismiss}
              className="text-historia-sand/70 hover:text-historia-sand text-xs px-2"
            >
              {t('pwa.install.dismiss')}
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-historia-sand/50 hover:text-historia-sand transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
