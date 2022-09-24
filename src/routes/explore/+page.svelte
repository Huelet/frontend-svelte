<script lang="ts">
	import Logo from '../../components/logo.svelte';
	import VideoCard from '../../components/video-card.svelte';
	import '@fontsource/red-hat-display/300.css';

	let videoList: any[];
	let timeOfDay: string;
	let weather: string;
	let locationData: any;

	const now = new Date();
	const hour = now.getHours();

	if (hour < 12) timeOfDay = 'morning';
	else if (hour < 18) timeOfDay = 'afternoon';
	else timeOfDay = 'evening';

	fetch('https://ipapi.co/json/')
		.then((response) => response.json())
		.then((data) => {
			locationData = data;
			// i know this includes my key but i do not give a hint of a reason to care
			fetch(
				`https://api.weatherapi.com/v1/current.json?key=1e9c6dd478af4f6fa8205430222106&q=${locationData.latitude},${locationData.longitude}&aqi=no`
			)
				.then((response) => response.json())
				.then((data) => {
					weather = data.current.condition.text;
				});
		});

	fetch('https://api.huelet.net/videos/get?bulk=true')
		.then((response) => response.json())
		.then((videos) => {
			videoList = videos.data;
		});
</script>

<main>
	<div class="hello row">
		<Logo />
		<span class="column">
			<h1>
				Good {timeOfDay}!
			</h1>
			<h3>
				It's {!weather ? 'Rainy' : weather} in {!locationData ? 'Seattle' : locationData.city}.
			</h3></span
		>
	</div>
	<div class="fyp-container">
		<div class="fyp-tags">
			{#each ['Trending', 'For You', 'New', 'Music', 'Podcasts', 'Shows', 'Movies', 'Books', 'News'] as tag}
				<div class="fyp-tag-item center cursor">
					<h3 class="fyp-tag-descriptor">{tag}</h3>
				</div>
			{/each}
		</div>

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

	.hello {
		padding: 1em;
		height: 64px;
	}

	.fyp-container {
		height: 100%;
		width: 100%;
	}

	.fyp-tags {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		overflow-x: auto;
		width: 100%;
		background-color: #343333;
		margin: 0 0 0 2vw;
		padding: 0.5em 0 0.5em 0;
		border-radius: 0.5em;
	}

	.fyp-tags > .fyp-tag-item {
		width: 80px;
		background-color: #646464;
		padding: 0.5em;
		margin: 0 0.5em 0 0.5em;
		border-radius: 0.25em;
	}

	.fyp-tags > .fyp-tag-item > .fyp-tag-descriptor {
		font-size: 1.25em;
		font-weight: 300;
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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

	h1,
	h3 {
		font-family: var(--font-text);
		margin: 0;
		padding: 0;
	}

	h1 {
		font-size: 1.95em;
	}

	h3 {
		font-size: 1em;
	}

	@media (max-width: 600px) {
		.fyp-tags {
			margin: 0;
		}

		.fyp-tags > .fyp-tag-item {
			margin: 0 0.25em 0 0.25em;
		}
	}
</style>
