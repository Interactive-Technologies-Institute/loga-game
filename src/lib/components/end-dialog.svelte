<script lang="ts">
	import { Button } from './ui/button';
	import * as Dialog from './ui/dialog';
	import { m } from '@src/paraglide/messages';
	import { localizeHref } from '@src/paraglide/runtime';
	import clickSound from '@/sounds/click.mp3';
	import { onMount } from 'svelte';
	import { GameState } from '@/state/game-state.svelte';
	import type { Player, PlayerAnswer } from '@/types';
	import { CARDS } from '../data/cards';
	import { CHARACTER } from '../data/characters';

	let audio: HTMLAudioElement;
	onMount(() => {
		audio = new Audio(clickSound);
		audio.volume = 0.5;
	});

	interface EndDialogProps {
		open: boolean;
		gameState: GameState;
	}

	let { open = $bindable(false), gameState }: EndDialogProps = $props();

	let storiesByPlayer = $derived.by(() => {
		const grouped: Record<string, { player: Player; answers: PlayerAnswer[] }> = {};

		if (!gameState) return {};

		Object.values(gameState.players).forEach((player) => {
			// Get all answers by this player
			const playerAnswers = gameState.playersAnswers.filter(
				(answer) => answer.player_id === player.id
			);

			grouped[player.id] = {
				player,
				answers: playerAnswers.sort((a, b) => a.round - b.round)
			};
		});

		return grouped;
	});

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

	function getCardText(playerId: number, round: number): string {
		if (!gameState) return '';

		const playerCard = gameState.playersCards.find(
			(card) => card.player_id === playerId && card.round === round
		);
		if (playerCard) {
			const card = CARDS.find((c) => c.id === playerCard.card_id);
			return getTranslation(card?.text);
		}
		return '';
	}
	function getCharacterName(characterType: string): string {
		// Find the character card with the matching type
		const characterCard = CHARACTER.find((char) => char.type === characterType);

		// If found, get the translated title
		if (characterCard?.title) {
			return getTranslation(characterCard.title);
		}

		// Fallback: return a formatted version of the type itself
		return characterType
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	interface ExpandedAnswersMap {
		[key: string]: boolean;
	}

	let expandedAnswers = $state<ExpandedAnswersMap>({});

	// Toggle expansion state for an answer
	function toggleAnswerExpansion(answerId: string) {
		expandedAnswers = {
			...expandedAnswers,
			[answerId]: !expandedAnswers[answerId]
		};
	}

	// Check if an answer is expanded
	function isAnswerExpanded(answerId: string): boolean {
		return !!expandedAnswers[answerId];
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="overflow-y-auto max-h-[90vh] sm:max-w-[60rem] flex flex-col">
		<div class="flex flex-col items-center justify-center gap-1 p-2">
			<p class="text-dark-green rounded-full font-medium text-lg underline">{m.game_ended()}</p>
			<p class="text-dark-green font-bold text-4xl text-center">{m.thanks_for_playing()}</p>
		</div>
		<h2 class="text-xl font-bold text-dark-green">{m.your_story()}</h2>
		<div class="overflow-y-auto border-2 border-dark-green rounded-lg">
			{#if Object.keys(storiesByPlayer).length > 0}
				<div class="space-y-8">
					{#each Object.values(storiesByPlayer) as playerData}
						<div class="border rounded-lg overflow-hidden">
							<div class="bg-gray-50 p-4 flex items-center gap-3 border-b">
								<div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
									<img
										src={`/images/characters/badges/${playerData.player.character}.svg`}
										alt={playerData.player.character}
										class="w-full h-full object-cover"
									/>
								</div>
								<div>
									<h3 class="font-bold text-2xl text-dark-green">{playerData.player.nickname}</h3>
									<p class="text-sm text-gray-500 capitalize">
										{playerData.player.character
											? getCharacterName(playerData.player.character)
											: 'Unknown Character'}
									</p>
								</div>
							</div>

							<div class="flex flex-col items-start pointer w-full">
								{#each playerData.answers as answer}
									<button
										class="p-2 w-full text-left hover:bg-gray-100"
										onclick={() => toggleAnswerExpansion(`${answer.player_id}-${answer.round}`)}
									>
										<!-- <div class="flex justify-between mb-2">
												<span class="text-sm font-semibold text-dark-green">
												{m.round()}
												{answer.round}
											</span>
										</div>
										<p class="text-sm text-gray-500 italic mb-2">
											"{getCardText(answer.player_id, answer.round)}"
										</p> -->
										<p>{answer.answer}</p>
										{#if isAnswerExpanded(`${answer.player_id}-${answer.round}`)}
											<div class="flex pt-2 border-t mt-2 text-sm text-gray-600 animate-fade-in">
												<div class="flex items-center justify-between mb-2">
													<span class="font-semibold text-dark-green">
														{m.round()}
														{answer.round}
													</span>
												</div>
												<p class="italic mb-2 p-2">
													"{getCardText(answer.player_id, answer.round)}"
												</p>
											</div>
										{/if}
									</button>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-center text-gray-500">Error</p>
			{/if}
		</div>
		<Button class="p-2" size="lg" href={localizeHref('/')} onclick={() => audio.play()}
			>{m.play_again()}</Button
		>
	</Dialog.Content>
</Dialog.Root>

<style>
	.animate-fade-in {
		animation: fadeIn 0.2s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
