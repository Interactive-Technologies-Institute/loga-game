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
	import { Label, Switch } from 'bits-ui';
	import { goto } from '$app/navigation';
	import { Textarea } from './ui/textarea';

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
	let currentPlayerId = $state(gameState?.playerId || -1);

	let storiesByPlayer = $derived.by(() => {
		const stories: Array<{ player: Player; answers: PlayerAnswer[]; isCurrent: boolean }> = [];

		if (!gameState) return [];
		const currentPlayer = gameState.players.find((p) => p.id === currentPlayerId);

		if (currentPlayer) {
			const playerAnswers = gameState.playersAnswers
				.filter((answer) => answer.player_id === currentPlayerId)
				.sort((a, b) => a.round - b.round);

			// Add current player as the first element
			stories.push({
				player: currentPlayer,
				answers: playerAnswers,
				isCurrent: true
			});
		}

		gameState.players.forEach((player) => {
			// Skip the current player as we already added them
			if (player.id === currentPlayerId) return;

			const playerAnswers = gameState.playersAnswers
				.filter((answer) => answer.player_id === player.id)
				.sort((a, b) => a.round - b.round);

			stories.push({
				player,
				answers: playerAnswers,
				isCurrent: false
			});
		});
		return stories;
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

	let saveStory = $state(true);
	let playerName = $state('');
	let storyTitle = $state('');
	let isFormValid = $derived(
		saveStory ? playerName.trim() !== '' && storyTitle.trim() !== '' : true
	);

	async function handleGameEnd() {
		audio.play();
		if (!saveStory) {
			console.log('Story not saved. Returning to main menu.');
			goto(localizeHref('/stories'));
		} else {
			// Logic to save the story
			const id = await gameState.saveStory(playerName, storyTitle);
			goto(localizeHref(`/stories/${id}`));
			// Reset the form
			playerName = '';
			storyTitle = '';
		}
	}

	let editMode = $state(false);
	let editingAnswerId = $state<string | null>(null);
	let editedContent = $state('');

	function startEditing(answer: PlayerAnswer) {
		if (!editMode) return;

		editingAnswerId = `${answer.player_id}-${answer.round}`;
		editedContent = answer.answer;
	}

	async function saveEdit(answer: PlayerAnswer) {
		if (!editingAnswerId || !editMode) return;

		if (answer) {
			try {
				// Call the gameState method to update the answer
				await gameState.updatePlayerAnswer(answer.id, editedContent);
			} catch (error) {
				console.error('Failed to save edit:', error);
			}
		}

		// Reset editing state
		editingAnswerId = null;
		editedContent = '';
		editMode = false;
	}

	function cancelEdit() {
		editMode = false;
		editingAnswerId = null;
		editedContent = '';
	}

	// Function to toggle edit mode
	function handleEdit(answer: PlayerAnswer) {
		audio.play();
		editMode = !editMode;
		if (editMode === false) {
			cancelEdit();
		} else {
			editMode = true;
			startEditing(answer);
		}
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		interactOutsideBehavior="ignore"
		class="overflow-y-auto max-h-[96vh] sm:max-h-[80vh] w-[calc(100vw-2rem)] lg:max-w-4xl flex flex-col"
	>
		<div class="flex flex-col items-center justify-center gap-1">
			<p class="text-dark-green rounded-full font-medium text-lg underline">{m.game_ended()}</p>
			<p class="text-dark-green font-bold text-4xl text-center">{m.thanks_for_playing()}</p>
		</div>
		<div class="flex flex-col lg:flex-row gap-4 p-4 h-full">
			<div class="overflow-y-auto flex flex-col flex-grow w-full max-w-full sm:max-w-[75ch]">
				{#if Object.keys(storiesByPlayer).length > 0}
					<div class="space-y-8">
						{#each storiesByPlayer as playerData, index}
							<div
								class="border-2 {playerData.isCurrent
									? 'border-dark-green'
									: 'border-gray-300'} rounded-lg overflow-hidden"
							>
								<h2 class="text-xl font-bold text-dark-green p-2">
									{playerData.isCurrent ? m.your_story() : m.others_stories()}
								</h2>
								<div class="bg-gray-50 p-4 flex items-center gap-3 border-b">
									<div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
										<img
											src={`/images/characters/badges/${playerData.player.character}.svg`}
											alt={playerData.player.character}
											class="w-full h-full object-cover"
										/>
									</div>
									<div>
										<h3 class="font-bold text-2xl text-dark-green">
											{playerData.player.nickname}
										</h3>
										<p class="text-sm text-gray-500 capitalize">
											{playerData.player.character
												? getCharacterName(playerData.player.character)
												: 'Unknown Character'}
										</p>
									</div>
								</div>

								<div class="flex flex-col items-start pointer w-full">
									{#each playerData.answers as answer}
										{#if playerData.isCurrent && editingAnswerId === `${answer.player_id}-${answer.round}`}
											<div class="w-full p-3 bg-gray-50 border-1 border-gray-300">
												<div class="flex gap-4 mb-2">
													{#if answer.round === 0}
														<div
															class="flex gap-1 items-start text-sm font-semibold text-dark-green"
														>
															<span>{m.intro()}</span>
														</div>
													{:else if answer.round === 7}
														<div
															class="flex gap-1 items-start text-sm font-semibold text-dark-green"
														>
															<span>{m.post_story()}</span>
														</div>
													{:else}
														<div
															class="flex gap-1 items-start text-sm font-semibold text-dark-green"
														>
															<span>{m.round()}</span>
															<span>{answer.round}</span>
														</div>
														<p class="text-sm text-gray-500 italic break-words whitespace-pre-wrap">
															"{getCardText(answer.player_id, answer.round)}"
														</p>
													{/if}
												</div>

												<Textarea
													bind:value={editedContent}
													class="w-full min-h-32 p-3 border-2 border-dark-green rounded-md focus:ring-dark-green focus:outline-none"
													placeholder="Edit your answer..."
												></Textarea>

												<div class="flex justify-end gap-2 mt-2">
													<Button variant="outline" size="default" onclick={cancelEdit}
														>{m.cancel()}</Button
													>
													<Button
														variant="default"
														size="default"
														onclick={() => saveEdit(answer)}
														data-answer-id={`${answer.player_id}-${answer.round}`}
													>
														{m.save()}
													</Button>
												</div>
											</div>
										{:else}
											<div class="w-full p-4 hover:bg-gray-100">
												<div class="flex justify-between gap-4">
													<button
														class="w-full text-left"
														onclick={() =>
															toggleAnswerExpansion(`${answer.player_id}-${answer.round}`)}
													>
														{#if isAnswerExpanded(`${answer.player_id}-${answer.round}`)}
															<div class="flex gap-4 mb-2 animate-fade-in">
																{#if answer.round === 0}
																	<div
																		class="flex gap-1 items-start text-sm font-semibold text-dark-green"
																	>
																		<span>{m.intro()}</span>
																	</div>
																{:else if answer.round === 7}
																	<div
																		class="flex gap-1 items-start text-sm font-semibold text-dark-green"
																	>
																		<span>{m.post_story()}</span>
																	</div>
																{:else}
																	<div
																		class="flex gap-1 items-start text-sm font-semibold text-dark-green"
																	>
																		<span>{m.round()}</span>
																		<span>{answer.round}</span>
																	</div>
																	<p
																		class="text-sm text-gray-500 italic break-words whitespace-pre-wrap"
																	>
																		"{getCardText(answer.player_id, answer.round)}"
																	</p>
																{/if}
															</div>
														{/if}
														<p class="px-4 text-left w-full break-words whitespace-pre-wrap">
															{answer.answer}
														</p>
													</button>
													{#if playerData.isCurrent && editMode === false}
														<div class="align-self-end">
															<Button
																variant={editMode ? 'default' : 'outline'}
																size="default"
																class=""
																onclick={() => handleEdit(answer)}
															>
																{m.edit()}
															</Button>
														</div>
													{/if}
												</div>
											</div>
										{/if}
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-center text-gray-500">Error</p>
				{/if}
			</div>
			<div class="flex flex-col shrink-1 gap-4 min-h-full">
				<div class="flex flex-col gap-4">
					<p>{m.do_you_want_to_save()}</p>
					<div class="flex items-center gap-2">
						<Label.Root for="dnd" class="text-base font-medium">{m.save_story()}</Label.Root>
						<Switch.Root
							id="save-story"
							bind:checked={saveStory}
							name="save-story"
							class="focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-dark-green data-[state=unchecked]:bg-gray-300 data-[state=unchecked]:shadow-mini-inset focus-visible:outline-hidden peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<Switch.Thumb
								class="bg-white data-[state=unchecked]:shadow-mini pointer-events-none block size-[30px] shrink-0 rounded-full transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0"
							/>
						</Switch.Root>
					</div>
				</div>
				{#if saveStory}
					<div class="flex flex-col gap-4">
						<span class="flex w-fit text-sm text-gray-500">
							{m.save_form()}
						</span>
						<form class="flex flex-col min-h-full gap-4">
							<div>
								<label for="name" class="text-sm font-medium text-gray-700">{m.player_name()}</label
								>
								<input
									required
									bind:value={playerName}
									type="text"
									id="name"
									class="mt-1 w-full border-gray-300 border-2 p-2 rounded-md focus:ring-dark-green focus:border-dark-green focus:outline-none"
									placeholder={m.player_name_placeholder()}
								/>
							</div>
							<div>
								<label for="title" class="text-sm font-medium text-gray-700"
									>{m.story_title()}</label
								>
								<input
									required
									bind:value={storyTitle}
									type="text"
									id="title"
									class="mt-1 p-2 w-full border-gray-300 rounded-md border-2 focus:ring-dark-green focus:border-dark-green focus:outline-none"
									placeholder={m.story_title_placeholder()}
								/>
							</div>
						</form>
					</div>
				{:else}
					<p class="text-sm text-red-500">{m.your_story_wont_saved()}</p>
				{/if}
				<Button
					class="p-2 flex"
					size="lg"
					onclick={handleGameEnd}
					disabled={saveStory && !isFormValid}
				>
					{saveStory ? m.save_story() : m.return_to_menu()}
				</Button>
			</div>
		</div>
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
