import type { Database } from './supabase-types.gen';

export type Game = Database['public']['Tables']['games']['Row'];

export type GameId = Game['id'];

export type GameLobbyStateEnum = 'waiting' | 'ready';

export type GameStateEnum = 'starting' | 'playing' | 'finished';

export type StopId = Database['public']['Tables']['stops']['Row']['id'];

export type StopType = Database['public']['Enums']['stop_type'];

export type Stop = Database['public']['Tables']['stops']['Row'];

export type CardId = Database['public']['Tables']['cards']['Row']['id'];

export type CardType = Database['public']['Enums']['stop_type'];

export type CharacterCategory = 'human' | 'non-human';

export type Card = {
	id: number;
	type: CardType;
	title: string | null;
	text: string;
	hero_steps: number[];
	character_category: CharacterCategory;
};

export type CardPrompt = {
	id: number;
	card_id: number;
	lang: 'en' | 'pt';
	text: string;
};

export type Round = Database['public']['Tables']['rounds']['Row'];

export type Character = Database['public']['Enums']['character_type'];

export const CHARACTER_CATEGORIES: Record<CharacterCategory, Character[]> = {
	human: [
		'child',
		'different-needs',
		'local-specialist',
		'nature-lover',
		'scientist',
		'time-traveller'
	],
	'non-human': [
		'trocaz-pigeon',
		'monk-seal',
		'vulcanic-rock',
		'iberian-green-frog',
		'zinos-petrel',
		'water'
	]
};

export const CHARACTER_OPTIONS: Character[] = [
	...CHARACTER_CATEGORIES['human'],
	...CHARACTER_CATEGORIES['non-human']
];

export function getCharacterCategory(character: Character): CharacterCategory {
	if (CHARACTER_CATEGORIES.human.includes(character)) {
		return 'human';
	}
	return 'non-human';
}

export type CharacterCard = {
	type: Character;
	title: string;
	description: string;
	secondary?: string;
};

export type PlayerId = Database['public']['Tables']['players']['Row']['id'];

export type Player = Database['public']['Tables']['players']['Row'];

export type GameRound = Database['public']['Tables']['game_rounds']['Row'] & {
	timer_duration?: number;
};

export type PlayerMove = Database['public']['Tables']['player_moves']['Row'];

export type PlayerCard = Database['public']['Tables']['player_cards']['Row'];

export type PlayerAnswer = Database['public']['Tables']['player_answers']['Row'];

export type PlayerState =
	| {
			state: 'starting';
			stop_id: undefined;
	  }
	| {
			state: 'moving';
			stop_id: StopId;
	  }
	| {
			state: 'writing';
			stop_id: StopId;
	  }
	| {
			state: 'done';
			stop_id: StopId;
	  };

export type StoryCharacter = {
	type: Character;
	nickname: string;
	description: string;
};

export type StoryRound = {
	round: number;
	card_id: number | null;
	type: CardType | null;
	answer: string | null;
};

export type SavedStory = {
	id: number;
	story_id: string;
	created_at: string;
	player_name: string;
	story_title: string;
	character: StoryCharacter;
	rounds: Record<string, StoryRound>;
	card_types: string[];
	full_story: string;
};
