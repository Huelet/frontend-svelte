<script lang="ts">
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import { DateTime } from 'luxon';
	import {
		Search,
		VideoCamera,
		Settings,
		Send,
		PaintBrush,
		Accessibility,
		Help,
		Notepad,
		All,
		GridAlt,
		Inbox
	} from './icons';
	import Logo from './logo.svelte';
	import Avatar from './avatar.svelte';
	import Portal from './portal.svelte';
	import Typography from './typography.svelte';
	import Callout from './callout.svelte';

	let showMenu: boolean;
	let loggedIn: boolean = false;
	let user: any = null;
	let query: string;
	let className = '';
	export { className as class };

	let menu: boolean = false;
	let menuTargetId: string = `menu-target-${Math.random().toString(36).substr(2, 9)}`;
	let targetLocation: DOMRect | null = null;
	let menuLocation: { top: number; left: number } = { top: 0, left: 0 };

	onMount(() => {
		if (localStorage.getItem('huelet:auth:token') !== null) {
			loggedIn = true;
		}

		loggedIn
			? (user = JSON.parse(localStorage.getItem('huelet:auth:user') as string))
			: (user = null);

		targetLocation = document.querySelector(`#${menuTargetId}`)?.getBoundingClientRect() as DOMRect;
		menuLocation = {
			top: targetLocation?.top + 32 || 32,
			left: targetLocation?.left - 200 || 100
		};
	});

	$: {
		if ($navigating) {
			menu = false;
		}
	}
</script>

