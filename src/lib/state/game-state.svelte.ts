import { goto } from '$app/navigation';
import { supabase } from '@/supabase';
import type {
	Card,
	Game,
	GameRound,
	GameStateEnum,
	Player,
	PlayerAnswer,
	PlayerCard,
	PlayerId,
	PlayerMove,
	PlayerState,
	Round,
	Stop,
	StopId
} from '../types';

export class GameState {
	stops: Stop[];
	cards: Card[];
	rounds: Round[];
	code: string = $state('');
	state: GameStateEnum = $state('starting');
	gameRounds: GameRound[] = $state([]);
	currentRound: number = $derived.by(() => {
		return this.gameRounds.length > 0 ? this.gameRounds[this.gameRounds.length - 1].round : 0;
	});
	playerId: PlayerId = $state(0);
	players: Player[] = $state([]);
	playersMoves: PlayerMove[] = $state([]);
	playersCards: PlayerCard[] = $state([]);
	playersAnswers: PlayerAnswer[] = $state([]);
	playersState: Record<PlayerId, PlayerState> = $derived.by(() => {
		return this.players.reduce<Record<PlayerId, PlayerState>>((acc, player) => {
			acc[player.id] = this.buildPlayerState(player.id);
			return acc;
		}, {});
	});

    roundTimerDuration: number = $state(0);

	private getGameId(): number {
    // Find a player's game_id (they all share the same game_id)
    const gameId = this.players?.[0]?.game_id;
    if (!gameId) {
        console.error('Could not find game ID for filtering subscriptions');
        return -1; // Return a value that won't match any real game ID
    }
    return gameId;
}

	constructor(
		stops: Stop[],
		cards: Card[],
		rounds: Round[],
		game: Game,
		gameRounds: GameRound[],
		playerId: PlayerId,
		players: Player[],
		playerMoves: PlayerMove[],
		playerCards: PlayerCard[],
		playerAnswers: PlayerAnswer[]
	) {
		this.stops = stops;
		this.cards = cards;
		this.rounds = rounds;
		this.code = game.code;
		this.state = game.state as GameStateEnum;
		this.gameRounds = gameRounds;
		this.playerId = playerId;
		this.players = players;
		this.playersMoves = playerMoves;
		this.playersCards = playerCards;
		this.playersAnswers = playerAnswers;

		this.initializeTimerState();


		this.subscribeGame();
		this.subscribeGameRounds();
		this.subscribePlayers();
		this.subscribePlayerMoves();
		this.subscribePlayerCards();
		this.subscribePlayerAnswers();
		this.subscribeGameRounds();
		this.subscribeRoundTimer();
	}

	// Add this method to initialize timer state
	private initializeTimerState() {
		// Find the current round
		const currentRound = this.gameRounds.find(r => r.round === this.currentRound);
		
		// If the current round has timer data, initialize the timer state
		if (currentRound && currentRound.timer_duration) {
			this.roundTimerDuration = currentRound.timer_duration;
		} else {
			this.roundTimerDuration = 0;
		}
	}

