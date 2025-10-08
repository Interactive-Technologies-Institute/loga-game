<script lang="ts">
	import { Flag, Route, SquarePen, Check } from 'lucide-svelte';
	import { m } from '@src/paraglide/messages';
	import type { PlayerState } from '@/types';

	interface StatusPillProps {
		playerState: PlayerState;
		currentRound: number;
	}

	let { playerState, currentRound }: StatusPillProps = $props();
</script>

<div
	class="absolute bottom-20 left-1/2 -translate-x-1/2 text-dark-green px-4 py-2 rounded-full flex items-center gap-2 text-lg font-semibold text-center overflow-hidden"
>
	{#if playerState.state === 'starting'}
		<span> {m.choose_starting_stop()}</span>
	{:else if playerState.state === 'moving'}
		<span> {m.choose_your_new_stop()}</span>
	{:else if playerState.state === 'writing'}
		<span> {m.write_next_part()} </span>
	{:else if playerState.state === 'done'}
		<span> {m.you_are_done()} </span>
	{/if}
</div>
