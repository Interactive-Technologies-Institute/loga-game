import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';
import type { SavedStory } from '$lib/types';

const ITEMS_PER_PAGE = 5;

export const load = (async ({ url }) => {
	console.log('Loading stories...');
	// Get all query parameters with explicit null checks
	const page = url.searchParams.has('page') ? parseInt(url.searchParams.get('page')!) : 1;
	const search = url.searchParams.get('search') ?? '';
	const character = url.searchParams.get('character') ?? '';
	const cardTypes = url.searchParams.has('cardType') ? url.searchParams.getAll('cardType') : [];
	const sort = url.searchParams.get('sort') ?? 'latest';

	// Start building the query
	let query = supabase.from('saved_stories').select('*', { count: 'exact' });

	if (search.trim()) {
		const searchTerms = search
			.trim()
			.split(/\s+/)
			.filter((term) => term.length > 0);

		// Build search conditions using FTS for character_search and ILIKE for other fields
		const searchConditions = [
			...searchTerms.map((term) => `player_name.ilike.%${term}%`),
			...searchTerms.map((term) => `story_title.ilike.%${term}%`),
			...searchTerms.map((term) => `character_search.fts.${term}`),
			...searchTerms.map((term) => `full_story.ilike.%${term}%`)
		].join(',');

		query = query.or(searchConditions);
	}

	if (character.trim()) {
		query = query.eq('character->>type', character);
	}

	if (cardTypes.length > 0) {
		const cardTypeConditions = cardTypes.map((type) => `card_types.cs.{${type}}`).join(',');
		query = query.or(cardTypeConditions);
	}

	// Calculate pagination
	const from = (page - 1) * ITEMS_PER_PAGE;
	const to = from + ITEMS_PER_PAGE - 1;

	// Get paginated results
	const {
		data: stories,
		error,
		count
	} = await query.order('created_at', { ascending: sort === 'oldest' }).range(from, to);

	if (error) {
		console.error('Error loading stories:', error);
		return {
			stories: [],
			totalPages: 0,
			currentPage: 1,
			totalStories: 0,
			filters: {
				search,
				character,
				cardTypes,
				sort
			}
		};
	}

	return {
		stories: stories as SavedStory[],
		totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
		currentPage: page,
		totalStories: count || 0,
		filters: {
			search,
			character,
			cardTypes,
			sort
		}
	};
}) satisfies PageLoad;
