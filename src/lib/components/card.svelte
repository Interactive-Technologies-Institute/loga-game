<script lang="ts">
	import type { Card } from '@/types';
	import { m } from '@src/paraglide/messages';

	interface CardProps {
		card: Card;
		className?: string;
	}

	let { card, className = '' }: CardProps = $props();

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
	class="w-64 h-96 bg-white rounded-xl bg-cover border {borderColor} {className}"
	style="background-image: url('/images/cards/{card.type}.svg');"
>
	<div class="h-1/4 w-full flex items-center pl-24">
		<h3 class=" text-light-green font-bold leading-snug text-xl">
			{getTranslation(card.title ?? undefined)}
		</h3>
	</div>
	<p class="px-4 text-pretty leading-snug relative">
		<span class="absolute mx-5 inset-0 bg-white [box-shadow:0_0_15px_15px_white]"></span>
		<span class="relative z-10">{getTranslation(card.text)}</span>
	</p>
</div>
