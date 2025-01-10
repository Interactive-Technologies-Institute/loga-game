<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { PinInput as InputCodePrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		cell,
		class: className,
		...restProps
	}: ComponentProps<typeof InputCodePrimitive.Cell> = $props();
</script>

<InputCodePrimitive.Cell
	{cell}
	bind:ref
	class={cn(
		'border-dark-green bg-white relative flex h-10 w-10 items-center justify-center border-y border-r text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
		cell.isActive && 'ring-dark-green ring-offset-dark-green z-10 ring-2',
		className
	)}
	{...restProps}
>
	{cell.char}
	{#if cell.hasFakeCaret}
		<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
			<div class="animate-caret-blink bg-dark-green h-4 w-px duration-1000"></div>
		</div>
	{/if}
</InputCodePrimitive.Cell>
