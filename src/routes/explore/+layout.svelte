<script lang="ts">
	import Logo from '../../components/logo.svelte';
	import Divider from '../../components/divider.svelte';
	import Typography from '../../components/typography.svelte';
	import { onMount } from 'svelte';
	import { News, Refresh, Stocks } from '../../components/icons';
	import { api_url } from '../../env';
</script>


<main>
    <div class="sidebar">
        <div class="sidebar-buttons">
            <button class="sidebar-button">1</button>
            <button class="sidebar-button">2</button>
            <button class="sidebar-button">3</button>
            <button class="sidebar-button">4</button>
            <button class="sidebar-button">5</button>
        </div>
    </div>
    <div class="page-content">
        <div class="center">
            <div class="fyp-tags-top">
                <a href="/explore" class="tag">
                    <div class="fyp-tag-item center cursor">
                        <Typography truncated={true} size="lg">Explore</Typography>
                    </div>
                </a>
                <a href="/explore/videosfyp" class="tag">
                    <div class="fyp-tag-item center cursor">
                        <Typography truncated={true} size="lg">Videos fyp</Typography>
                    </div>
                </a>
                <a href="/explore/forumsfyp" class="tag">
                    <div class="fyp-tag-item center cursor">
                        <Typography truncated={true} size="lg">Forums fyp</Typography>
                    </div>
                </a>
                <a href="/explore/postfyp" class="tag">
                    <div class="fyp-tag-item center cursor">
                        <Typography truncated={true} size="lg">Post fyp</Typography>
                    </div>
                </a>
                <a href="/explore/newsfyp" class="tag">
                    <div class="fyp-tag-item center cursor">
                        <Typography truncated={true} size="lg">News fyp</Typography>
                    </div>
                </a>
            </div>
        </div>
    </div>
</main>


<style>
    main {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: space-between; /* Move content to the left */
    }

    .hello {
        padding: 1em;
        height: 64px;
    }

    .center {
        flex-grow: 1;
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

    .sidebar {
        position: fixed;
        top: 1in; /* Lowered by an inch */
        right: 0.5cm; /* Moved 0.5cm away from the right edge */
        width: 55px;
        height: 245px; /* Set to 245px */
        background-color: #343333;
        border-radius: 8px; /* All corners with radius 8 */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .sidebar-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .sidebar-button {
        background-color: #646464;
        border-radius: 8px; /* All corners with radius 8 */
        padding: 0.25em 0.5em; /* Reduced button size */
        color: white;
        border: none;
        cursor: pointer;
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

    .sidebar-buttons button:active {
        background-color: #796AD7; /* Change color when clicked */
    }

    .fyp-tags-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        overflow-x: auto;
        width: 90%;
        background-color: #343333;
        padding: 0.5em 0 0.5em 0;
        border-radius: 0.5em;
    }

    .fyp-tags-top .tag {
        text-decoration: none;
        color: inherit;
    }

    .fyp-tags-top .tag:hover .fyp-tag-item {
        background-color: #796AD7; /* Change color on hover */
    }

    .fyp-tags-top .tag .fyp-tag-item {
        width: 80px;
        background-color: #646464;
        padding: 0.5em;
        margin: 0 0.5em 0 0.5em;
        border-radius: 0.25em;
    }
</style>

