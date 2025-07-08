<script lang="ts">
	import type { Character, Player } from '@/types';
	import { Check } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { Input } from './ui/input';
	import { Textarea } from './ui/textarea';
	import { CHARACTER } from '../data/characters';
	import { m } from '@src/paraglide/messages.js';
	import { onMount } from 'svelte';
	import flipSound from '@/sounds/flipcard.mp3';
	import clickSound from '@/sounds/click.mp3';

	let click: HTMLAudioElement;
	let flip: HTMLAudioElement;

	onMount(() => {
		click = new Audio(clickSound);
		click.volume = 0.5;
		flip = new Audio(flipSound);
		flip.volume = 0.5;
	});

	interface CharacterOptionProps {
		character: Character;
		player: Player | undefined;
		selected: boolean;
		disabled: boolean;
		onSelect: () => void;
		onReady: (nickname: string, description: string) => void;
	}

	let {
		character,
		player,
		selected = $bindable(),
		disabled,
		onSelect: onSelectCallBack,
		onReady: onReadyCallBack
	}: CharacterOptionProps = $props();

	let taken = $derived(player?.character === character && !selected);
	let ready = $derived(player?.nickname !== null && player?.description !== null);

	function onSelect() {
		flip.play();
		if (taken) return;
		selected = true;
		onSelectCallBack();
	}

	function onReady() {
		click.play();
		if (taken) return;
		onReadyCallBack(nickname, description);
	}

	let nickname = $state(player?.nickname || '');
	let description = $state(player?.description || '');
	$effect(() => {
		nickname = player?.nickname || '';
		description = player?.description || '';
	});

	// Find the character details from the CHARACTER array
	let characterDetails = CHARACTER.find((c) => c.type === character);

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
	class="w-64 h-96 [perspective:1000px] {taken || disabled
		? 'opacity-50 grayscale pointer-events-none'
		: ''}"
>
	<div
		class={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
			selected ? '[transform:rotateY(180deg)]' : ''
		}`}
	>
		<!-- Front of card -->
		<button
			class={`absolute inset-0 w-full h-full transform transition-transform rounded-lg overflow-hidden [backface-visibility:hidden] ${
				taken || disabled ? 'cursor-not-allowed' : 'hover:rotate-2 focus:rotate-2'
			}`}
			onclick={!taken && !disabled ? onSelect : undefined}
			{disabled}
		>
			<img
				src={`/images/characters/cards/${character}.svg`}
				alt={character}
				class="w-full h-full object-cover"
				class:grayscale={taken}
			/>
			<div
				class="absolute inset-0 translate-y-20 px-3 flex flex-col items-center justify-center text-center gap-2"
			>
				<h3 class={`text-2xl font-bold ${!taken ? 'text-dark-green' : 'text-black'}`}>
					{getTranslation(characterDetails?.title)}
				</h3>
				<p class="text-sm font-medium">{getTranslation(characterDetails?.description)}</p>
			</div>
		</button>

		<!-- Back of card -->
		<div
			class="absolute inset-0 w-full h-full rounded-lg p-4 bg-white border-2 border-dark-green [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col gap-y-2"
		>
			<Input placeholder={m.nickname()} bind:value={nickname} disabled={ready} />
			<Textarea
				placeholder={getTranslation(characterDetails?.secondary)}
				class="flex-grow"
				bind:value={description}
				disabled={ready}
			/>
			<Button onclick={onReady} disabled={ready}>{m.ready()}</Button>
		</div>
	</div>
	{#if taken || selected}
		<img
			src={`/images/characters/badges/${character}.svg`}
			alt={character}
			class="rounded-full w-16 h-16 absolute -top-5 -right-5 z-10"
		/>

		{#if ready}
			<div
				class="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-dark-green/50 z-20 flex items-center justify-center"
			>
				<Check class="text-white w-8 h-8" />
			</div>
		{/if}
	{/if}
</div>
