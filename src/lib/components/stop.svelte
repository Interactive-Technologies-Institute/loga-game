<script lang="ts">
	import type { Stop, StopId } from '@/types';
	import { onMount } from 'svelte';
	import clickSound from '@/sounds/click.mp3';

	let audio: HTMLAudioElement | null = null;
	onMount(() => {
		audio = new Audio(clickSound);
		audio.volume = 0.5;
	});

	interface StopProps {
		stop: Stop;
		selectable: boolean;
		onSelect: (stopId: StopId) => void;
	}

	let { stop, selectable, onSelect }: StopProps = $props();

	function handleInteraction(event: Event) {
		// Prevent default behavior for touch events
		if (event instanceof TouchEvent) {
			event.preventDefault();
		}

		onSelect(stop.id);
		if (audio) {
			audio.currentTime = 0;
			audio.play().catch((err) => console.error('Error playing sound:', err));
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleInteraction(event);
		}
	}
</script>

{#if selectable}
	<circle cx={stop.x} cy={stop.y} r="24" class="fill-[#FF6157] expand-fade" />
	<circle cx={stop.x} cy={stop.y} r="24" class="fill-[#FF6157] expand-fade-delayed" />
	<circle cx={stop.x} cy={stop.y} r="8" class="pulse-red" />
	<circle
		role="button"
		tabindex="0"
		aria-label="Select stop"
		onclick={handleInteraction}
		onkeydown={handleKeyDown}
		cx={stop.x}
		cy={stop.y}
		r="30"
		class="fill-transparent cursor-pointer"
	/>
{/if}

<style>
	@keyframes pulse-red {
		0%,
		100% {
			fill: #ff6157;
		}
		25% {
			fill: white;
		}
	}

	@keyframes expand-fade {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(3);
			opacity: 0;
		}
	}

	.pulse-red {
		animation: pulse-red 2s infinite;
	}

	.expand-fade {
		animation: expand-fade 2s infinite;
		transform-box: fill-box;
		transform-origin: center;
	}
	.expand-fade-delayed {
		animation: expand-fade 2s infinite;
		animation-delay: 0.25s;
		transform-box: fill-box;
		transform-origin: center;
	}
</style>
