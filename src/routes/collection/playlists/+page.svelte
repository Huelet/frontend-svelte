<script lang="ts">
	import PlaylistCard from '../../../components/playlist-card.svelte';
	import Meta from '../../../components/meta.svelte';
	import type { Playlist } from '../../../types/playlist';
	import { onMount } from 'svelte';
	import {api_url} from '../../../env';

	let playlists: Playlist[] = [];

	onMount(async () => {
		const user = JSON.parse(localStorage.getItem('huelet:auth:user') as string);

		const resp = await fetch(
			`${api_url}/users/interact/playlists/fromuser?target=${user.uid}`
		);
		playlists = (await resp.json()).data;
	});
</script>

<svelte:head>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<Meta
	title={playlists.length > 0 ? 'Your Playlists' : 'No Playlists'}
	description="Your playlists on Huelet"
/>

<main>
	<div class="playlists-grid">
		{#each playlists as playlist}
			<PlaylistCard {playlist} />
		{/each}
	</div>
</main>

<style>
	main {
		padding-top: 32px;
	}

	main,
	.playlists-grid {
		width: 100%;
		height: 100%;

		padding: 1em;
	}

	.playlists-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1em;
	}
</style>
