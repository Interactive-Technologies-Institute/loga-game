<script lang="ts">
	import { Button } from './ui/button';
	import * as Dialog from './ui/dialog';
	import { m } from '@src/paraglide/messages';
	import { localizeHref } from '@src/paraglide/runtime';

	let { open = $bindable(false) } = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="overflow-y-auto max-h-xl sm:max-w-xl flex flex-col gap-y-10">
		<div class="flex flex-col items-center justify-center gap-1 p-4">
			<p class="text-dark-green rounded-full font-medium text-lg underline">{m.game_ended()}</p>
			<p class="text-dark-green font-bold text-4xl text-center">{m.thanks_for_playing()}</p>
		</div>
		<Button size="lg" href={localizeHref('/')}>{m.play_again()}</Button>
	</Dialog.Content>
</Dialog.Root>
