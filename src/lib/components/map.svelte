<script lang="ts">
	import type { GameState } from '@/state/game-state.svelte';
	import type { MapPosition } from '@/state/map-position.svelte';
	import type { PlayerId, StopId } from '@/types';
	import Stop from './stop.svelte';
	import { onMount } from 'svelte';

	interface MapProps {
		gameState: GameState;
		position: MapPosition;
	}

	let { gameState, position }: MapProps = $props();

	let dice = $derived.by(() => {
		const currentRound = gameState.gameRounds.find(
			(round) => round.round === gameState.currentRound
		);
		return currentRound?.dice_roll;
	});
	let selectableStops = $derived.by(() => {
		const currentPlayer = gameState.playersState[gameState.playerId];
		if (currentPlayer.state === 'starting') {
			return gameState.getInitialStops();
		} else if (currentPlayer.state === 'moving') {
			return gameState.getPossibleStops(currentPlayer.stop_id, dice ?? 0);
		}
		return [];
	});

	function handleStopClick(stopId: StopId) {
		const isSelectable = selectableStops.includes(stopId);
		if (isSelectable) {
			if (gameState.state === 'starting') {
				gameState.playerStart(stopId);
			} else if (gameState.state === 'playing') {
				gameState.playerMove(stopId);
			}
		}
	}

	let mapContainer: HTMLDivElement;

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				position.setContainerSize(width, height);
			}
		});

		resizeObserver.observe(mapContainer);

		return () => {
			resizeObserver.disconnect();
		};
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="bg-[#D8EFF4] w-full h-full overflow-hidden touch-none relative will-change-transform"
	bind:this={mapContainer}
	onwheel={position.zoom}
	onmousedown={position.startDrag}
	onmousemove={position.drag}
	onmouseup={position.endDrag}
	onmouseleave={position.endDrag}
	ontouchstart={position.startDrag}
	ontouchmove={position.drag}
	ontouchend={position.endDrag}
	role="region"
	aria-label="Game map area"
>
	<div
		class="origin-center relative w-full h-full touch-pan-x touch-pan-y will-change-transform"
		style={`transform: scale(${position.scale}) translate(${position.x}px, ${position.y}px);`}
	>
		<div class="absolute h-[50vh] w-[70vw] inset-0 m-auto pointer-events-none map-highlight"></div>
		<img
			src="/images/map.svg"
			alt="Game Map"
			class="absolute inset-0 w-full h-full pointer-events-none select-none will-change-transform"
			draggable="false"
			fetchpriority="high"
		/>
		<svg
			viewBox="0 0 2834.65 2267.72"
			class="absolute inset-0 w-full h-full"
			style="pointer-events: {position.hasMovedBeyondThreshold || position.dragEnded
				? 'none'
				: 'auto'}"
		>
			{#each gameState.stops as stop (stop.id)}
				{@const selectable = selectableStops.includes(stop.id)}
				<Stop {stop} {selectable} onSelect={handleStopClick} />

				{@const playersHere = Object.entries(gameState.players)
					.filter(([_, player]) => gameState.playersState[player.id].stop_id === stop.id)
					.sort(([id1, _], [id2, __]) =>
						(Number(id1) as PlayerId) === gameState.playerId
							? -1
							: (Number(id2) as PlayerId) === gameState.playerId
								? 1
								: 0
					)}
				{#each playersHere as [_, player], i}
					{@const xPos = stop.x - 24 + i * 20 + (selectable ? 42 : 0)}
					{@const yPos = stop.y - 24}
					{@const isCurrentPlayer = player.id === gameState.playerId}

					<!-- Background circle -->
					<circle
						cx={xPos + 24}
						cy={yPos + 24}
						r="28"
						class="fill-white drop-shadow-xl {isCurrentPlayer ? 'animate-pulse-badge' : ''}"
					/>

					<!-- Player badge image -->
					<image
						href="/images/characters/badges/{player.character}.svg"
						x={xPos}
						y={yPos}
						width="48"
						height="48"
						class="relative z-10 {isCurrentPlayer ? 'animate-pulse-badge' : ''}"
					/>
				{/each}
			{/each}
		</svg>
	</div>
</div>

<style>
	@keyframes pulse-badge {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
	}

	.animate-pulse-badge {
		animation: pulse-badge 2s ease-in-out infinite;
		transform-origin: center;
		transform-box: fill-box;
	}
	/* Optimize rendering performance */
	img {
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		-webkit-transform: translateZ(0);
		-moz-transform: translateZ(0);
		-ms-transform: translateZ(0);
		-o-transform: translateZ(0);
		transform: translateZ(0);
	}

	/* Force hardware acceleration */
	.will-change-transform {
		will-change: transform;
	}
</style>
