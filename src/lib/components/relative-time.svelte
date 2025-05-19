<script lang="ts">
	import { Clock } from 'lucide-svelte';
	import { m } from '@src/paraglide/messages';
	let { date } = $props();
	let timeAgo = $state('');

	function getRelativeTime(dateStr: string): string {
		const now = new Date();
		const past = new Date(dateStr);
		const diff = now.getTime() - past.getTime();

		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(days / 365);

		if (years > 0) return `${years} ${years === 1 ? m.year() : m.years()} ${m.ago()}`;
		if (months > 0) return `${months} ${months === 1 ? m.month() : m.months()} ${m.ago()}`;
		if (days > 0) return `${days} ${days === 1 ? m.day() : m.days()} ${m.ago()}`;
		if (hours > 0) return `${hours} ${hours === 1 ? m.hour() : m.hours()} ${m.ago()}`;
		if (minutes > 0) return `${minutes} ${minutes === 1 ? m.minute() : m.minutes()} ${m.ago()}`;
		return m.just_now();
	}

	let interval: ReturnType<typeof setInterval>;

	$effect(() => {
		timeAgo = getRelativeTime(date);
		interval = setInterval(() => {
			timeAgo = getRelativeTime(date);
		}, 60000); // Update every minute

		return () => {
			clearInterval(interval);
		};
	});
</script>

<time
	class="flex gap-2 font-medium text-gray-500 text-base items-center w-fit"
	datetime={date}
	title={new Date(date).toLocaleString()}
>
	<Clock />
	{timeAgo}
</time>
