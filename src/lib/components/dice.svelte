<script lang="ts">
	import { onMount } from 'svelte';

	import rollSound from '@/sounds/dice_roll.mp3';

	let audio: HTMLAudioElement;
	let audioLoaded = $state(false);

	onMount(async () => {
		audio = new Audio(rollSound);
		audio.volume = 0.5;

		// Wait for the audio to be loaded
		await new Promise((resolve) => {
			audio.addEventListener('canplaythrough', resolve, { once: true });
			audio.load();
		});

		audioLoaded = true;
	});

	interface DiceProps {
		round: number;
		value: number;
	}

	let { value, round }: DiceProps = $props();
	let rolling = $state(false);
	let displayedValue = $state(1);
	let isFirstRoll = $state(true);

	$effect(() => {
		if (!audioLoaded && isFirstRoll) {
			// Skip effect if audio isn't loaded on first roll
			return;
		}
		round;
		value;
		rolling = true;
		if (audio && audioLoaded) {
			audio.currentTime = 0;
			audio.play().catch((err) => console.error('Error playing sound:', err));
		}
		let interval = setInterval(() => {
			displayedValue = Math.floor(Math.random() * 6 + 1);
		}, 250);

		setTimeout(() => {
			clearInterval(interval);
			rolling = false;
			displayedValue = value;
		}, 1000);

		isFirstRoll = false;

		return () => {
			clearInterval(interval);
			if (audio) {
				audio.pause();
				audio.currentTime = 0;
			}
		};
	});
</script>

<div
	class="w-24 h-24 bg-white rounded-lg grid grid-cols-3 grid-rows-3 gap-2 p-4 roll-animation"
	class:roll-animation={rolling}
>
	{#if displayedValue === 1}
		<div class="flex justify-center items-center col-start-2 row-start-2">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
	{:else if displayedValue === 2}
		<div class="flex justify-center items-center col-start-1 row-start-1">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-3">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
	{:else if displayedValue === 3}
		<div class="flex justify-center items-center col-start-1 row-start-1">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-2 row-start-2">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-3">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
	{:else if displayedValue === 4}
		<div class="flex justify-center items-center col-start-1 row-start-1">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-1">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-1 row-start-3">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-3">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
	{:else if displayedValue === 5}
		<div class="flex justify-center items-center col-start-1 row-start-1">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-1">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-2 row-start-2">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-1 row-start-3">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-3">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
	{:else if displayedValue === 6}
		<div class="flex justify-center items-center col-start-1 row-start-1">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-1">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-1 row-start-2">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-2">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-1 row-start-3">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-3">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
	{/if}
</div>

<style>
	@keyframes rotateDie {
		0% {
			transform: rotateZ(0deg) scale(1);
			box-shadow: 0 0 0 rgba(0, 0, 0, 0);
		}
		50% {
			transform: rotateZ(180deg) scale(1.5);
			box-shadow: 0 0 50px rgba(255, 0, 0, 0.3);
		}
		100% {
			transform: rotateZ(360deg) scale(1);
			box-shadow: 0 0 0 rgba(0, 0, 0, 0);
		}
	}

	.roll-animation {
		animation: rotateDie 1s infinite ease-out;
	}
</style>
