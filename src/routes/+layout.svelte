<script lang="ts">
	import '@fontsource/red-hat-display';
	import '@fontsource/red-hat-text';
	import 'normalize.css';
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
		--accent-600-dark: #6300d6;
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
	:global(p, a, li, ul, ol, button, input, textarea) {
		font-family: var(--font-text);
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
		font-size: 18px;
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
</style>
