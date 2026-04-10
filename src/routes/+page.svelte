<script>
    import HistoryCard from "$lib/HistoryCard.svelte";

    let user = {
        name: "Peter Ollek",
        avatar: "https://xsgames.co/randomusers/assets/avatars/male/74.jpg", // Placeholder
        points: 10230,
        value: "32,000"
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

  <div class="bg-gray-50 rounded-[40px] p-10 flex flex-col items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] mb-8">
    <div class="bg-white p-4 rounded-xl shadow-sm mb-4">
      <svg class="w-32 h-32 text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v2h-3v-2zm-3 0h2v2h-2v-2z"/>
      </svg>
    </div>
    <p class="text-gray-800 text-sm font-medium">Scan to redeem</p>
  </div>

  <div class="text-center mb-10">
    <h1 class="text-4xl font-bold text-[#009669] mb-1 tracking-tight">
      {user.points} Points
    </h1>
    <p class="text-gray-500 text-sm">
      €{user.value} value
    </p>
  </div>

  <div class="flex justify-between items-center pt-2">
    <h2 class="text-2xl font-bold text-gray-500">History</h2>
    <button class="text-[#009669] font-semibold text-sm hover:underline transition-all">
      View all
    </button>
  </div>

<div class="flex flex-col">
    <HistoryCard amount={2} name="Nextbike Ride" date="19.09.2025" />
    <HistoryCard amount={-10} name="Local Bakery" date="10.09.2025" />
    <HistoryCard amount={200} name="Solar Panel" date="29.08.2025" />
</div>
