<script lang="ts">
	import type { Character } from '@/types';
	import { m } from '@src/paraglide/messages';
	import { CHARACTER } from '../data/characters';

	interface CharacterCardProps {
		character: Character;
	}

	let { character }: CharacterCardProps = $props();

	let characterDetails = CHARACTER.find((c) => c.type === character);

	function getTranslation(key: string | null | undefined): string {
		if (!key) return '';
		const translation = m[key as keyof typeof m];
		if (typeof translation === 'function') {
			return translation();
		}
		return 'Translation missing';
	}
</script>

<div
	class="w-64 h-96 bg-white rounded-xl bg-cover bg-center border-2 border-gray-400/50 relative"
	style="background-image: url('/images/characters/cards/{character}.svg');"
>
	<div class="absolute inset-0 mb-2 px-1 pb-2 flex flex-col justify-end text-center gap-2">
		<h3 class={`text-2xl font-bold text-dark-green`}>
			{getTranslation(characterDetails?.title)}
		</h3>
		<p class="text-xs font-medium">{getTranslation(characterDetails?.description)}</p>
		<p class="text-xs italic">{getTranslation(characterDetails?.secondary)}</p>
	</div>
</div>
