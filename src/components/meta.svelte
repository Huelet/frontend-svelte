<script lang="ts">
	import { onMount } from 'svelte';

	export let title: string = 'Huelet - The Video Platform for Humans';
	export let description: string =
		'Watch your favorite creators at any time on Huelet, the Video Platform for Humans';
	export let image: string = 'https://cdn.huelet.net/assets/Poster.png';

	let url: string;

	onMount(() => {
		url = window.location.href;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta property="og:title" content={title} />
	<meta property="twitter:title" content={title} />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />
	<meta property="twitter:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="twitter:card" content="summary_large_image" />
</svelte:head>
