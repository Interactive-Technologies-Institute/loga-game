<script lang="ts">
	import type { Card } from '@/types';
	import { m } from '@src/paraglide/messages';

	interface CardProps {
		card: Card;
	}

	let { card }: CardProps = $props();

	const cardColors = {
		landmark: 'border-landmark-green',
		nature: 'border-nature-green',
		sense: 'border-sense-red',
		history: 'border-history-yellow',
		action: 'border-action-beige'
	} as const;

	let borderColor = cardColors[card.type as keyof typeof cardColors];

	function getTranslation(key?: string): string {
		if (!key) return ''; // Return an empty string if the key is undefined
		const translation = m[key as keyof typeof m];
		if (typeof translation === 'function') {
			return translation();
		} else {
			console.warn(`Translation for key "${key}" is missing or not a function.`);
			return 'Translation missing';
		}
	}
</script>

<div
	class="w-64 h-96 bg-white rounded-xl bg-cover border {borderColor}"
	style="background-image: url('/images/cards/{card.type}.svg');"
>
	<div class="h-[5.5rem] w-full flex items-center justify-center">
		<h3 class="text-lg text-primary pl-24 pr-6 leading-snug">
			{getTranslation(card.title ?? undefined)}
		</h3>
	</div>
	<p class="px-6 text-balance leading-snug relative">
		<span class="absolute m-4 inset-0 bg-white [box-shadow:0_0_15px_15px_white]"></span>
		<span class="relative z-10">{getTranslation(card.text)}</span>
	</p>
</div>
