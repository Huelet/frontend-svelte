<script lang="ts">
	import { page } from '$app/stores';
	import Header from '../../../components/header.svelte';

	export let vuid: string;
	export let video: object;
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
			console.log(response.data);
		})
		.catch((err) => {
			console.error(err);
		});
</script>

<Header />
<div>{$page.params.vuid}</div>
