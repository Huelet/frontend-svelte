<script lang="ts">
	import Header from '../components/header.svelte';

	import { navigating, page } from '$app/stores';
	import '@fontsource/red-hat-display/400.css';
	import NProgress from 'nprogress';

	import 'normalize.css';
	import '../styles/progress.css';

	NProgress.configure({
		showSpinner: false,
		minimum: 0.1,
		easing: 'linear',
		parent: '#main'
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	// someone figure this out because i dont care enough

	// onMount(() => {
	// 	switch (localStorage.getItem('huelet:auth:time') === null) {
	// 		case false:
	// 			const timeAtAuth = JSON.parse(localStorage.getItem('huelet:auth:time') as string);
	// 			const timeNow = Date.now();

	// 			if (timeNow > timeAtAuth.time + 86400000) {
	// 				localStorage.removeItem('huelet:auth:token');
	// 				localStorage.removeItem('huelet:auth:user');
	// 				localStorage.removeItem('huelet:auth:time');
	// 			}
	// 			break;

	// 		default:
	// 			break;
	// 	}
	// });
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/" defer></script>
	<script>
		document.addEventListener('DOMContentLoaded', () => {
			const stripe = Stripe(
				'pk_live_51IuiqfHEYvOcf3Hr4RBmWORXBNDj6chcmx4rRhNu6Z1BTJfIBLZbCho2q57w8JKss7I9VwBKk2w02yja57XxvPmX00LJLH3kKF'
			);
		});
	</script>
</svelte:head>

{#if $page.url.href === '/auth/in/'}
	{null}
{:else}
	<Header />
{/if}
<div class="layout-content">
	<slot />
</div>

<style>
	/* global styles */
	:root {
		--background-dark: #181718;
		--card-primary-dark: #2b2b2b;
		--card-secondary-dark: rgba(255, 255, 255, 0.2);
		--text-primary-dark: #ffffff;
		--text-secondary-dark: rgba(255, 255, 255, 0.5);
		--accent-primary-dark: #7600ff;
		--accent-100-dark: #b87bff;
		--accent-200-dark: #9c46ff;
		--accent-300-dark: #8421f8;
		--accent-400-dark: #7600ff;
		--accent-500-dark: #8421f8;
		--accent-600-dark: #6300d6;
		--accent-700-dark: #49009d;
		--accent-800-dark: #3b047b;
	}

	::global(*) {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	::global(*::before, *::after) {
		box-sizing: border-box;
	}

	:global(body, html) {
		padding: 0;
		margin: 0;
		width: 100vw;
		background-color: var(--background-dark);
		color: var(--text-primary-dark);
		font-family: 'Red Hat Display', sans-serif;
	}

	:global(body, html, #main) {
		box-sizing: border-box;
		padding: 0;
		margin: 0;

		width: 100vw;

		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
	}

	:global(::selection) {
		background: var(--accent-primary-dark);
		color: #fff;
	}

	:global(img) {
		user-select: none;
	}

	:global(.hidden) {
		display: none;
	}

	:global(.cursor) {
		cursor: pointer;
	}

	:global(.row) {
		display: flex;
		flex-direction: row;
	}

	:global(.column) {
		display: flex;
		flex-direction: column;
	}

	:global(.center) {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	:global(.center-horizontally) {
		display: flex;
		justify-content: center;
	}

	:global(.center-vertically) {
		display: flex;
		align-items: center;
	}

	:global(.full) {
		width: 100%;
		height: 100%;
	}

	:global(.full-width) {
		width: 100%;
	}

	:global(.full-height) {
		height: 100%;
	}

	:global(.full.page) {
		height: 100vh;
		width: 100vw;
	}

	:global(.button) {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		color: var(--text-primary-dark);
		height: 50px;
		margin-top: 10px;
		padding-left: 1.5em;
		padding-right: 1.5em;
		outline: 0;
		width: auto;
	}

	:global(.button.primary) {
		background-color: var(--accent-primary-dark);
		border-radius: 12px;
	}

	:global(.button.secondary) {
		background-color: transparent;
		border: 1px solid var(--accent-primary-dark);
		border-radius: 5px;
	}

	:global(.button.primary:hover) {
		background-color: var(--accent-600-dark);
	}

	:global(.button.secondary:hover) {
		background-color: rgba(0, 0, 0, 0.1);
	}

	:global(::-webkit-scrollbar) {
		width: 5px;
		height: 8px;
		background: transparent;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: #4b4b4b;
		border-radius: 2px;
	}

	.layout-content {
		padding: 32px 0 0 0;
	}
</style>
