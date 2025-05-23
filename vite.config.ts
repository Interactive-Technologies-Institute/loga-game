import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		paraglideVitePlugin({ 
			project: './project.inlang', 
			outdir: './src/paraglide', 
			strategy: ['url', 'cookie', 'baseLocale'],
			disableAsyncLocalStorage: true }),

		sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
