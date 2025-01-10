<script lang="ts">
	import type { MapPosition } from '@/state/map-position.svelte';

	interface MapProps {
		position: MapPosition;
	}

	let { position }: MapProps = $props();
</script>

<div class="absolute bottom-4 right-4 border-2 border-dark-green overflow-hidden">
	<div class="bg-[#D8EFF4] relative w-[calc(100vw/10)] h-[calc(100vh/10)]">
		<img src="/images/map.svg" alt="Minimap" class="w-full h-full" />
		<svg
			class="absolute inset-0 w-[calc(100vw/10)] h-[calc(100vh/10)]"
			style={`--scale: ${position.scale}; --x: ${position.x}; --y: ${position.y}`}
		>
			<style>
				.rectx {
					width: 100%;
					height: 100%;
					transform: translate(calc(-1 * var(--x) / 10 * 1px), calc(-1 * var(--y) / 10 * 1px))
						scale(calc(1 / var(--scale)));
					transform-origin: center;
				}
			</style>
			<defs>
				<mask id="Mask" maskContentUnits="userSpaceOnUse">
					<rect width="100%" height="100%" fill="white" opacity="0.4" />
					<rect class="rectx" fill="black" />
				</mask>
			</defs>
			<rect width="100%" height="100%" mask="url(#Mask)" />
		</svg>
	</div>
</div>
