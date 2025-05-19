import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';
import type { SavedStory } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const { data: story, error: err } = await supabase
		.from('saved_stories')
		.select('*')
		.eq('story_id', params.story_id)
		.single<SavedStory>();

	if (err) {
		throw error(404, 'Story not found');
	}

	return {
		story
	};
}) satisfies PageLoad;
