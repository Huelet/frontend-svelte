<script lang="ts">
	import { Search, Bell } from './icons';
	import VideoCamera from './icons/VideoCamera.svelte';
	import Logo from './logo.svelte';

	let query: string;
	let className = '';
	export { className as class };
</script>

<div class="header-global row center {className}">
	<a href="/"><Logo dimensions={32} /></a>
	<div class="row center">
		<input type="text" placeholder="Search" bind:value={query} class="search" />
		<div class="search-button button primary">
			<Search fill="white" width={16} height={16} />
		</div>
	</div>
	<div class="actions row center">
		<a href="https://dash.huelet.net">
			<Bell fill="white" width={28} height={28} />
		</a>
		<a href="https://dash.huelet.net">
			<VideoCamera fill="white" width={28} height={28} />
		</a>
	</div>
</div>

<style>
	.header-global {
		position: fixed;
		width: 100vw;
		height: 32px;
		background-color: #1a1b1e;
		justify-content: space-between !important;
	}

	.search {
		width: 12em;
		height: 80%;
		padding: 0.1em;
		background-color: #303245;
		border: 2px solid rgba(15, 119, 255, 0.733);
		border-radius: 0.7em;
	}
	.search-button {
		height: auto !important;
		width: auto !important;
		padding: 0.2em !important;
		border-radius: 50%;
		margin-top: 0 !important;
	}

	@media (max-width: 600px) {
		.search {
			width: 8em;
		}
	}
</style>
