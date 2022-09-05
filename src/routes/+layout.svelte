<script lang="ts">
	import '@fontsource/red-hat-display';
	import '@fontsource/red-hat-text';
</script>

<slot />

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
		--accent-600-dark: #8421f8;
		--accent-700-dark: #49009d;
		--accent-800-dark: #3b047b;
		--font: 'Red Hat Display', sans-serif;
		--font-text: 'Red Hat Text', sans-serif;
	}

	::global(*) {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	:global(body, html) {
		padding: 0;
		margin: 0;
		height: 100vh;
		width: 100vw;
		background-color: var(--background-dark);
		font-family: var(--font);
		color: var(--text-primary-dark);
	}
	:global(p, h1, h2, h3, h4, h5, h6, a, li, ul, ol, button, input, textarea) {
		font-family: var(--font-text);
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
</style>
