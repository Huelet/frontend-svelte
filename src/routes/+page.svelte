<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from '../components/logo.svelte';
	import Typography from '../components/typography.svelte';
	import Meta from '../components/meta.svelte';
	import '@fontsource/red-hat-display/700.css';

	onMount(() => {
		if (localStorage.getItem('huelet:auth:token') !== null) {
			location.assign('/explore/');
		}
	});
</script>

<Meta />

<main>
	<div class="hero">
		<div class="row center">
			<span
				on:contextmenu={(event) => {
					event.preventDefault();
				}}><Logo dimensions={128} /></span
			>
			<span class="column">
				<Typography weight={800} fontSize={2}>The Video Platform for Humans.</Typography>
			</span>
		</div>
		<Typography>
			Huelet is the free and open-source video platform for everyone. Huelet is currently in Alpha (This bulid is not stable) 
			
			
		</Typography>
		<a href="https://dsc.gg/huelet"><div class="button primary">Join the Alpha tester program!</div></a>
		<a href="/auth/in"><div class="button secondary">I already have an account</div></a>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}

	a {
		text-decoration: none;
	}

	a:visited {
		color: var(--text-primary-dark);
	}

	.hero {
		padding: 1rem;
	}

	@media (min-width: 768px) {
		.hero {
			padding: 2rem;
		}
	}
</style>
