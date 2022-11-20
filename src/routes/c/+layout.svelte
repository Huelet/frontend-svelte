<script lang="ts">
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { DateTime } from 'luxon';
	import Typography from '../../components/typography.svelte';
	import Avatar from '../../components/avatar.svelte';
	import Header from '../../components/header.svelte';
	import Card from '../../components/card.svelte';
	import Skeleton from '../../components/skeleton.svelte';
	import Follow from '../../components/buttons/follow.svelte';
	import { Notepad, Avatar as AvatarIcon, Calendar, Location } from '../../components/icons';

	let user: any;
	let username: string = $page.params.username.replace('@', '');
	let headerPhotoStyles: string;
	let userHeaderStyles: string;
	let loading = true;

	export let data: LayoutData;

	onMount(async () => {
		const handleScroll = () => {
			console.log('scroll');

			headerPhotoStyles = `background-size: ${100 + window.scrollY / 5}%;`;
			// userHeaderStyles = `opacity: ${window.scrollY};`;
		};

		window.addEventListener('scroll', handleScroll, false);
	});

	$: user = data.user;
	$: loading = typeof user?.videos === 'undefined';
</script>

<Header />
<slot />
<a href="./header/">
	{#if user?.header}
		<div
			title="header"
			class="header"
			style="background-image: url({user?.header});{headerPhotoStyles || ''}"
		/>
	{:else}
		<div
			title="header"
			class="header"
			style="background-image: url({user?.avatar});{headerPhotoStyles || ''}"
		/>
	{/if}
</a>
<Card padding={0}>
	<main class="row">
		<section class="row">
			<div class="avatar-container">
				{#if loading}
					<Skeleton circle={true} width={100} height={64} />
				{:else}
					<a href="./avatar/1/">
						{#key user?.avatar}
							<Avatar
								url={user?.avatar}
								forceAltText="{username}'s profile image"
								dimensions={128}
							/>
						{/key}
					</a>
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
					{#if loading}
						<Skeleton width={100} height={15} />
					{:else}
						<AvatarIcon fill="white" />
						<Typography size={'sm'}>{user.pronouns?.join('/') || 'Any pronouns'}</Typography>
					{/if}
				</span>
				<span class="row">
					{#if loading}
						<Skeleton width={100} height={15} />
					{:else}
						<Location fill="white" />
						<Typography size={'sm'}>{user?.location}</Typography>
					{/if}
				</span>
				<span class="row">
					{#if loading}
						<Skeleton width={100} height={15} />
					{:else}
						<Calendar fill="white" />
						<Typography size={'sm'}>
							Joined {typeof user === 'undefined'
								? 'loading...'
								: DateTime.fromMillis(Math.round(user?.createdAt * 1000)).toRelative()}
						</Typography>
					{/if}
				</span>
			</div>
		</section>
		<section class="column center">
			<Follow {username} />
		</section>
	</main>
</Card>

<style>
	:global(.card-outer) {
		display: flex !important;
		flex-direction: column !important;
		align-items: center !important;

		width: 99vw !important;
		height: 15em !important;
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

	.user-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		position: fixed;
		top: 0;

		backdrop-filter: blur(25px) brightness(0.5);
		background-color: rgba(24, 23, 24, 0.69);
		border: 1px solid rgba(255, 255, 255, 0.125);

		width: 100%;
		height: 3em;
	}

	.user-header__username {
		padding: 0;
		margin: 0 0 0 1em;
	}

	.user-header__follow {
		padding: 0;
		margin: 0 1em 0 0;
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

	.header {
		width: 100%;
		height: 15em;

		object-fit: cover;
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
