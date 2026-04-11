<script>
    import HistoryCard from "$lib/HistoryCard.svelte";

    let user = {
        name: "Jona Ollek",
        avatar: "https://thispersondoesnotexist.com/",
        points: 130,
        value: "30",
    };
</script>

<div class="flex items-center gap-3 mb-8">
    <img
        src={user.avatar}
        alt={user.name}
        class="w-10 h-10 rounded-full border border-gray-100 object-cover"
    />
    <span class="text-gray-600 font-medium text-sm">{user.name}</span>
</div>

<div
    class="bg-gray-50 rounded-[50px] p-10 flex flex-col items-center justify-center"
>
    <div class="bg-white p-4 rounded-[1.5rem] shadow-lg">
        <svg
            class="w-32 h-32 text-black"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path
                d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v2h-3v-2zm-3 0h2v2h-2v-2z"
            />
        </svg>
        <p class="text-gray-800 text-sm font-medium text-center">
            Scan to redeem
        </p>
    </div>
</div>

<div class="text-center">
    <h1 class="text-4xl font-bold text-[#009669] mb-1 tracking-tight">
        {user.points} Paws
    </h1>
    <p class="text-gray-500 text-sm">
        Saved as much as {user.value} Trees this year!
    </p>
</div>
<div class="flex justify-between items-center pt-8">
    <h2 class="text-2xl font-bold text-gray-500">History</h2>
    <button
        class="text-[#009669] font-semibold text-sm hover:underline transition-all"
    >
        View all
    </button>
</div>

<div class="mb-2"></div>

<div class="flex flex-col">
    <HistoryCard amount={2} name="Nextbike Ride" date="19.09.2025" />
    <HistoryCard amount={-10} name="Local Bakery" date="10.09.2025" />
    <HistoryCard amount={undefined} name="Solar Panel" date="29.08.2025" />
</div>

<div class="flex flex-row-reverse items-center justify-between">
    <!-- Map Button -->
    <a
        type="button"
        class="flex h-14 w-14 items-center justify-center rounded-full bg-[#009669] text-white shadow-lg shadow-emerald-900/20 transition-transform active:scale-95"
        aria-label="View Map"
        href="/MapUi"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="h-7 w-7"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.446 4.874-2.437c.381-.19.623-.579.623-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.269 3 6.696v10.758c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
            />
        </svg>
    </a>

    <!-- Upload Button -->
    <a
        type="button"
        class="inline-flex items-center gap-2.5 px-6 py-3 bg-[#009367] text-white rounded-full transition-all shadow-lg shadow-emerald-900/20 duration-150 hover:bg-[#007d57] focus:outline-none focus:ring-2 focus:ring-[#009367]/50"
        href="Upload"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5 text-white"
        >
            <path
                d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
            />
            <path d="M12 12v9" />
            <path d="m16 16-4-4-4 4" />
        </svg>

        <span class="text-base font-semibold tracking-wide">
            Upload Receipttt
        </span>
    </a>
</div>
