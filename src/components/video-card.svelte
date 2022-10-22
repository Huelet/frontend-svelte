<script lang="ts">
	import Skeleton from './skeleton.svelte';
	import Avatar from './avatar.svelte';
	import '@fontsource/red-hat-display/300.css';
	import '@fontsource/red-hat-display/500.css';

	export let vuid = '';
	export let video: any = {};
	let videoData: any;
	let creatorData: any;
	let className: string = '';
	export { className as class };

	if (video) {
		videoData = video;
		creatorData = video.creator;

		fetch(`https://api.huelet.net/auth/user?uid=${videoData.authorId}`)
			.then((response) => response.json())
			.then((creator) => {
				creatorData = creator.data;
			});
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
		{#if videoData?.thumbnail}
			<div
				class="thumbnail center column"
				style={`background-image: url(${!videoData ? '' : videoData?.thumbnail});
				${videoData.flags.length >= 1 ? 'filter: blur(1.2em)' : ''}
			`}
			/>
		{:else}
			<div
				class="thumbnail center column"
				style={`background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGhJREFUeF7t1IEJACAMA0G7tOtXcIuH6wThUjL37B5HgACBgMAYrEBLIhIg8AUMlkcgQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEHjH03Ce+XXyMwAAAABJRU5ErkJggg==);`}
			>
				<img
					src="https://cdn.huelet.net/assets/emojis/Crying%20face/3D/crying_face_3d.png?raw=true"
					alt="Sad face with a single tear"
					class="emoji"
					width={64}
					height={64}
				/>
				<h1>We couldn't load this thumbnail</h1>
			</div>
		{/if}
		<div class="video-info">
			{#if videoData}
				<h1 class="video-title">{videoData.title}</h1>
			{:else}
				<Skeleton width={50} />
			{/if}
			{#if videoData}
				<h2 class="viewcount">{videoData.views} views</h2>
			{:else}
				<h2 class="viewcount">Loading views...</h2>
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
								<h2 class="creator-name">{creatorData?.username}</h2>

								{#if creatorData?.approved}
									<a href="https://docs.huelet.net/users/verified">
										<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M14.6941 3.28016C15.0917 3.66352 15.1032 4.29658 14.7198 4.69414L7.00556 12.6941C6.62661 13.0871 6.00251 13.1036 5.6034 12.7311L1.31769 8.73106C0.913935 8.35422 0.892115 7.72143 1.26895 7.31768C1.64578 6.91393 2.27857 6.89211 2.68232 7.26895L6.24879 10.5977L13.2802 3.30587C13.6635 2.90831 14.2966 2.8968 14.6941 3.28016Z"
												fill="green"
											/>
										</svg>
									</a>
								{/if}</span
							>
							<h4 class="creator-bio--truncated">
								{creatorData?.bio?.length > 50
									? creatorData.bio.substring(0, 50) + '...'
									: creatorData?.bio}
							</h4>
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

	.video-card > .video-info > .video-title {
		font-family: 'Red Hat Display', sans-serif;
		font-weight: 600;
		font-size: 2em;
		color: white;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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

	.video-card > .video-info > a > * > .creator > h4.creator-bio--truncated {
		font-family: 'Red Hat Display', sans-serif;
		font-weight: 300;
		font-size: 0.8em;
		width: 200px;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.thumbnail {
		width: 100%;
		height: 50%;
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		border-radius: 1.5em;
	}

	h1 {
		font-size: 1.5em;
		font-weight: 500;
		color: #fff;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p {
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
