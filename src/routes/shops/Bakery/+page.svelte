<script lang="ts">
  import { onMount } from 'svelte';

  type HistoryItem = {
    id: number;
    name: string;
    date: string;
    points: number;
    status: 'earned' | 'spent' | 'pending';
  };

  type MenuItem = {
    id: number;
    name: string;
    description: string;
    pointsEarned: number;
    emoji: string;
    tag?: string;
  };

  const history: HistoryItem[] = [
    { id: 1, name: 'Local Bakery Discount', date: '10.09.2026', points: -10, status: 'spent' },
    { id: 2, name: 'Local Bakery Discount', date: '01.09.2026', points: 0, status: 'pending' },
    { id: 3, name: 'Morning Roll Bundle', date: '28.08.2026', points: 20, status: 'earned' },
    { id: 4, name: 'Birthday Cake Reward', date: '15.08.2026', points: -60, status: 'spent' },
    { id: 5, name: 'Croissant Tuesday', date: '12.08.2026', points: 15, status: 'earned' },
  ];

  const menu: MenuItem[] = [
    { id: 1, name: 'Sourdough Loaf', description: 'Stone-baked, 750g', pointsEarned: 20, emoji: '🍞', tag: 'Bestseller' },
    { id: 2, name: 'Butter Croissant', description: 'Freshly laminated dough', pointsEarned: 10, emoji: '🥐' },
    { id: 3, name: 'Cinnamon Roll', description: 'With cream cheese glaze', pointsEarned: 15, emoji: '🌀', tag: 'New' },
    { id: 4, name: 'Pretzel', description: 'Classic Bavarian style', pointsEarned: 8, emoji: '🥨' },
    { id: 5, name: 'Seasonal Tart', description: 'Changes weekly', pointsEarned: 18, emoji: '🥧' },
  ];

  let activeTab: 'history' | 'menu' = 'history';

  function statusColor(status: HistoryItem['status']): string {
    if (status === 'earned') return 'bg-emerald-50';
    if (status === 'spent') return 'bg-rose-50';
    return 'bg-gray-100';
  }

  function statusIconColor(status: HistoryItem['status']): string {
    if (status === 'earned') return 'text-emerald-500';
    if (status === 'spent') return 'text-rose-400';
    return 'text-gray-400';
  }

  function pointsLabel(status: HistoryItem['status']): string {
    if (status === 'earned') return 'Earned';
    if (status === 'spent') return 'Spent';
    return 'Pending';
  }

  function pointsColor(status: HistoryItem['status']): string {
    if (status === 'earned') return 'text-emerald-600';
    if (status === 'spent') return 'text-rose-500';
    return 'text-gray-400';
  }

  onMount(() => {});
</script>

<div class="min-h-screen bg-gray-50 font-[system-ui] max-w-sm mx-auto relative overflow-hidden">

  <!-- Header -->
  <div class="bg-white px-4 pt-12 pb-0">
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
      <div class="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
        🥖
      </div>
      <div class="flex-1 min-w-0">
        <h1 class="text-xl font-bold text-gray-900 leading-tight">Local Bakery</h1>
        <p class="text-sm text-gray-500 mt-0.5">Artisan Bakery · 1 km</p>
        <div class="flex items-center gap-3 mt-2">
          <span class="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            Open now
          </span>
          <span class="text-xs text-gray-400">until 17:30</span>
        </div>
      </div>
    </div>

    <!-- Active discount banner -->
    <div class="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 mb-4 flex items-center gap-3">
      <div class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
        </svg>
      </div>
      <div class="flex-1">
        <p class="text-xs font-semibold text-emerald-800">Active discount pending</p>
        <p class="text-xs text-emerald-600 mt-0.5">Local Bakery Discount · 01.09.2026</p>
      </div>
      <button class="text-xs font-bold text-emerald-600 bg-white border border-emerald-200 px-3 py-1 rounded-full">
        Redeem
      </button>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 -mx-4 px-4">
      {#each [['3', 'Visits'], ['4.6', 'Rating'], ['-10 P', 'Last spent']] as [val, label] , i (i)}
        <div class="py-3 flex flex-col items-center">
          <span class="text-sm font-bold text-gray-900">{val}</span>
          <span class="text-xs text-gray-400 mt-0.5">{label}</span>
        </div>
      {/each}
    </div>

    <!-- Tabs -->
    <div class="flex gap-0 -mx-4 border-t border-gray-100">
      {#each (['history', 'menu'] as const) as tab (tab)}
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
  <div class="px-4 py-3 space-y-2 pb-28">
    {#if activeTab === 'history'}
      <!-- Section label matching app style -->
      <div class="flex items-center justify-between px-1 mb-1">
        <span class="text-sm font-semibold text-gray-800">History</span>
        <button class="text-xs font-medium text-emerald-600">View all</button>
      </div>

      {#each history as item (item.id)}
        <div class="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <!-- Icon circle -->
          <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 {statusColor(item.status)}">
            {#if item.status === 'earned'}
              <svg class="w-5 h-5 {statusIconColor(item.status)}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
              </svg>
            {:else if item.status === 'spent'}
              <svg class="w-5 h-5 {statusIconColor(item.status)}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6"/>
              </svg>
            {:else}
              <svg class="w-5 h-5 {statusIconColor(item.status)}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            {/if}
          </div>

          <!-- Text -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
            <p class="text-xs text-gray-400 mt-0.5">{item.date}</p>
          </div>

          <!-- Points -->
          <div class="text-right flex-shrink-0">
            {#if item.status !== 'pending'}
              <span class="text-sm font-bold {pointsColor(item.status)}">
                {item.status === 'earned' ? `+${item.points}` : `${item.points}`} P
              </span>
            {:else}
              <span class="text-sm font-bold text-gray-400">— P</span>
            {/if}
            <p class="text-xs text-gray-400 mt-0.5">{pointsLabel(item.status)}</p>
          </div>
        </div>
      {/each}

    {:else}
      <div class="flex items-center justify-between px-1 mb-1">
        <span class="text-sm font-semibold text-gray-800">Today's Selection</span>
        <span class="text-xs text-gray-400">Earn points on every purchase</span>
      </div>

      {#each menu as item (item.id)}
        <div class="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-xl flex-shrink-0">
            {item.emoji}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="text-sm font-semibold text-gray-800">{item.name}</p>
              {#if item.tag}
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  {item.tag === 'New' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}">
                  {item.tag}
                </span>
              {/if}
            </div>
            <p class="text-xs text-gray-400 mt-0.5">{item.description}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="text-sm font-bold text-emerald-600">+{item.pointsEarned} P</span>
            <p class="text-xs text-gray-400 mt-0.5">on purchase</p>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>