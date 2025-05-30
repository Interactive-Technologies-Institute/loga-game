<script lang="ts">
	import type { Player, PlayerState, Round } from '@/types';
	import { onMount } from 'svelte';
	import { Check, Flag, Route, SquarePen } from 'lucide-svelte';
	import { m } from '@src/paraglide/messages';

	interface PlayerBadgeProps {
		player: Player;
		playerState: PlayerState;
		rounds: Round[];
		currentRound: number;
		tourCompleted: boolean;
	}

	let { player, playerState, rounds, currentRound, tourCompleted }: PlayerBadgeProps = $props();
	let isVisible = $state(true);
	let isExiting = $state(false);
	let previousState = $state(playerState.state);
	let exitTimeout: ReturnType<typeof setTimeout> | undefined = $state(undefined);

	function clearExistingTimeout() {
		if (exitTimeout) {
			clearTimeout(exitTimeout);
			exitTimeout = undefined;
		}
	}

	$effect(() => {
		if (tourCompleted && previousState !== playerState.state) {
			clearExistingTimeout();
			if (isVisible) {
				startExit();
			} else {
				// If not visible, start new animation immediately
				startNewAnimation();
			}
		}
	});

	$effect(() => {
		if (tourCompleted) {
			startNewAnimation();
		}
	});

	function startNewAnimation() {
		previousState = playerState.state;
		isExiting = false;
		isVisible = true;

		exitTimeout = setTimeout(() => {
			startExit();
			clearExistingTimeout();
		}, 5000);
	}

	function startExit() {
		isExiting = true;
	}

	onMount(() => {
		return () => {
			clearExistingTimeout();
		};
	});
	function getMessage() {
		if (currentRound === 0) {
			return {
				title: m.game_is_starting(),
				subtitle:
					playerState.state === 'starting' ? m.choose_starting_stop() : m.write_introduction()
			};
		}

		if (currentRound === 7) {
			return {
				title: playerState.state === 'writing' ? m.game_is_ending() : m.game_ended(),
				subtitle:
					playerState.state === 'done'
						? m.you_are_done()
						: playerState.state === 'writing'
							? m.write_final_part()
							: m.you_are_done()
			};
		}

		return {
			title: `${m.round()} ${currentRound}`,
			subtitle:
				playerState.state === 'moving'
					? m.choose_your_new_stop()
					: playerState.state === 'writing'
						? m.write_next_part()
						: m.you_are_done()
		};
	}
</script>

<div class="rounded-full w-16 h-16 relative player-badges">
	{#if isVisible}
		<div
			class="absolute bg-white flex flex-col items-start justify-center w-max h-16 pl-10 lg:pl-12 pr-4 lg:pr-6 rounded-br-full rounded-tr-full left-1/2 z-10 {isExiting
				? 'slide-out'
				: 'slide-in'}"
		>
			<h3 class="text-dark-green font-bold text-xs sm:text-sm {isExiting ? 'fade-out' : 'fade-in'}">
				{getMessage().title}
			</h3>
			<p class="text-sm sm:text-lg {isExiting ? 'fade-out-delayed' : 'fade-in-delayed'}">
				{getMessage().subtitle}
			</p>
		</div>
	{/if}
	<img
		src={`/images/characters/badges/${player.character}.svg`}
		alt={player.nickname}
		class="w-full h-full relative z-20"
	/>
	<div
		class="absolute -top-3 -right-3 rounded-full w-8 h-8 bg-dark-green flex items-center justify-center text-dark-green z-30"
	>
		{#if playerState.state === 'starting'}
			<Flag class="w-4 h-4 stroke-white" />
		{:else if playerState.state === 'moving'}
			<Route class="w-4 h-4 stroke-white" />
		{:else if playerState.state === 'writing'}
			<SquarePen class="w-4 h-4 stroke-white" />
		{:else if playerState.state === 'done'}
			<Check class="w-4 h-4 stroke-white" />
		{/if}
	</div>
</div>

<style>
	@keyframes slide-in {
		from {
			transform: translateX(-50%) scaleX(0);
			opacity: 0;
		}
		to {
			transform: translateX(0) scaleX(1);
			opacity: 1;
		}
	}

	@keyframes slide-out {
		from {
			transform: translateX(0) scaleX(1);
			opacity: 1;
		}
		to {
			transform: translateX(-50%) scaleX(0);
			opacity: 0;
		}
	}

	@keyframes fade-in {
		from {
			transform: translateX(-20px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes fade-out {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			transform: translateX(-20px);
			opacity: 0;
		}
	}

	.slide-in {
		animation: slide-in 0.5s ease-in-out forwards;
	}

	.slide-out {
		animation: slide-out 0.5s ease-in-out forwards;
		animation-delay: 0.25s;
	}

	.fade-in {
		opacity: 0;
		animation: fade-in 0.75s ease-in-out forwards;
		animation-delay: 0.25s;
	}

	.fade-out {
		animation: fade-out 0.25s ease-in-out forwards;
	}

	.fade-in-delayed {
		opacity: 0;
		animation: fade-in 0.8s ease-in-out forwards;
		animation-delay: 0.3s;
	}

	.fade-out-delayed {
		animation: fade-out 0.25s ease-in-out forwards;
		animation-delay: 0.1s;
	}
</style>
