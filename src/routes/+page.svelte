<script lang="ts">
	import { goto } from '$app/navigation';
	import * as InputCode from '$lib/components/ui/input-code';
	import { Button } from '@/components/ui/button';
	import { supabase } from '@/supabase';
	import { m } from '../paraglide/messages.js';
	import { setLocale, getLocale, localizeUrl } from '../paraglide/runtime.js';
	import type { Locale } from '../paraglide/runtime.js';
	import clickSound from '@/sounds/click.mp3';
	import typeSound from '@/sounds/typing-sound.mp3';
	import { onMount } from 'svelte';

	let type_sound: HTMLAudioElement;
	let click_sound: HTMLAudioElement;

	onMount(() => {
		type_sound = new Audio(typeSound);
		type_sound.volume = 0.5; // Set the volume to 50%
		click_sound = new Audio(clickSound);
		click_sound.volume = 0.5; // Set the volume to 50%
	});

	let code = $state('');

	$effect(() => {
		// Play typing sound when the code changes
		if (code.length > 0) {
			type_sound.currentTime = 0;
			type_sound.play();
		}
		return () => {
			if (type_sound) {
				type_sound.pause();
				type_sound.currentTime = 0;
			}
		};
	});

	async function createGame() {
		click_sound.play();
		const { data, error } = await supabase.rpc('create_game');
		if (error) {
			console.error(error);
		} else if (data) {
			const code = data.game_code;
			return goto(localizeUrl(`/${code}/lobby`));
		}
	}

	async function joinGame() {
		click_sound.play();
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

<div class="h-screen flex flex-col items-center justify-center bg-[#efe7e2] relative p-4">
	<div class="z-10 flex flex-col items-center justify-center max-w-md relative">
		<div
			class="absolute -left-56 top-0 w-32 h-32 md:w-48 md:h-48 lg:w-52 lg:h-52 flex items-center justify-center"
		>
			<img src="/images/illustrations/step_5_1.png" alt="" class="w-full h-full object-contain" />
		</div>
		<div
			class="absolute -right-56 top-0 w-32 h-32 md:w-48 md:h-48 lg:w-52 lg:h-52 flex items-center justify-center"
		>
			<img src="/images/illustrations/step_2_1.png" alt="" class="w-full h-full object-contain" />
		</div>
		<h1 class="flex items-center justify-center text-dark-green font-black text-5xl md:text-7xl">
			LoGaCulture
		</h1>
		<p class="text-dark-green text-center text-lg mb-5 px-4 italic">
			"Create your own story from the perspective of a character in the island of Madeira."
		</p>
		<div
			class="w-full flex flex-col items-stretch justify-center gap-6 mt-4 p-4 rounded-lg border-2"
		>
			<div class="flex flex-col items-center justify-center">
				<Button size="lg" onclick={createGame}>{m.start_new_game()}</Button>
			</div>
			<div class="flex items-center gap-4 w-full">
				<div class="h-px w-full bg-dark-green"></div>
				<p class="text-dark-green text-center text-lg font-bold">{m.or()}</p>
				<div class="h-px w-full bg-dark-green"></div>
			</div>
			<div class="w-full flex flex-col items-center justify-center gap-2">
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
				<Button size="lg" class="mt-2" onclick={joinGame}>{m.join_game()}</Button>
			</div>
			<div class="flex items-center gap-4 w-full">
				<div class="h-px w-full bg-dark-green"></div>
				<p class="text-dark-green text-center text-lg font-bold">{m.or()}</p>
				<div class="h-px w-full bg-dark-green"></div>
			</div>
			<div class="flex flex-col items-center justify-center">
				<Button
					variant="outline"
					size="lg"
					href={localizeUrl('/stories').toString()}
					class="text-dark-green hover:text-dark-green/90 mb-4 bg-white hover-bg-gray-200 transition-all duration-200 ease-in-out border-dark-green/20 hover:border-dark-green/90"
				>
					{m.browse_stories()}
				</Button>
			</div>
		</div>
		<div
			class="absolute -right-56 bottom-0 w-32 h-32 md:w-48 md:h-48 lg:w-52 lg:h-52 flex items-center justify-center"
		>
			<img src="/images/illustrations/step_4_1.png" alt="" class="w-full h-full object-contain" />
		</div>
		<div
			class="absolute -left-56 bottom-0 w-32 h-32 md:w-48 md:h-48 lg:w-52 lg:h-52 flex items-center justify-center"
		>
			<img src="/images/illustrations/step_6_1.png" alt="" class="w-full h-full object-contain" />
		</div>
	</div>
	<div class="absolute top-4 right-4">
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
