<script lang="ts">
    import { onMount } from 'svelte';
    // import BusinessQRScanner from './BusinessQRScanner.svelte'

    interface TransactionData {
        action: string;
        date: string;
        time: string;
        points: number;
    }

    let lastScannedCode: string | null = null;
    let scanTimeout: ReturnType<typeof setTimeout> | null = null;
    let transactionData: TransactionData | null = null;
    let todayScans: number = 24;
    let totalPoints: number = 1240;
    let cameraError: boolean = false;

    const ACTIONS: readonly string[] = [
        'Nextbike Ride',
        'Öko-Einkauf',
        'ÖPNV Fahrt',
        'Recycling',
        'CO₂-Kompensation'
    ] as const;

    function onScanSuccess(decodedText: string): void {
        // Prevent duplicate scans
        if (decodedText === lastScannedCode) {
            return;
        }
        
        // Clear any existing timeout
        if (scanTimeout) {
            clearTimeout(scanTimeout);
        }
        
        lastScannedCode = decodedText;
        
        // Simulate transaction processing
        processTransaction();
        
        // Reset after 3 seconds to allow next scan
        scanTimeout = setTimeout((): void => {
            lastScannedCode = null;
        }, 3000);
    }

    function processTransaction(): void {
        // Generate mock transaction data
        const points: number = Math.floor(Math.random() * 100) + 10;
        const action: string = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        
        const now: Date = new Date();
        const dateStr: string = now.toLocaleDateString('de-DE', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
        const timeStr: string = now.toLocaleTimeString('de-DE', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        transactionData = {
            action,
            date: dateStr,
            time: timeStr,
            points
        };

        // Update stats
        todayScans += 1;
        totalPoints += points;
        
        // Play success sound (if available)
        try {
            const audio: HTMLAudioElement = new Audio('data:audio/wav;base64,UklGRhwAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
            audio.play().catch((): void => {});
        } catch (e: unknown) {
            // Sound playback failed, ignore
        }
    }



    onMount((): (() => void) => {
        
        const config: {
            fps: number;
            qrbox: { width: number; height: number };
            aspectRatio: number;
        } = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
        };
</script>

<svelte:head>
    <title>Business QR Scanner - ESG Tracker</title>
    <script src="https://unpkg.com/html5-qrcode"></script>
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

    <!-- Scanner Container -->
    <div class="relative scanner-container">
        <div id="reader" class="w-full h-full"></div>
        <div class="scanner-overlay pointer-events-none">
            <div class="scan-line"></div>
        </div>
        
        <!-- Scan Instruction -->
        <div class="absolute bottom-8 left-0 right-0 text-center">
            <div class="inline-block bg-black bg-opacity-70 px-6 py-3 rounded-full">
                <p class="text-white text-sm font-medium">Positionieren Sie den QR-Code im Rahmen</p>
            </div>
        </div>
    </div>

    <!-- Transaction Summary -->
    <div class="bg-white px-4 py-6 shadow-lg">
        <div class="mb-4">
            <h2 class="text-gray-800 text-lg font-bold mb-2">Letzte Transaktion</h2>
            <div id="transactionDisplay" class:success-animation={transactionData !== null}>
                {#if cameraError}
                    <div class="text-center text-red-600 py-8">
                        <p class="text-sm mb-2">Kamera konnte nicht gestartet werden</p>
                        <p class="text-xs text-gray-500">Bitte erlauben Sie den Kamerazugriff</p>
                    </div>
                {:else if transactionData}
                    <div class="bg-gray-50 rounded-2xl p-6">
                        <div class="flex items-center justify-center mb-4">
                            <div class="w-16 h-16 rounded-full flex items-center justify-center" style="background: #079669;">
                                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-gray-900 font-bold text-2xl mb-1">{transactionData.action}</h3>
                        <p class="text-gray-500 text-sm mb-4">{transactionData.date} · {transactionData.time}</p>
                        <div class="flex items-baseline justify-center gap-2 mb-3">
                            <span class="text-5xl font-bold" style="color: #079669;">+{transactionData.points}</span>
                            <span class="text-xl font-semibold" style="color: #079669;">P</span>
                        </div>
                        <p class="text-gray-500 text-xs font-medium">Punkte gutgeschrieben</p>
                    </div>
                {:else}
                    <div class="text-center py-8 text-gray-300">
                        <svg class="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                        </svg>
                        <p class="text-sm text-gray-400">Scannen Sie einen Kunden-QR-Code</p>
                    </div>
                {/if}
            </div>
        </div>

        <!-- Transaction Stats -->
        <div class="grid grid-cols-2 gap-3">
            <div class="bg-gray-100 rounded-2xl p-4">
                <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Heute gescannt</p>
                <p class="text-gray-900 text-2xl font-bold">{todayScans}</p>
            </div>
            <div class="bg-gray-100 rounded-2xl p-4">
                <p class="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Punkte vergeben</p>
                <p class="text-gray-900 text-2xl font-bold">{totalPoints.toLocaleString('de-DE')}</p>
            </div>
        </div>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .scanner-container {
        height: calc(100vh - 64px - 480px);
    }
    
    :global(#reader) {
        width: 100%;
        border: none;
    }
    
    :global(#reader video) {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .scanner-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 250px;
        height: 250px;
        border: 3px solid #079669;
        border-radius: 24px;

    }
    
    .corner {
        position: absolute;
        width: 30px;
        height: 30px;
        border: 4px solid #079669;
    }
    
    .corner.top-left {
        top: -4px;
        left: -4px;
        border-right: none;
        border-bottom: none;
        border-radius: 24px 0 0 0;
    }
    
    .corner.top-right {
        top: -4px;
        right: -4px;
        border-left: none;
        border-bottom: none;
        border-radius: 0 24px 0 0;
    }
    
    .corner.bottom-left {
        bottom: -4px;
        left: -4px;
        border-right: none;
        border-top: none;
        border-radius: 0 0 0 24px;
    }
    
    .corner.bottom-right {
        bottom: -4px;
        right: -4px;
        border-left: none;
        border-top: none;
        border-radius: 0 0 24px 0;
    }
    
    .scan-line {
        position: absolute;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #079669, transparent);
        animation: scan 2s ease-in-out infinite;
    }
    
    @keyframes scan {
        0%, 100% { top: 0; }
        50% { top: calc(100% - 2px); }
    }
    
    .success-animation {
        animation: pulse 0.5s ease-in-out;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
</style>