<script lang="ts">
	import * as Dialog from './ui/dialog';

	interface HelpDialogProps {
		open: boolean;
	}

	let { open = $bindable(false) }: HelpDialogProps = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="overflow-y-auto h-full max-h-[80vh] sm:max-w-[60rem]">
		Instruções
	</Dialog.Content>
</Dialog.Root>
