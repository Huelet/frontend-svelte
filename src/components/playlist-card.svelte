<script lang="ts">
	import { CSSManager } from '$lib/classes';
	import type { Playlist } from '../types/playlist';
	import type { User } from '../types/account';
	import Avatar from './avatar.svelte';
	import Typography from './typography.svelte';
	import { Check, Video } from './icons';
    import {api_url} from '../env';
	
	export let playlistId: string = '';
	export let playlist: Playlist | undefined = undefined;
	let playlistOwner: User | undefined = undefined;

	fetch(`${api_url}/auth/user?uid=${playlist?.owner}`)
		.then((resp) => resp.json())
		.then((data) => (playlistOwner = data.data));

	const css = new CSSManager();
	const image = css.createClass([`background: url(${playlist?.image}) no-repeat center center;`]);
</script>

<a href="/collection/playlists/{playlist?._id}">
	<div class="playlist-card">
		{#if playlist?.image}
			<div class="playlist-card__cover {css.accessClass(image)}" />
		{:else}
			<div class="playlist-card__cover playlist-card__cover--empty">
				<Video fill="#b3b3b3" width={32} height={32} />
			</div>
		{/if}
		<div class="playlist-info full-width column">
			<Typography truncated={true} weight={700} color="#b3b3b3">PLAYLIST</Typography>
			<Typography truncated={true} weight={600} fontSize={2}>{playlist?.name}</Typography>
			<a href="/c/@{playlistOwner?.username}">
				<div class="row">
					<Avatar
						url={playlistOwner?.avatar ||
							`https://cdn.huelet.net/assets/avatars/1916688602623198526477735532393069233691739314463003${Math.round(
								Math.random() * 15
							)}.png`}
						forceAltText={`${playlistOwner?.username}'s avatar`}
						dimensions={32}
					/>
					<div class="creator">
						<span class="row">
							<div class="creator">
								<span class="row">
									<Typography>@{playlistOwner?.username}</Typography>

									{#if playlistOwner?.approved}
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
										{playlistOwner?.bio}
									</Typography>
								</div>
							</div>
						</span>
					</div>
				</div>
			</a>
		</div>
	</div>
</a>

<style>
	.playlist-card {
		width: 16.5em;
		height: 17em;
		border-radius: 1.5em;

		background-color: rgb(37, 38, 43);
	}

	.playlist-card__cover {
		width: 100%;
		height: 50%;
		border-radius: 0.5rem;
	}

	.playlist-card__cover--empty {
		display: flex;
		align-items: center;
		justify-content: center;

		filter: drop-shadow(1px 2px 1em #858585);
	}

	.playlist-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;

		padding: 0.5em;
	}

	a {
		text-decoration: none;
		color: inherit;

		width: max-content;
		height: max-content;
	}

	a:visited {
		color: inherit;
	}
</style>
