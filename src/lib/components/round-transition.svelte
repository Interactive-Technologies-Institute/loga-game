<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { m } from '@src/paraglide/messages';
	import { ROUNDS } from '../data/rounds';

	interface RoundTransitionProps {
		round: number;
		onComplete: () => void;
		transitionState: 'starting' | 'transitioning' | 'ending' | 'ended';
	}

	let { round, onComplete, transitionState = $bindable() }: RoundTransitionProps = $props();

	function getTranslation(key?: string): string {
		if (!key) return '';
		const translation = m[key as keyof typeof m];
		if (typeof translation === 'function') {
			return translation();
		}
		return 'Translation missing';
	}

	$effect(() => {
		// Initial state - immediately change to transitioning
		if (transitionState === 'starting') {
			transitionState = 'transitioning';
		}

		// Main transition phase
		if (transitionState === 'transitioning') {
			const timer = setTimeout(() => {
				transitionState = 'ending';
			}, 2000); // Main content display time

			return () => clearTimeout(timer);
		}

		// Ending phase (fade out animations)
		if (transitionState === 'ending') {
			const timer = setTimeout(() => {
				transitionState = 'ended';
				onComplete(); // Notify parent component
			}, 1000); // Fade out time

			return () => clearTimeout(timer);
		}
	});
</script>

<div
	class="fixed inset-0 z-50 bg-dark-green/95 flex items-center justify-center p-4 md:p-8"
	transition:fade={{ duration: 200 }}
>
	<div class="relative max-w-5xl w-full mx-auto px-16 sm:px-24 md:px-32 flex flex-col">
		<!-- Top image -->
		<div
			class="absolute left-0 top-0 -translate-y-full w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-64 lg:h-64 animate-slide-in-left flex items-center justify-center"
		>
			<img
				src="/images/illustrations/step_{round}_1.png"
				alt=""
				class="w-full h-full object-contain"
			/>
		</div>

		<!-- Center content -->
		<div class="text-center" in:scale={{ duration: 600, delay: 200, easing: backOut }}>
			<p class="text-white/60 text-lg sm:text-xl md:text-2xl mb-2 sm:mb-4 animate-fade-in">
				{m.round()}
				{round}
			</p>
			<h1
				class="text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold animate-slide-up"
			>
				{getTranslation(ROUNDS[round]?.title)}
			</h1>
		</div>

		<!-- Bottom image -->
		<div
			class="absolute right-0 bottom-0 translate-y-full w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-64 lg:h-64 animate-slide-in-right flex items-center justify-center"
		>
			<img
				src="/images/illustrations/step_{round}_2.png"
				alt=""
				class="w-full h-full object-contain"
			/>
		</div>
	</div>
</div>

<style>
	.animate-fade-in {
		animation: fadeIn 0.5s ease-out forwards;
		opacity: 0;
	}

	.animate-slide-up {
		animation: slideUp 0.8s ease-out forwards;
		opacity: 0;
		transform: translateY(20px);
	}

	.animate-slide-in-left {
		animation: slideInLeft 0.8s ease-out 0.3s forwards;
		opacity: 0;
		transform: translate(-100%, -100%);
	}

	.animate-slide-in-right {
		animation: slideInRight 0.8s ease-out 0.3s forwards;
		opacity: 0;
		transform: translate(100%, 100%);
	}

	@keyframes slideInLeft {
		from {
			opacity: 0;
			transform: translate(-100%, -100%);
		}
		to {
			opacity: 1;
			transform: translate(0, -100%);
		}
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translate(100%, 100%);
		}
		to {
			opacity: 1;
			transform: translate(0, 100%);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
