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
</style>

<div class="flex min-h-screen items-center justify-center bg-[#f4f6f8] overflow-hidden">
  <div class="flex flex-col" style="width:402px; height:874px; overflow:hidden;">
    <div class="flex h-full w-full flex-col">
      <div class="mt-12 flex-1 overflow-hidden rounded-t-3xl bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <div class="h-full px-4 py-6 sm:px-6 md:px-8">
          <div class="grid grid-cols-[40px_1fr_40px] items-center gap-4 border-b border-[#d8dee6] px-0 py-4">
        <button class="grid h-10 w-10 place-items-center rounded-full bg-[#eef2f7] text-slate-700 shadow-sm" aria-label="Close map">×</button>
        <h1 class="text-center text-lg font-semibold text-slate-900">Map</h1>
        <div class="h-10 w-10"></div>
      </div>

      {#if errorMessage}
        <div class="mt-4 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      {/if}

      <div class="mt-4 overflow-hidden rounded-[28px] border border-[#dde4ec] bg-[#f8fafc] shadow-inner">
        <div bind:this={mapContainer} class="h-72 w-full sm:h-80"></div>
      </div>

      <div class="mt-6 pb-6 pt-5">
        <h2 class="text-2xl font-semibold text-slate-900">Near you</h2>
        <div class="mt-4 space-y-4">
          {#each places as place (place.title)}
            <article class="flex items-center gap-4 rounded-3xl bg-[#f7f8fb] border border-[#e2e8f0] p-4 shadow-sm">
              <div class="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-300 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <img src={place.image} alt={place.title} loading="lazy" class="h-full w-full object-cover" />
              </div>
              <div class="min-w-0">
                <p class="text-base font-semibold text-slate-900">{place.title}</p>
                <p class="mt-1 text-sm text-slate-500">{place.subtitle}</p>
                <p class="mt-1 text-sm text-slate-400">{place.distance}</p>
              </div>
            </article>
          {/each}
        </div>
      </div>
    </div>
    </div>
    </div>
  </div>
</div>
