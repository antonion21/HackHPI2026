<script lang="ts">
    // State variables with explicit types
    let files: File[] = $state([]);
    let dragging: boolean = false;

    // Handle standard file selection via click
    function handleFileChange(e: Event): void {
        const target = e.target as HTMLInputElement;
        if (target.files) {
            console.log("eee handleFileChange");
            console.log(target.files.length);
            files.concat(Array.from(target.files));
            console.log(files)
        }
    }

    // Handle drag-and-drop
    function handleDrop(e: DragEvent): void {
        dragging = false;
        if (e.dataTransfer?.files) {
            console.log("eee");
            files = Array.from(e.dataTransfer.files);
        }
    }

    function handleDragOver(): void {
        console.log("eee");
        dragging = true;
    }

    function handleDragLeave(): void {
        console.log("eee");
        dragging = false;
    }
</script>

<div class="flex flex-col justify-between h-full">
    <div>
        <div class="flex items-center justify-center p-6 relative">
            <button
                type="button"
                class="absolute left-6 p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Close"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <h1 class="text-lg font-bold text-gray-800">Upload Receipt</h1>
        </div>

        <div class="flex-grow px-8">
            <label
                on:dragover|preventDefault={handleDragOver}
                on:dragleave|preventDefault={handleDragLeave}
                on:drop|preventDefault={handleDrop}
                class="group relative flex flex-col items-center justify-center w-full py-10 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-200
          {dragging
                    ? 'border-blue-500 bg-blue-100/50 scale-[1.02]'
                    : 'border-blue-200 bg-blue-50/40 hover:bg-blue-50'}"
            >
                <input
                    type="file"
                    class="hidden"
                    accept=".jpg,.png,.pdf"
                    on:change={handleFileChange}
                />

                <div class="mb-4 text-blue-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-14 w-14"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                </div>

                <span class="text-base font-bold text-gray-900">
                    Upload a receipt
                </span>
                <span class="mt-1 text-sm text-gray-500 font-medium">
                    Supported formats: JPG, PNG, PDF
                </span>

                {#if files.length > 0}
                    <div
                        class="mt-4 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg animate-pulse"
                    >
                        Selected: {files[0].name}
                    </div>
                {/if}
            </label>
        </div>

        <!-- files -->
         <div class="flex-grow px-8">
            {#each files as file}
                <div>{file.name}</div>
            {/each}
         </div>
    </div>

    <div>
        <div class="p-8">
            <button
                disabled={files.length === 0}
                class="w-full py-4 bg-[#059669] hover:bg-[#047857] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-full flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    />
                </svg>
                Submit receipt
            </button>
        </div>
    </div>
</div>
