<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { invalidateAll } from '$app/navigation';

	import { Select, Pagination } from 'bits-ui';
	import {
		Check,
		ChevronDown,
		ChevronUp,
		ChevronsUpDown,
		X,
		ChevronLeft,
		ChevronRight,
		Search
	} from 'lucide-svelte';

	import { Button } from '@/components/ui/button';
	import { CHARACTER_OPTIONS } from '@/types';
	import type { CardType } from '@/types';
	import { m } from '@src/paraglide/messages';
	import StoryCard from '@/components/story-card.svelte';
	import { localizeUrl } from '../../paraglide/runtime.js';

	const buttonColor = {
		landmark: 'bg-landmark-green',
		nature: 'bg-nature-green',
		sense: 'bg-sense-red',
		history: 'bg-history-yellow',
		action: 'bg-action-beige'
	} as const;

	let characterOptions = [
		{ value: '', label: m.all_characters() },
		...CHARACTER_OPTIONS.map((type) => ({
			value: type,
			label: m[`character_${type}_title`]()
		}))
	];

	let sortOptions = [
		{ value: 'latest', label: m.latest_first() },
		{ value: 'oldest', label: m.oldest_first() }
	];
	let { data } = $props();
	const stories = $derived(data.stories);

	let search = $state(page.url.searchParams.get('search') || '');
	let value = $state(page.url.searchParams.get('character') || '');
	let selectedCardTypes = $state<CardType[]>(
		(page.url.searchParams.get('cardType')?.split(',') ?? []).filter((t): t is CardType =>
			['nature', 'sense', 'action', 'history', 'landmark'].includes(t)
		)
	);
	let currentPage = $state(parseInt(page.url.searchParams.get('page') ?? '1'));
	let sort = $state(page.url.searchParams.get('sort') || 'latest');
	const perPage = 5;
	let searchInput: HTMLInputElement;
	const selectedLabel = $derived(characterOptions.find((option) => option.value === value)?.label);
	let loading = $state(false);

	const cardTypes: CardType[] = ['nature', 'sense', 'action', 'history', 'landmark'];
	function toggleCardType(type: CardType) {
		if (selectedCardTypes.includes(type)) {
			selectedCardTypes = selectedCardTypes.filter((t) => t !== type);
		} else {
			selectedCardTypes = [...selectedCardTypes, type];
		}
	}
	let searchTimeout: ReturnType<typeof setTimeout>;

	$effect(() => {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		const shouldTrigger = search.length === 0 || search.length > 2;
		if (value || search || selectedCardTypes.length > 0 || sort) {
			currentPage;
			if (shouldTrigger) {
				searchTimeout = setTimeout(async () => {
					loading = true;
					try {
						const params = new URLSearchParams();
						if (search.length > 2) params.set('search', search);
						if (value) params.set('character', value);
						if (selectedCardTypes.length > 0) params.set('cardType', selectedCardTypes.join(','));
						if (sort) params.set('sort', sort);
						if (currentPage) params.set('page', currentPage.toString());

						await goto(`?${params.toString()}`, { replaceState: true });

						searchInput?.focus();
					} finally {
						loading = false;
					}
				}, 500);
			}
		}
	});

	async function handleClearFilters() {
		search = '';
		value = '';
		selectedCardTypes = [];
		currentPage = 1;
		sort = 'latest';
		const url = new URL(page.url);
		url.searchParams.delete('search');
		url.searchParams.delete('character');
		await goto(url);
		searchInput?.focus();
	}
</script>

