<script lang="ts">
	import type { GameState } from '@/state/game-state.svelte';
	import type { MapPosition } from '@/state/map-position.svelte';
	import type { PlayerId, StopId } from '@/types';
	import Stop from './stop.svelte';

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
</script>

<div class="bg-[#D8EFF4] w-full h-full overflow-hidden">
	<div
		class="origin-center transition-transform relative w-full h-full"
		style={`transform: scale(${position.scale}) translate(${position.x}px, ${position.y}px);`}
	>
		<img src="/images/map.svg" alt="Game Map" class="w-full h-full" />
		<svg viewBox="0 0 2834.65 2267.72" class="absolute inset-0 w-full h-full">
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
					<image
						href="/images/characters/badges/{player.character}.svg"
						x={stop.x - 15 + i * 15 + (selectable ? 15 : 0)}
						y={stop.y - 15}
						width="30"
						height="30"
						class="rounded-full"
					/>
				{/each}
			{/each}
		</svg>
	</div>
</div>
