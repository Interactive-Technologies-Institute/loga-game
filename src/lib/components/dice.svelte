<script lang="ts">
	import { onMount } from 'svelte';
	import rollSound from '@/sounds/dice_roll.mp3';

	interface DiceProps {
		round: number;
		value: number;
	}

	let { value, round }: DiceProps = $props();
	let rolling = $state(false);
	let audio: HTMLAudioElement;
	let audioLoaded = $state(false);
	let currentRotation = $state('transform: rotateX(0) rotateY(0)');

	// Audio setup
	onMount(async () => {
		audio = new Audio(rollSound);
		audio.volume = 0.5;
		await new Promise((resolve) => {
			audio.addEventListener('canplaythrough', resolve, { once: true });
			audio.load();
		});
		audioLoaded = true;
	});

	// Get final rotation based on dice value
	function getFinalRotation(value: number) {
		const rotations = {
			1: 'rotateX(0) rotateY(0)', // Front
			6: 'rotateX(180deg) rotateY(0)', // Back
			4: 'rotateX(0) rotateY(90deg)', // Right
			3: 'rotateX(0) rotateY(-90deg)', // Left
			2: 'rotateX(-90deg) rotateY(0)', // Top
			5: 'rotateX(90deg) rotateY(0)' // Bottom
		};
		return rotations[value as keyof typeof rotations] || rotations[1];
	}

	let randomRotation = $state('');

	$effect(() => {
		if (round === 0 || round === 7) {
			currentRotation = getFinalRotation(value);
			return;
		}

		if (!audioLoaded) return;

		rolling = true;
		const finalRot = getFinalRotation(value);

		// Set CSS custom properties for the animations
		const diceElement = document.querySelector('.dice-container') as HTMLElement;
		if (diceElement) {
			diceElement.style.setProperty('--to-rotation', finalRot);
		}

		if (audio) {
			audio.currentTime = 0;
			audio.play().catch((err) => console.error('Error playing sound:', err));
		}

		setTimeout(() => {
			rolling = false;
			currentRotation = finalRot;
		}, 2000);
	});

	onMount(() => {
		const updateDiceSize = () => {
			const diceElement = document.querySelector('.dice-container') as HTMLElement;
			if (diceElement) {
				const size = window.innerWidth < 768 ? '32px' : '64px';
				diceElement.style.setProperty('--dice-size', size);
			}
		};

		updateDiceSize();
		window.addEventListener('resize', updateDiceSize);

		return () => window.removeEventListener('resize', updateDiceSize);
	});
</script>

<div class="w-24 h-24 md:w-32 md:h-32 shadow-2xl dice-container dice" style="perspective: 1200px">
	<div
		class="relative w-full h-full"
		class:animate-roll={rolling}
		style="transform: {!rolling ? currentRotation : ''}; transform-style: preserve-3d;"
	>
		<!-- Front (1) -->
		<div
			class="absolute w-full h-full bg-white border-2 border-slate-200 grid grid-cols-3 grid-rows-3 p-4 shadow-inner"
			style="transform: translateZ(calc(var(--dice-size, 32px))); backface-visibility: hidden;"
		>
			<div class="flex justify-center items-center col-start-2 row-start-2">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
		</div>

		<!-- Back (6) -->
		<div
			class="absolute w-full h-full bg-white border-2 border-slate-200 grid grid-cols-3 grid-rows-3 p-4 shadow-inner"
			style="transform: rotateY(180deg) translateZ(calc(var(--dice-size, 32px))); backface-visibility: hidden;"
		>
			<div class="flex justify-center items-center col-start-1 row-start-1">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-3 row-start-1">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-1 row-start-2">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-3 row-start-2">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-1 row-start-3">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-3 row-start-3">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
		</div>

		<!-- Right (3) -->
		<div
			class="absolute w-full h-full bg-white border-2 border-slate-200 grid grid-cols-3 grid-rows-3 p-4 shadow-inner"
			style="transform: rotateY(90deg) translateZ(calc(var(--dice-size, 32px))); backface-visibility: hidden;"
		>
			<div class="flex justify-center items-center col-start-1 row-start-1">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-2 row-start-2">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-3 row-start-3">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
		</div>

		<!-- Left (4) -->
		<div
			class="absolute w-full h-full bg-white border-2 border-slate-200 grid grid-cols-3 grid-rows-3 p-4 shadow-inner"
			style="transform: rotateY(-90deg) translateZ(calc(var(--dice-size, 32px))); backface-visibility: hidden;"
		>
			<div class="flex justify-center items-center col-start-1 row-start-1">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-3 row-start-1">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-1 row-start-3">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-3 row-start-3">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
		</div>

		<!-- Top (2) -->
		<div
			class="absolute w-full h-full bg-white border-2 border-slate-200 grid grid-cols-3 grid-rows-3 p-4 shadow-inner"
			style="transform: rotateX(90deg) translateZ(calc(var(--dice-size, 32px))); backface-visibility: hidden;"
		>
			<div class="flex justify-center items-center col-start-1 row-start-1">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-3 row-start-3">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
		</div>

		<!-- Bottom (5) -->
		<div
			class="absolute w-full h-full bg-white border-2 border-slate-200 grid grid-cols-3 grid-rows-3 p-4 shadow-inner"
			style="transform: rotateX(-90deg) translateZ(calc(var(--dice-size, 32px))); backface-visibility: hidden;"
		>
			<div class="flex justify-center items-center col-start-1 row-start-1">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-3 row-start-1">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-2 row-start-2">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-1 row-start-3">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
			<div class="flex justify-center items-center col-start-3 row-start-3">
				<div class="md:w-4 md:h-4 w-3 h-3 bg-dark-green rounded-full"></div>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes randomRoll {
		0% {
			transform: rotateX(-720deg) rotateY(-360deg) rotateZ(-360deg);
		}
		100% {
			transform: rotateX(-180deg) rotateY(-90deg) rotateZ(-90deg);
		}
	}

	@keyframes toFinal {
		0% {
			transform: rotateX(-180deg) rotateY(-90deg) rotateZ(-90deg);
		}
		100% {
			transform: var(--to-rotation);
		}
	}

	.animate-roll {
		animation:
			randomRoll 1s ease-in forwards,
			toFinal 0.3s ease-out forwards;
		animation-delay: 0s, 1s;
	}
</style>
