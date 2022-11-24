<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { DateTime } from 'luxon';
	import type { User } from '../../../types/account';
	import type { Error } from '../../../types/error';
	import Avatar from '../../../components/avatar.svelte';
	import Toast from '../../../components/toast.svelte';
	import Player from '../../../components/player.svelte';
	import Skeleton from '../../../components/skeleton.svelte';
	import Follow from '../../../components/buttons/follow.svelte';
	import Chip from '../../../components/chip.svelte';
	import Typography from '../../../components/typography.svelte';
	import Meta from '../../../components/meta.svelte';
	import {
		WarningFilled,
		ChevronDown,
		ThumbsDown,
		ThumbsUp,
		CalendarMonths,
		Share
	} from '../../../components/icons';

	let description = false;
	let user: User;
	let vuid: string;
	let video: any;
	let creator: any;
	let error: Error | null = null;

	export let data: PageData;

	$: video = data.video;
	$: creator = data.creator;

	onMount(() => {
		user = JSON.parse(localStorage.getItem('huelet:auth:user') as string);
	});

	const addLike = async () => {
		const res = await fetch(
			`https://api.huelet.net/videos/interact/upvote/${video.vuid}?userID=${user.uid}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('huelet:auth:token')}`
				}
			}
		);

		video.upvotes++;
	};

	const addDislike = async () => {
		const res = await fetch(
			`https://api.huelet.net/videos/interact/downvote/${video.vuid}?userID=${user.uid}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('huelet:auth:token')}`
				}
			}
		);

		video.downvotes++;
	};
</script>

<Meta
	title="{video.title} by {creator.username} on Huelet"
	description="Watch videos by {creator.username} on Huelet, the Video Platform for Humans"
	image={video.thumbnail}
/>

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
			<div class="actions">
				<div
					class="action like {video.liked ? 'active' : 'inactive'}"
					tabindex={0}
					aria-label="Like"
					on:click={() => addLike()}
				>
					<ThumbsUp fill="none" />
					<Typography weight={600}>{video.upvotes}</Typography>
				</div>
				<div class="action share" aria-label="Share" tabindex={0}>
					<Share fill="white" />
				</div>
				<div
					class="action forlater {video.saved?.includes('forlater') ? 'active' : 'inactive'}"
					aria-label="Save to watch later"
					tabindex={0}
				>
					<CalendarMonths fill="white" />
				</div>
				<div
					class="action dislike {video.dislike ? 'active' : 'inactive'}"
					tabindex={0}
					aria-label="Dislike"
					on:click={() => addDislike()}
				>
					<ThumbsDown fill="none" />
					<Typography weight={600}>{video.downvotes}</Typography>
				</div>
			</div>
		</div>
		<div class="details">
			{#if video}
				<Typography fontSize={3} weight={800}>{video.title}</Typography>
			{:else}
				<Skeleton width={15} />
			{/if}
			<section class="meta">
				<div class="meta-items">
					{#if creator}
						<a href="/c/@{creator?.username}" class="row">
							<div class="meta__item center">
								<Avatar url={creator.avatar} forceAltText="{creator.username}'s avatar" />
							</div>
							<div class="meta__item center">
								<Typography class="meta__item-creator-username" fontSize={1.17} weight={500}
									>@{creator.username}</Typography
								>
								<Typography>
									{creator.followers.length}{' '}
									{creator.followers.length === 1 ? 'follower' : 'followers'}
								</Typography>
								<Follow username={creator.username} />
							</div>
						</a>
						<div class="meta_item center">
							<div class="chip-grid in-meta_items">
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
							<div
								class="description-toggle"
								on:click={() => (description = !description)}
								aria-label="Toggle description"
							>
								<ChevronDown
									fill="white"
									class="description-toggle__icon {description ? 'description-toggle--open' : null}"
								/>
							</div>
						</div>
					{:else}
						<Skeleton width={10} />
					{/if}
				</div>
				<div class="description{description ? ' null' : '--closed'}">
					<div class="meta_item center">
						<div class="chip-grid in-description_menu">
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
		<WarningFilled fill="white" />
	</Toast>
{/if}

<style>
	main {
		display: flex;
		flex-direction: column;

		width: 60vw;
	}
	.content {
		padding: 1em;
	}

	.flask {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
	}

	.actions {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		border: rgb(50, 49, 48) solid 0.1em;
		border-radius: 0.5em;
		padding: 1em;
	}

	.action {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		border: transparent solid 1px;
		border-radius: 4px;

		margin: 0.1em 0 0 0;
		padding: 1em;

		transition: 0.1s ease-in-out;
		cursor: pointer;
	}

	.action:focus {
		outline: none;
	}

	.action.like:hover,
	.action.like:focus,
	.action.like.active {
		background-color: rgba(115, 255, 0, 0.15);
		border: rgba(0, 255, 0, 0.4) solid 1px;
	}

	.action.share:hover,
	.action.share:focus,
	.action.share.active {
		background-color: rgba(0, 0, 255, 0.15);
		border: rgba(0, 0, 255, 0.4) solid 1px;
	}

	.action.forlater:hover,
	.action.forlater:focus,
	.action.forlater.active {
		background-color: rgba(160, 160, 160, 0.15);
		border: rgba(160, 160, 160, 0.4) solid 1px;
	}

	.action.dislike:hover,
	.action.dislike:focus,
	.action.dislike.active {
		background-color: rgba(255, 118, 118, 0.15);
		border: rgba(255, 0, 0, 0.4) solid 0.5px;
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

	.chip-grid.in-description_menu {
		display: none;
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

		.flask {
			flex-direction: column;
		}

		.actions {
			flex-direction: row;
			justify-content: space-evenly;
		}

		.chip-grid.in-meta_items {
			display: none;
		}

		.chip-grid.in-description_menu {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 0.5em;
		}
	}
</style>
