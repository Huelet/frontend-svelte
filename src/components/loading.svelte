<script lang="ts">
	import { CSSManager } from '$lib/classes';

	export let dimensions: number = 32;

	const css = new CSSManager();
	const loader = css.createClass([`width: ${dimensions}px`, `height: ${dimensions}px;`]);
</script>

<div class="loading-container {css.accessClass(loader)}">
	<div class="loading loading__1 {css.accessClass(loader)}" />
	<div class="loading loading__2 {css.accessClass(loader)}" />
</div>

<style>
	.loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading {
		position: absolute;

		padding: 0;
		margin: 0;

		border: 5px solid rgba(119, 0, 255, 0.1);
		border-bottom-color: rgb(119, 0, 255);
		border-radius: 50%;
		display: inline-block;
		animation: rotation-fast ease infinite;
	}

	.loading__1 {
		animation-duration: 1s;
	}

	.loading__2 {
		animation-duration: 0.75s;
	}

	@keyframes rotation-fast {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
