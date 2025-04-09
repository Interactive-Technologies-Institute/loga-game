<script lang="ts">
	import CharacterOption from '@/components/character-option.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { GameLobbyState } from '@/state/game-lobby-state.svelte';
	import { CHARACTER_OPTIONS } from '@/types';
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
</script>

<div class="h-full flex flex-col items-center justify-center bg-white">
	<div class="bg-dark-green px-5 py-2 flex flex-col items-center justify-center rounded-lg mt-5">
		<p class="text-white text-sm font-medium">{m.label_join_code()}</p>
		<p class="text-white text-4xl font-bold">{data.game.code}</p>
	</div>
	<p class="text-dark-green text-lg font-bold my-2">{m.select_character()}</p>
	<div class="grid grid-cols-4 gap-6 mb-10">
		{#each CHARACTER_OPTIONS as character}
			{@const player = gameState.players.find((player) => player.character === character)}
			<CharacterOption
				{character}
				{player}
				selected={currentPlayer.character === character}
				onSelect={() => gameState.updatePlayerCharacter(character)}
				onReady={(nickname, description) =>
					gameState.updatePlayerNicknameDescription(nickname, description)}
			/>
		{/each}
	</div>
	<p class="text-dark-green text-lg font-bold mb-4">
		{#if gameState.state === 'waiting'}
			{m.waiting_for_players()}
		{:else}
			{m.players_ready()}
		{/if}
	</p>
	{#if currentPlayer.is_owner}
		<Button
			class={'mb-5'}
			size="lg"
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
