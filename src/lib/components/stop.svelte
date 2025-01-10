<script lang="ts">
	import type { Stop, StopId } from '@/types';

	interface StopProps {
		stop: Stop;
		selectable: boolean;
		onSelect: (stopId: StopId) => void;
	}

	let { stop, selectable, onSelect }: StopProps = $props();
</script>

{#if selectable}
	<circle
		cx={stop.x}
		cy={stop.y}
		r="16"
		class="fill-white stroke-white stroke-2 hover:fill-white animate-pulse origin-center"
	/>
	<circle
		onclick={() => onSelect(stop.id)}
		cx={stop.x}
		cy={stop.y}
		r="24"
		class="fill-transparent cursor-pointer"
	/>
{/if}
