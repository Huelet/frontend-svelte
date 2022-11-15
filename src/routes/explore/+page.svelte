<script lang="ts">
	import type { PageData } from './$types';
	import VideoCard from '../../components/video-card.svelte';
	import '@fontsource/red-hat-display/300.css';

	export let data: PageData;

	let videoList: any[] | undefined = data.videoList;
</script>

<main>
	<div class="fyp-container">
		<div class="fyp-videos">
			<div class="fyp-videos-grid">
				{#if videoList}
					{#each videoList as video}
						<VideoCard {video} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</main>

<style>
	main {
		height: 96vh;
		width: 96vw;
	}

	.fyp-container {
		height: 100%;
		width: 100%;
	}

	.fyp-videos {
		display: grid;

		padding: 1em;
		height: 100%;
		width: 100%;
	}

	.fyp-videos > .fyp-videos-grid {
		display: grid;
		place-items: center;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1em;
	}
</style>
