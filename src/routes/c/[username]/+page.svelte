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

	let user: any;
	let username: string = $page.params.username.replace('@', '');
	let loading: boolean = true;

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
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								xmlns="http://www.w3.org/2000/svg"
								fill="white"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M5 1C5 0.447715 4.55229 0 4 0C3.44771 0 3 0.447715 3 1V2.17071C1.83481 2.58254 1 3.69378 1 5V13C1 14.6569 2.34315 16 4 16H12C13.6569 16 15 14.6569 15 13V5C15 3.69378 14.1652 2.58254 13 2.17071V1C13 0.447715 12.5523 0 12 0C11.4477 0 11 0.447715 11 1V2H9V1C9 0.447715 8.55228 0 8 0C7.44772 0 7 0.447715 7 1V2H5V1ZM12 4C12.5523 4 13 4.44772 13 5V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V5C3 4.44772 3.44772 4 4 4H12Z"
								/>
								<path
									d="M5 5C4.44772 5 4 5.44772 4 6C4 6.55228 4.44772 7 5 7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H5Z"
								/>
								<path
									d="M5 8C4.44772 8 4 8.44772 4 9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8H5Z"
								/>
								<path
									d="M5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H7C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11H5Z"
								/>
							</svg>
							<Typography size={'sm'}
								><p class="bio">
									{@html user?.bio}
								</p></Typography
							>
						{/if}
					</span>
					<span class="row">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							xmlns="http://www.w3.org/2000/svg"
							fill="white"
						>
							<path
								d="M10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6C6 4.89543 6.89543 4 8 4C9.10457 4 10 4.89543 10 6Z"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.45618 15.8678C13.1792 15.1831 16 11.921 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.921 2.82082 15.1831 6.54382 15.8678C6.84774 15.9539 7.16849 16 7.5 16H8.5C8.83151 16 9.15226 15.9539 9.45618 15.8678ZM11.9999 12.4723C13.2275 11.3737 14 9.77705 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 9.77705 2.77255 11.3737 4.00011 12.4723C4.01499 10.5521 5.57624 9 7.5 9H8.5C10.4238 9 11.985 10.5521 11.9999 12.4723Z"
							/>
						</svg>
						<Typography size={'sm'}>{user?.pronouns.join('/')}</Typography>
					</span>
					<span class="row">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="white"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M14 6.36693C14 8.49125 11.8102 11.7281 10.0764 13.9579C8.99609 15.3474 7.00391 15.3474 5.92358 13.9579C4.1898 11.7281 2 8.49125 2 6.36693C2 2.85057 4.68629 0 8 0C11.3137 0 14 2.85057 14 6.36693ZM4 6.36693C4 3.84164 5.90105 2 8 2C10.099 2 12 3.84164 12 6.36693C12 6.87417 11.6894 7.8243 10.9468 9.13955C10.2506 10.3727 9.33544 11.6526 8.49753 12.7303C8.33733 12.9363 8.15257 13 8 13C7.84743 13 7.66267 12.9363 7.50247 12.7303C6.66456 11.6526 5.74942 10.3727 5.05321 9.13955C4.31062 7.8243 4 6.87417 4 6.36693Z"
							/>
						</svg>
						<Typography size={'sm'}>{user?.location}</Typography>
					</span>
					<span class="row">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="white"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M6 0C5.44771 0 5 0.447715 5 1V2H4C2.34315 2 1 3.34315 1 5V13C1 14.6569 2.34315 16 4 16H12C13.6569 16 15 14.6569 15 13V5C15 3.34315 13.6569 2 12 2H11V1C11 0.447715 10.5523 0 10 0C9.44772 0 9 0.447715 9 1V2H7V1C7 0.447715 6.55229 0 6 0ZM12 4H11C11 4.55228 10.5523 5 10 5C9.44772 5 9 4.55228 9 4H7C7 4.55228 6.55229 5 6 5C5.44771 5 5 4.55228 5 4H4C3.44772 4 3 4.44772 3 5V6H13V5C13 4.44772 12.5523 4 12 4ZM13 8V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V8H13Z"
							/>
						</svg>
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
