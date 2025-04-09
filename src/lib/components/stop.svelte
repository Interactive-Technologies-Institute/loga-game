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

	function handleInteraction() {
		onSelect(stop.id);
		if (audio) {
			audio.currentTime = 0;
			audio.play().catch((err) => console.error('Error playing sound:', err));
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleInteraction();
		}
	}
</script>

{#if selectable}
	<circle
		cx={stop.x}
		cy={stop.y}
		r="16"
		class="fill-white stroke-white stroke-2 hover:fill-white animate-pulse origin-center"
	/>
	<circle
		role="button"
		tabindex="0"
		aria-label="Select stop"
		onclick={handleInteraction}
		onkeydown={handleKeyDown}
		cx={stop.x}
		cy={stop.y}
		r="24"
		class="fill-transparent cursor-pointer"
	/>
{/if}