<div class="flex flex-col p-6 md:p-24 mx-auto">
	<div class="flex items-start">
		<Button class="p-0 text-lg gap-1" variant={'ghost'} href={localizeUrl('/')}
			><ChevronLeft strokeWidth={4} size={32} absoluteStrokeWidth={true} />
			{m.back_to_game()}</Button
		>
	</div>

	<div class="flex flex-col gap-1">
		<h1 class="text-4xl font-bold text-dark-green mt-4">{m.player_stories()}</h1>
		<p class="text-sm text-dark-green">{m.explore_stories()}</p>
	</div>

	<div class="flex flex-wrap gap-4 mt-8">
		<div class="relative self-end">
			<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
				<Search class="w-5 h-5 text-dark-green" />
			</div>
			<input
				type="text"
				placeholder={m.search_by()}
				bind:value={search}
				bind:this={searchInput}
				class="p-2 pl-10 w-fit h-10 border-gray-300 rounded-md border focus:ring-dark-green focus:border-dark-green focus:ring-1 outline-none"
			/>
		</div>
		<div class="flex flex-col items-center gap-2">
			<p class="self-start text-dark-green text-sm font-medium">{m.filter_by_character()}</p>
			<Select.Root type="single" onValueChange={(v) => (value = v)} items={characterOptions}>
				<Select.Trigger
					class="h-10 rounded-md border-gray-300 bg-white focus:ring-dark-green focus:border-dark-green focus:ring-1 outline-none inline-flex w-64 select-none items-center border px-3 text-sm transition-colors"
					aria-label="Select a character"
				>
					<span class={value ? 'text-black' : 'text-gray-400'}>{selectedLabel}</span>
					<ChevronsUpDown class="text-gray-300 ml-auto size-6" />
				</Select.Trigger>
				<Select.Portal>
					<Select.Content
						class="focus-override border-dark-green bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50 h-96 max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] select-none rounded-xl border px-1 py-3 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
						sideOffset={10}
					>
						<Select.ScrollUpButton class="flex w-full items-center justify-center">
							<ChevronUp class="size-3" />
						</Select.ScrollUpButton>
						<Select.Viewport class="p-1">
							{#each characterOptions as option, i (i + option.value)}
								<Select.Item
									class="flex h-10 w-full cursor-pointer select-none items-center rounded-md px-3 text-sm outline-none transition-colors  data-[highlighted]:bg-gray-100 data-[selected]:bg-dark-green data-[selected]:text-white"
									value={option.value}
									label={option.label}
								>
									{#snippet children({ selected })}
										<span class="flex-1">{option.label}</span>
										{#if selected}
											<div class="ml-2">
												<Check aria-label="check" />
											</div>
										{/if}
									{/snippet}
								</Select.Item>
							{/each}
						</Select.Viewport>
						<Select.ScrollDownButton class="flex w-full items-center justify-center">
							<ChevronDown class="size-3" />
						</Select.ScrollDownButton>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
		</div>
		<div class="flex flex-col items-center gap-2 h-full">
			<p class="self-start text-dark-green text-sm font-medium">{m.filter_by_card()}</p>
			<div class="h-full flex flex-wrap gap-2">
				{#each cardTypes as type}
					<button
						class="flex gap-1 items-center justify-center h-10 px-3 capitalize text-sm rounded-md transition-colors {selectedCardTypes.includes(
							type
						)
							? `${buttonColor[type]} text-white`
							: ` bg-gray-200 text-gray-500`}"
						onclick={() => toggleCardType(type)}
					>
						{#if selectedCardTypes.includes(type)}
							<Check class="w-4 h-4 text-white" />
						{/if}
						{m[`${type}_type`]()}
					</button>
				{/each}
			</div>
		</div>
		{#if search || value || selectedCardTypes.length > 0}
			<div class="self-end">
				<Button
					class="flex items-center h-10 font-normal"
					variant="outline"
					onclick={handleClearFilters}
				>
					<span class="flex items-center gap-2">
						<X />
						<span>{m.clear_all()}</span>
					</span></Button
				>
			</div>
		{/if}
	</div>

	<div class="flex flex-col mt-8 gap-3">
		<div class="flex items-center justify-between">
			<p class="text-2xl text-dark-green font-bold">{m.stories()}</p>
			<div class="flex items-center gap-2">
				<p class="flex items-center font-medium text-sm mr-1">{m.sort_by()}</p>
				<Select.Root
					type="single"
					value={sort}
					onValueChange={(v) => (sort = v)}
					items={sortOptions}
				>
					<Select.Trigger
						class="h-10 rounded-md border-gray-300 bg-white focus:ring-dark-green focus:border-dark-green focus:ring-1 outline-none inline-flex w-48 select-none items-center border px-3 text-sm transition-colors"
						aria-label="Sort stories"
					>
						<span>{sortOptions.find((opt) => opt.value === sort)?.label}</span>
						<ChevronsUpDown class="text-gray-300 ml-auto size-6" />
					</Select.Trigger>
					<Select.Portal>
						<Select.Content
							class="focus-override border-dark-green bg-white z-50 min-w-[var(--bits-select-anchor-width)] select-none rounded-xl border px-1 py-3"
							sideOffset={10}
						>
							<Select.Viewport class="p-1">
								{#each sortOptions as option (option.value)}
									<Select.Item
										class="flex h-10 w-full cursor-pointer select-none items-center rounded-md px-3 text-sm outline-none transition-colors data-[highlighted]:bg-gray-100 data-[selected]:bg-dark-green data-[selected]:text-white"
										value={option.value}
										label={option.label}
									>
										{#snippet children({ selected })}
											<span class="flex-1">{option.label}</span>
											{#if selected}
												<div class="ml-2">
													<Check aria-label="check" />
												</div>
											{/if}
										{/snippet}
									</Select.Item>
								{/each}
							</Select.Viewport>
						</Select.Content>
					</Select.Portal>
				</Select.Root>
			</div>
		</div>
		<div class="min-h-[200px]">
			<!-- Adjust height based on your needs -->
			{#if loading}
				<div class="flex items-center justify-center h-full">
					<!-- You can add a spinner here if you want -->
					<p class="text-dark-green/60">Loading stories...</p>
				</div>
			{:else if stories.length === 0}
				<div class="flex items-center justify-center h-full">
					<p class="font-medium text-gray-500">No stories found.</p>
				</div>
			{:else}
				<div class="flex flex-wrap gap-4">
					{#each stories as story (story.story_id)}
						<StoryCard data={story} />
					{/each}
				</div>
			{/if}
		</div>
		<div class="self-center">
			<Pagination.Root count={data.totalStories} {perPage} bind:page={currentPage}>
				{#snippet children({ pages, range })}
					<div class="my-8 flex items-center">
						<Pagination.PrevButton
							class="hover:bg-gray-200 disabled:text-gray-400 mr-[25px] inline-flex gap-1 items-center justify-center rounded-lg bg-transparent active:scale-[0.98] disabled:cursor-not-allowed hover:disabled:bg-transparent p-2"
						>
							<ChevronLeft />
							{m.previous()}
						</Pagination.PrevButton>
						<div class="flex items-center gap-2.5">
							{#each pages as page (page.key)}
								{#if page.type === 'ellipsis'}
									<div class="select-none font-medium">...</div>
								{:else}
									<Pagination.Page
										{page}
										class="hover:bg-gray-200 data-[selected]:bg-dark-green data-[selected]:text-white inline-flex size-10 select-none items-center justify-center rounded-lg bg-transparent font-medium active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent"
									>
										{page.value}
									</Pagination.Page>
								{/if}
							{/each}
						</div>
						<Pagination.NextButton
							class="hover:bg-gray-200 disabled:text-gray-400 ml-[25px] inline-flex gap-1 items-center justify-center rounded-lg bg-transparent active:scale-[0.98] disabled:cursor-not-allowed hover:disabled:bg-transparent p-2"
						>
							<span>{m.next()}</span>
							<ChevronRight />
						</Pagination.NextButton>
					</div>
					<p class="text-gray-400 text-center text-sm">
						Showing {range.start + 1} - {range.end}
					</p>
				{/snippet}
			</Pagination.Root>
		</div>
	</div>
</div>
