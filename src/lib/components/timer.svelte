<script lang="ts">
	import { Hourglass } from 'lucide-svelte';
	import { onDestroy } from 'svelte';
	interface TimerProps {
		minutes: number;
		onTimeUp: () => void;
	}

	let { minutes = 0, onTimeUp }: TimerProps = $props();

	let timeLeft: number = $state(minutes * 60);
	let intervalId: ReturnType<typeof setInterval>;
	let isUnderOneMinute = $derived.by(() => timeLeft < 60);

	// Reset timer when minutes changes
	$effect(() => {
		timeLeft = minutes * 60;
		if (intervalId) {
			clearInterval(intervalId);
		}
		intervalId = setInterval(() => {
			timeLeft -= 1;
			if (timeLeft <= 0) {
				clearInterval(intervalId);
				onTimeUp();
			}
		}, 1000);
	});

	let formattedTime = $derived.by(() => {
		const minutes = Math.floor(timeLeft / 60);
		const seconds = timeLeft % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});

	let progressWidth = $derived.by(() => {
		return (timeLeft / (minutes * 60)) * 100;
	});
</script>

<div class="relative flex flex-grow items-center justify-center gap-3">
	<span class="hourglass-animation {isUnderOneMinute ? 'flash-text' : 'text-dark-green'}">
		<Hourglass strokeWidth={2.5} absoluteStrokeWidth={true} size={24} />
	</span>
	<p class="text-xl font-bold text-left {isUnderOneMinute ? 'flash-time' : 'text-dark-green'}">
		{formattedTime}
	</p>
	<div class="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
		<div
			class="absolute top-0 left-0 h-full bg-dark-green transition-all duration-1000 ease-linear {isUnderOneMinute
				? 'flash-bg'
				: ''}"
			style="width: {progressWidth}%"
		></div>
	</div>
</div>

<style>
	.hourglass-animation {
		display: inline-block;
		animation:
			flip-forward 0.5s,
			flip-back 1s;
		animation-delay: 0s, 1s;
		animation-iteration-count: infinite;
	}

	@keyframes flip-forward {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(180deg);
		}
	}

	@keyframes flip-back {
		from {
			transform: rotate(180deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.flash-bg {
		animation: flash-background 1s ease-in-out infinite;
	}

	@keyframes flash-background {
		0%,
		100% {
			background-color: rgb(39, 97, 63);
		}
		50% {
			background-color: rgb(255, 97, 87);
		}
	}
	.flash-text {
		animation:
			flip-forward 0.5s infinite,
			flip-back 1s infinite,
			flash-color 1s ease-in-out infinite;
		animation-delay: 0s, 1s, 0s;
	}

	.flash-time {
		animation: flash-color 1s ease-in-out infinite;
	}

	@keyframes flash-color {
		0%,
		100% {
			color: rgb(39, 97, 63);
		}
		50% {
			color: rgb(255, 97, 87);
		}
	}
</style>
