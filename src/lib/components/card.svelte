<script lang="ts">
	import type { Card } from '@/types';

	interface CardProps {
		card: Card;
	}

	let { card }: CardProps = $props();
</script>

<div
	class="w-64 h-96 bg-white rounded-lg bg-cover"
	style="background-image: url('/images/cards/{card.type}.svg');"
>
	<div class="h-[5.5rem] w-full flex items-center justify-center">
		<h3 class="text-lg text-primary pl-24 pr-6 leading-snug">
			{card.title}
		</h3>
	</div>
	<p class="px-6 text-balance leading-snug">
		{card.text}
	</p>
</div>
