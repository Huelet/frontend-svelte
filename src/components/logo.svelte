<script lang="ts">
	export let dimensions = 64;

	let className = '';
	export { className as class };
</script>

<img
	src="https://cdn.huelet.net/assets/logo.png"
	alt="Huelet"
	width={dimensions}
	height={dimensions}
	class={className}
/>

<style>
	img {
		object-fit: contain;
		border-radius: 50%;
		user-select: none;
	}
</style>
