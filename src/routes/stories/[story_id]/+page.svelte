<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { ChevronLeft } from 'lucide-svelte';
	import RelativeTime from '@/components/relative-time.svelte';
	import CharacterCard from '@/components/character-card.svelte';
	import Card from '@/components/card.svelte';
	import { Flag } from 'lucide-svelte';
	import PostStory from '@/components/post-story-icon.svelte';
	import { CARDS } from '$lib/data/cards';
	import { ROUNDS } from '$lib/data/rounds';
	import type { Card as CardType } from '$lib/types';
	import type { Round } from '$lib/types';
	import { m } from '@src/paraglide/messages';
	import { Share2, Check } from 'lucide-svelte';
	import { onDestroy } from 'svelte';
	import { localizeHref } from '@src/paraglide/runtime';

	let isCopied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout>;

	const buttonColor = {
		landmark: 'bg-landmark-green',
		nature: 'bg-nature-green',
		sense: 'bg-sense-red',
		history: 'bg-history-yellow',
		action: 'bg-action-beige'
	} as const;

	let { data } = $props();
	let story = data.story;

	let storyCharacter = story.character.type;

	let sortedRounds = Object.entries(story.rounds)
		.map(([key, round]) => ({
			...round,
			roundNumber: parseInt(key)
		}))
		.sort((a, b) => a.roundNumber - b.roundNumber);

	function getCardDetails(cardId: number | null): CardType | null {
		if (!cardId) return null;
		return CARDS.find((card): card is CardType => card.id === cardId) ?? null;
	}

	function getRoundDetails(roundNumber: number): Round | null {
		return ROUNDS.find((round) => round.index === roundNumber) ?? null;
	}

	function getTranslation(key: string | null | undefined): string {
		if (!key) return ''; // Return an empty string if the key is undefined
		const translation = m[key as keyof typeof m];
		if (typeof translation === 'function') {
			return translation();
		} else {
			console.warn(`Translation for key "${key}" is missing or not a function.`);
			return 'Translation missing';
		}
	}

	async function copyToClipboard() {
		const url = window.location.href;
		await navigator.clipboard.writeText(url);

		// Set copied state
		isCopied = true;

		// Clear any existing timeout
		if (copyTimeout) clearTimeout(copyTimeout);

		// Reset after 2 seconds
		copyTimeout = setTimeout(() => {
			isCopied = false;
		}, 2000);
	}

	// Cleanup timeout on component destroy
	onDestroy(() => {
		if (copyTimeout) clearTimeout(copyTimeout);
	});
</script>

