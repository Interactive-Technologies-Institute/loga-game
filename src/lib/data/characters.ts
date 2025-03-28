import type { CharacterCard } from '@/types';

export const CHARACTER: CharacterCard[] = [
    {
        type: 'child',
        title: 'character_child_title',
        description: 'character_child_description',
        secondary: 'character_child_secondary'
    },
    { 
        type: 'different-needs', 
        title: 'character_different-needs_title',
        description: 'character_different-needs_description',
        secondary: 'character_different-needs_secondary'
    },
    { 
        type: 'local-specialist', 
        title: 'character_local-specialist_title', 
        description: 'character_local-specialist_description', 
        secondary: 'character_local-specialist_secondary' 
    },
    { 
        type: 'nature-lover', 
        title: 'character_nature-lover_title', 
        description: 'character_nature-lover_description', 
        secondary: 'character_nature-lover_secondary' 
    },
    { 
        type: 'non-human-being', 
        title: 'character_non-human-being_title', 
        description: 'character_non-human-being_description', 
        secondary: 'character_non-human-being_secondary' 
    },
    { 
        type: 'scientist', 
        title: 'character_scientist_title', 
        description: 'character_scientist_description', 
        secondary: 'character_scientist_secondary' 
    },
    { 
        type: 'time-traveller', 
        title: 'character_time-traveller_title', 
        description: 'character_time-traveller_description', 
        secondary: 'character_time-traveller_secondary' 
    },
    { 
        type: 'custom', 
        title: 'character_custom_title', 
        description: 'character_custom_description', 
        secondary: 'character_custom_secondary' 
    }
];