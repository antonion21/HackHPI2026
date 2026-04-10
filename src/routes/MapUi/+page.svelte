<script lang="ts">
  import { onMount } from 'svelte';

  type LatLng = { lat: number; lng: number };

  interface PlaceItem {
    title: string;
    subtitle: string;
    distance: string;
    color: string;
    icon: string;
    image: string;
    lat: number;
    lng: number;
  }

  interface LeafletMap {
    setView(coords: [number, number], zoom: number): LeafletMap;
  }

  interface LeafletTileLayer {
    addTo(map: LeafletMap): LeafletTileLayer;
  }

  interface LeafletMarker {
    addTo(map: LeafletMap): LeafletMarker;
  }

  interface LeafletIcon {
    addTo(map: LeafletMap): LeafletMarker;
  }

  interface LeafletApi {
    map(container: HTMLElement, options?: unknown): LeafletMap;
    tileLayer(url: string, options?: unknown): LeafletTileLayer;
    marker(coords: [number, number], options?: unknown): LeafletMarker;
    divIcon(options: {
      html: string;
      className: string;
      iconSize: [number, number];
      iconAnchor: [number, number];
      popupAnchor?: [number, number];
    }): LeafletIcon;
  }

  interface LeafletWindow {
    L?: LeafletApi;
  }

  let places = $state<PlaceItem[]>([]);
  let mapContainer = $state<HTMLDivElement | null>(null);
  let errorMessage = $state<string | null>(null);

  const defaultCenter: LatLng = { lat: 52.4064, lng: 13.0623 };

  function placeColor(index: number) {
    const colors = ['#eb5757', '#2f80ed', '#27ae60', '#f59e0b'];
    return colors[index % colors.length];
  }

  function loadLeaflet(): Promise<void> {
    return new Promise((resolve, reject) => {
      const existingLeaflet = (window as unknown as LeafletWindow).L;
      if (existingLeaflet) {
        resolve();
        return;
      }

      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(style);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.type = 'text/javascript';
      script.onload = () => {
        const loadedLeaflet = (window as unknown as LeafletWindow).L;
        if (loadedLeaflet) {
          resolve();
        } else {
          reject(new Error('Leaflet script loaded but window.L is undefined'));
        }
      };
      script.onerror = () => reject(new Error('Leaflet failed to load'));
      document.head.appendChild(script);
    });
  }

  function getLeaflet(): LeafletApi | undefined {
    return (window as unknown as LeafletWindow).L;
  }

  function createFakePlaces(center: LatLng): PlaceItem[] {
    return [
      {
        title: 'Tante Emma Shop',
        subtitle: 'Open now',
        distance: '0.5 km',
        color: placeColor(0),
        icon: '🛒',
        image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=200&q=80',
        lat: center.lat + 0.0021,
        lng: center.lng - 0.0028,
      },
      {
        title: 'Local Bakery',
        subtitle: 'Fresh bread',
        distance: '0.8 km',
        color: placeColor(1),
        icon: '🥐',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
        lat: center.lat - 0.0019,
        lng: center.lng + 0.0032,
      },
    ];
  }

  function createMarkerIcon(L: LeafletApi, icon: string, color: string) {
    return L.divIcon({
      html: `<div class="custom-shop-marker" style="--marker-color: ${color};">` +
        `<span class="custom-shop-icon">${icon}</span>` +
        `</div>`,
      className: 'custom-shop-marker-wrapper',
      iconSize: [42, 42],
      iconAnchor: [21, 42],
      popupAnchor: [0, -42],
    });
  }

  async function initializeMap(center: LatLng) {
    if (!mapContainer) {
      errorMessage = 'Map container is not ready.';
      return;
    }

    await loadLeaflet();

    const L = getLeaflet();
    if (!L) {
      throw new Error('Leaflet did not load.');
    }

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    const map = L.map(mapContainer).setView([center.lat, center.lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    const fakePlaces = createFakePlaces(center);
    places = fakePlaces;
    fakePlaces.forEach((place) => {
      const icon = createMarkerIcon(L, place.icon, place.color);
      L.marker([place.lat, place.lng], { icon }).addTo(map);
    });
  }

  onMount(async () => {
    if (!mapContainer) {
      errorMessage = 'Map container is not ready.';
      return;
    }

    try {
      const initialCenter = await new Promise<LatLng>((resolve) => {
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

      await initializeMap(initialCenter);
    } catch (error) {
      console.error('Failed to load OSM map', error);
      const message = error instanceof Error ? error.message : String(error);
      errorMessage = `Unable to load the OpenStreetMap map: ${message}`;
      places = [
        { title: 'Unable to load map data', subtitle: 'Check your network or browser console', distance: '-', color: '#9ca3af', icon: '⚠️', image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=200&q=80', lat: defaultCenter.lat, lng: defaultCenter.lng },
      ];
    }
  });
</script>

<style>
  .page {
    max-width: 720px;
    margin: 0 auto;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 100vh;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #111827;
    background: #f5f7fb;
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
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: #f2f4f7;
    color: #334155;
    font-size: 1.3rem;
    line-height: 1;
    cursor: pointer;
    display: grid;
    place-items: center;
  }

  .map-frame {
    overflow: hidden;
    border-radius: 28px;
    min-height: 300px;
    box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.04);
  }

  .map-container {
    width: 100%;
    height: 320px;
  }

  .map-card {
    border: none;
    padding: 1rem;
    background: #ffffff;
    border-radius: 32px;
    box-shadow: 0 24px 70px rgba(15, 23, 42, 0.08);
  }

  .map-header {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    align-items: center;
    margin-bottom: 1rem;
  }

  .map-title {
    font-size: 1.35rem;
    font-weight: 700;
    text-align: center;
    margin: 0;
  }

  .header-spacer {
    width: 40px;
    height: 40px;
  }

  .error-banner {
    margin: 0 0 0.75rem;
    padding: 0.85rem 1rem;
    border-radius: 18px;
    background: #fef3f2;
    color: #b91c1c;
    font-size: 0.95rem;
    border: 1px solid #fecaca;
  }

  .map-container {
    width: 100%;
    height: 360px;
  }

  .nearby-card {
    padding: 1.25rem;
    background: #ffffff;
    border-radius: 32px;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.06);
  }

  .nearby-title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: #111827;
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
    padding: 0.85rem;
    border-radius: 24px;
    background: #f8fafc;
    border: 1px solid rgba(15, 23, 42, 0.06);
  }

  .place-avatar {
    width: 62px;
    height: 62px;
    border-radius: 20px;
    overflow: hidden;
    display: block;
    flex-shrink: 0;
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  }

  .place-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  :global(.custom-shop-marker-wrapper) {
    display: block;
  }

  :global(.custom-shop-marker) {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--marker-color);
    display: grid;
    place-items: center;
    box-shadow: 0 12px 18px rgba(15, 23, 42, 0.18);
    border: 2px solid rgba(255, 255, 255, 0.92);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
  }

  :global(.custom-shop-icon) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .place-text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .place-distance {
    font-size: 0.95rem;
    color: #667085;
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
      <button class="close-button" aria-label="Close map">×</button>
      <h1 class="map-title">Map</h1>
      <div class="header-spacer"></div>
    </div>

    {#if errorMessage}
      <div class="error-banner">{errorMessage}</div>
    {/if}

    <div class="map-frame">
      <div bind:this={mapContainer} class="map-container"></div>
    </div>
  </div>

  <div class="card nearby-card">
    <h2 class="nearby-title">Near you</h2>
    <div class="place-list">
      {#each places as place (place.title)}
        <article class="place-item">
          <div class="place-avatar">
            <img src={place.image} alt={place.title} loading="lazy" />
          </div>
          <div class="place-text">
            <p class="place-title">{place.title}</p>
            <p class="place-subtitle">{place.subtitle}</p>
            <p class="place-distance">{place.distance}</p>
          </div>
        </article>
      {/each}
    </div>
  </div>
</div>
