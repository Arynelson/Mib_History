import { BrowserRouter as Router, Routes, Route } from "react-router";
import { LanguageProvider } from "@/react-app/contexts/LanguageContext";
import HomePage from "@/react-app/pages/Home";
import PWAInstallPrompt from "@/react-app/components/PWAInstallPrompt";
import OfflineIndicator from "@/react-app/components/OfflineIndicator";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          // Unregister old service workers first
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            await registration.unregister();
          }

          // Clear all caches
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );

          // Register new service worker
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('SW registered: ', registration);
        } catch (error) {
          console.log('SW registration failed: ', error);
        }
      });
    }
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <OfflineIndicator />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <PWAInstallPrompt />
      </Router>
    </LanguageProvider>
  );
}
