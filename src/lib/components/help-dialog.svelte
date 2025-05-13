<script lang="ts">
	import * as Dialog from './ui/dialog';
	import { Button } from './ui/button';
	import { m } from '@src/paraglide/messages.js';

	interface HelpDialogProps {
		open: boolean;
	}

	let { open = $bindable(false) }: HelpDialogProps = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="overflow-y-auto h-full max-h-[80vh] sm:max-w-[60rem]">
		<div class="space-y-6 p-4">
			<h2 class="text-2xl font-black text-dark-green">{m.instructions()}</h2>
			<section class="space-y-4">
				<h3 class="text-xl font-bold text-dark-green underline">1. {m.start_of_game()}</h3>

				<ul class="list-disc pl-6 space-y-2 marker:text-dark-green marker:font-bold">
					<li>{m.start_of_game_1()}</li>
					<li>{m.start_of_game_2()}</li>
					<li>{m.start_of_game_3()}</li>
				</ul>
			</section>

			<section class="space-y-4">
				<h3 class="text-xl font-bold text-dark-green underline">2. {m.during_game()}</h3>
				<ul class="list-disc pl-6 space-y-2 marker:text-dark-green marker:font-bold">
					<li>
						{m.during_game_1()}
						<ul class="list-decimal pl-6 mt-2">
							<li>{m.during_game_2()}</li>
							<li>{m.during_game_3()}</li>
							<li>{m.during_game_4()}</li>
						</ul>
					</li>
					<li>{m.during_game_5()}</li>
					<li>{m.during_game_6()}</li>
					<li>{m.during_game_7()}</li>
				</ul>
			</section>

			<section class="space-y-4">
				<h3 class="text-xl font-bold text-dark-green underline">3. {m.end_of_game()}</h3>
				<ul class="list-disc pl-6 space-y-2">
					<li>{m.end_of_game_1()}</li>
					<li>{m.end_of_game_2()}</li>
					<li>{m.end_of_game_3()}</li>
					<li>{m.end_of_game_4()}</li>
				</ul>
			</section>
		</div>

		<div class="flex w-full justify-center">
			<Dialog.Close>
				<Button>{m.back_to_game()}</Button>
			</Dialog.Close>
		</div>
	</Dialog.Content>
</Dialog.Root>
