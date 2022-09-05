<script lang="ts">
	import Logo from '../components/logo.svelte';
	import '@fontsource/red-hat-display/700.css';
</script>

<main>
	<div class="hero">
		<div class="row center">
			<span
				on:contextmenu={(event) => {
					event.preventDefault();
				}}><Logo dimensions={128} /></span
			>
			<span class="column">
				<h1 class="hero-text-big">The Video Platform for Humans.</h1>
			</span>
		</div>
		<p>
			Huelet is the free and open-source video platform for everyone. Sign up and immediately start
			posting videos, gain an audience, and grow your community!
		</p>
		<div class="button primary">Join Our Community</div>
		<div class="button secondary">I already have an account</div>
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
	.hero {
		padding: 1rem;
	}

	.hero-text {
		font-size: 2rem;
		font-weight: 700;
		margin-left: 1rem;
	}

	@media (min-width: 768px) {
		.hero {
			padding: 2rem;
		}
	}
</style>
