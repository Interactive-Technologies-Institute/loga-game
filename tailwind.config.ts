import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				white: '#ffffff',
				text: '#231f20',
				'light-green': '#8ca33a',
				'dark-green': '#27613F',
				'nature-green': '#6a773b',
				'sense-red': '#b5692a',
				'action-beige': '#dec2a4',
				'history-yellow': '#e2b138',
				'landmark-green': '#173c2e'
			},
			fontFamily: {
				sans: ['Barlow', 'sans-serif'],
				serif: ['RobotoSlabVariable', 'serif']
			},
			animation: {
				'caret-blink': 'caret-blink 1.25s ease-out infinite',
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			keyframes: {
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				},
				pulse: {
					'0%, 100%': { opacity: '1', r: '4' },
					'50%': { opacity: '0.5', r: '12' }
				}
			}
		}
	},

	plugins: []
} as Config;
