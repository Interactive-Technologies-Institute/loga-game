<script lang="ts">
	import type { Player, PlayerState } from '@/types';
	import { onMount } from 'svelte';
	import { Check, Flag, Route, SquarePen } from 'lucide-svelte';
	import { m } from '@src/paraglide/messages';

	interface PlayerBadgeProps {
		player: Player;
		playerState: PlayerState;
		round: number;
		currentRound: number;
		tourCompleted: boolean;
		transitionState: 'starting' | 'transitioning' | 'ending' | 'ended';
		isCurrentPlayer?: boolean;
	}

	let {
		player,
		playerState,
		round,
		currentRound,
		tourCompleted,
		transitionState,
		isCurrentPlayer = false
	}: PlayerBadgeProps = $props();
</script>

<div class="flex relative {isCurrentPlayer ? 'player-badges' : ''}">
	<img
		src={`/images/characters/badges/${player.character}.svg`}
		alt={player.nickname}
		class="h-12 w-12 md:h-14 md:w-14 relative rounded-full z-20 {isCurrentPlayer
			? 'border-4 border-dark-green'
			: ''}"
	/>
	<div
		class="absolute origin-right -top-2 right-6 translate-x-full rounded-full bg-dark-green text-dark-green z-30 flex items-center py-2 px-3 max-w-xs"
	>
		{#if playerState.state === 'starting'}
			<div class="flex items-center gap-2">
				<Flag class="w-3 h-3 stroke-white" />
				{#if isCurrentPlayer}
					<span class="text-white text-xs text-nowrap">{m.starting()}</span>
				{:else}
					<span class="text-white text-xs text-nowrap"
						>{m.starting_player({ nickname: player.nickname ?? '' })}</span
					>
				{/if}
			</div>
		{:else if playerState.state === 'moving'}
			<div class="flex items-center gap-2">
				<Route class="w-3 h-3 stroke-white" />
				{#if isCurrentPlayer}
					<span class="text-white text-xs text-nowrap">{m.moving()}</span>
				{:else}
					<span class="text-white text-xs text-nowrap"
						>{m.moving_player({ nickname: player.nickname ?? '' })}</span
					>
				{/if}
			</div>
		{:else if playerState.state === 'writing'}
			<div class="flex items-center gap-2">
				<SquarePen class="w-3 h-3 stroke-white" />
				{#if isCurrentPlayer}
					<span class="text-white text-xs text-nowrap">{m.writing()}</span>
				{:else}
					<span class="text-white text-xs text-nowrap"
						>{m.writing_player({ nickname: player.nickname ?? '' })}</span
					>
				{/if}
			</div>
		{:else if playerState.state === 'done'}
			<div class="flex items-center gap-2">
				<Check class="w-3 h-3 stroke-white" />
				{#if isCurrentPlayer}
					<span class="text-white text-xs text-nowrap">{m.done()}</span>
				{:else}
					<span class="text-white text-xs text-nowrap"
						>{m.done_player({ nickname: player.nickname ?? '' })}</span
					>
				{/if}
			</div>
		{/if}
	</div>
</div>
