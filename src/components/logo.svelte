<script lang="ts">
	import logo from '$lib/static/logo.png';

	export let dimensions = 64;

	let className = '';
	export { className as class };
</script>

<img
	src={logo}
	alt="Shards logo"
	width={dimensions}
	height={dimensions}
	class={className}
	{...$$restProps}
/>

<style>
	img {
		object-fit: contain;
		border-radius: 50%;
		user-select: none;
	}
</style>
