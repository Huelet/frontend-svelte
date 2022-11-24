<script lang="ts">
	import Typography from '../../components/typography.svelte';
	import IconButton from '../../components/icon-button.svelte';
	import Modal from '../../components/modal.svelte';
	import { Add, Video } from '../../components/icons';

	let createPlaylistModalOpen = false;
	let newPlaylistTitle: string;
	let newPlaylistDescription: string;
	let newPlaylistImage: any;

	let newPlaylistImageBlobUrl: string;

	function handleFiles(target: any) {
		let files = target.files;
		newPlaylistImageBlobUrl = URL.createObjectURL(files[0]);
	}

	const createPlaylist = async () => {
		const user = JSON.parse(localStorage.getItem('huelet:auth:user') as string);

		const formData = new FormData();
		formData.append(
			'playlist',
			JSON.stringify({
				name: newPlaylistTitle,
				description: newPlaylistDescription
			})
		);
		formData.append('image', newPlaylistImage);

		const resp = await fetch(`https://api.huelet.net/users/interact/playlists?userID=${user.uid}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('huelet:auth:token')}`
			},
			body: formData
		});

		const playlist = await resp.json();

		if (playlist.ok) {
			createPlaylistModalOpen = false;
		}
	};
</script>

<div class="body full page">
	<div class="side-bar">
		<Typography size="xl" weight={600} class="center">Your Collection</Typography>
		<div class="center">
			<div class="divider center" />
		</div>
		<div class="icon-grid center full-width">
			<div class="icon-grid__item" aria-label="Open create playlist modal">
				<IconButton onPress={() => (createPlaylistModalOpen = true)}>
					<Add fill="white" />
				</IconButton>
			</div>
			<div class="icon-grid__item">
				<a href="/collection/liked/" aria-label="Your liked videos">
					<IconButton>
						<svg height="16" width="16" viewBox="0 0 16 16" fill="white">
							<path
								d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"
							/>
						</svg>
					</IconButton>
				</a>
			</div>
			<div class="icon-grid__item">
				<a href="/collection/forlater/" aria-label="Your saved videos for later">
					<IconButton>
						<Video fill="white" />
					</IconButton>
				</a>
			</div>
		</div>
	</div>
	<slot />
</div>

<Modal open={createPlaylistModalOpen} onClose={() => (createPlaylistModalOpen = false)}>
	<Typography size="xl" weight={600} class="center">Create Playlist</Typography>

	<div class="row">
		<label for="playlist-image">
			{#if newPlaylistImageBlobUrl}
				<img src={newPlaylistImageBlobUrl} alt="Playlist" width="64" height="64" />
			{:else}
				<div class="icon-picker">
					<svelte:component this={Add} fill="white" />
				</div>
			{/if}
		</label>
		<input
			type="file"
			accept="image/*"
			bind:files={newPlaylistImage}
			on:change={(e) => handleFiles(e.target)}
			name="playlist-image"
			id="playlist-image"
		/>
		<div class="column center">
			<input
				type="text"
				placeholder="Playlist Name"
				class="textbox"
				bind:value={newPlaylistTitle}
			/>
			<textarea
				type="text"
				placeholder="Playlist Description"
				class="textbox"
				bind:value={newPlaylistDescription}
			/>
		</div>
	</div>
	<div class="column">
		<div class="button primary" on:click={() => createPlaylist()}>
			<Typography size="lg" weight={600} class="center">Create</Typography>
		</div>
		<div class="button secondary" on:click={() => (createPlaylistModalOpen = false)}>
			<Typography size="lg" weight={600} class="center">Cancel</Typography>
		</div>
	</div>
</Modal>

<style>
	.body {
		display: flex;
		flex-direction: row;
	}

	.side-bar {
		background-color: #0f0f0f;

		padding-top: 3.5em;

		width: 25%;
	}

	.divider {
		background-color: rgb(104, 104, 104);

		margin: 1em 0;

		width: 75%;
		height: 1px;
	}

	.icon-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-gap: 1em;
	}

	.icon-grid__item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon-picker {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 5em;
		height: 5em;

		border-radius: 0.5em;

		background-color: #535353;

		cursor: pointer;
	}

	label[for='playlist-image'] {
		cursor: pointer;
	}

	input[type='file'] {
		display: none;
	}

	.textbox {
		background-color: #303245;
		border-radius: 12px;
		border: 0;
		box-sizing: border-box;
		color: #eee;
		font-size: 18px;
		outline: 0;
		padding: 4px 20px 0;
		width: 100%;
	}

	.textbox::placeholder {
		color: #aaa;
	}

	.textbox:focus {
		border: 0.2em solid rgb(0, 140, 255);
		animation: focus 0.2s linear;
	}

	@keyframes focus {
		0% {
			border: 0em solid rgb(0, 140, 255);
		}
		100% {
			border: 0.2em solid rgb(0, 140, 255);
		}
	}

	@media (max-width: 768px) {
		.icon-grid {
			grid-gap: 0em;
		}
	}

	@media (max-width: 500px) {
		.icon-grid {
			grid-template-rows: repeat(2, 1fr);
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
