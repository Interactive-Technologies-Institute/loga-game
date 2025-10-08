<script lang="ts">
	import * as Dialog from './ui/dialog';
	import { Button } from './ui/button';
	import { LANDMARKS } from '$lib/data/landmarks';
	import { ChevronLeft, ChevronRight, LampDesk } from 'lucide-svelte';
	import { getLocale } from '@src/paraglide/runtime';
	import { m } from '@src/paraglide/messages';

	interface IslandDialogProps {
		open: boolean;
	}

	let { open = $bindable(false) }: IslandDialogProps = $props();

	let currentLandmarkIndex = $state(0);

	function nextLandmark() {
		currentLandmarkIndex = (currentLandmarkIndex + 1) % LANDMARKS.length;
	}

	function previousLandmark() {
		currentLandmarkIndex = (currentLandmarkIndex - 1 + LANDMARKS.length) % LANDMARKS.length;
	}

	let currentLandmark = $derived(LANDMARKS[currentLandmarkIndex]);
	let description = $derived(
		getLocale() === 'pt' ? currentLandmark.description.pt : currentLandmark.description.en
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="overflow-y-auto max-h-[95vh] w-[95vw] lg:max-w-4xl flex flex-col">
		<h2 class="text-2xl font-bold text-dark-green">{m.island_dialog_heading()}</h2>
		<div class="space-y-4 flex-grow">
			<!-- Image Carousel -->
			<div class="relative">
				<div class="relative aspect-video overflow-hidden rounded-lg">
					<img
						src={currentLandmark.image_url}
						alt={currentLandmark.name}
						class="w-full h-full object-cover"
					/>
					<div
						class="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-2 rounded-b-lg flex items-center"
					>
						<p class="lg:text-xl font-semibold pl-2">{currentLandmark.name}</p>
					</div>
				</div>

				<div class="flex items-center justify-between mt-2">
					<Button onclick={previousLandmark} class="" aria-label="Previous landmark">
						<ChevronLeft class="w-4 h-4 md:w-6 md:h-6" />
						{m.back()}
					</Button>
					<div class="hidden md:flex gap-2">
						{#each LANDMARKS as _, index}
							<button
								onclick={() => (currentLandmarkIndex = index)}
								class="w-2 h-2 rounded-full transition-all {currentLandmarkIndex === index
									? 'bg-dark-green w-4'
									: 'bg-dark-green/50 hover:bg-dark-green/75'}"
								aria-label={`Go to landmark ${index + 1}`}
							></button>
						{/each}
					</div>
					<Button onclick={nextLandmark} class="" aria-label="Next landmark">
						{m.next()}
						<ChevronRight class="w-4 h-4 md:w-6 md:h-6" />
					</Button>
				</div>
			</div>
			<div class="">
				<p>{LANDMARKS[0].description[getLocale()]}</p>
			</div>
		</div>
		<div class="flex w-full justify-center">
			<Dialog.Close>
				<Button>{m.back_to_game()}</Button>
			</Dialog.Close>
		</div>
	</Dialog.Content>
</Dialog.Root>
