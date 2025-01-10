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

		this.subscribeGame();
		this.subscribeGameRounds();
		this.subscribePlayers();
		this.subscribePlayerMoves();
		this.subscribePlayerCards();
		this.subscribePlayerAnswers();
	}

	async subscribeGame() {
		supabase
			.channel('game')
			.on<Game>(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'games'
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
					table: 'game_rounds'
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
					table: 'players'
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
					table: 'player_moves'
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
					table: 'player_cards'
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
					event: 'INSERT',
					schema: 'public',
					table: 'player_answers'
				},
				(payload) => {
					this.playersAnswers.push(payload.new as PlayerAnswer);
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
}
