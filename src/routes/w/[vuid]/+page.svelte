<script lang="ts">
	import { page } from '$app/stores';
	import { DateTime } from 'luxon';
	import type { Error } from '../../../types/error';
	import Avatar from '../../../components/avatar.svelte';
	import Toast from '../../../components/toast.svelte';
	import Player from '../../../components/player.svelte';
	import Skeleton from '../../../components/skeleton.svelte';
	import Follow from '../../../components/buttons/follow.svelte';
	import Chip from '../../../components/chip.svelte';

	let description: boolean = false;
	let vuid: string;
	let video: any;
	let creator: any;
	let error: Error | null = null;

	vuid = $page.params.vuid;

	fetch(`https://api.huelet.net/videos/lookup/${vuid}`)
		.then((res) => {
			if (res.status === 404) {
				error = {
					title: 'Not Found',
					message: "This video doesn't exist. Please double-check the URL.",
					severity: 'error',
					fatal: true
				};
				return;
			}
			if (res.status === 429) {
				error = {
					title: 'Too Many Requests',
					message: 'This resource has been rate limited',
					severity: 'warning'
				};
				return;
			} else return res.json();
		})
		.then((response: any) => {
			video = response.data;
			fetch(`https://api.huelet.net/auth/user?uid=${video.authorId}`)
				.then((res) => res.json())
				.then((response: any) => {
					creator = response.data;
				});
		})
		.catch((err) => {
			error = { title: 'An unknown error occured', message: err, severity: 'error', fatal: true };
			console.error(err);
		});
</script>

<div class="content">
	<main>
		<div class="flask">
			<div class="player-container">
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
		</div>
		<div class="details">
			{#if video}
				<h1 class="title details">{video.title}</h1>
			{:else}
				<Skeleton width={15} />
			{/if}
			<section class="meta">
				<div class="meta-items">
					{#if creator}
						<a href="/c/{creator?.username}" class="row">
							<div class="meta__item center">
								<Avatar url={creator.avatar} forceAltText="{creator.username}'s avatar" />
							</div>
							<div class="meta__item center">
								<h2 class="meta__item-creator-username">@{creator.username}</h2>
								<p>
									{creator.followers.length}{' '}
									{creator.followers.length === 1 ? 'follower' : 'followers'}
								</p>
								<Follow username={creator.username} />
							</div>
						</a>
						<div class="meta_item center">
							<div class="chip-grid">
								<Chip>
									{video.views}
									{video.views === 1 ? 'view' : 'views'}
								</Chip>
								<Chip>
									{video?.videoUploaded
										? DateTime.fromMillis(video?.videoUploaded).toRelative()
										: DateTime.fromMillis(Math.round(1637779853 * 1000)).toRelative()}
								</Chip>
							</div>
						</div>
						<div class="meta_item center">
							<div class="description-toggle" on:click={() => (description = !description)}>
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="white"
									xmlns="http://www.w3.org/2000/svg"
									class="description-toggle__icon {description ? 'description-toggle--open' : null}"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M1.29289 4.29289C1.68342 3.90237 2.31658 3.90237 2.70711 4.29289L8 9.58579L13.2929 4.29289C13.6834 3.90237 14.3166 3.90237 14.7071 4.29289C15.0976 4.68342 15.0976 5.31658 14.7071 5.70711L8.70711 11.7071C8.31658 12.0976 7.68342 12.0976 7.29289 11.7071L1.29289 5.70711C0.902369 5.31658 0.902369 4.68342 1.29289 4.29289Z"
									/>
								</svg>
							</div>
						</div>
					{:else}
						<Skeleton width={10} />
					{/if}
				</div>
				<div class="description{description ? ' null' : '--closed'}">
					{#if video}
						{@html video.description}
					{:else}
						<Skeleton width={10} />
					{/if}
				</div>
			</section>
		</div>
	</main>
</div>

{#if error}
	<Toast
		open={error === null ? false : true}
		onClose={() => (error = null)}
		type={error.severity}
		heading={error.title}
		body={error.message}
	>
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="white"
			xmlns="http://www.w3.org/2000/svg"
			slot="icon"
		>
			<g clip-path="url(#clip0_1510_470)">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M6.67433 1.50407L0.165688 13.7982C-0.363195 14.7972 0.361009 16 1.49137 16H14.5087C15.639 16 16.3632 14.7972 15.8343 13.7982L9.32569 1.50407C8.76228 0.439844 7.23774 0.439847 6.67433 1.50407ZM7.00001 6.00001C7.00001 5.44772 7.44773 5.00001 8.00001 5.00001C8.5523 5.00001 9.00001 5.44772 9.00001 6.00001V9.00001C9.00001 9.55229 8.5523 10 8.00001 10C7.44773 10 7.00001 9.55229 7.00001 9.00001V6.00001ZM7.00001 13C7.00001 12.4477 7.44773 12 8.00001 12C8.5523 12 9.00001 12.4477 9.00001 13C9.00001 13.5523 8.5523 14 8.00001 14C7.44773 14 7.00001 13.5523 7.00001 13Z"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1510_470">
					<rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0)" />
				</clipPath>
			</defs>
		</svg>
	</Toast>
{/if}

<style>
	main {
		display: flex;
		flex-direction: column;

		width: 40vw;
	}
	.content {
		padding: 1em;
	}

	.details {
		padding: 1em;
	}

	.meta {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		border: rgb(50, 49, 48) solid 0.1em;
		border-radius: 0.5em;
		padding: 1em;
	}

	.meta-items {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	.meta__item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.meta__item-creator-username {
		font-size: 1.17em;
	}

	.chip-grid {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 0.5em;
	}

	.title.details {
		font-size: 3em;
		margin: 0;
		padding: 0;
	}

	.description {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		padding: 1em;
	}

	.description--closed {
		display: none;
	}

	.description-toggle {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		padding: 0.5em;

		user-select: none;
		cursor: pointer;

		border: #fff solid 1px;
		border-radius: 50%;
	}

	.description-toggle__icon {
		transition: all 0.5s ease-in-out;
	}

	.description-toggle--open {
		transform: rotate(180deg);
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
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	a:visted {
		color: inherit;
	}

	@media (max-width: 768px) {
		main {
			width: 100vw;
		}

		.content {
			padding: 0;
		}
	}
</style>
