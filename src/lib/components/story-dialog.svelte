<script lang="ts">
	import type { GameState } from '@/state/game-state.svelte';
	import Card from './card.svelte';
	import { Button } from './ui/button';
	import * as Dialog from './ui/dialog';
	import Textarea from './ui/textarea/textarea.svelte';
	import { m } from '@src/paraglide/messages';
	import { CARDS } from '../data/cards';
	import { onMount } from 'svelte';
	import paperSound from '@/sounds/rustling-paper.mp3';
	import clickSound from '@/sounds/ui-click.mp3';

	let audio: HTMLAudioElement;
	let click_sound: HTMLAudioElement;

	onMount(() => {
		click_sound = new Audio(clickSound);
		click_sound.volume = 0.5;
		audio = new Audio(paperSound);
		audio.volume = 0.5;
	});
	interface StoryDialogProps {
		open: boolean;
		gameState: GameState;
	}

	let { open = $bindable(false), gameState }: StoryDialogProps = $props();

	let currentRound = $derived.by(() => {
		return gameState.gameRounds.find((round) => round.round === gameState.currentRound)?.round;
	});

	$effect(() => {
		if (open) {
			audio.play();
			setTimeout(() => {
				const round = document.getElementById(`round-${currentRound}`);
				if (round) {
					round.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}
			}, 100); // Ensures DOM updates before scrolling
		}
	});

	let playerCards = $derived.by(() => {
		return gameState.playersCards.filter((card) => card.player_id === gameState.playerId);
	});
	let playerAnswers = $derived.by(() => {
		return gameState.playersAnswers.filter((answer) => answer.player_id === gameState.playerId);
	});
	let currentAnswer = $state('');

	function onSubmit() {
		click_sound.play();
		gameState.submitAnswer(currentAnswer);
		open = false;
		currentAnswer = '';
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
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="overflow-y-auto max-h-[80vh] sm:max-w-[60rem] flex flex-col gap-y-10">
		{#each gameState.rounds as round (round.index)}
			{@const card_id = playerCards.find((card) => card.round === round.index)?.card_id}
			{@const card = CARDS.find((card) => card.id === card_id)}
			{@const answer = playerAnswers.find((answer) => answer.round === round.index)}
			<div id={`round-${round.index}`} class="flex flex-row items-stretch gap-x-8">
				{#if card}
					<div class="shrink-0">
						<Card {card} />
					</div>
				{:else}
					<div
						class="w-64 h-96 rounded-lg shrink-0 border-dashed border-2 border-primary flex items-center justify-center"
					>
						<p class="text-sm text-primary text-center">{m.card_not_selected()}</p>
					</div>
				{/if}
				<div class="flex flex-col items-stretch w-full">
					<p class="text-lg font-bold text-secondary">
						{round.index}. {getTranslation(card?.title)}
					</p>
					<p class="text-sm max-w-lg text-balance">
						{getTranslation(card?.text)}
					</p>
					{#if round.index === currentRound}
						<div class="flex-1 relative">
							<Textarea class="h-full mt-2" bind:value={currentAnswer} />
							<Button class="absolute bottom-2 right-4" onclick={onSubmit}>{m.submit()}</Button>
						</div>
					{:else}
						<Textarea class="flex-1 mt-2" value={answer?.answer ?? ''} disabled />
					{/if}
				</div>
			</div>
		{/each}
	</Dialog.Content>
</Dialog.Root>
