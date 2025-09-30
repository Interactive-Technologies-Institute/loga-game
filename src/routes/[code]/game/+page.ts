import { goto } from '$app/navigation';
import { getLocale } from '@src/paraglide/runtime.js';
import { supabase } from '@/supabase';
import type {
	Card,
	Game,
	GameId,
	GameRound,
	Player,
	PlayerAnswer,
	PlayerCard,
	PlayerMove,
	Round,
	Stop
} from '@/types';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
	const { userId } = await parent();
	const code = params.code;

	async function getGame(): Promise<Game> {
		const { data: gameData, error: gameError } = await supabase
			.from('games')
			.select('*')
			.eq('code', code)
			.single();

		if (gameError) {
			return error(404, { message: 'Game not found' });
		}

		return gameData;
	}

	async function getPlayers(gameId: GameId): Promise<Player[]> {
		const { data: playersData, error: playersError } = await supabase
			.from('players')
			.select('*')
			.eq('game_id', gameId);

		if (playersError) {
			return error(500, { message: 'Error fetching players' });
		}

		return playersData;
	}

	async function getRounds(): Promise<Round[]> {
		const { data: roundsData, error: roundsError } = await supabase.from('rounds').select('*');

		if (roundsError) {
			return error(500, { message: 'Error fetching rounds' });
		}

		return roundsData;
	}

	async function getStops(): Promise<Stop[]> {
		const { data: stopsData, error: stopsError } = await supabase.from('stops').select('*');

		if (stopsError) {
			return error(500, { message: 'Error fetching stops' });
		}

		return stopsData;
	}

	async function getCards(): Promise<Card[]> {
		const { data: cardsData, error: cardsError } = await supabase
			.from('cards')
			.select('id, type, title, hero_steps, character_category, prompt_text(text)')
			.eq('prompt_text.lang', getLocale());

		if (cardsError) {
			return error(500, { message: 'Error fetching cards' });
		}

		const cards = cardsData.map((card) => ({
			...card,
			text: card.prompt_text[0].text ?? ''
		}));

		return cards;
	}

	async function getGameRounds(gameId: GameId): Promise<GameRound[]> {
		const { data: gameRoundsData, error: gameRoundsError } = await supabase
			.from('game_rounds')
			.select('*')
			.eq('game_id', gameId);

		if (gameRoundsError) {
			return error(500, { message: 'Error fetching game rounds' });
		}

		return gameRoundsData;
	}

	async function getPlayerMoves(gameId: GameId): Promise<PlayerMove[]> {
		const { data: playerMovesData, error: playerMovesError } = await supabase
			.from('player_moves')
			.select('*')
			.eq('game_id', gameId);

		if (playerMovesError) {
			console.error(playerMovesError);
			return error(500, { message: 'Error fetching player moves' });
		}

		return playerMovesData;
	}

	async function getPlayerCards(gameId: GameId): Promise<PlayerCard[]> {
		const { data: playerCardsData, error: playerCardsError } = await supabase
			.from('player_cards')
			.select('*')
			.eq('game_id', gameId);

		if (playerCardsError) {
			return error(500, { message: 'Error fetching player cards' });
		}

		return playerCardsData;
	}

	async function getPlayerAnswers(gameId: GameId): Promise<PlayerAnswer[]> {
		const { data: playerAnswersData, error: playerAnswersError } = await supabase
			.from('player_answers')
			.select('*')
			.eq('game_id', gameId);

		if (playerAnswersError) {
			return error(500, { message: 'Error fetching player answers' });
		}

		return playerAnswersData;
	}

	const game = await getGame();

	if (game.state !== 'starting' && game.state !== 'playing' && game.state !== 'finished') {
		return redirect(302, `/${code}/lobby`);
	}

	const players = await getPlayers(game.id);

	const player = players.find((player) => player.user_id === userId);

	if (!player) {
		return error(403, { message: 'You are not a player in this game' });
	}

	const rounds = await getRounds();
	const stops = await getStops();
	const cards = await getCards();

	const gameRounds = await getGameRounds(game.id);
	const playerMoves = await getPlayerMoves(game.id);
	const playerCards = await getPlayerCards(game.id);
	const playerAnswers = await getPlayerAnswers(game.id);

	// Check if player was inactive and if they can rejoin
	if (player.is_active === false) {
		const currentRound = gameRounds.length > 0 ? gameRounds[gameRounds.length - 1].round : 0;
		const playerLastRound = Math.max(
			...playerMoves.filter((m) => m.player_id === player.id).map((m) => m.round),
			...playerAnswers.filter((a) => a.player_id === player.id).map((a) => a.round),
			0
		);

		// Don't allow rejoin if too far behind
		if (currentRound - playerLastRound > 1) {
			goto('/');
			return error(403, {
				message: 'You cannot rejoin this game as it has progressed too far.'
			});
		}

		// Reactivate the player
		await supabase.rpc('update_player_activity', { game_code: code });
		await supabase.from('players').update({ is_active: true }).eq('id', player.id);

		player.is_active = true;
	}

	return {
		stops,
		cards,
		rounds,
		game,
		players,
		playerId: player.id,
		gameRounds,
		playerMoves,
		playerCards,
		playerAnswers
	};
};
