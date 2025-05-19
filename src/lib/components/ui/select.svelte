<script lang="ts">
	import { Select, type WithoutChildren } from 'bits-ui';
	import { Check, ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-svelte';

	type Props = WithoutChildren<Select.RootProps> & {
		placeholder?: string;
		items: { value: string; label: string; disabled?: boolean }[];
		contentProps?: WithoutChildren<Select.ContentProps>;
		// any other specific component props if needed
	};

	let { value = $bindable(), items, contentProps, placeholder, ...restProps }: Props = $props();

	const selectedLabel = $derived(items.find((item) => item.value === value)?.label);
</script>

<!--
TypeScript Discriminated Unions + destructing (required for "bindable") do not
get along, so we shut typescript up by casting `value` to `never`, however,
from the perspective of the consumer of this component, it will be typed appropriately.
-->
<Select.Root bind:value={value as never} {...restProps}>
	<Select.Trigger
		class="h-full rounded-md border-2 border-gray-200 bg-white data-placeholder:text-gray-300 inline-flex w-[296px] select-none items-center px-3 text-sm transition-colors"
	>
		{selectedLabel ? selectedLabel : placeholder}
		<ChevronsUpDown class="text-gray-500 ml-auto size-6" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class="focus-override border-gray-300 bg-white shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50 h-96 max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] select-none rounded-xl border px-1 py-3 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
			sideOffset={8}
			{...contentProps}
		>
			<Select.ScrollUpButton class="flex w-full items-center justify-center"
				><ChevronUp />
			</Select.ScrollUpButton>
			<Select.Viewport class="p-1">
				{#each items as { value, label, disabled } (value)}
					<Select.Item
						class="rounded-button data-highlighted:bg-red-500 outline-hidden data-disabled:opacity-50 flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize"
						{value}
						{label}
						{disabled}
					>
						{#snippet children({ selected })}
							<div class="ml-auto">
								{#if disabled}
									<span class="text-red-500">{label}</span>
								{:else}
									<span>{label}</span>
								{/if}
								{#if selected}
									<Check />
								{/if}
							</div>
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
			<Select.ScrollDownButton class="flex w-full items-center justify-center"
				><ChevronDown /></Select.ScrollDownButton
			>
		</Select.Content>
	</Select.Portal>
</Select.Root>