	async subscribeGame() {
		supabase
			.channel('game')
			.on<Game>(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'games',
					filter: `code=eq.${this.code}`
				},
				(payload) => {
					const game = payload.new as Game;
					const state = game.state;
					if (state === 'waiting' || state === 'ready') {
						supabase.channel('game').unsubscribe();
						goto(`/${this.code}/lobby`);
						return;
					}
					this.state = game.state as GameStateEnum;
				}
			)
			.subscribe();
	}

	async subscribeGameRounds() {
		supabase
			.channel('game_rounds')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'game_rounds',
                	filter: `game_id=eq.${this.getGameId()}`
				},
				(payload) => {
					const gameRound = payload.new as GameRound;
					this.gameRounds.push(gameRound);
				}
			)
			.subscribe();
	}

	async subscribePlayers() {
		supabase
			.channel('players')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'players',
                	filter: `game_id=eq.${this.getGameId()}`
				},
				(payload) => {
					const player = payload.new as Player;
					if (this.players.find((p) => p.id === player.id)) {
						this.players = this.players.map((p) => (p.id === player.id ? player : p));
					} else {
						this.players.push(player);
					}
				}
			)
			.subscribe();
	}

	async subscribePlayerMoves() {
		supabase
			.channel('player_moves')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'player_moves',
                	filter: `game_id=eq.${this.getGameId()}`
				},
				(payload) => {
					this.playersMoves.push(payload.new as PlayerMove);
				}
			)
			.subscribe();
	}

	async subscribePlayerCards() {
		supabase
			.channel('player_cards')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'player_cards',
                	filter: `game_id=eq.${this.getGameId()}`
				},
				(payload) => {
					this.playersCards.push(payload.new as PlayerCard);
				}
			)
			.subscribe();
	}

	async subscribePlayerAnswers() {
		supabase
			.channel('player_answers')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'player_answers',
                	filter: `game_id=eq.${this.getGameId()}`
				},
				(payload) => {
					// Check if this is an INSERT event
					if (payload.eventType === 'INSERT') {
						this.playersAnswers.push(payload.new as PlayerAnswer);
					} 
					// Check if this is an UPDATE event
					else if (payload.eventType === 'UPDATE') {
						// Update the existing answer instead of adding a new one
						const updatedAnswer = payload.new as PlayerAnswer;
						this.playersAnswers = this.playersAnswers.map(answer => 
							answer.id === updatedAnswer.id ? updatedAnswer : answer
						);
					}
				}
			)
			.subscribe();
	}

	buildPlayerState(playerId: PlayerId): PlayerState {
		const moves = this.playersMoves.filter((move) => move.player_id === playerId);
		const cards = this.playersCards.filter((card) => card.player_id === playerId);
		const answers = this.playersAnswers.filter((answer) => answer.player_id === playerId);

		const previousMove = moves.find((move) => move.round === this.currentRound - 1);
		const currentMove = moves.find((move) => move.round === this.currentRound);
		const currentCard = cards.find((card) => card.round === this.currentRound);
		const currentAnswer = answers.find((answer) => answer.round === this.currentRound);

		const stopId = currentMove?.stop_id ?? previousMove?.stop_id;

		// Round 0 - Introduction
		if (this.currentRound === 0) {
			if (!stopId) {
				return { state: 'starting', stop_id: undefined };
			}
			return !currentAnswer
				? { state: 'writing', stop_id: stopId }
				: { state: 'done', stop_id: stopId };
		}

		// Round 7 - Reflection
		if (this.currentRound === 7) {
			const lastStopId = moves.find((move) => move.round === 6)?.stop_id || 1;
			return !currentAnswer
				? { state: 'writing', stop_id: lastStopId }
				: { state: 'done', stop_id: lastStopId };
		}

		// Normal rounds (1-6)
		if (!stopId) {
			return { state: 'starting', stop_id: undefined };
		} else if (!currentMove && !currentCard && !currentAnswer) {
			return { state: 'moving', stop_id: stopId };
		} else if (currentMove && currentCard && !currentAnswer) {
			return { state: 'writing', stop_id: stopId };
		} else {
			return { state: 'done', stop_id: stopId };
		}
	}

	async playerStart(stopId: StopId) {
		const { error } = await supabase.rpc('player_start', {
			game_code: this.code,
			stop_id: stopId
		});
		if (error) {
			console.error(error);
		}
	}

	async playerMove(stopId: StopId) {
		const { error } = await supabase.rpc('player_move', {
			game_code: this.code,
			game_round: this.currentRound,
			stop_id: stopId
		});
		if (error) {
			console.error(error);
		}
	}

	async submitAnswer(answer: string) {
		const { error } = await supabase.rpc('player_answer', {
			game_code: this.code,
			game_round: this.currentRound,
			answer
		});
		if (error) {
			console.error(error);
		}
	}

	async saveStory(name: string, title: string) {
		const character = this.players.find((player) => player.id === this.playerId);
		if (!character) return;

		// Build rounds data with card types and answers
		const roundsData = Array.from({ length: 8 }, (_, i) => {
			const card = this.playersCards.find((pc) => pc.player_id === this.playerId && pc.round === i);
			const cardDetails = card ? this.cards.find((c) => c.id === card.card_id) : null;
			const answer = this.playersAnswers.find(
				(pa) => pa.player_id === this.playerId && pa.round === i
			);

			return {
				round: i,
				card_id: card?.card_id || null,
				type: cardDetails?.type || null,
				answer: answer?.answer || '',
				public_story: true
			};
		}).reduce<Record<number, { card_id: number | null; type: string | null; answer: string }>>(
			(acc, round, index) => {
				acc[index] = round;
				return acc;
			},
			{}
		);

		// Get unique card types
		const cardTypes = Array.from(
			new Set(
				Object.values(roundsData)
					.map((round) => round.type)
					.filter((type): type is string => type !== null)
			)
		);

		// Combine all answers into full story
		const fullStory = Object.values(roundsData)
			.map((round) => round.answer)
			.filter((answer) => answer.trim().length > 0)
			.join('\n\n');

		const { data, error } = await supabase.rpc('save_story', {
			p_player_name: name,
			p_story_title: title,
			p_character: {
				type: character.character,
				nickname: character.nickname,
				description: character.description
			},
			p_rounds: roundsData,
			p_card_types: cardTypes,
			p_full_story: fullStory
		});

		if (error) {
			console.error('Error saving story:', error);
			return false;
		}

		return data;
	}
	getInitialStops(): StopId[] {
		return this.stops.filter((stop) => stop.initial).map((stop) => stop.id);
	}

	getPossibleStops(stopId: StopId, moves: number): StopId[] {
		const stop = this.stops.find((stop) => stop.id === stopId);
		if (!stop) return [];

		const reachableStops = new Set<StopId>();
		const queue: [StopId, number, Set<StopId>][] = [[stop.id, moves, new Set([stop.id])]];

		while (queue.length > 0) {
			const [currentStopId, remainingMoves, visited] = queue.shift()!;
			const currentStop = this.stops.find((s) => s.id === currentStopId);

			if (!currentStop) continue;

			if (remainingMoves === 0 && currentStopId !== stop.id) {
				reachableStops.add(currentStopId);
			}

			if (remainingMoves > 0) {
				for (const path of currentStop.paths) {
					if (!visited.has(path)) {
						const newVisited = new Set(visited);
						newVisited.add(path);
						queue.push([path, remainingMoves - 1, newVisited]);
					}
				}
			}
		}

		return Array.from(reachableStops);
	}

	async startRoundTimer() {
		// Generate random timer between 2-4 minutes
		const durationMinutes = Math.floor(Math.random() * 3) + 2;
		const durationSeconds = durationMinutes * 60;
		
		const currentGameRound = this.gameRounds.find(r => r.round === this.currentRound);
		if (!currentGameRound) {
			console.error('Cannot find current game round to start timer');
			return false;
		}
		
		this.roundTimerDuration = durationSeconds;
		
		const { error } = await supabase
			.from('game_rounds')
			.update({timer_duration: durationSeconds })
			.eq('id', currentGameRound.id);
			
		if (error) {
			console.error('Failed to save timer duration:', error);
			return false;
		}
		
		return true;
	}

	async subscribeRoundTimer() {
    supabase
        .channel('round_timers')
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'game_rounds',
                filter: `game_id=eq.${this.getGameId()}`
            },
            (payload) => {
                const updatedRound = payload.new as GameRound;
                
                // Only update timer state if this is for the current round
                if (updatedRound.round === this.currentRound) {
                    if (updatedRound.timer_duration) {
                        this.roundTimerDuration = updatedRound.timer_duration;
                    }
                }
                
                // Update the game rounds array
                this.gameRounds = this.gameRounds.map(round => 
                    round.id === updatedRound.id ? { ...round, ...updatedRound } : round
                );
            }
        )
        .subscribe();
	}

	async updatePlayerAnswer(answerId: number, newText: string) {
		try {
			const { error } = await supabase
				.from('player_answers')
				.update({ answer: newText })
				.eq('id', answerId);
				
			if (error) throw error;
			
			// Update local state
			this.playersAnswers = this.playersAnswers.map(answer => 
				answer.id === answerId ? { ...answer, answer: newText } : answer
			);
			
			return true;
		} catch (error) {
			console.error('Error updating answer:', error);
			return false;
		}
	}
}
