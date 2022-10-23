<script lang="ts">
	import { page } from '$app/stores';
	import { DateTime } from 'luxon';
	import Typography from '../../../components/typography.svelte';
	import Avatar from '../../../components/avatar.svelte';
	import Card from '../../../components/card.svelte';
	import Skeleton from '../../../components/skeleton.svelte';
	import Follow from '../../../components/buttons/follow.svelte';
	import Root from '../../../components/root.svelte';
	import VideoCard from '../../../components/video-card.svelte';
	import { Notepad, Avatar as AvatarIcon, Calendar, Location } from '../../../components/icons';

	let user: any;
	let username: string = $page.params.username.replace('@', '');
	let loading = true;

	fetch(`https://api.huelet.net/auth/user?username=${username}`)
		.then((res) => res.json())
		.then((response: any) => {
			user = response.data;
			fetch(`https://api.huelet.net/videos/search/fromcreator?creatorId=${user.uid}`)
				.then((res) => res.json())
				.then((response: any) => {
					user.videos = response.data;
					loading = false;
				});
		});

	$: loading = typeof user?.videos === 'undefined';
</script>

<Root>
	{#if user?.header}
		<img src={user.header} alt="header" />
	{:else}
		<div class="header default" />
	{/if}
	<Card padding={0} class="user-card">
		<main class="row">
			<section class="row">
				<div class="avatar-container">
					{#if loading}
						<Skeleton circle={true} width={100} height={64} />
					{:else}
						{#key user?.avatar}
							<Avatar
								url={user?.avatar}
								forceAltText="{username}'s profile image"
								dimensions={128}
							/>
						{/key}
					{/if}
				</div>
				<div class="column center-horizontally">
					{#if loading}
						<Skeleton width={100} height={15} />
					{:else}
						<Typography size={'xl'} weight={900}>@{user?.username}</Typography>
					{/if}
					<span class="row">
						{#if loading}
							<Skeleton width={100} height={15} />
						{:else}
							<Notepad fill="white" />
							<Typography size={'sm'}
								><p class="bio">
									{@html user?.bio}
								</p></Typography
							>
						{/if}
					</span>
					<span class="row">
						<AvatarIcon fill="white" />
						<Typography size={'sm'}>{user?.pronouns.join('/')}</Typography>
					</span>
					<span class="row">
						<Location fill="white" />
						<Typography size={'sm'}>{user?.location}</Typography>
					</span>
					<span class="row">
						<Calendar fill="white" />
						<Typography size={'sm'}>
							Joined {typeof user === 'undefined'
								? 'loading...'
								: DateTime.fromMillis(Math.round(user?.createdAt * 1000)).toRelative()}
						</Typography>
					</span>
				</div>
			</section>
			<section class="column center">
				<Follow {username} />
			</section>
		</main>
	</Card>
</Root>

<style>
	:global(.root) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	:global(root > .user-card > .card-outer) {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 99vw;
		height: 15em;
	}

	main {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		width: 90vw;
	}

	section {
		display: flex;
	}

	.header {
		width: 100%;
		height: 300px;
	}

	.header.default {
		background-color: var(--accent-primary-dark);
	}

	.avatar-container {
		margin: 0 1rem;
	}

	.bio {
		margin: 0;
	}

	.grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;

		width: 100%;
		height: 100%;
	}

	.video-grid {
		display: grid;
		place-items: center;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1em;
	}
</style>
