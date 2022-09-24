<script>
	import Header from '../../components/header.svelte';
</script>

<main>
	<Header />
	<div class="page-content">
		<slot />
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
</style>
