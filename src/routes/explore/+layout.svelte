<script lang="ts">
	import Logo from '../../components/logo.svelte';
	import Header from '../../components/header.svelte';
	import Divider from '../../components/divider.svelte';
	import Avatar from '../../components/avatar.svelte';
	import Drawer from '../../components/drawer.svelte';
	import { onMount } from 'svelte';

	let timeOfDay: string;
	let weather: string;
	let locationData: any;
	let user: any;
	let following: any[] = [];

	let drawer: boolean;

	const now = new Date();
	const hour = now.getHours();

	if (hour < 12) timeOfDay = 'morning';
	else if (hour < 18) timeOfDay = 'afternoon';
	else timeOfDay = 'evening';

	onMount(async () => {
		const userId = localStorage.getItem('userId');
		localStorage.getItem(`user-${userId}`)
			? (user = JSON.parse(localStorage.getItem(`user-${userId}`) as string))
			: (user = null);

		user?.following.forEach((user: any) => {
			fetch(`https://api.huelet.net/auth/user?username=${user}`)
				.then((res) => res.json())
				.then((data) => {
					following.push(data.data);
				});
		});
	});

	fetch('https://ipapi.co/json/')
		.then((response) => response.json())
		.then((data) => {
			locationData = data;
			// i know this includes my key but i do not give a hint of a reason to care
			fetch(
				`https://api.weatherapi.com/v1/current.json?key=1e9c6dd478af4f6fa8205430222106&q=${locationData.latitude},${locationData.longitude}&aqi=no`
			)
				.then((response) => response.json())
				.then((data) => {
					weather = data.current.condition.text;
				});
		});
</script>

