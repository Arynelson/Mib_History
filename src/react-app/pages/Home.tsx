import { useState, useEffect } from 'react';
import TabBar from '@/react-app/components/TabBar';
import TodayInHistory from '@/react-app/pages/TodayInHistory';
import HereInHistory from '@/react-app/pages/HereInHistory';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'today' | 'location'>('today');

  useEffect(() => {
    // Check URL params for tab switching (for PWA shortcuts)
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'today' || tabParam === 'location') {
      setActiveTab(tabParam);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {activeTab === 'today' ? <TodayInHistory /> : <HereInHistory />}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
