<script lang="ts">
	import Divider from './divider.svelte';
	import Typography from './typography.svelte';

	export let title = '';
	export let sub = '';
	export let padding = 7;
	export let full = false;
	export let cursor = false;

	let className = '';
	export { className as class };
</script>

<div class={`${full ? 'full-page-wrapper' : null} ${cursor ? 'cursor' : null}`}>
	<div
		class={`card-outer ${full ? 'full-card' : null} ${className}`}
		style={`padding: ${padding}em`}
	>
		{#if title}
			<div>
				<Typography class="card-title" fontSize={1.5} weight={800} element="h1">
					{title}
				</Typography>
				{#if sub}
					<Typography class="card-sub" fontSize={1.5}>{sub}</Typography>
				{/if}
				<Divider />
			</div>
		{/if}
		<div class="card-inner">
			<slot />
		</div>
	</div>
</div>

<style>
	.full-page-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #181718;
		color: #ffffff;
		width: 100vw;
		height: 100vh;
	}

	.card-outer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 7em;
		height: 7em;
		background: rgba(255, 255, 255, 0.2);
		border: 0.1em solid rgba(0, 0, 0, 0.15);
		border-radius: 10px;
	}

	.card-title {
		font-size: 3em;
	}

	.card-sub {
		font-size: 1.5em;
	}

	.full-card {
		width: auto;
		height: auto;
	}

	@media only screen and (max-width: 600px) {
		.full-page-wrapper {
			display: flex;
			flex-direction: column;
			width: 100vw;
			height: 100vh;
		}

		.card-outer {
			width: 100%;
			height: 100%;
			border-radius: 5px;
			padding: 3em !important;
		}
	}
</style>
