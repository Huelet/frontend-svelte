<script lang="ts">
	import { onMount } from 'svelte';
	import Plyr, { type MarkersPoints } from 'plyr';
	import 'plyr/dist/plyr.css';

	let player: any;
	let location: any;

	onMount(async () => {
		player = new Plyr(location.firstChild, {
			controls: [
				'play-large',
				'play',
				'progress',
				'current-time',
				'rewind',
				'mute',
				'volume',
				'settings',
				'airplay',
				'fullscreen'
			],
			settings: ['captions', 'quality', 'speed', 'loop'],
			iconUrl: 'https://cdn.huelet.net/assets/player-icons.svg',
			blankVideo: 'https://cdn.huelet.net/assets/blank.mp4',
			seekTime: 5,
			volume: 0.8,
			clickToPlay: true,
			disableContextMenu: true,
			keyboard: {
				focused: true,
				global: true
			},
			tooltips: {
				controls: true,
				seek: true
			},
			storage: {
				enabled: true,
				key: 'huelet-player'
			},
			speed: {
				selected: 1,
				options: [0.1, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4, 10]
			},
			quality: {
				default: 720,
				options: [144, 240, 360, 480, 720, 1080, 1440, 2160],
				forced: true
			},
			markers: {
				enabled: intervals ? true : false,
				points: intervals ? intervals : null
			}
		});
	});

	export let sources: {
		hd: {
			mp4_av1?: string;
			mp4_h264: string;
			webm_h264: string;
		};
		sd: {
			mp4_av1?: string;
			mp4_h264: string;
			webm_h264: string;
		};
	};
	export let intervals: MarkersPoints[] | any = null;
</script>

<div bind:this={location}>
	<!-- this will be added in the future -->
	<!-- svelte-ignore a11y-media-has-caption -->
	<video>
		<source src={sources.hd.mp4_h264} type="video/mp4" />
	</video>
</div>

<style>
	:global(:root) {
		--plyr-font-family: var(--font-text);
		--plyr-color-main: var(--accent-primary-dark);
		--plyr-menu-background: var(--card-primary-dark);
		--plyr-menu-color: var(--text-primary-dark);
		--plyr-tooltip-background: var(--card-primary-dark);
		--plyr-tooltip-color: var(--text-primary-dark);
	}

	:global(.plyr.plyr--full-ui) {
		font-variant-numeric: normal;
		width: 680px !important;
		height: 420px !important;
	}

	@media (max-width: 680px) {
		:global(.plyr.plyr--full-ui) {
			width: 100vw !important;
			height: 50vh !important;
		}
	}
</style>
