<script lang="ts">
	import { goto } from '$app/navigation';
	import * as InputCode from '$lib/components/ui/input-code';
	import { Button } from '@/components/ui/button';
	import { supabase } from '@/supabase';

	let code = $state('');

	async function createGame() {
		const { data, error } = await supabase.rpc('create_game');
		if (error) {
			console.error(error);
		} else if (data) {
			const code = data.game_code;
			return goto(`/${code}/lobby`);
		}
	}

	async function joinGame() {
		const { error } = await supabase.rpc('join_game', { game_code: code });
		if (error) {
			console.error(error);
		} else {
			return goto(`/${code}/lobby`);
		}
	}
</script>

<div class="h-full flex flex-col items-center justify-center bg-white">
	<div class="flex flex-col items-stretch justify-center gap-4">
		<InputCode.Root maxlength={6} bind:value={code}>
			{#snippet children({ cells })}
				<InputCode.Group>
					{#each cells as cell}
						<InputCode.Slot {cell} />
					{/each}
				</InputCode.Group>
			{/snippet}
		</InputCode.Root>
		<Button size="lg" onclick={joinGame}>Join Game</Button>
		<p class="text-dark-green text-center text-lg font-bold">OR</p>
		<Button size="lg" onclick={createGame}>Create Game</Button>
	</div>
</div>