<div class="flex flex-col p-6 lg:p-24 w-screen mx-auto">
	<div class="flex items-center">
		<Button class="p-0 text-lg gap-1" variant={'ghost'} href={localizeHref('/stories')}
			><ChevronLeft strokeWidth={4} size={32} absoluteStrokeWidth={true} />
			{m.view_all_stories()}</Button
		>
	</div>

	<div class="mt-4">
		<RelativeTime date={data.story.created_at} />
	</div>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-4">
			<div class="flex">
				<div class="flex mt-4 flex-wrap w-full items-center justify-between">
					<h1 class="font-bold text-dark-green text-4xl">{data.story.story_title}</h1>
					<div class="flex gap-4 items-center mt-4">
						<Button
							variant={'outline'}
							onclick={copyToClipboard}
							class="transition-all duration-200"
						>
							{#if isCopied}
								<Check class="w-4 h-4 mr-2" /> {m.copied()}
							{:else}
								<Share2 class="w-4 h-4 mr-2" /> {m.share()}
							{/if}
						</Button>
						<Button href={localizeHref('/')}>{m.play_game()}</Button>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<p class="text-lg">
					<span class="text-gray-500">{story.player_name} as</span>
					<span class="font-bold text-black">{story.character.nickname}</span>
				</p>
				{#if story.character.description !== ''}
					<p class="text-gray-500 text-sm">"{story.character.description}"</p>
				{:else}
					<p class="text-gray-500 text-sm italic">No description...</p>
				{/if}
			</div>
			<div>
				<div class="flex gap-2 flex-wrap">
					{#each story.card_types as type}
						<span
							class="capitalize inline-block px-4 py-2 text-xs rounded-md mb-2 {buttonColor[
								type as keyof typeof buttonColor
							]} text-white"
						>
							{getTranslation(`${type}_type`)}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="flex items-center gap-4 my-4">
		<div class="h-[1px] flex-1 bg-gray-200"></div>
		<h2 class="text-xl font-medium text-dark-green">{m.story()}</h2>
		<div class="h-[1px] flex-1 bg-gray-200"></div>
	</div>
	<div class="flex items-center justify-center w-full mb-8">
		<div class="flex flex-col gap-6 mt-8">
			{#each sortedRounds as round (round.roundNumber)}
				<div class="flex gap-4 md:gap-8 w-full relative">
					{#if round.round < sortedRounds.length - 1}
						<div class="absolute left-4 md:left-4 top-8 w-[2px] h-full bg-dark-green -z-10"></div>
					{/if}

					<div class="flex-shrink-0">
						{#if round.round === 0}
							<div class="w-8 h-8 rounded-full bg-[#FF6157] grid place-items-center self-start">
								<Flag class="w-4 h-4 text-white" />
							</div>
						{:else if round.round === 7}
							<div
								class="w-8 h-8 rounded-full text-white bg-dark-green grid place-items-center self-start"
							>
								<PostStory color={'white'} />
							</div>
						{:else}
							<div
								class="w-8 h-8 rounded-full text-sm font-bold text-white bg-dark-green grid place-items-center self-start"
							>
								{round.round}
							</div>
						{/if}
					</div>

					<p class="flex-1 max-w-[75ch] text-pretty">{round.answer}</p>
				</div>
			{/each}
		</div>
	</div>
	<div class="flex items-center gap-4 my-4">
		<div class="h-[1px] flex-1 bg-gray-200"></div>
		<h2 class="text-xl font-medium text-dark-green">{m.cards_drawn()}</h2>
		<div class="h-[1px] flex-1 bg-gray-200"></div>
	</div>
	<div class="flex gap-4 items-center justify-start w-full">
		<div class="relative w-full">
			<div class="flex-1 overflow-x-auto md:overflow-x-scroll snap-x snap-mandatory md:snap-none">
				<div class="flex gap-8 px-4 min-w-min">
					<div class="flex-shrink-0">
						<div class="group/char flex gap-4 flex-col w-fit">
							<div class="flex snap-center items-center gap-2 justify-center">
								<div class="w-8 h-8 rounded-full bg-[#FF6157] grid place-items-center">
									<Flag class="w-4 h-4 text-white flex items-center justify-center" />
								</div>
								<span class="font-medium text-center text-base flex items-center justify-center">
									{m.intro()}
								</span>
							</div>
							<CharacterCard character={storyCharacter} />
						</div>
					</div>
					<div class="h-999 w-[2px] bg-gray-200 flex-shrink-0"></div>

					<div class="flex-1">
						<div class="flex gap-8 px-4 min-w-min">
							{#each sortedRounds as round, index (round.roundNumber)}
								{#if round.round !== 0 && round.round !== 7}
									{@const card = getCardDetails(round.card_id)}
									{@const roundDetails = getRoundDetails(round.round)}

									<div class="flex-shrink-0 snap-center flex flex-col items-center gap-4">
										<div class="flex items-center justify-center gap-2">
											<div
												class="w-8 h-8 rounded-full text-white bg-dark-green grid place-items-center"
											>
												{round.round}
											</div>
											<span class="font-medium text-center text-base">
												{getTranslation(roundDetails?.title)}
											</span>
										</div>

										{#if card}
											<Card {card} />
										{/if}
									</div>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-4 items-center mt-16">
		<p>{m.try_for_yourself()}!</p>
		<Button href={'/'}>{m.play_game()}</Button>
	</div>
</div>
