<script lang="ts">
	import Skeleton from './skeleton.svelte';
	import Avatar from './avatar.svelte';
	import Typography from './typography.svelte';
	import '@fontsource/red-hat-display/300.css';
	import '@fontsource/red-hat-display/500.css';
	import { Check } from './icons';
	import Loading from './loading.svelte';
	import VideoCamera from './icons/VideoCamera.svelte';

	export let vuid = '';
	export let video: any = {};
	let videoData: any;
	let creatorData: any;
	let className = '';
	let image: boolean;
	let imageLoading = true;
	let imageURL = '';
	export { className as class };

	if (video) {
		videoData = video;
		creatorData = video.creator;

		fetch(`https://api.huelet.net/auth/user?uid=${videoData.authorId}`)
			.then((response) => response.json())
			.then((creator) => {
				creatorData = creator.data;
			});
		if (typeof video.thumbnail !== 'undefined') {
			image = true;
			fetch(videoData.thumbnail)
				.then((res) => res.blob())
				.then((blob) => {
					imageURL = URL.createObjectURL(blob);
					imageLoading = false;
				});
		} else {
			image = false;
			imageLoading = false;
		}
	}

	if (vuid) {
		fetch(`https://api.huelet.net/videos/get?vuid=${vuid}`)
			.then((response) => response.json())
			.then((video) => {
				videoData = video.data;
				creatorData = video.data.creator;

				fetch(`https://api.huelet.net/auth/user?uid=${videoData.authorId}`)
					.then((response) => response.json())
					.then((creator) => {
						creatorData = creator.data;
					});
			});
	}
</script>

<a href={`/w/${videoData?.vuid}`}>
	<div class="video-card column cursor {className}">
		{#if image === true}
			{#if imageLoading === false}
				<div
					class="thumbnail center column"
					style={`background-image: url(${!videoData ? '' : imageURL});
				${videoData.flags.length >= 1 ? 'filter: blur(1.2em)' : ''}
			`}
				/>
			{:else}
				<div class="thumbnail center column full">
					<Loading dimensions={128} />
				</div>
			{/if}
		{:else}
			<div class="thumbnail-no-image center column full">
				<VideoCamera fill="#b3b3b3" width={32} height={32} />
				<Typography size="xl">No thumbnail</Typography>
			</div>
		{/if}
		<div class="video-info">
			{#if videoData}
				<Typography truncated={true} weight={600} fontSize={1}>{videoData.title}</Typography>
			{:else}
				<Skeleton width={50} />
			{/if}
			{#if videoData}
				<Typography class="viewcount" fontSize={0.50} color="#b3b3b3"
					>{videoData.views} views</Typography
				>
			{:else}
				<Typography class="viewcount" fontSize={1} color="#b3b3b3">Loading views...</Typography>
			{/if}
			<a href={`/c/@${creatorData?.username}`}>
				<div class="row">
					{#if videoData}
						<Avatar
							url={creatorData?.avatar ||
								`https://cdn.huelet.net/assets/avatars/1916688602623198526477735532393069233691739314463003${Math.round(
									Math.random() * 15
								)}.png`}
							forceAltText={`${creatorData?.username}'s avatar`}
							dimensions={32}
						/>
						<div class="creator">
							<span class="row">
								<Typography class="creator-name">{creatorData?.username}</Typography>

								{#if creatorData?.approved}
									<a
										href="https://docs.huelet.net/users/verified"
										aria-label="Learn more about about the approved checkmark"
									>
										<Check fill="green" />
									</a>	
								{/if}</span
							>
							<div class="creator-bio">
								<Typography truncated={true} fontSize={0.8} weight={300}>
									{creatorData?.bio?.length > 15
										? creatorData.bio.substring(0, 50) + '...'
										: creatorData?.bio}
								</Typography>
							</div>
						</div>
					{:else}
						<Avatar
							url={`https://cdn.huelet.net/assets/avatars/1916688602623198526477735532393069233691739314463003${Math.round(
								Math.random() * 15
							)}.png`}
							forceAltText="Loading avatar..."
							dimensions={32}
						/>
					{/if}
				</div>
			</a>
		</div>
	</div>
</a>

<style>
	.video-card {
		width: 16.5em;
		height: 17em;
		background: rgb(37, 38, 43);
		border-radius: 1.5em;
		transition: 0.2s ease-in-out;
	}

	.video-card:hover {
		padding: 1em;
	}

	.video-card:hover .thumbnail {
		border-radius: 1em;
	}

	.video-card > .video-info {
		padding: 0.3em;
	}

	.video-card > .video-info > .viewcount {
		font-family: 'Red Hat Display', sans-serif;
		font-weight: 400;
		font-size: 1.5em;
		color: #b3b3b3;
	}

	.video-card > .video-info > a > * > .creator > * > h2.creator-name {
		font-family: 'Red Hat Display', sans-serif;
		font-weight: 400;
		font-size: 1em;
		color: rgb(255, 255, 255);
	}

	.video-card > .video-info > a > * > .creator > .creator-bio--truncated {
		width: 200px;
	}

	.thumbnail {
		width: 100%;
		height: 50%;
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		border-radius: 1.5em;
	}

	.thumbnail-no-image {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 50%;
		border-radius: 0.5rem;

		filter: drop-shadow(1px 2px 1em #858585);
	}

	h1 {
		font-size: 1.5em;
		font-weight: 500;
		color: #fff;
	}

	h1,
	h2,
	h4 {
		margin: 0;
		padding: 0;
		color: white;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	a:visited {
		color: inherit;
	}
</style>
