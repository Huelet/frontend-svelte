<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { DateTime } from 'luxon';
	import type { Error } from '../../../types/error';
	import Avatar from '../../../components/avatar.svelte';
	import Toast from '../../../components/toast.svelte';
	import Player from '../../../components/player.svelte';
	import Skeleton from '../../../components/skeleton.svelte';
	import Follow from '../../../components/buttons/follow.svelte';
	import Chip from '../../../components/chip.svelte';
	import { WarningFilled, ChevronDown } from '../../../components/icons';

	let description = false;
	let vuid: string;
	let video: any;
	let creator: any;
	let error: Error | null = null;

	export let data: PageData;

	$: video = data.video;
	$: creator = data.creator;
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
						<a href="/c/@{creator?.username}" class="row">
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
