<script>
	import Header from '../../components/header.svelte';
</script>

<main>
	<Header />
	<slot />
</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
	}
</style>
