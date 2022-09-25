<script lang="ts">
	import { page } from '$app/stores';
	import Player from '../../../components/player.svelte';
	import Header from '../../../components/header.svelte';
	import Skeleton from '../../../components/skeleton.svelte';

	export let vuid: string;
	export let video: any;
	export let error: string;

	vuid = $page.params.vuid;

	fetch(`https://api.huelet.net/videos/lookup/${vuid}`)
		.then((res) => {
			if (res.status === 404) error = 'Not Found';
			if (res.status === 429) error = 'Too Many Requests';
			else return res.json();
		})
		.then((response: any) => {
			video = response.data;
		})
		.catch((err) => {
			console.error(err);
		});
</script>

<div>
	{#if video}
		<Player
			sources={{
				hd: {
					mp4_h264: video.url,
					webm_h264: video.url_webm
				},
				sd: {
					mp4_h264: video.url,
					webm_h264: video.url_webm
				}
			}}
		/>
	{:else}
		<Skeleton width={36} height={350} />
	{/if}
</div>
