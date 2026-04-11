<script lang="ts">
  import { onMount } from 'svelte';

  type Offer = {
    id: number;
    name: string;
    points: number;
    type: 'earn' | 'redeem';
    category: string;
    expiry?: string;
  };

  type Product = {
    id: number;
    name: string;
    description: string;
    pointsEarned: number;
    emoji: string;
  };

  const offers: Offer[] = [
    { id: 1, name: 'Buy any local cheese', points: 30, type: 'earn', category: 'Dairy', expiry: '30.09.2026' },
    { id: 2, name: 'Organic vegetable basket', points: 50, type: 'earn', category: 'Produce', expiry: '15.10.2026' },
    { id: 3, name: 'Free reusable bag', points: -25, type: 'redeem', category: 'Reward' },
    { id: 4, name: 'Homemade jam (any)', points: 20, type: 'earn', category: 'Pantry', expiry: '01.11.2026' },
    { id: 5, name: 'Coffee discount voucher', points: -40, type: 'redeem', category: 'Reward' },
  ];

  const products: Product[] = [
    { id: 1, name: 'Farm Eggs (6x)', description: 'Local free-range eggs', pointsEarned: 15, emoji: '🥚' },
    { id: 2, name: 'Rye Sourdough', description: 'Baked fresh daily', pointsEarned: 20, emoji: '🍞' },
    { id: 3, name: 'Honey Jar 250g', description: 'Regional beekeeper', pointsEarned: 25, emoji: '🍯' },
    { id: 4, name: 'Seasonal Herbs', description: 'Potted or cut', pointsEarned: 10, emoji: '🌿' },
  ];

  let activeTab: 'offers' | 'products' = 'offers';
  let visible = false;

  onMount(() => {
    setTimeout(() => (visible = true), 50);
  });
</script>

<div class="min-h-screen bg-gray-50 font-[system-ui] max-w-sm mx-auto relative overflow-hidden">

  <!-- Header -->
  <div class="bg-white px-4 pt-12 pb-0 relative">
    <div class="flex items-center justify-between mb-4">
      <button class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <span class="text-sm font-medium text-gray-400">Shop Detail</span>
      <button class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>
    </div>

    <!-- Shop identity -->
    <div class="flex items-center gap-4 pb-5">
      <div class="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
        🏪
      </div>
      <div class="flex-1 min-w-0">
        <h1 class="text-xl font-bold text-gray-900 leading-tight">Tante Emma Shop</h1>
        <p class="text-sm text-gray-500 mt-0.5">Neighbourhood Grocery · 0.8 km</p>
        <div class="flex items-center gap-3 mt-2">
          <span class="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            Open now
          </span>
          <span class="text-xs text-gray-400">until 19:00</span>
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 -mx-4 px-4">
      {#each [['5', 'Offers'], ['4.8', 'Rating'], ['2×', 'Bonus today']] as [val, label] , i (offers.id)}
        <div class="py-3 flex flex-col items-center">
          <span class="text-sm font-bold text-gray-900">{val}</span>
          <span class="text-xs text-gray-400 mt-0.5">{label}</span>
        </div>
      {/each}
    </div>

    <!-- Tabs -->
    <div class="flex gap-0 -mx-4 border-t border-gray-100">
      {#each (['offers', 'products'] as const) as tab , i (offer.id)}
        <button
          class="flex-1 py-3 text-sm font-semibold transition-colors relative capitalize
            {activeTab === tab ? 'text-emerald-600' : 'text-gray-400'}"
          on:click={() => (activeTab = tab)}
        >
          {tab}
          {#if activeTab === tab}
            <span class="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-t-full"></span>
          {/if}
        </button>
      {/each}
    </div>
  </div>

  <!-- Content -->
  <div class="px-4 py-3 space-y-2">
    {#if activeTab === 'offers'}
      {#each offers as offer, i (offer.id)}
        <div
          class="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]
            transition-all duration-300"
          style="transition-delay: {i * 40}ms"
        >
          <!-- Icon -->
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
              {offer.type === 'earn' ? 'bg-emerald-50' : 'bg-rose-50'}"
          >
            {#if offer.type === 'earn'}
              <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
              </svg>
            {:else}
              <svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a4 4 0 00-4-4H5.45a2 2 0 00-1.8 2.89L5 8m7 0H5m7 0h7m0 0l1.35-3.11A2 2 0 0018.55 2H16a4 4 0 00-4 4v2"/>
              </svg>
            {/if}
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-800 truncate">{offer.name}</p>
            <p class="text-xs text-gray-400 mt-0.5">
              {offer.category}{offer.expiry ? ` · exp. ${offer.expiry}` : ''}
            </p>
          </div>

          <!-- Points -->
          <div class="text-right flex-shrink-0">
            <span class="text-sm font-bold {offer.type === 'earn' ? 'text-emerald-600' : 'text-rose-500'}">
              {offer.type === 'earn' ? `+${offer.points}` : `${offer.points}`} P
            </span>
            <p class="text-xs text-gray-400 mt-0.5">{offer.type === 'earn' ? 'Earned' : 'Spent'}</p>
          </div>
        </div>
      {/each}

    {:else}
      {#each products as product, i (offer.id)}
        <div
          class="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
          style="transition-delay: {i * 40}ms"
        >
          <div class="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-xl flex-shrink-0">
            {product.emoji}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-800">{product.name}</p>
            <p class="text-xs text-gray-400 mt-0.5">{product.description}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="text-sm font-bold text-emerald-600">+{product.pointsEarned} P</span>
            <p class="text-xs text-gray-400 mt-0.5">on purchase</p>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>