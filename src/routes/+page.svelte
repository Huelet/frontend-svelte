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
			Please note that Huelet is currently in alpha and might not be stable or secure.
			
			
		</Typography>
		<a href="https://dsc.gg/huelet"><div class="button primary">Join the Alpha tester program!</div></a>
		<a href="/auth/in"><div class="button secondary">I already have an account</div></a>
	</div>
</main>

<style>
	/* Reset some default browser styles */
html, body, div, span, h1, h2, h3, h4, h5, h6, p, a, img, ul, ol, li {
  margin: 0;
  padding: 0;
  border: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  color: #333;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

a {
  text-decoration: none;
  color: var(--text-primary-dark);
}

.hero {
  padding: 1rem;
  text-align: center;
}

@media (min-width: 768px) {
  .hero {
    padding: 2rem;
  }
}

.row {
  display: flex;
  align-items: center;
}

.column {
  flex: 1;
  margin-left: 1rem;
}

/* Styling for buttons */
.button {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.primary {
  background-color: #007BFF;
  color: white;
}

.secondary {
  background-color: #6C757D;
  color: white;
}

/* Styling for Typography component */
.typography {
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Styling for the logo */
.logo {
  width: 128px;
  height: 128px;
  /* Add any other necessary styles for your logo here */
}

</style>
