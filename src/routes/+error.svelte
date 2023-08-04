<script>
	import { page } from '$app/stores';
	import Typography from '../components/typography.svelte';

	console.log($page.error);
</script>

<main>
	<div class="page-content">
		{#if $page.status === 404}
			<Typography size="xl">
				Uh-oh, This page doesn't seem to exist <code>{$page.url.pathname}</code>
			</Typography>
			404 Page not found
		{:else}
			<Typography>Something went wrong</Typography>
			<Typography>Try refreshing the page</Typography>
			<Typography>If that doesn't work, please report it to a Developer</Typography>

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
