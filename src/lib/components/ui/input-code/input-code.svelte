<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { PinInput as InputCodePrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(''),
		...restProps
	}: ComponentProps<typeof InputCodePrimitive.Root> = $props();
</script>

<InputCodePrimitive.Root
	bind:ref
	bind:value
	class={cn(
		'flex items-center gap-2 has-[:disabled]:opacity-50 [&_input]:disabled:cursor-not-allowed',
		className
	)}
	{...restProps}
/>
