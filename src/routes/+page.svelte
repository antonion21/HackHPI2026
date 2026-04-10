<script>
    import HistoryCard from "$lib/HistoryCard.svelte";
</script>

<!-- Profile -->
<div class="flex-row text-center">
    <span class="profile-name">LocalLoop</span>
    <span class="avatar">PO</span>
</div>

<!-- Points -->
<div class="flex flex-col text-center">
    <div class="points-value">360 TODO</div>
    <div class="euro-value">~230kg Fleisch CO2</div>
    <div>progress bar</div>
</div>

<!-- Upload -->
<button
    class="flex items-center justify-center
        bg-emerald-500 hover:bg-emerald-700 text-white
        font-bold py-2 px-4 rounded-full"
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
    </svg>

    <span>Upload Receipt</span>
</button>

<!-- History -->
<div class="flex flex-row">
    <h2>History</h2>
    <a class="view-all">View all</a>
</div>

<div class="flex flex-col">
    <HistoryCard amount={42} name="Nextbike Ride" date="19.09.2025" />
    <HistoryCard amount={null} name="Local Bakery" date="" />
    <HistoryCard amount={null} name="Local Bakery" date="" />
</div>

<!-- Bottom Bar -->
<div class="bottom-bar">
    <button class="scan-btn">
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M3 11h2V9H3v2zm0-4h2V5H3v2zm4 4h2V9H7v2zm0-4h2V5H7v2zm-4 8h2v-2H3v2zm8-8h2V5h-2v2zm-4 8h2v-2H7v2zm4 0h2v-2h-2v2zm4-4h2V9h-2v2zm0-6v2h2V5h-2zm4 4h2V9h-2v2zm0-4h2V5h-2v2zm0 8h2v-2h-2v2zm-4 0h2v-2h-2v2zm-8 4h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2z"
            />
        </svg>
        Scan QR code
    </button>
    <button class="map-btn">
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
    </button>
</div>
