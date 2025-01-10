<script lang="ts">
	import type { Player, PlayerState } from '@/types';
	import { Check, Flag, Route, SquarePen } from 'lucide-svelte';

	interface PlayerBadgeProps {
		player: Player;
		state: PlayerState;
	}

	let { player, state }: PlayerBadgeProps = $props();
</script>

<div class="rounded-full w-16 h-16 relative">
	<img
		src={`/images/characters/badges/${player.character}.svg`}
		alt={player.nickname}
		class="w-full h-full"
	/>
	<div
		class="absolute -top-3 -right-3 rounded-full w-8 h-8 bg-white flex items-center justify-center text-dark-green"
	>
		{#if state.state === 'starting'}
			<Flag class="w-4 h-4" />
		{:else if state.state === 'moving'}
			<Route class="w-4 h-4" />
		{:else if state.state === 'writing'}
			<SquarePen class="w-4 h-4" />
		{:else if state.state === 'done'}
			<Check class="w-4 h-4" />
		{/if}
	</div>
</div>
