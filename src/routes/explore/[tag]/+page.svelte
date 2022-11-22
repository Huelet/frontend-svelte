<script lang="ts">
	import { page } from '$app/stores';
	import Meta from '../../../components/meta.svelte';
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

<Meta title={`Videos tagged with ${tag}`} description={`Videos tagged with ${tag}`} />

<div>
	{#each videos as video}
		<VideoCard {video} />
	{/each}
</div>
