<script lang="ts">
	let className: string = '';
	export { className as class };
</script>

<div class="chip {className}">
	<slot />
</div>

<style>
	.chip {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		padding: 0.5em 1em;
		border-radius: 5rem;

		background: var(--accent-primary-dark);

		cursor: pointer;
		box-sizing: border-box;
		user-select: none;

		width: 9em;
		height: 1em;
	}
</style>
