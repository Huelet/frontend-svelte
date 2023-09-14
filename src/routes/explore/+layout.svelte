<script lang="ts">
	import Logo from '../../components/logo.svelte';
	import Divider from '../../components/divider.svelte';
	import Typography from '../../components/typography.svelte';
	import { onMount } from 'svelte';
	import { News, Refresh, Stocks } from '../../components/icons';
	import {api_url} from '../../env';

	let timeOfDay: string;
	let weather: string;
	let locationData: any;
	let user: any;
	let following: any[] = [];

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
			fetch(`${api_url}/auth/user?username=${user}`)
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
    <div class="page-content">
        <div class="hello row">
            <Logo />
            <span class="column">
                <Typography fontSize={1.95} weight={500} element="h1">
                    Good {timeOfDay}!
                </Typography>
                <Typography>
                    It's {!weather ? 'Rainy' : weather} in {!locationData ? 'Seattle' : locationData.city}.
                </Typography>
            </span>
        </div>
        <div class="center">
            <div class="fyp-tags">
                {#each ['Trending', 'For You', 'New', 'Music', 'Podcasts', 'Example', 'Movies', 'Books', 'News'] as tag}
                <a href={`/explore/${tag.toLowerCase().replaceAll(' ', '')}`} class="tag">
                    <div class="fyp-tag-item center cursor">
                        <Typography truncated={true} size="lg">{tag}</Typography>
                    </div>
                </a>
                {/each}
            </div>
        </div>
        <slot />
    </div>
</main>

<!-- New Sidebar on the Right -->
<div class="sidebar">
    <div class="sidebar-button">
        <Stocks fill="white" />
    </div>
    <div class="sidebar-button">
        <News fill="white" />
    </div>
    <div class="sidebar-button">
        <Refresh fill="white" />
    </div>
    <Divider />
</div>

<style>
    main {
        height: 100vh;
        width: 100vw;
        display: flex;
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

    /* New Sidebar styles on the right */
    .sidebar {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        position: fixed;
        top: 0;
        right: 0; /* Position on the right */
        width: 55px; /* Width of the sidebar */
        height: 245px; /* Height of the sidebar */
        background-color: #333; /* Sidebar background color */
    }

    .sidebar-button {
        padding: 10px;
        text-align: center;
    }

 
	a {
		text-decoration: none;
		color: inherit;
	}

	a:visited {
		color: inherit;
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
