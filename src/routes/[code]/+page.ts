import { supabase } from '@/supabase';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const code = params.code;

	async function getGame() {
		const { data: gameData, error: gameError } = await supabase
			.from('games')
			.select('*')
			.eq('code', code)
			.single();
		if (gameError) {
			return error(500, { message: 'Error fetching game' });
		}
		return gameData;
	}

	const game = await getGame();

	if (game.state === 'waiting' || game.state === 'ready') {
		return redirect(302, '/lobby');
	} else {
		return redirect(302, '/game');
	}
};
