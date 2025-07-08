<script lang="ts">
	import CharacterOption from '@/components/character-option.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { GameLobbyState } from '@/state/game-lobby-state.svelte';
	import { CHARACTER_CATEGORIES, getCharacterCategory, type CharacterCategory } from '@/types';
	import type { PageData } from './$types';
	import { m } from '@src/paraglide/messages.js';
	import clickSound from '@/sounds/click.mp3';
	import { onMount } from 'svelte';

	let click: HTMLAudioElement;

	onMount(() => {
		click = new Audio(clickSound);
		click.volume = 0.5;
	});

	let { data }: { data: PageData } = $props();

	let gameState = new GameLobbyState(data.game, data.players, data.playerId);
	const currentPlayer = $derived(gameState.players.find((player) => player.id === data.playerId))!;

	let selectionStep = $state<'category' | 'character'>('category');
	let selectedCategory = $state<CharacterCategory | null>(null);

	onMount(() => {
		if (currentPlayer.character) {
			selectedCategory = getCharacterCategory(currentPlayer.character);
			selectionStep = 'character';
		}
	});

	function selectCategory(category: CharacterCategory) {
		click.currentTime = 0;
		click.play().catch((e) => console.warn('Error playing sound:', e));
		selectedCategory = category;
	}

	function proceedToCharacterSelection() {
		if (selectedCategory) {
			click.currentTime = 0;
			click.play().catch((e) => console.warn('Error playing sound:', e));
			selectionStep = 'character';
		}
	}

	function goBackToCategories() {
		click.currentTime = 0;
		click.play().catch((e) => console.warn('Error playing sound:', e));
		selectionStep = 'category';
	}
</script>

<div class="h-full flex flex-col items-center justify-center bg-white relative">
	<div
		class="sticky top-0 z-10 w-full bg-white border-b shadow-sm py-2 px-4 flex justify-between items-center"
	>
		<div class="bg-dark-green p-2 flex flex-col items-center justify-center rounded-lg">
			<p class="text-white md:text-sm text-xs font-medium">{m.label_join_code()}</p>
			<p class="text-white lg:text-4xl md:text-xl text-md font-bold">{data.game.code}</p>
		</div>

		<div class="flex gap-3">
			{#if selectionStep === 'category'}
				<Button
					disabled={selectedCategory === null}
					onclick={proceedToCharacterSelection}
					size="default"
				>
					<span class="text-lg">{m.continue()}</span>
				</Button>
			{/if}
			{#if selectionStep === 'character'}
				<div class="flex items-center justify-center gap-3 mb-5">
					<Button
						variant={'outline'}
						size="default"
						onclick={goBackToCategories}
						class="mr-2"
						disabled={currentPlayer.nickname !== null}>{m.back()}</Button
					>
					{#if currentPlayer.is_owner}
						<Button
							size="default"
							disabled={gameState.state !== 'ready'}
							onclick={() => {
								click.play();
								gameState.startGame();
							}}
						>
							{m.start_game()}
						</Button>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	{#if selectionStep === 'category'}
		<h2 class="text-dark-green text-xl font-bold my-6">{m.select_type()}</h2>
		<div class="flex flex-col items-center justify-center p-4 min-w-xs max-w-2xl">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
				<!-- Human Category -->

				<button
					class={`flex flex-col p-6 items-center rounded-lg ${
						selectedCategory === 'human'
							? 'border-2 border-dark-green shadow-[0_0_0_2px_#27613f]'
							: selectedCategory === 'non-human'
								? 'border-2 border-gray-200 hover:border-dark-green hover:bg-gray-50 opacity-65 grayscale hover:opacity-100 hover:grayscale-0'
								: 'border-2 border-gray-200 hover:border-dark-green hover:bg-gray-50'
					}`}
					onclick={() => selectCategory('human')}
				>
					<div class="w-24 h-24 mb-4 rounded-full bg-primary-100 flex items-center justify-center">
						<img src={`/images/characters/badges/nature-lover.svg`} alt="" />
					</div>
					<h3 class="text-3xl font-bold text-dark-green mb-2">{m.human()}</h3>
					<p class="text-sm text-center italic text-gray-500">
						{m.human_description()}
					</p>
				</button>

				<!-- Non-human Category -->
				<button
					class={`flex flex-col p-6 items-center rounded-lg ${
						selectedCategory === 'non-human'
							? 'border-2 border-dark-green shadow-[0_0_0_2px_#27613f]'
							: selectedCategory === 'human'
								? 'border-2 border-gray-200 hover:border-dark-green hover:bg-gray-50 opacity-65 grayscale hover:opacity-100 hover:grayscale-0'
								: 'border-2 border-gray-200 hover:border-dark-green hover:bg-gray-50'
					}`}
					onclick={() => selectCategory('non-human')}
				>
					<div class="w-24 h-24 mb-4 rounded-full bg-primary-100 flex items-center justify-center">
						<img src={`/images/characters/badges/trocaz-pigeon.svg`} alt="" />
					</div>
					<h3 class="text-3xl font-bold text-dark-green mb-2">{m.non_human()}</h3>
					<p class="text-sm text-center italic text-gray-500">
						{m.non_human_description()}
					</p>
				</button>
			</div>
		</div>
	{:else if selectionStep === 'character'}
		<p class="text-dark-green text-lg font-bold my-2">{m.select_character()}</p>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
			{#each CHARACTER_CATEGORIES[selectedCategory ?? 'human'] as character}
				{@const player = gameState.players.find((player) => player.character === character)}
				{@const isReady = currentPlayer.nickname !== null}
				<CharacterOption
					{character}
					{player}
					selected={currentPlayer.character === character}
					disabled={isReady && currentPlayer.character !== character}
					onSelect={() => gameState.updatePlayerCharacter(character)}
					onReady={(nickname, description) =>
						gameState.updatePlayerNicknameDescription(nickname, description)}
				/>
			{/each}
		</div>
	{/if}
	<div class="bg-white py-4 px-6 border-t">
		<p class="text-dark-green text-lg font-bold mb-4">
			{#if gameState.state === 'waiting'}
				{m.waiting_for_players()}
			{:else}
				{m.players_ready()}
			{/if}
		</p>
	</div>
</div>
