import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '@/shared/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // App title and description
    'app.title': 'História Viva',
    'app.description': 'Descubra fatos históricos do dia de hoje e explore a história dos lugares ao seu redor',
    
    // Tab bar
    'tab.today': 'Hoje na História',
    'tab.location': 'Aqui na História',
    
    // Today in History page
    'today.title': 'Hoje na História',
    'today.historical.events': 'Eventos Históricos',
    'today.famous.births': 'Aniversariantes Famosos',
    'today.loading': 'Buscando eventos históricos...',
    'today.error': 'Falha ao buscar eventos históricos',
    'today.no.events': 'Nenhum evento histórico encontrado para hoje',
    'today.try.again': 'Tentar novamente',
    'today.events.count': '{events} eventos e {births} aniversariantes',
    'today.birth.label': 'Nascimento',
    'today.click.details': 'Toque para ver mais detalhes',
    
    // Here in History page
    'here.title': 'Aqui na História',
    'here.description': 'Descobrir a história do lugar onde você está',
    'here.allow.location': 'Permita o acesso à sua localização',
    'here.allow.description': 'Para descobrir a história do lugar onde você está, precisamos acessar sua localização.',
    'here.allow.button': 'Permitir Localização',
    'here.current.location': 'Sua localização atual',
    'here.update.location': 'Atualizar localização',
    'here.getting.location': 'Obtendo sua localização...',
    'here.searching.history': 'Buscando história local...',
    'here.location.denied': 'Permissão de localização negada',
    'here.location.unavailable': 'Posição não disponível',
    'here.location.timeout': 'Tempo limite excedido ao obter localização',
    'here.location.error': 'Falha ao buscar histórico do local',
    'here.no.history': 'Nenhum local histórico encontrado próximo à sua localização',
    'here.search.again': 'Buscar novamente',
    'here.locations.found': 'Encontrados {count} locais históricos próximos a você',
    'here.permission.steps': 'Para usar este recurso:',
    'here.permission.step1': 'Clique no ícone de localização na barra de endereços',
    'here.permission.step2': 'Selecione "Permitir" para este site',
    'here.permission.step3': 'Recarregue a página',
    
    // Modal
    'modal.historical.event': 'Evento Histórico',
    'modal.related.pages': 'Páginas Relacionadas',
    'modal.read.more': 'Ler mais na Wikipedia',
    'modal.unknown.error': 'Erro desconhecido',
    
    // PWA
    'pwa.install.title': 'Instalar História Viva',
    'pwa.install.description': 'Instale o app no seu celular para acesso rápido e uso offline',
    'pwa.install.button': 'Instalar',
    'pwa.install.dismiss': 'Agora não',
    'pwa.offline.title': 'Você está offline',
    'pwa.offline.description': 'Alguns recursos podem não estar disponíveis',
    
    // Language names
    'language.pt': 'Português',
    'language.en': 'English',
    'language.it': 'Italiano'
  },
  en: {
    // App title and description
    'app.title': 'Living History',
    'app.description': 'Discover historical facts from today and explore the history of places around you',
    
    // Tab bar
    'tab.today': 'Today in History',
    'tab.location': 'Here in History',
    
    // Today in History page
    'today.title': 'Today in History',
    'today.historical.events': 'Historical Events',
    'today.famous.births': 'Famous Birthdays',
    'today.loading': 'Loading historical events...',
    'today.error': 'Failed to fetch historical events',
    'today.no.events': 'No historical events found for today',
    'today.try.again': 'Try again',
    'today.events.count': '{events} events and {births} birthdays',
    'today.birth.label': 'Birth',
    'today.click.details': 'Tap to see more details',
    
    // Here in History page
    'here.title': 'Here in History',
    'here.description': 'Discover the history of where you are',
    'here.allow.location': 'Allow access to your location',
    'here.allow.description': 'To discover the history of where you are, we need to access your location.',
    'here.allow.button': 'Allow Location',
    'here.current.location': 'Your current location',
    'here.update.location': 'Update location',
    'here.getting.location': 'Getting your location...',
    'here.searching.history': 'Searching local history...',
    'here.location.denied': 'Location permission denied',
    'here.location.unavailable': 'Position unavailable',
    'here.location.timeout': 'Timeout exceeded when getting location',
    'here.location.error': 'Failed to fetch location history',
    'here.no.history': 'No historical locations found near your location',
    'here.search.again': 'Search again',
    'here.locations.found': 'Found {count} historical locations near you',
    'here.permission.steps': 'To use this feature:',
    'here.permission.step1': 'Click the location icon in the address bar',
    'here.permission.step2': 'Select "Allow" for this site',
    'here.permission.step3': 'Reload the page',
    
    // Modal
    'modal.historical.event': 'Historical Event',
    'modal.related.pages': 'Related Pages',
    'modal.read.more': 'Read more on Wikipedia',
    'modal.unknown.error': 'Unknown error',
    
    // PWA
    'pwa.install.title': 'Install Living History',
    'pwa.install.description': 'Install the app on your phone for quick access and offline use',
    'pwa.install.button': 'Install',
    'pwa.install.dismiss': 'Not now',
    'pwa.offline.title': 'You are offline',
    'pwa.offline.description': 'Some features may not be available',
    
    // Language names
    'language.pt': 'Português',
    'language.en': 'English',
    'language.it': 'Italiano'
  },
  it: {
    // App title and description
    'app.title': 'Storia Viva',
    'app.description': 'Scopri fatti storici di oggi ed esplora la storia dei luoghi intorno a te',
    
    // Tab bar
    'tab.today': 'Oggi nella Storia',
    'tab.location': 'Qui nella Storia',
    
    // Today in History page
    'today.title': 'Oggi nella Storia',
    'today.historical.events': 'Eventi Storici',
    'today.famous.births': 'Compleanni Famosi',
    'today.loading': 'Caricamento eventi storici...',
    'today.error': 'Impossibile recuperare eventi storici',
    'today.no.events': 'Nessun evento storico trovato per oggi',
    'today.try.again': 'Riprova',
    'today.events.count': '{events} eventi e {births} compleanni',
    'today.birth.label': 'Nascita',
    'today.click.details': 'Tocca per vedere più dettagli',
    
    // Here in History page
    'here.title': 'Qui nella Storia',
    'here.description': 'Scopri la storia del posto dove ti trovi',
    'here.allow.location': 'Consenti l\'accesso alla tua posizione',
    'here.allow.description': 'Per scoprire la storia del posto dove ti trovi, dobbiamo accedere alla tua posizione.',
    'here.allow.button': 'Consenti Posizione',
    'here.current.location': 'La tua posizione attuale',
    'here.update.location': 'Aggiorna posizione',
    'here.getting.location': 'Ottenimento della tua posizione...',
    'here.searching.history': 'Ricerca storia locale...',
    'here.location.denied': 'Permesso di localizzazione negato',
    'here.location.unavailable': 'Posizione non disponibile',
    'here.location.timeout': 'Timeout superato nell\'ottenere la posizione',
    'here.location.error': 'Impossibile recuperare la storia del luogo',
    'here.no.history': 'Nessun luogo storico trovato vicino alla tua posizione',
    'here.search.again': 'Cerca di nuovo',
    'here.locations.found': 'Trovati {count} luoghi storici vicino a te',
    'here.permission.steps': 'Per utilizzare questa funzione:',
    'here.permission.step1': 'Clicca sull\'icona della posizione nella barra degli indirizzi',
    'here.permission.step2': 'Seleziona "Consenti" per questo sito',
    'here.permission.step3': 'Ricarica la pagina',
    
    // Modal
    'modal.historical.event': 'Evento Storico',
    'modal.related.pages': 'Pagine Correlate',
    'modal.read.more': 'Leggi di più su Wikipedia',
    'modal.unknown.error': 'Errore sconosciuto',
    
    // PWA
    'pwa.install.title': 'Installa Storia Viva',
    'pwa.install.description': 'Installa l\'app sul tuo telefono per accesso rapido e uso offline',
    'pwa.install.button': 'Installa',
    'pwa.install.dismiss': 'Non ora',
    'pwa.offline.title': 'Sei offline',
    'pwa.offline.description': 'Alcune funzionalità potrebbero non essere disponibili',
    
    // Language names
    'language.pt': 'Português',
    'language.en': 'English',
    'language.it': 'Italiano'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('historia-language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('historia-language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
