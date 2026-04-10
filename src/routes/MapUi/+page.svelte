<script lang="ts">
  import { onMount } from 'svelte';

  type LatLngLiteral = { lat: number; lng: number };

  interface MapInstance {
    setCenter(position: LatLngLiteral): void;
  }

  interface PlaceLocation {
    lat: () => number;
    lng: () => number;
  }

  interface PlaceResult {
    name?: string;
    vicinity?: string;
    geometry?: {
      location: PlaceLocation;
    };
  }

  interface PlacesServiceInstance {
    nearbySearch(
      request: {
        location: LatLngLiteral;
        radius: number;
        type?: string[];
      },
      callback: (results: PlaceResult[] | null, status: string) => void
    ): void;
  }

  interface GoogleMapsWindow {
    google?: {
      maps?: {
        Map: new (container: HTMLElement, options: { center: LatLngLiteral; zoom: number }) => MapInstance;
        places?: {
          PlacesService: new (owner: HTMLElement | MapInstance) => PlacesServiceInstance;
        };
      };
    };
  }

  interface PlaceItem {
    title: string;
    subtitle: string;
    color: string;
  }

  let places = $state<PlaceItem[]>([]);
  let mapContainer = $state<HTMLDivElement | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';
  const defaultCenter: LatLngLiteral = { lat: 52.4064, lng: 13.0623 };

  function distanceKm(a: LatLngLiteral, b: LatLngLiteral) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const sinLat = Math.sin(dLat / 2);
    const sinLng = Math.sin(dLng / 2);
    const haversine = sinLat * sinLat + sinLng * sinLng * Math.cos(lat1) * Math.cos(lat2);
    return 2 * R * Math.asin(Math.sqrt(haversine));
  }

  function mapPlaceResult(result: PlaceResult, center: LatLngLiteral): PlaceItem {
    const name = result.name ?? 'Unnamed place';
    const distance = result.geometry ? distanceKm(center, { lat: result.geometry.location.lat(), lng: result.geometry.location.lng() }) : 0;
    return {
      title: name,
      subtitle: result.vicinity ? `${result.vicinity} · ${distance.toFixed(1)} km` : `${distance.toFixed(1)} km`,
      color: '#2f80ed',
    };
  }

  function loadGoogleMaps(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const existingGoogle = (window as unknown as GoogleMapsWindow).google;
      if (existingGoogle?.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Google Maps script failed to load'));
      document.head.appendChild(script);
    });
  }

  function getGoogle() {
    return (window as unknown as GoogleMapsWindow).google;
  }

  async function fetchNearbyPlaces(center: LatLngLiteral) {
    const google = getGoogle();
    if (!google?.maps) {
      return;
    }

    const maps = google.maps;
    const container = mapContainer;
    const placesLib = maps.places;
    if (!container || !placesLib?.PlacesService) {
      return;
    }

    return new Promise<void>((resolve) => {
      const service = new placesLib.PlacesService(container);
      service.nearbySearch(
        { location: center, radius: 1800, type: ['store'] },
        (results, status) => {
          if (status === 'OK' && results) {
            places = results.slice(0, 4).map((result) => mapPlaceResult(result, center));
          } else {
            places = [
              { title: 'No nearby store data', subtitle: 'Google did not return results', color: '#9ca3af' },
            ];
          }
          resolve();
        }
      );
    });
  }

  onMount(async () => {
    if (!mapContainer) {
      return;
    }

    try {
      await loadGoogleMaps(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`);

      const google = getGoogle();
      if (!google?.maps?.Map) {
        return;
      }

      const map = new google.maps.Map(mapContainer, {
        center: defaultCenter,
        zoom: 14,
      });

      const initialCenter = await new Promise<LatLngLiteral>((resolve) => {
        if (!navigator.geolocation) {
          resolve(defaultCenter);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
          },
          () => resolve(defaultCenter),
          { timeout: 5000 }
        );
      });

      map.setCenter(initialCenter);
      await fetchNearbyPlaces(initialCenter);
    } catch (error) {
      console.error('Failed to load Google Maps', error);
      places = [
        { title: 'Unable to load nearby places', subtitle: 'Check your API key or browser permissions', color: '#9ca3af' },
      ];
    }
  });
</script>

<style>
  .page {
    max-width: 720px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #111827;
  }

  .card {
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 24px 56px rgba(15, 23, 42, 0.08);
    padding: 1rem;
  }

  .map-card {
    border: 3px solid #2f80ed;
    padding: 0.75rem;
  }

  .map-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .map-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
  }

  .close-button {
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 50%;
    background: #f2f4f7;
    color: #334155;
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
  }

  .map-frame {
    overflow: hidden;
    border-radius: 20px;
    min-height: 260px;
  }

  .map-container {
    width: 100%;
    height: 360px;
  }

  .nearby-card {
    padding: 1rem 1.25rem;
  }

  .nearby-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .place-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .place-item {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.75rem 0.85rem;
    border-radius: 20px;
    background: #f8fafc;
  }

  .place-avatar {
    width: 52px;
    height: 52px;
    border-radius: 18px;
    display: grid;
    place-items: center;
    color: #fff;
    font-weight: 700;
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  }

  .place-text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .place-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
  }

  .place-subtitle {
    margin: 0;
    font-size: 0.95rem;
    color: #667085;
  }
</style>

<div class="page">
  <div class="card map-card">
    <div class="map-header">
      <h1 class="map-title">Map</h1>
      <button class="close-button" aria-label="Close map">×</button>
    </div>

    <div class="map-frame">
      <div bind:this={mapContainer} class="map-container"></div>
    </div>
  </div>

  <div class="card nearby-card">
    <h2 class="nearby-title">Near you</h2>
    <div class="place-list">
      {#each places as place (place.title)}
        <article class="place-item">
          <div class="place-avatar" style="background: {place.color}">
            {place.title.charAt(0)}
          </div>
          <div class="place-text">
            <p class="place-title">{place.title}</p>
            <p class="place-subtitle">{place.subtitle}</p>
          </div>
        </article>
      {/each}
    </div>
  </div>
</div>
