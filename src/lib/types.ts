import type { Database } from './supabase-types.gen';

export type Game = Database['public']['Tables']['games']['Row'];

export type GameId = Game['id'];

export type GameLobbyStateEnum = 'waiting' | 'ready';

export type GameStateEnum = 'starting' | 'playing' | 'finished';

export type StopId = Database['public']['Tables']['stops']['Row']['id'];

export type StopType = Database['public']['Enums']['stop_type'];

export type Stop = Database['public']['Tables']['stops']['Row'];

export type CardId = Database['public']['Tables']['cards']['Row']['id'];

export type Card = Database['public']['Tables']['cards']['Row'];

export type Round = Database['public']['Tables']['rounds']['Row'];

export type Character = Database['public']['Enums']['character_type'];

export const CHARACTER_OPTIONS: Character[] = [
	'child',
	'different-needs',
	'local-specialist',
	'nature-lover',
	'non-human-being',
	'scientist',
	'time-traveller',
	'custom'
];

export type PlayerId = Database['public']['Tables']['players']['Row']['id'];

export type Player = Database['public']['Tables']['players']['Row'];

export type GameRound = Database['public']['Tables']['game_rounds']['Row'];

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
