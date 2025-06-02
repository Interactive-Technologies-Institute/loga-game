import { goto } from '$app/navigation';
import { supabase } from '@/supabase';
import type { Character, Game, GameLobbyStateEnum, Player, PlayerId } from '../types';
import { localizeUrl } from '@src/paraglide/runtime.js';

export class GameLobbyState {
	code: string = $state('');
	state: GameLobbyStateEnum = $state('waiting');
	players: Player[] = $state([]);
	playerId: PlayerId = $state(0);

	private getGameId(): number {
    // Find a player's game_id (they all share the same game_id)
    const gameId = this.players?.[0]?.game_id;
    if (!gameId) {
        console.error('Could not find game ID for filtering subscriptions');
        return -1; // Return a value that won't match any real game ID
    }
    return gameId;
}

	constructor(game: Game, players: Player[], playerId: PlayerId) {
		this.code = game.code;
		this.state = game.state as GameLobbyStateEnum;
		this.playerId = playerId;
		this.players = players;

		this.subscribeGame();
		this.subscribePlayers();
	}

	async subscribeGame() {
		supabase
			.channel('game')
			.on<Game>(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'games',
                	filter: `code=eq.${this.code}`
				},
				(payload) => {
					const game = payload.new as Game;
					const state = game.state;
					if (state === 'starting' || state === 'playing' || state === 'finished') {
						supabase.channel('game').unsubscribe();
						goto(localizeUrl(`/${this.code}/game`));
						return;
					}
					this.state = game.state as GameLobbyStateEnum;
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
					event: '*',
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

	async updatePlayerCharacter(character: Character) {
		const player = this.players.find((player) => player.id === this.playerId);
		if (!player) {
			return;
		}
		player.character = character;
		const { error } = await supabase.rpc('update_player_character', {
			game_code: this.code,
			player_character: character
		});
		if (error) {
			console.error(error);
		}
	}

	async updatePlayerNicknameDescription(nickname: string, description: string) {
		const player = this.players.find((player) => player.id === this.playerId);
		if (!player) {
			return;
		}
		player.nickname = nickname;
		player.description = description;
		const { error } = await supabase.rpc('update_player_nickname_description', {
			game_code: this.code,
			player_nickname: nickname,
			player_description: description
		});
		if (error) {
			console.error(error);
		}
	}

	async startGame() {
		const { error } = await supabase.rpc('start_game', { game_code: this.code });
		if (error) {
			console.error(error);
		}
	}
}
