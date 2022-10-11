<script>
	import { page } from '$app/stores';
	import Typography from '../components/typography.svelte';

	console.log($page.error);
</script>

<main>
	<div class="page-content">
		{#if $page.status === 404}
			<Typography size="xl">
				Could not find page <code>{$page.url.pathname}</code>
			</Typography>
			you're in the wrong place
		{:else}
			<Typography>Something went wrong</Typography>
			<Typography>Try refreshing the page</Typography>
			<Typography>If that doesn't work, please report it.</Typography>

			<section>
				<Typography>Details</Typography>
				<pre>
                {$page.error.stack}
            </pre>
			</section>
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;

		height: 100vh;
		width: 100vw;
	}

	section {
		margin-top: 32px;
	}
</style>
