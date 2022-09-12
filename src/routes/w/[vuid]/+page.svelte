<script lang="ts">
	import { page } from '$app/stores';
	import Player from '../../../components/player.svelte';
	import Header from '../../../components/header.svelte';

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
			console.log(response.data);
		})
		.catch((err) => {
			console.error(err);
		});
</script>

<Header />
<div>
	<Player
		thumbnail={typeof video !== 'undefined' ? video.thumbnail : null}
		sources={{
			hd: {
				mp4_h264:
					'https://videos.cdn.huelet.net/videoasset-10n3ip7xyvj53eyn0-1647063696/z5elsaa31373ujv0w1455yr68jwaws8ub4.mov?sv=2020-02-10&ss=b&srt=sco&sp=r&se=3000-06-27T09:40:10Z&st=2021-06-27T01:40:10Z&sip=0.0.0.0-255.255.255.255&spr=https&sig=LDOCpb7z9CSWk2GkFNlalqVWOhdwmwn2pSBWbSBnVtM%3D',
				webm_h264:
					'https://videos.cdn.huelet.net/videoasset-10n3ip7xyvj53eyn0-1647063696/z5elsaa31373ujv0w1455yr68jwaws8ub4.mov?sv=2020-02-10&ss=b&srt=sco&sp=r&se=3000-06-27T09:40:10Z&st=2021-06-27T01:40:10Z&sip=0.0.0.0-255.255.255.255&spr=https&sig=LDOCpb7z9CSWk2GkFNlalqVWOhdwmwn2pSBWbSBnVtM%3D'
			},
			sd: {
				mp4_h264:
					'https://videos.cdn.huelet.net/videoasset-10n3ip7xyvj53eyn0-1647063696/z5elsaa31373ujv0w1455yr68jwaws8ub4.mov?sv=2020-02-10&ss=b&srt=sco&sp=r&se=3000-06-27T09:40:10Z&st=2021-06-27T01:40:10Z&sip=0.0.0.0-255.255.255.255&spr=https&sig=LDOCpb7z9CSWk2GkFNlalqVWOhdwmwn2pSBWbSBnVtM%3D',
				webm_h264:
					'https://videos.cdn.huelet.net/videoasset-10n3ip7xyvj53eyn0-1647063696/z5elsaa31373ujv0w1455yr68jwaws8ub4.mov?sv=2020-02-10&ss=b&srt=sco&sp=r&se=3000-06-27T09:40:10Z&st=2021-06-27T01:40:10Z&sip=0.0.0.0-255.255.255.255&spr=https&sig=LDOCpb7z9CSWk2GkFNlalqVWOhdwmwn2pSBWbSBnVtM%3D'
			}
		}}
	/>
</div>
