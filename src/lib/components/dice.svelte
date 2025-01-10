<script lang="ts">
	interface DiceProps {
		value: number;
	}

	let { value }: DiceProps = $props();
</script>

<div class="w-24 h-24 bg-white rounded-lg grid grid-cols-3 grid-rows-3 gap-2 p-4">
	{#if value === 1}
		<div class="flex justify-center items-center col-start-2 row-start-2">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
	{:else if value === 2}
		<div class="flex justify-center items-center col-start-1 row-start-1">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-3">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
	{:else if value === 3}
		<div class="flex justify-center items-center col-start-1 row-start-1">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-2 row-start-2">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
		<div class="flex justify-center items-center col-start-3 row-start-3">
			<div class="w-4 h-4 bg-dark-green rounded-full"></div>
		</div>
	{:else if value === 4}
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
	{:else if value === 5}
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
	{:else if value === 6}
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
