<script lang="ts">
	import VideoCard from '../../components/video-card.svelte';
	import '@fontsource/red-hat-display/300.css';

	let videoList: any[];

	fetch('https://api.huelet.net/videos/get?bulk=true')
		.then((response) => response.json())
		.then((videos) => {
			videoList = videos.data;
		});
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
