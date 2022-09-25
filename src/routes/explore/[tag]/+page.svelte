<script lang="ts">
	import { page } from '$app/stores';
	import VideoCard from '../../../components/video-card.svelte';

	export let videos: any[] = [];
	export let tag: string = $page.params.tag;

	fetch(`https://api.huelet.net/videos/search/fromtags?tags=${tag}`)
		.then((res) => res.json())
		.then((response: any) => {
			videos = response.data;
		})
		.catch((err) => {
			console.error(err);
		});
</script>

<div>
	{#each videos as video}
		<VideoCard {video} />
	{/each}
</div>
