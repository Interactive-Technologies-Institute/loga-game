<script lang="ts">
	import type { Round } from '@/types';
	import { cn } from '@/utils';
	import { m } from '@src/paraglide/messages';

	interface RoundIndicatorProps {
		rounds: Round[];
		currentRound: number;
	}

	let { rounds, currentRound }: RoundIndicatorProps = $props();

	let roundsMap = $derived.by(() => {
		return rounds.reduce<Record<number, Round>>((acc, round) => {
			acc[round.index] = round;
			return acc;
		}, {});
	});
</script>

<div class={cn('absolute top-4 inset-x-0 flex flex-col items-center gap-4')}>
	<div class="flex items-center">
		{#each rounds as round (round.index)}
			{#if round.index > rounds[0].index}
				<div class="h-0.5 w-16 {round.index <= currentRound ? 'bg-dark-green' : 'bg-white'}"></div>
			{/if}
			<div
				class="rounded-full w-12 h-12 flex items-center justify-center relative transition-all duration-200 {round.index <=
				currentRound
					? 'bg-dark-green'
					: 'bg-white'}"
			>
				<span
					class="text-lg font-medium {round.index <= currentRound
						? 'text-white'
						: 'text-dark-green'}"
				>
					{round.index}
				</span>
			</div>
		{/each}
	</div>
	{#if currentRound === 0}
		<div>
			<h2 class="text-2xl font-medium text-dark-green text-center">{m.game_is_starting()}</h2>
			<p class="text-center text-text">{m.choose_starting_stop()}</p>
		</div>
	{:else}
		<div>
			<h2 class="text-2xl font-medium text-dark-green text-center">
				{roundsMap[currentRound]?.title}
			</h2>
			<p class="text-center">{roundsMap[currentRound]?.description}</p>
		</div>
	{/if}
</div>
