import type { LocationHistory } from '@/shared/types';
import { ExternalLink, MapPin } from 'lucide-react';
import { formatDistance } from '@/react-app/utils/distance';

interface LocationCardProps {
  location: LocationHistory;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="bg-historia-teal-dark/30 backdrop-blur-sm border border-historia-teal/20 rounded-xl p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="bg-historia-turquoise/20 p-2 rounded-lg flex-shrink-0">
          <MapPin className="w-5 h-5 text-historia-turquoise" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-historia-turquoise font-bold text-lg leading-tight">
                {location.title.replace(/_/g, ' ')}
              </h3>
              {location.distance && (
                <p className="text-historia-sand/60 text-xs mt-1">
                  📍 {formatDistance(location.distance)}
                </p>
              )}
            </div>
            {location.url && (
              <a
                href={location.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-historia-sand/70 hover:text-historia-turquoise transition-colors flex-shrink-0 ml-3"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <p className="text-historia-sand text-sm leading-relaxed">
            {location.extract}
          </p>
          {location.coordinates && (
            <div className="mt-3 text-xs text-historia-sand/60">
              {location.coordinates.lat.toFixed(4)}, {location.coordinates.lon.toFixed(4)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
