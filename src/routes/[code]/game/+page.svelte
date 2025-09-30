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
	import { CircleHelp, ScrollText, LogOut } from 'lucide-svelte';
	import type { PageData } from './$types';
	import EndDialog from '@/components/end-dialog.svelte';
	import { m } from '@src/paraglide/messages';
	import fanfare from '@/sounds/fanfare.mp3';
	import seagulls from '@/sounds/seagull-sound-effect.mp3';
	import { onMount, onDestroy } from 'svelte';
	import { createGameTour } from '@/components/ui/shepherd/game-tour.svelte.js';
	import type { Tour } from 'shepherd.js';
	import RoundTransition from '@/components/round-transition.svelte';
	import { goto } from '$app/navigation';
	import StatusPill from '@/components/status-pill.svelte';

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
		gameState.cleanup();
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

	let showRoundTransition = $state(false);
	type TransitionState = 'starting' | 'transitioning' | 'ending' | 'ended';
	let transitionState: TransitionState = $state('starting');
	let previousRound = $state(0);

	$effect(() => {
		if (
			gameState.currentRound !== previousRound &&
			gameState.currentRound > 0 &&
			gameState.currentRound < 7
		) {
			showRoundTransition = true;
			transitionState = 'starting';
			previousRound = gameState.currentRound;
		}
	});

	function handleTransitionComplete() {
		showRoundTransition = false;
	}

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

	async function handleLeaveGame() {
		const confirmed = confirm('Are you sure you want to leave the game?');

		if (confirmed) {
			const success = await gameState.markPlayerInactive();
			if (success) {
				goto('/');
			} else {
				alert('Failed to leave game. Please try again.');
			}
		}
	}
</script>

<!-- <svelte:window
	onkeydown={(e) => mapPosition.pan(e)}
	onwheel={(e) => mapPosition.zoom(e)}
	onmousedown={(e) => mapPosition.startDrag(e)}
	onmousemove={(e) => mapPosition.drag(e)}
	onmouseup={() => mapPosition.endDrag()}
	onmouseleave={() => mapPosition.endDrag()}
	ontouchstart={(e) => mapPosition.startDrag(e)}
	ontouchmove={(e) => mapPosition.drag(e)}
	ontouchend={() => mapPosition.endDrag()}
/> -->

<div class="w-screen h-[100dvh] relative">
	<Map {gameState} position={mapPosition} {tourCompleted} />
	<MiniMap position={mapPosition} />
	<RoundIndicator rounds={gameState.rounds} currentRound={gameState.currentRound} />
	<StatusPill
		playerState={gameState.playersState[gameState.playerId]}
		currentRound={gameState.currentRound}
	/>
	<Button
		size="lg"
		onclick={() => (openStoryDialog = true)}
		class="absolute bottom-4 left-1/2 -translate-x-1/2 story-button rounded-full px-4"
		disabled={!tourCompleted}
	>
		<ScrollText />
		{m.story_sheet()}
	</Button>
	<StoryDialog bind:open={openStoryDialog} {gameState} />
	<Button
		size="default"
		onclick={() => (openHelpDialog = true)}
		class="absolute top-4 left-4 help-button"
		disabled={!tourCompleted}
	>
		{m.help()}
		<CircleHelp />
	</Button>
	<HelpDialog bind:open={openHelpDialog} />
	<Button
		variant="default"
		size="default"
		class="absolute top-4 right-4 exit-button"
		onclick={handleLeaveGame}
		disabled={!tourCompleted}
	>
		Exit <LogOut size={16} />
	</Button>
	<div
		class="absolute left-4 top-36 flex flex-col items-center justify-center gap-5 pointer-events-none"
	>
		{#each Object.values(gameState.players).filter((p) => p.is_active !== false) as player (player.id)}
			<PlayerBadge
				{tourCompleted}
				{player}
				playerState={gameState.playersState[player.id]}
				round={gameState.currentRound}
				currentRound={gameState.currentRound}
				{transitionState}
				isCurrentPlayer={player.id === data.playerId}
			/>
		{/each}
	</div>
	<div class="absolute left-4 bottom-4">
		{#if dice}
			<Dice value={dice} round={gameState.currentRound} {transitionState} />
		{/if}
	</div>

	{#if showRoundTransition}
		<RoundTransition
			round={gameState.currentRound}
			onComplete={handleTransitionComplete}
			bind:transitionState
		/>
	{/if}

	<EndDialog bind:open={openEndDialog} {gameState} />
</div>
