<script lang="ts">
	import * as Dialog from './ui/dialog';
	import { Button } from './ui/button';
	import { m } from '@src/paraglide/messages.js';
	import { Flag } from 'lucide-svelte';

	interface HelpDialogProps {
		open: boolean;
	}

	let { open = $bindable(false) }: HelpDialogProps = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="overflow-y-auto h-full max-h-[80vh] max-w-4xl w-full">
		<div class="space-y-6 p-4">
			<h2 class="text-3xl font-black text-dark-green text-center">{m.instructions()}</h2>
			<section class="space-y-4">
				<h3 class="text-2xl font-bold text-dark-green">{m.about_the_game()}</h3>

				<p>
					{m.about_the_game_description()}
				</p>
			</section>

			<section class="space-y-4">
				<h3 class="text-2xl font-bold text-sense-red">{m.how_to_play()}</h3>
				<p>{m.individual_or_group()}</p>
				{#each Array.from({ length: 5 }, (_, i) => i + 1) as step}
					<div class="flex gap-4 items-start">
						<div
							class="w-8 h-8 rounded-full bg-nature-green/30 grid place-items-center text-nature-green font-bold flex-shrink-0"
						>
							{step}
						</div>

						{#if step === 1}
							<div class="flex flex-1 flex-col gap-1">
								<p>
									{m.how_to_play_step_1_1()}<span
										class="inline-flex items-center justify-center mx-1"
									>
										<span class="w-5 h-5 rounded-full bg-[#FF6157] grid place-items-center">
											<Flag class="w-3 h-3 text-white" />
										</span>
									</span>{m.how_to_play_step_1_2()}
								</p>
							</div>
						{:else if step === 2}
							<div class="flex flex-1 flex-col gap-1">
								<p>{m.how_to_play_step_2()}</p>
							</div>
						{:else if step === 3}
							<div class="flex flex-1 flex-col gap-1">
								<p>{m.how_to_play_step_3()}</p>
							</div>
						{:else if step === 4}
							<div class="flex flex-1 flex-col gap-1">
								<p>
									{m.how_to_play_step_4()}
								</p>
							</div>
						{:else if step === 5}
							<div class="flex flex-1 flex-col gap-1">
								<p>
									{m.how_to_play_step_5()}
								</p>
							</div>
						{/if}
					</div>
				{/each}
			</section>
		</div>

		<div class="flex w-full justify-center">
			<Dialog.Close>
				<Button>{m.back_to_game()}</Button>
			</Dialog.Close>
		</div>
	</Dialog.Content>
</Dialog.Root>
