<script lang="ts">
	export let circle: boolean = false;
	export let width: number = 100;
	export let height: number = 20;

	let styles: string;

	if (circle) styles = `border-radius: 50%;`;
	else styles = `border-radius: 0.25em;`;

	if (width !== 100) styles += `width: ${width}%;`;
	else styles += `width: 100%;`;
	if (height !== 20) styles += `height: ${height}px;`;
	else styles += `height: 20px;`;
</script>

<span class="loading-skeleton" style={styles}> &zwnj; </span>

<style>
	@keyframes loading-skeleton {
		100% {
			transform: translateX(100%);
		}
	}

	.loading-skeleton {
		--base-color: #4e4e4e;
		--highlight-color: #686868;
		--animation-duration: 1.5s;
		--animation-direction: normal;
		--pseudo-element-display: block; /* Enable animation */

		background-color: var(--base-color);

		display: inline-flex;
		line-height: 1;

		position: relative;
		overflow: hidden;
		z-index: 1; /* Necessary for overflow: hidden to work correctly in Safari */
	}

	.loading-skeleton::after {
		content: ' ';
		display: var(--pseudo-element-display);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		background-repeat: no-repeat;
		background-image: linear-gradient(
			90deg,
			var(--base-color),
			var(--highlight-color),
			var(--base-color)
		);
		transform: translateX(-100%);

		animation-name: loading-skeleton;
		animation-direction: var(--animation-direction);
		animation-duration: var(--animation-duration);
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}
</style>
