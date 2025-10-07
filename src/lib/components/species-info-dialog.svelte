<script lang="ts">
	import * as Dialog from './ui/dialog';
	import { m } from '@src/paraglide/messages';
	import { SPECIES } from '../data/species';
	import type { Character } from '@src/lib/types';

	interface SpeciesInfoDialogProps {
		open: boolean;
		character: Character;
	}

	let { open = $bindable(false), character }: SpeciesInfoDialogProps = $props();

	const details = SPECIES.find((c) => c.key === character);

	function getTranslation(key?: string): string {
		if (!key) return '';
		const translation = m[key as keyof typeof m];
		if (typeof translation === 'function') return translation();
		return 'Translation missing';
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="flex flex-col gap-4 max-w-xl w-[95vw] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-lg"
	>
		{#if details}
			<h2 class="text-2xl lg:text-3xl font-bold text-dark-green">
				{getTranslation(details.title)}
			</h2>
			<img
				src={details.image}
				alt={getTranslation(details.title)}
				class="aspect-video object-cover rounded-xl border-4 border-dark-green"
			/>
			<div class="flex flex-col gap-2">
				<p>{getTranslation(details.description)}</p>
				<p class="">
					<span class="font-semibold text-dark-green mr-2">{m.fun_fact()}:</span>{getTranslation(
						details.fun_fact
					)}
				</p>
			</div>
		{:else}
			<p class="text-gray-500">No species info available.</p>
		{/if}
		<Dialog.Close>
			<button class="mt-4 px-4 py-2 rounded bg-dark-green text-white">{m.back()}</button>
		</Dialog.Close>
	</Dialog.Content>
</Dialog.Root>