<div class="header-global row center {className}">
	<header class="row">
		<a href={loggedIn ? '/explore' : '/'}><Logo dimensions={32} /></a>
		<div class="row center">
			<input type="text" placeholder="Search" bind:value={query} class="search" />
			<div class="search-button button primary">
				<Search fill="white" width={16} height={16} />
			</div>
		</div>
	</header>
	<nav>
		<div class="actions row center">
			<span>
				<Callout open={showMenu} location="bottom">
					<span on:click={() => (showMenu = !showMenu)} slot="target" aria-label="Toggle inbox">
						<Inbox fill="white" width={28} height={28} class="cursor" />
					</span>
					<Typography size="xl">
						We're still working on this feature. Please check back later!
					</Typography>
				</Callout>
			</span>
			<a href="https://dash.huelet.net" aria-label="Video publishing dashboard">
				<VideoCamera fill="white" width={28} height={28} />
			</a>
			<a href="/collection" aria-label="Your collection">
				<GridAlt fill="white" width={28} height={28} />
			</a>
			{#if loggedIn}
				<span
					class="avatar-menu-toggle"
					on:click={() => (menu = !menu)}
					id={menuTargetId}
					aria-label="Toggle avatar menu"
				>
					<Avatar
						url={user?.avatar ||
							`https://cdn.huelet.net/assets/avatars/1916688602623198526477735532393069233691739314463003${Math.round(
								Math.random() * 15
							)}.png`}
						forceAltText="{user?.username}'s avatar"
						dimensions={32}
					/>
				</span>
			{:else}
				<a href="/auth/in">
					<div class="button-sign-in">
						<Typography size="sm" weight={700}>Sign In</Typography>
					</div>
				</a>
			{/if}
			{#if menu && loggedIn}
				<Portal>
					<div
						class="avatar-menu"
						style="
					top: {menuLocation?.top}px;
					Right: {menuLocation?.Right}px;
				"
					>
						<div class="avatar-menu__inner">
							<div class="avatar-menu__label">
								<Typography color="rgb(144, 146, 150)" size="lg" weight={700}>
									Hello, {user?.username}
								</Typography>
								<Typography color="rgb(144, 146, 150)" size="sm" weight={400}>
									It's {DateTime.local().toLocaleString(DateTime.TIME_SIMPLE)}
								</Typography>
							</div>
							<div class="avatar-menu__label">
								<Typography color="rgb(144, 146, 150)" size="sm" weight={600}>
									Your account
								</Typography>
							</div>
							<a href="/auth/settings/">
								<div class="avatar-menu__item-container">
									<div class="avatar-menu__item">
										<div class="avatar-menu__item--icon">
											<Settings fill="white" />
										</div>
										<Typography>Settings</Typography>
									</div>
								</div>
							</a>
							<a href="/auth/invite/">
								<div class="avatar-menu__item-container">
									<div class="avatar-menu__item">
										<div class="avatar-menu__item--icon">
											<Send fill="white" />
										</div>
										<Typography>Invite</Typography>
									</div>
								</div>
							</a>
							<a href="/auth/settings/view/">
								<div class="avatar-menu__item-container">
									<div class="avatar-menu__item">
										<div class="avatar-menu__item--icon">
											<PaintBrush fill="white" />
										</div>
										<Typography>Customization</Typography>
									</div>
								</div>
							</a>
							<a href="/auth/settings/accessibility">
								<div class="avatar-menu__item-container">
									<div class="avatar-menu__item">
										<div class="avatar-menu__item--icon">
											<Accessibility fill="white" />
										</div>
										<Typography>Accessibility</Typography>
									</div>
								</div>
							</a>
							<div class="avatar-menu__label">
								<Typography color="rgb(144, 146, 150)" size="sm" weight={600}>Help</Typography>
							</div>
							<a href="https://docs.huelet.net">
								<div class="avatar-menu__item-container">
									<div class="avatar-menu__item">
										<div class="avatar-menu__item--icon">
											<Help fill="white" />
										</div>
										<Typography>Help Center</Typography>
									</div>
								</div>
							</a>
							<a href="/s/report">
								<div class="avatar-menu__item-container">
									<div class="avatar-menu__item">
										<div class="avatar-menu__item--icon">
											<Notepad fill="white" />
										</div>
										<Typography> So many Problems </Typography>
									</div>
								</div>
							</a>
							<div class="avatar-menu__label">
								<Typography color="rgb(144, 146, 150)" size="sm" weight={600}>Your Data</Typography>
							</div>
							<a href="/auth/settings/data/">
								<div class="avatar-menu__item-container">
									<div class="avatar-menu__item">
										<div class="avatar-menu__item--icon">
											<All fill="white" />
										</div>
										<Typography>Your data within Huelet</Typography>
									</div>
								</div>
							</a>
						</div>
					</div>
				</Portal>
			{/if}
		</div>
	</nav>
</div>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between !important;

		width: 50%;
	}

	.header-global {
		position: fixed;
		width: 100vw;
		height: 32px;
		background-color: #1a1b1e;
		justify-content: space-between !important;
	}

	.search {
		width: 12em;
		height: 80%;
		padding: 0.1em;
		background-color: #303245;
		border: 2px solid rgba(15, 119, 255, 0.733);
		border-radius: 0.7em;
		color: #fff;
	}
	.search-button {
		height: auto !important;
		width: auto !important;
		padding: 0.2em !important;
		border-radius: 50%;
		margin-top: 0 !important;
	}

	.button-sign-in {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		padding-left: 1em;
		padding-right: 1em;

		background-color: transparent;
		border: 1px solid var(--accent-primary-dark);
		border-radius: 5px;
	}

	.button-sign-in:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.avatar-menu-toggle {
		display: inline-flex;

		height: 32px;

		cursor: pointer;
	}

	.avatar-menu {
		position: absolute;

		width: 200px;

		background-color: rgb(37, 38, 43);
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		border: 1px solid rgb(55, 58, 64);
		border-radius: 4px;

		padding: 0.25em;

		animation: avatar-menu-toggle 100ms linear;
	}

	.avatar-menu__inner {
		display: flex;
		flex-direction: column;

		outline: 0px;
	}

	.avatar-menu__label {
		padding: calc(5px) 12px;
	}

	.avatar-menu__item-container {
		width: 100%;

		border-radius: 4px;

		cursor: pointer;
	}

	.avatar-menu__item {
		display: flex;
		align-items: center;

		width: 50%;
		padding: 0.25em 0.5em;

		border-radius: 4px;

		cursor: pointer;
	}

	.avatar-menu__item--icon {
		display: flex;
		align-items: center;
		justify-content: center;

		margin: 0 10px 0 0;
	}

	.avatar-menu__item-container:hover {
		background-color: rgba(92, 95, 102, 0.35);
	}

	a {
		color: white;
		text-decoration: none;
	}

	@keyframes avatar-menu-toggle {
		0% {
			opacity: 0;
			transform: scale(0.9);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (max-width: 600px) {
		.search {
			width: 8em;
		}
	}
</style>
