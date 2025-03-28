<script lang="ts">
	import { goto } from '$app/navigation';
	import * as InputCode from '$lib/components/ui/input-code';
	import { Button } from '@/components/ui/button';
	import { supabase } from '@/supabase';
	import { m } from '../paraglide/messages.js';
	import { setLocale, getLocale, localizeUrl } from '../paraglide/runtime.js';
	import type { Locale } from '../paraglide/runtime.js';

	let code = $state('');

	async function createGame() {
		const { data, error } = await supabase.rpc('create_game');
		if (error) {
			console.error(error);
		} else if (data) {
			const code = data.game_code;
			return goto(localizeUrl(`/${code}/lobby`));
		}
	}

	async function joinGame() {
		const { error } = await supabase.rpc('join_game', { game_code: code });
		if (error) {
			console.error(error);
		} else {
			return goto(localizeUrl(`/${code}/lobby`));
		}
	}

	let selectedLanguage = $state(getLocale()); // Default language

	// List of available languages
	const languages = [
		{ code: 'en', label: '🇬🇧 English' },
		{ code: 'pt', label: '🇵🇹 Português' }
	];

	// Function to change the language
	function changeLanguage(lang: Locale) {
		selectedLanguage = lang;
		setLocale(lang); // Update the locale using the Paraglide runtime
	}
</script>

<div class="h-screen flex flex-col items-center justify-center bg-white">
	<h1 class="flex items-center justify-center text-dark-green font-bold text-7xl mb-9">
		LoGaCulture
	</h1>
	<div class="flex flex-col items-stretch justify-center gap-4">
		<p class="flex items-center justify-center text-dark-green font-medium">
			{m.label_join_game()}
		</p>
		<InputCode.Root maxlength={6} bind:value={code}>
			{#snippet children({ cells })}
				<InputCode.Group>
					{#each cells as cell}
						<InputCode.Slot {cell} />
					{/each}
				</InputCode.Group>
			{/snippet}
		</InputCode.Root>
		<Button size="lg" onclick={joinGame}>{m.join_game()}</Button>
		<p class="text-dark-green text-center text-lg font-bold">{m.or()}</p>
		<Button size="lg" onclick={createGame}>{m.create_game()}</Button>

		<div class="flex items-center justify-center gap-2">
			<select
				class="p-2 border rounded"
				bind:value={selectedLanguage}
				onchange={(e) => changeLanguage((e.currentTarget as HTMLSelectElement).value as Locale)}
			>
				{#each languages as { code, label }}
					<option value={code}>{label}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
