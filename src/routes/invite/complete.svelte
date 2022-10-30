<script>
	import Typography from '../../components/typography.svelte';
</script>

<div class="column">
	<a href="/auth/settings/">
		<div class="button primary">
			<Typography size="md">I want to customize my account</Typography>
		</div>
	</a>
	<a href="/explore/">
		<div class="button secondary">
			<Typography size="md">Take me home</Typography>
		</div>
	</a>
</div>

<style>
	a {
		text-decoration: none;
	}
</style>
