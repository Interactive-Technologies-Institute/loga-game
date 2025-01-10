<script lang="ts">
	import CharacterOption from '@/components/character-option.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { GameLobbyState } from '@/state/game-lobby-state.svelte';
	import { CHARACTER_OPTIONS } from '@/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let gameState = new GameLobbyState(data.game, data.players, data.playerId);
	const currentPlayer = $derived(gameState.players.find((player) => player.id === data.playerId))!;
</script>

<div class="h-full flex flex-col items-center justify-center bg-white">
	<h2 class="text-dark-green text-4xl font-bold mb-10">Lobby: {data.game.code}</h2>
	<p class="text-dark-green text-lg font-bold mb-4">Select your character</p>
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
			Waiting for players
		{:else}
			Players are ready!
		{/if}
	</p>
	{#if currentPlayer.is_owner}
		<Button size="lg" disabled={gameState.state !== 'ready'} onclick={() => gameState.startGame()}>
			Start Game
		</Button>
	{/if}
</div>
