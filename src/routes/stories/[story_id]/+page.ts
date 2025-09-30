import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';
import type { SavedStory } from '$lib/types';
import { error } from '@sveltejs/kit';
import { getLocale } from '@src/paraglide/runtime.js';

export const load = (async ({ params }) => {
	const { data: story, error: err } = await supabase
		.from('saved_stories')
		.select('*')
		.eq('story_id', params.story_id)
		.single<SavedStory>();

	if (err) {
		throw error(404, 'Story not found');
	}

	// Extract card_ids from rounds
	const rounds = story.rounds;
	const cardIds = Object.values(rounds)
		.map((r: any) => r.card_id)
		.filter((id: number | null) => typeof id === 'number' && id !== null);

	const currentLang = getLocale();

	let cards = [];
	if (cardIds.length > 0) {
		const { data: cardData, error: cardError } = await supabase
			.from('cards')
			.select(
				`
                id,
                type,
                title,
                prompt_text(text)
            `
			)
			.in('id', cardIds)
			.eq('prompt_text.lang', currentLang);

		if (cardError) {
			throw error(500, 'Could not load card info');
		}
		// Flatten text from prompt_text
		cards = cardData.map((card) => ({
			...card,
			text: card.prompt_text?.[0]?.text ?? ''
		}));
	}

	return {
		story,
		cards
	};
}) satisfies PageLoad;
