'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { cn } from '@/lib/utils';

const SNAZZY_ORANGE_STYLE = [
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ saturation: 36 }, { color: '#000000' }, { lightness: 40 }],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ visibility: 'on' }, { color: '#000000' }, { lightness: 16 }],
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{ color: '#000000' }, { lightness: 20 }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#000000' }, { lightness: 17 }, { weight: 1.2 }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e5bc01' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#c4c4c4' }],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#e5bc01' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }, { lightness: 20 }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }, { lightness: 21 }, { visibility: 'on' }],
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#e5bc01' }, { lightness: '0' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#e5bc01' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }, { lightness: 18 }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [{ color: '#575757' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#2c2c2c' }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }, { lightness: 16 }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#999999' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }, { lightness: 19 }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }, { lightness: 17 }],
  },
];

interface GoogleMapProps {
  className?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
}

export function GoogleMap({
  className,
  center = { lat: 51.47844937642928, lng: -0.18384444417501233 },
  zoom = 15,
}: GoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-900 text-gray-400',
          className
        )}
      >
        <p>Google Maps API key not configured</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        className={cn('w-full h-full', className)}
        disableDefaultUI={false}
        gestureHandling='greedy'
        styles={SNAZZY_ORANGE_STYLE}
      />
    </APIProvider>
  );
}
