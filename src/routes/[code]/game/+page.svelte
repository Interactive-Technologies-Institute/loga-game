<script lang="ts">
	import Dice from '@/components/dice.svelte';
	import HelpDialog from '@/components/help-dialog.svelte';
	import Map from '@/components/map.svelte';
	import MiniMap from '@/components/mini-map.svelte';
	import PlayerBadge from '@/components/player-badge.svelte';
	import RoundIndicator from '@/components/round-indicator.svelte';
	import StoryDialog from '@/components/story-dialog.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { GameState } from '@/state/game-state.svelte';
	import { MapPosition } from '@/state/map-position.svelte';
	import { CircleHelp, ScrollText } from 'lucide-svelte';
	import type { PageData } from './$types';
	import EndDialog from '@/components/end-dialog.svelte';
	import { m } from '@src/paraglide/messages';
	import fanfare from '@/sounds/fanfare.mp3';
	import seagulls from '@/sounds/seagull-sound-effect.mp3';
	import { onMount, onDestroy } from 'svelte';
	import { createGameTour } from '@/components/ui/shepherd/game-tour.svelte.js';
	import type { Tour } from 'shepherd.js';

	let tour: Tour | undefined;

	let fanfareAudio: HTMLAudioElement;
	let startupAudio: HTMLAudioElement;

	let tourCompleted = $state(false);

	onMount(() => {
		fanfareAudio = new Audio(fanfare);
		fanfareAudio.volume = 0.5;
		startupAudio = new Audio(seagulls);
		startupAudio.volume = 0.5;

		if (gameState.state === 'starting') {
			tour = createGameTour();
			tour.on('complete', () => {
				tourCompleted = true;
			});
			tour.on('cancel', () => {
				tourCompleted = true;
			});
			tour.start();
		} else {
			if (tour) {
				tour.complete();
				tour.cancel();
			}
			tour = undefined;
			tourCompleted = true;
		}
	});

	onDestroy(() => {
		if (tour) {
			tour.complete();
			tour.cancel();
		}
	});

	let { data }: { data: PageData } = $props();

	let gameState = new GameState(
		data.stops,
		data.cards,
		data.rounds,
		data.game,
		data.gameRounds,
		data.playerId,
		data.players,
		data.playerMoves,
		data.playerCards,
		data.playerAnswers
	);
	let mapPosition = new MapPosition();

	let dice = $derived.by(() => {
		const currentRound = gameState.gameRounds.find(
			(round) => round.round === gameState.currentRound
		);
		return currentRound?.dice_roll || 5;
	});
	let playerState = $derived.by(() => {
		return gameState.playersState[gameState.playerId].state;
	});

	let openStoryDialog = $state(false);
	let openHelpDialog = $state(false);
	let openEndDialog = $state(false);

	$effect(() => {
		if (playerState === 'writing') {
			openStoryDialog = true;
		}
	});

	$effect(() => {
		if (gameState.state === 'starting') {
			startupAudio.play();
		}
	});

	$effect(() => {
		if (gameState.state === 'finished') {
			fanfareAudio?.play();
			openEndDialog = true;
		}
	});
</script>

<svelte:window
	onkeydown={(e) => mapPosition.pan(e)}
	onwheel={(e) => mapPosition.zoom(e)}
	onmousedown={(e) => mapPosition.startDrag(e)}
	onmousemove={(e) => mapPosition.drag(e)}
	onmouseup={() => mapPosition.endDrag()}
	onmouseleave={() => mapPosition.endDrag()}
	ontouchstart={(e) => mapPosition.startDrag(e)}
	ontouchmove={(e) => mapPosition.drag(e)}
	ontouchend={() => mapPosition.endDrag()}
/>

<div class="w-screen h-screen relative">
	<Map {gameState} position={mapPosition} />
	<MiniMap position={mapPosition} />
	<RoundIndicator rounds={gameState.rounds} currentRound={gameState.currentRound} />
	<Button
		size="icon-lg"
		onclick={() => (openStoryDialog = true)}
		class="absolute top-4 left-4 story-button"
	>
		<ScrollText />
	</Button>
	<StoryDialog bind:open={openStoryDialog} {gameState} />
	<Button
		size="icon-lg"
		onclick={() => (openHelpDialog = true)}
		class="absolute top-4 right-4 help-button"
	>
		<CircleHelp />
	</Button>
	<HelpDialog bind:open={openHelpDialog} />
	<div
		class="absolute left-4 inset-y-0 flex flex-col items-center justify-center gap-5 pointer-events-none"
	>
		{#each Object.values(gameState.players) as player (player.id)}
			<PlayerBadge
				{tourCompleted}
				{player}
				playerState={gameState.playersState[player.id]}
				rounds={gameState.rounds}
				currentRound={gameState.currentRound}
			/>
		{/each}
	</div>
	<div class="absolute left-8 bottom-8">
		{#if dice}
			<Dice value={dice} round={gameState.currentRound} />
		{/if}
	</div>

	<p
		class="absolute left-0 right-0 bottom-4 flex items-center justify-center text-center text-lg text-text"
	>
		{#if playerState === 'moving'}
			{m.choose_your_new_stop()}
		{:else if playerState === 'writing'}
			{m.write_story()}
		{:else if playerState === 'done'}
			{m.you_are_done()}
		{/if}
	</p>

	<EndDialog bind:open={openEndDialog} {gameState} />
</div>
