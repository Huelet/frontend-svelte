<script>
	import { page } from '$app/stores';
	import Typography from '../components/typography.svelte';

	console.log($page.error);
</script>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background-color: #f0f0f0; /* Add your preferred background color */
	}

	.page-content {
		text-align: center;
		padding: 20px;
		border: 1px solid #ccc;
		background-color: #fff; /* Add your preferred background color */
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
		border-radius: 5px; /* Add rounded corners */
	}

	.error-message {
		font-size: 24px;
		font-weight: bold;
		color: #ff0000; /* Red color for error messages */
		margin-bottom: 20px;
	}

	.error-description {
		font-size: 18px;
		color: #333; /* Dark text color for descriptions */
		margin-bottom: 20px;
	}

	code {
		background-color: #f0f0f0; /* Background color for code elements */
		padding: 4px 8px;
		border-radius: 4px;
	}

	section {
		margin-top: 32px;
	}
</style>

<main>
	<div class="page-content">
		{#if $page.status === 404}
			<div class="error-message">
				Uh-oh, ShardsSocial.com <code>{$page.url.pathname}</code> doesn't seem to exist
			</div>
			<div class="error-description">404 Page not found</div>
		{:else}
			<div class="error-description">Something went wrong</div>
			<div class="error-description">Please try refreshing the page</div>
			<div class="error-description">If that doesn't work, please report it to a Developer</div>

			<section>
				<div class="error-description">Details</div>
				<pre>
					{$page.error.stack}
				</pre>
			</section>
		{/if}
	</div>
</main>
