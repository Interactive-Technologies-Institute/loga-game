<script lang="ts">
	import { m } from '@src/paraglide/messages';
	import * as Dialog from './ui/dialog';
	import type { Card } from '@src/lib/types';

	interface SpeciesInfoDialogProps {
		open: boolean;
		card: Card;
	}

	let { open = $bindable(false), card }: SpeciesInfoDialogProps = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="flex flex-col gap-4 max-w-xl w-full">
		{#if card}
			<h2 class="text-2xl font-bold text-dark-green">{card.title}</h2>
			<div class="h-64 w-full rounded-sm bg-slate-500 flex items-center justify-center">image</div>
			<div>
				<p class="text-base text-gray-700 mt-4">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis similique molestiae nisi
					ex incidunt veniam est illo vitae consequatur quae laudantium sapiente non dolorem
					repellendus distinctio, esse sit, unde architecto!
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
