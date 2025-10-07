<script lang="ts">
	import type { GameState } from '@/state/game-state.svelte';
	import Card from './card.svelte';
	import { Button } from './ui/button';
	import * as Dialog from './ui/dialog';
	import Textarea from './ui/textarea/textarea.svelte';
	import CharacterCard from './character-card.svelte';
	import { m } from '@src/paraglide/messages';
	import { CARDS } from '../data/cards';
	import { ROUNDS } from '../data/rounds';
	import { onMount } from 'svelte';
	import paperSound from '@/sounds/rustling-paper.mp3';
	import clickSound from '@/sounds/ui-click.mp3';
	import { Flag } from 'lucide-svelte';
	import Timer from './timer.svelte';
	import PostStory from './post-story-icon.svelte';
	import { getCharacterCategory, type Character } from '@src/lib/types';
	import SpeciesInfoDialog from './species-info-dialog.svelte';
	import LandmarkInfoDialog from './landmark-info-dialog.svelte';

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

	let sortedRounds = $derived.by(() => {
		return gameState.rounds.sort((a, b) => a.index - b.index);
	});

	let player = $derived.by(() => {
		return gameState.players.find((player) => player.id === gameState.playerId);
	});
	$effect(() => {
		if (open && playerState === 'writing') {
			const currentGameRound = gameState.gameRounds.find((r) => r.round === currentRound);
			if (currentGameRound && !currentGameRound.timer_duration) {
				gameState.startRoundTimer();
			}
			audio.play();
			setTimeout(() => {
				const round = document.getElementById(`round-${currentRound}`);
				if (round) {
					round.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}
			}, 100); // Ensures DOM updates before scrolling
		}
	});

	let playerCardIds = $derived.by(() => {
		return gameState.playersCards.filter((card) => card.player_id === gameState.playerId);
	});

	let playerCards = $derived.by(() => {
		return gameState.cards.filter((card) =>
			playerCardIds.map((pc) => pc.card_id).includes(card.id)
		);
	});

	let playerAnswers = $derived.by(() => {
		return gameState.playersAnswers.filter((answer) => answer.player_id === gameState.playerId);
	});
	let currentAnswer = $state('');

	function submitAnswer() {
		if (playerState === 'writing') {
			if (currentAnswer.trim() === '') {
				gameState.submitAnswer('(Empty submission)');
				alert(
					"You didn't write anything for this round! You can edit your story at the end of the game."
				);
			} else {
				gameState.submitAnswer(currentAnswer);
			}
			open = false;
			currentAnswer = '';
		}
	}

	function onSubmit() {
		click_sound.play();
		submitAnswer();
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

	function handleTimeUp() {
		submitAnswer();
	}

	let playerState = $derived.by(() => {
		return gameState.playersState[gameState.playerId].state;
	});

	let showSpeciesDialog = $state(false);
	let showLandmarkDialog = $state(false);
	function isNonHumanCharacter(character: Character | null | undefined): boolean {
		if (!character) return false;
		const category = getCharacterCategory(character);
		return category === 'non-human';
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		interactOutsideBehavior="ignore"
		class="overflow-y-auto flex flex-col gap-y-10 max-h-[95vh] w-[95vw] md:w-[60dvw] bg-white rounded-2xl shadow-lg pb-80 md:pb-5"
		style="transform-origin: center center;"
	>
		{#each sortedRounds as round (round.index)}
			{@const card_id = playerCardIds.find((card) => card.round === round.index)?.card_id}
			{@const card = playerCards.find((card) => card.id === card_id)}
			{@const answer = playerAnswers.find((answer) => answer.round === round.index)}
			<div
				id={`round-${round.index}`}
				class="flex flex-col items-center lg:flex-row lg:items-stretch gap-8 w-full {round.index >
				(currentRound ?? -1)
					? 'opacity-30 grayscale'
					: ''}"
			>
				{#if round.index === 0}
					<div class="shrink-0">
						<CharacterCard character={player?.character ?? 'child'} />
						{#if player && isNonHumanCharacter(player.character)}
							<Button variant="outline" class="mt-2" onclick={() => (showSpeciesDialog = true)}
								>Learn more about your character</Button
							>
							<SpeciesInfoDialog
								bind:open={showSpeciesDialog}
								character={player?.character ?? 'child'}
							/>
						{/if}
					</div>
				{:else if round.index === 7}
					<div class="shrink-0">
						<div
							class="w-64 h-96 bg-white rounded-xl bg-center border-2 border-gray-400/50 relative"
							style="background-image: url('/images/cards/post-story.svg');"
						>
							<div class="absolute inset-0 pb-32 px-4 flex flex-col justify-end text-center gap-3">
								<h3 class={`text-2xl font-bold text-white`}>{m.post_story()}</h3>
								<p class="text-xs font-medium">{m.write_post_story()}</p>
							</div>
						</div>
					</div>
				{:else if card}
					<div class="shrink-0">
						<Card {card} />
						{#if card.type === 'landmark'}
							<Button variant="outline" class="mt-2" onclick={() => (showLandmarkDialog = true)}
								>Learn more about this landmark</Button
							>
							<LandmarkInfoDialog bind:open={showLandmarkDialog} {card} />
						{/if}
					</div>
				{:else}
					<div
						class="w-64 h-96 rounded-lg shrink-0 border-black border-dashed border-2 flex items-center justify-center"
					>
						<p class="text-sm text-center">{m.card_not_selected()}</p>
					</div>
				{/if}
				<div class="flex flex-col items-stretch w-full">
					<div class="flex items-center gap-2">
						{#if round.index === 0}
							<div class="w-8 h-8 rounded-full bg-[#FF6157] grid place-items-center">
								<Flag class="w-4 h-4 text-white flex items-center justify-center" />
							</div>
						{:else if round.index === 7}
							<div class="w-8 h-8 rounded-full bg-dark-green grid place-items-center">
								<div class="w-4 h-4 flex items-center justify-center">
									<PostStory color={'white'} />
								</div>
							</div>
						{:else}
							<div class="w-8 h-8 rounded-full bg-dark-green grid place-items-center">
								<span
									class="text-white font-medium text-center text-base flex items-center justify-center"
									>{round.index}</span
								>
							</div>
						{/if}
						<p class="text-xl font-bold text-dark-green">
							{getTranslation(ROUNDS[round.index].title)}
						</p>
					</div>
					<p class="font-medium py-1">
						{getTranslation(ROUNDS[round.index].description)}
					</p>
					{#if round.index === currentRound && playerState === 'writing'}
						<div class="flex-1 relative mb-4">
							<Textarea class="min-h-64 h-full mt-2" bind:value={currentAnswer} />
						</div>
						<div class=" flex items-center justify-between gap-3 bg-white">
							{#if open && playerState === 'writing'}
								<Timer {gameState} onTimeUp={handleTimeUp} />
							{/if}
							<Button onclick={onSubmit}>{m.submit()}</Button>
						</div>
					{:else}
						<Textarea class="min-h-64 flex-1 mt-2" value={answer?.answer ?? ''} disabled />
					{/if}
				</div>
			</div>
			{#if round.index !== 7}
				<div class="h-0.5 border-t-2 border-gray-200"></div>
			{/if}
		{/each}
	</Dialog.Content>
</Dialog.Root>
