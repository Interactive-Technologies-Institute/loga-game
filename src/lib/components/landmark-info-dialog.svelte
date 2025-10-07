<script lang="ts">
	import { m } from '@src/paraglide/messages';
	import * as Dialog from './ui/dialog';
	import type { Card } from '@src/lib/types';
	import { LANDMARKS } from '@/data/landmarks';
	import { derived } from 'svelte/store';
	import { getLocale } from '@src/paraglide/runtime';

	interface SpeciesInfoDialogProps {
		open: boolean;
		card: Card;
	}

	let { open = $bindable(false), card }: SpeciesInfoDialogProps = $props();

	let currentLandmark = $derived(LANDMARKS.find((l) => l.name === card.title));
	let description = $derived(currentLandmark?.description[getLocale()]);
	let imageUrl = $derived(currentLandmark?.image_url);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="flex flex-col gap-4 max-w-xl w-full">
		{#if card}
			<h2 class="text-2xl font-bold text-dark-green">{card.title}</h2>
			<div class="relative aspect-video overflow-hidden rounded-lg">
				<img
					src={currentLandmark?.image_url}
					alt={currentLandmark?.name}
					class="w-full h-full object-cover"
				/>
			</div>
			<p class="text-base text-gray-700 mt-4">
				{description}
			</p>
		{:else}
			<p class="text-gray-500">No species info available.</p>
		{/if}
		<Dialog.Close>
			<button class="mt-4 px-4 py-2 rounded bg-dark-green text-white">{m.back()}</button>
		</Dialog.Close>
	</Dialog.Content>
</Dialog.Root>
