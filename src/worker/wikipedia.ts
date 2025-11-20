import type { HistoricalEvent, LocationHistory, FamousPerson, Language } from "../shared/types";

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export async function getTodayInHistory(language: Language = 'pt'): Promise<{ events: HistoricalEvent[], births: FamousPerson[] }> {
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

export async function getLocationHistory(lat: number, lon: number, language: Language = 'pt'): Promise<LocationHistory[]> {
  try {
    // Try multiple approaches to find nearby locations
    let results: LocationHistory[] = [];
    
    // Approach 1: Use geosearch API which is more reliable
    try {
      const geoSearchResponse = await fetch(
        `https://${language}.wikipedia.org/w/api.php?action=query&format=json&list=geosearch&gscoord=${lat}|${lon}&gsradius=10000&gslimit=20&origin=*`,
        {
          headers: {
            'User-Agent': 'HistoriaViva/1.0 (https://historaviva.app)'
          }
        }
      );
      
      if (geoSearchResponse.ok) {
        const geoData = await geoSearchResponse.json() as any;
        console.log('GeoSearch API response:', geoData);
        
        if (geoData.query?.geosearch) {
          for (const page of geoData.query.geosearch.slice(0, 15)) {
            try {
              const summaryResponse = await fetch(
                `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page.title)}`,
                {
                  headers: {
                    'User-Agent': 'HistoriaViva/1.0 (https://historaviva.app)'
                  }
                }
              );
              
              if (summaryResponse.ok) {
                const summaryData = await summaryResponse.json() as any;
                if (summaryData.extract && summaryData.extract.length > 50) {
                  const distance = calculateDistance(lat, lon, page.lat, page.lon);
                  results.push({
                    title: summaryData.title,
                    extract: summaryData.extract,
                    url: summaryData.content_urls?.desktop?.page,
                    distance: distance,
                    coordinates: {
                      lat: page.lat,
                      lon: page.lon,
                    },
                  });
                }
              }
            } catch (error) {
              console.error(`Error fetching summary for ${page.title}:`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error('GeoSearch API error:', error);
    }
    
    // If we have results from geosearch, return them
    if (results.length > 0) {
      console.log(`Found ${results.length} locations via geosearch`);
      // Sort results by distance
    return results.sort((a, b) => {
      if (!a.distance) return 1;
      if (!b.distance) return -1;
      return a.distance - b.distance;
    });
    }
    
    // Approach 2: Fallback to nearby API
    const nearbyResponse = await fetch(
      `https://${language}.wikipedia.org/api/rest_v1/page/nearby/${lat}/${lon}`,
      {
        headers: {
          'User-Agent': 'HistoriaViva/1.0 (https://historaviva.app)'
        }
      }
    );
    
    if (!nearbyResponse.ok) {
      throw new Error('Failed to fetch nearby articles');
    }
    
    const nearbyData = await nearbyResponse.json() as any;
    console.log('Dados da API de locais próximos:', nearbyData);
    console.log('Coordenadas buscadas:', { lat, lon });
    
    const articles = nearbyData.pages?.slice(0, 15) || [];
    console.log('Artigos encontrados:', articles.length);
    
    // Get detailed info for each article
    results = [];
    
    for (const article of articles) {
      try {
        const detailResponse = await fetch(
          `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(article.title)}`,
          {
            headers: {
              'User-Agent': 'HistoriaViva/1.0 (https://historaviva.app)'
            }
          }
        );
        
        if (detailResponse.ok) {
          const detailData = await detailResponse.json() as any;
          if (detailData.extract && detailData.extract.length > 50) {
            const distance = article.coordinates ? 
              calculateDistance(lat, lon, article.coordinates.lat, article.coordinates.lon) : 
              undefined;
            results.push({
              title: detailData.title,
              extract: detailData.extract || 'Sem descrição disponível',
              url: detailData.content_urls?.desktop?.page,
              distance: distance,
              coordinates: article.coordinates ? {
                lat: article.coordinates.lat,
                lon: article.coordinates.lon,
              } : undefined,
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching details for ${article.title}:`, error);
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error fetching location history:', error);
    return [];
  }
}
