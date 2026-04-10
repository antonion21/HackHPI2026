<script lang="ts">
    import type { HistoryCardData } from "$lib";

    let data: HistoryCardData = $props();

  
    // Logic to determine state based on amount
    let isPending = $derived(data.amount === null || data.amount === undefined);
    let isPositive = $derived(data.amount !== null && data.amount != undefined && data.amount > 0);
    let isNegative = $derived(data.amount !== null && data.amount != undefined && data.amount < 0);
  
    // Dynamic formatting
    let displayAmount = $derived(isPending ? "" : `${isPositive ? '+' : ''}${data.amount} P`);
    let statusLabel = $derived(isPending ? "Pending" : (isPositive ? "Earned" : "Spent"));
  </script>
  
  <div class="flex items-center justify-between w-full max-w-md p-4 mb-3 bg-gray-200/50 rounded-[1.5rem]">
    <div class="flex items-center space-x-4">
      <div class="flex h-12 w-12 items-center justify-center rounded-full 
        {isPending ? 'bg-gray-200' : ''} 
        {isPositive ? 'bg-[#D2E9E1]' : ''} 
        {isNegative ? 'bg-[#F9DEDC]' : ''}">
        
        {#if isPending}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-gray-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        {:else if isPositive}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-[#00875A]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-[#E54D4D]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
          </svg>
        {/if}
      </div>
  
      <div class="flex flex-col">
        <h3 class="text-[17px] font-bold text-gray-900 leading-tight">{data.name}</h3>
        <p class="text-sm text-gray-500">{data.date}</p>
      </div>
    </div>
  
    <div class="text-right">
      <div class="text-lg font-bold 
        {isPending ? 'hidden' : ''} 
        {isPositive ? 'text-[#00875A]' : 'text-[#E54D4D]'}">
        {displayAmount}
      </div>
      <div class="text-sm text-gray-500 font-medium">
        {statusLabel}
      </div>
    </div>
  </div>