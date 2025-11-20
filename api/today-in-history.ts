import type { VercelRequest, VercelResponse } from '@vercel/node';

type Language = 'pt' | 'en' | 'it';

interface HistoricalEvent {
  year: number;
  text: string;
  pages?: Array<{
    title: string;
    extract?: string;
    url?: string;
  }>;
}

interface FamousPerson {
  year: number;
  text: string;
  pages?: Array<{
    title: string;
    extract?: string;
    url?: string;
  }>;
}

async function getTodayInHistory(language: Language = 'pt'): Promise<{ events: HistoricalEvent[], births: FamousPerson[] }> {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  try {
    const response = await fetch(
      `https://${language}.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`,
      {
        headers: {
          'User-Agent': 'HistoriaViva/1.0 (https://historaviva.app)'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch today in history');
    }

    const data = await response.json() as any;

    const events = data.events?.slice(0, 10).map((event: any) => ({
      year: event.year,
      text: event.text,
      pages: event.pages?.map((page: any) => ({
        title: page.title,
        extract: page.extract,
        url: page.content_urls?.desktop?.page,
      }))
    })) || [];

    const births = data.births?.slice(0, 8).map((birth: any) => ({
      year: birth.year,
      text: birth.text,
      pages: birth.pages?.map((page: any) => ({
        title: page.title,
        extract: page.extract,
        url: page.content_urls?.desktop?.page,
      }))
    })) || [];

    return { events, births };
  } catch (error) {
    console.error('Error fetching today in history:', error);
    return { events: [], births: [] };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const language = (req.query.lang || 'pt') as Language;
    const data = await getTodayInHistory(language);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in today-in-history API:', error);
    res.status(500).json({ error: 'Failed to fetch today in history' });
  }
}
