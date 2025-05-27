<script lang="ts">
	import type { Round } from '@/types';
	import { cn } from '@/utils';
	import { Flag, MessageCircleDashed } from 'lucide-svelte';
	import { m } from '@src/paraglide/messages';
	import { ROUNDS } from '../data/rounds';
	import PostStory from './post-story-icon.svelte';

	let scrollContainer: HTMLDivElement;

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

	function getTranslation(key?: string): string {
		if (!key) return '';
		const translation = m[key as keyof typeof m];
		if (typeof translation === 'function') {
			return translation();
		}
		return 'Translation missing';
	}

	function scrollToRound() {
		const roundElement = document.getElementById(`step-${currentRound}`);
		if (!roundElement) return;

		roundElement.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center'
		});
	}

	$effect(() => {
		scrollToRound();
	});
</script>

<div class={cn('absolute top-4 inset-x-0 flex flex-col items-center gap-1 md:gap-2 lg:gap-4')}>
	<div
		class="round-indicator flex items-center max-w-20 md:max-w-fit px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:overflow-hidden"
	>
		<div bind:this={scrollContainer} class="flex items-center min-w-min mx-auto">
			{#each Array.from({ length: 8 }, (_, i) => i) as index}
				{#if index > 0}
					<div class="h-1 w-4 md:w-8 {index <= currentRound ? 'bg-dark-green' : 'bg-white'}"></div>
				{/if}
				<div
					id="step-{index}"
					class="rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center relative transition-all duration-200 snap-center {index ===
					0
						? 'bg-[#FF6157]'
						: index <= currentRound
							? 'bg-dark-green'
							: 'bg-white'}"
				>
					{#if index === 0}
						<Flag class="w-6 h-6 text-white" />
					{:else if index === 7}
						<PostStory color={index <= currentRound ? 'white' : 'dark-green'} />
					{:else}
						<span
							class="text-lg font-medium {index <= currentRound ? 'text-white' : 'text-dark-green'}"
						>
							{index}
						</span>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	{#if currentRound === 0}
		<div>
			<h2 class="text-2xl font-medium text-dark-green text-center">
				{getTranslation(ROUNDS[0].title)}
			</h2>
			<p class="text-center text-text">{m.choose_starting_stop()}</p>
		</div>
	{:else}
		<div class="flex flex-col items-center">
			<h2 class="text-center text-sm md:text-base font-medium">
				{m.round()}
				{roundsMap[currentRound]?.index}
			</h2>
			<p class="text-xl md:text-2xl text-dark-green font-medium text-center">
				{getTranslation(ROUNDS[currentRound]?.title)}
			</p>
		</div>
	{/if}
</div>

<style>
	/* Hide scrollbar but keep functionality */
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
