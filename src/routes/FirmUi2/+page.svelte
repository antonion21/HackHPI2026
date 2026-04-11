<script lang="ts">
    interface Product {
        name: string;
        points: number;
        category: string;
    }

    interface OpeningHours {
        day: string;
        open: string;
        close: string;
        closed: boolean;
    }

    const businessName: string = 'Grüne Bäckerei Müller';
    const email: string = 'info@baeckerei-mueller.de';
    const phone: string = '+49 331 456 7890';
    const website: string = 'www.baeckerei-mueller.de';
    const description: string = 'Wir sind eine nachhaltige Bäckerei im Herzen von Potsdam. Alle unsere Produkte werden mit regionalen Zutaten und erneuerbarer Energie hergestellt.';

    const address = {
        street: 'Brandenburger Straße 42',
        city: 'Potsdam',
        zip: '14467',
        country: 'Deutschland'
    };

    const products: Product[] = [
        { name: 'Öko-Brot', points: 20, category: 'Backwaren' },
        { name: 'Regionales Frühstück', points: 35, category: 'Speisen' },
        { name: 'Mehrwegbecher Kaffee', points: 15, category: 'Getränke' },
        { name: 'Saisonales Gemüsebrötchen', points: 25, category: 'Backwaren' },
    ];

    const openingHours: OpeningHours[] = [
        { day: 'Montag', open: '07:00', close: '18:00', closed: false },
        { day: 'Dienstag', open: '07:00', close: '18:00', closed: false },
        { day: 'Mittwoch', open: '07:00', close: '18:00', closed: false },
        { day: 'Donnerstag', open: '07:00', close: '18:00', closed: false },
        { day: 'Freitag', open: '07:00', close: '19:00', closed: false },
        { day: 'Samstag', open: '08:00', close: '16:00', closed: false },
        { day: 'Sonntag', open: '00:00', close: '00:00', closed: true },
    ];

    const today: number = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1;
</script>

<svelte:head>
    <title>Business Profil - ESG Tracker</title>
</svelte:head>

<div class="min-h-screen bg-white">

    <!-- Header -->
    <div class="bg-white shadow-sm relative z-10">
        <div class="px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background: #079669;">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                </div>
                <span class="font-bold text-xl text-gray-900">Business Portal</span>
            </div>
            <button class="p-2" type="button" aria-label="Menu öffnen">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </div>

    <!-- Business Hero -->
    <div class="px-4 py-6 border-b border-gray-100">
        <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style="background: #079669;">
                <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
            </div>
            <div>
                <h1 class="text-xl font-bold text-gray-900">{businessName}</h1>
                <span class="inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full text-white" style="background: #079669;">ESG Partner</span>
            </div>
        </div>
    </div>

    <div class="px-4 py-4 flex flex-col gap-5">

        <!-- Generelle Informationen -->
        <div>
            <h2 class="text-gray-800 text-lg font-bold mb-3">Generelle Informationen</h2>
            <div class="bg-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                <div>
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Beschreibung</p>
                    <p class="text-gray-900 text-sm leading-relaxed">{description}</p>
                </div>
                <div class="border-t border-gray-200 pt-3">
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Webseite</p>
                    <p class="text-gray-900 text-sm">{website}</p>
                </div>
            </div>
        </div>

        <!-- Account Informationen -->
        <div>
            <h2 class="text-gray-800 text-lg font-bold mb-3">Account Informationen</h2>
            <div class="bg-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                <div>
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Name</p>
                    <p class="text-gray-900 text-sm">{businessName}</p>
                </div>
                <div class="border-t border-gray-200 pt-3">
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">E-Mail</p>
                    <p class="text-gray-900 text-sm">{email}</p>
                </div>
                <div class="border-t border-gray-200 pt-3">
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Telefon</p>
                    <p class="text-gray-900 text-sm">{phone}</p>
                </div>
                <div class="border-t border-gray-200 pt-3">
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Passwort</p>
                    <p class="text-gray-900 text-sm tracking-widest">••••••••</p>
                </div>
            </div>
        </div>

        <!-- Anschrift -->
        <div>
            <h2 class="text-gray-800 text-lg font-bold mb-3">Anschrift</h2>
            <div class="bg-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                <div>
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Straße</p>
                    <p class="text-gray-900 text-sm">{address.street}</p>
                </div>
                <div class="border-t border-gray-200 pt-3 grid grid-cols-2 gap-3">
                    <div>
                        <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">PLZ</p>
                        <p class="text-gray-900 text-sm">{address.zip}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Stadt</p>
                        <p class="text-gray-900 text-sm">{address.city}</p>
                    </div>
                </div>
                <div class="border-t border-gray-200 pt-3">
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Land</p>
                    <p class="text-gray-900 text-sm">{address.country}</p>
                </div>
            </div>
        </div>

        <!-- Angebotene Produkte -->
        <div>
            <h2 class="text-gray-800 text-lg font-bold mb-3">Angebotene Produkte</h2>
            <div class="flex flex-col gap-2">
                {#each products as product}
                    <div class="bg-gray-100 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p class="text-gray-900 text-sm font-semibold">{product.name}</p>
                            <p class="text-gray-500 text-xs mt-0.5">{product.category}</p>
                        </div>
                        <div class="flex items-baseline gap-1">
                            <span class="text-lg font-bold" style="color: #079669;">+{product.points}</span>
                            <span class="text-xs font-semibold" style="color: #079669;">P</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Öffnungszeiten -->
        <div class="pb-6">
            <h2 class="text-gray-800 text-lg font-bold mb-3">Öffnungszeiten</h2>
            <div class="bg-gray-100 rounded-2xl overflow-hidden">
                {#each openingHours as hours, i}
                    <div class="px-4 py-3 flex items-center justify-between {i === dayIndex ? 'bg-white' : ''} {i < openingHours.length - 1 ? 'border-b border-gray-200' : ''}">
                        <div class="flex items-center gap-2">
                            {#if i === dayIndex}
                                <span class="w-2 h-2 rounded-full flex-shrink-0" style="background: #079669;"></span>
                            {:else}
                                <span class="w-2 h-2 rounded-full bg-transparent flex-shrink-0"></span>
                            {/if}
                            <p class="text-sm {i === dayIndex ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}">{hours.day}</p>
                        </div>
                        {#if hours.closed}
                            <p class="text-sm text-gray-400 font-medium">Geschlossen</p>
                        {:else}
                            <p class="text-sm {i === dayIndex ? 'font-bold text-gray-900' : 'text-gray-600'}">{hours.open} – {hours.close}</p>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>

    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
</style>