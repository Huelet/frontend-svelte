<script lang="ts">
	import type { Size } from '../types/components';

	export let size: Size = 'md';
	export let hoverEffect: boolean = true;
	export let onPress: () => void = () => {};

	let className: string = '';
	export { className as class };

	let hovered: boolean = false;
</script>

<div
	class="icon-button size-{size} {className}"
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
	on:click={onPress}
>
	<span class="icon {hoverEffect && hovered ? 'hovered' : null}"><slot /></span>
</div>

<style>
	.icon-button {
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 0.5em;

		border-radius: 0.5em;
	}

	.icon-button:hover {
		background-color: rgba(126, 126, 126, 0.5);

		cursor: pointer;
	}

	.icon.hovered {
		animation: rotate 0.3s ease-in-out;
	}

	.icon-button.size-xs {
		width: 1em;
		height: 1em;
	}

	.icon-button.size-sm {
		width: 2em;
		height: 2em;
	}

	.icon-button.size-md {
		width: 3em;
		height: 3em;
	}

	.icon-button.size-lg {
		width: 4em;
		height: 4em;
	}

	.icon-button.size-xl {
		width: 5em;
		height: 5em;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(25deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
</style>