<main>
	<Header />
	<div class="page-content">
		<div class="hello row">
			<Logo />
			<span class="column">
				<h1>
					Good {timeOfDay}!
				</h1>
				<h3>
					It's {!weather ? 'Rainy' : weather} in {!locationData ? 'Seattle' : locationData.city}.
				</h3></span
			>
		</div>
		<div class="center">
			<div class="fyp-tags">
				{#each ['Trending', 'For You', 'New', 'Music', 'Podcasts', 'Shows', 'Movies', 'Books', 'News'] as tag}
					<a href={`/explore/${tag.toLowerCase().replaceAll(' ', '')}`} class="tag">
						<div class="fyp-tag-item center cursor">
							<h3 class="fyp-tag-descriptor">{tag}</h3>
						</div>
					</a>
				{/each}
			</div>
		</div>
		<slot />
		<div class="sidebar column center">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="white"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_1509_91)">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M3.00001 0C1.34315 0 7.15256e-06 1.34315 7.15256e-06 3V11.9954C-2.38419e-06 11.9979 -2.38419e-06 12.0005 7.15256e-06 12.003V13C7.15256e-06 14.6569 1.34315 16 3.00001 16H13C14.6569 16 16 14.6569 16 13V5.01642C16.0002 5.00598 16.0002 4.99554 16 4.98511V3C16 1.34315 14.6569 0 13 0H3.00001ZM14 8.00008V13C14 13.5523 13.5523 14 13 14H10.0001V9.34758L11.6637 9.94174C12.0765 10.0891 12.5371 9.95062 12.8001 9.6L14 8.00008ZM8.00007 14H3.00001C2.44772 14 2.00001 13.5523 2.00001 13V12.3253L5.36859 7.69347L8.00007 8.63329V14ZM2.00001 8.9249V3C2.00001 2.44772 2.44772 2 3.00001 2H8.00007V6.50957L5.33641 5.55826C4.91854 5.40902 4.45231 5.55298 4.19133 5.91183L2.00001 8.9249ZM10.0001 2V7.22385L11.6423 7.81036L14 4.66675V3C14 2.44772 13.5523 2 13 2H10.0001Z"
					/>
				</g>
				<defs>
					<clipPath id="clip0_1509_91">
						<rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0)" />
					</clipPath>
				</defs>
			</svg>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="white"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6 5C6 4.44772 6.44771 4 7 4H10C10.5523 4 11 4.44772 11 5C11 5.55228 10.5523 6 10 6H7C6.44771 6 6 5.55228 6 5Z"
				/>
				<path
					d="M3 5C3 4.44772 3.44771 4 4 4C4.55229 4 5 4.44772 5 5C5 5.55228 4.55229 6 4 6C3.44771 6 3 5.55228 3 5Z"
				/>
				<path
					d="M4 7C3.44771 7 3 7.44772 3 8C3 8.55228 3.44771 9 4 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H4Z"
				/>
				<path
					d="M3 11C3 10.4477 3.44771 10 4 10H10C10.5523 10 11 10.4477 11 11C11 11.5523 10.5523 12 10 12H4C3.44771 12 3 11.5523 3 11Z"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M3 1C1.34315 1 0 2.34315 0 4V12C0 13.6569 1.34315 15 3 15H13C14.6569 15 16 13.6569 16 12V6C16 5.44772 15.5523 5 15 5H14V4C14 2.34315 12.6569 1 11 1H3ZM11 3H3C2.44772 3 2 3.44772 2 4V12C2 12.5523 2.44772 13 3 13H11C11.5523 13 12 12.5523 12 12V4C12 3.44772 11.5523 3 11 3Z"
				/>
			</svg>

			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="white"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_1509_25)">
					<path
						d="M16 1.00011C16 0.447822 15.5523 0.000106812 15 0.000106812C14.4478 0.000106812 14 0.447822 14 1.00011V1.65079C14 1.98805 14 2.15668 13.9435 2.22577C13.8914 2.28939 13.8247 2.31975 13.7425 2.31727C13.6533 2.31458 13.5189 2.19761 13.2501 1.96366C11.8451 0.740653 10.0091 0.000106812 8.00004 0.000106812C3.58177 0.000106812 4.57764e-05 3.58183 4.57764e-05 8.00011C4.57764e-05 12.4184 3.58177 16.0001 8.00004 16.0001C9.60774 16.0001 11.1047 15.5259 12.3586 14.7097C13.2215 14.1479 12.7183 13.0001 11.6886 13.0001C11.4468 13.0001 11.2122 13.0745 11.003 13.1957C10.1198 13.7073 9.09411 14.0001 8.00004 14.0001C4.68634 14.0001 2.00005 11.3138 2.00005 8.00011C2.00005 4.6864 4.68634 2.00011 8.00004 2.00011C9.97245 2.00011 11.7226 2.95185 12.8162 4.42114C12.9396 4.58697 13.0014 4.66988 12.9994 4.75594C12.9977 4.8268 12.9592 4.90348 12.9033 4.94711C12.8355 5.00011 12.725 5.00011 12.5039 5.00011L10 5.00011C9.44776 5.00011 9.00004 5.44782 9.00004 6.00011C9.00004 6.55239 9.44776 7.00011 10 7.00011L15 7.00011C15.5523 7.00011 16 6.55239 16 6.00011V1.00011Z"
					/>
				</g>
				<defs>
					<clipPath id="clip0_1509_25">
						<rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0)" />
					</clipPath>
				</defs>
			</svg>
			<Divider />
		</div>
	</div>
</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
	}

	.page-content {
		padding: 32px 0 0 0;
	}

	.hello {
		padding: 1em;
		height: 64px;
	}

	.fyp-tags {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		overflow-x: auto;
		width: 90%;
		background-color: #343333;
		padding: 0.5em 0 0.5em 0;
		border-radius: 0.5em;
	}

	.fyp-tags > * > .fyp-tag-item {
		width: 80px;
		background-color: #646464;
		padding: 0.5em;
		margin: 0 0.5em 0 0.5em;
		border-radius: 0.25em;
	}

	.fyp-tags > * > .fyp-tag-item > .fyp-tag-descriptor {
		font-size: 1.25em;
		font-weight: 300;
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.sidebar {
		display: flex;
		justify-content: space-evenly;

		position: fixed;

		top: 25%;
		right: 0;
		bottom: 0;
		width: 64px;
		height: 50vh;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	a:visited {
		color: inherit;
	}
	h1,
	h3 {
		font-family: var(--font-text);
		margin: 0;
		padding: 0;
	}

	h1 {
		font-size: 1.95em;
	}

	h3 {
		font-size: 1em;
	}

	@media (max-width: 600px) {
		.fyp-tags {
			margin: 0;
		}

		.fyp-tags > .fyp-tag-item {
			margin: 0 0.25em 0 0.25em;
		}
	}
</style>
