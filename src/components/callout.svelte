<!-- inspired by @fluentui/react, see best practices here:
https://developer.microsoft.com/en-us/fluentui#/controls/web/callout#best-practices -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Portal from './portal.svelte';

	export let open: boolean;
	export let withArrow: boolean = true;
	export let gap: number = 0;
	export let location: 'top' | 'bottom' | 'left' | 'right' = 'top';

	let calloutId: string = `callout-${Math.random().toString(36).substr(2, 9)}`;
	let targetLocation: DOMRect | null = null;
	let menuLocation: { top: number; left: number } = { top: 0, left: 0 };

	onMount(() => {
		targetLocation = document.querySelector(`#${calloutId}`)?.getBoundingClientRect() as DOMRect;
		menuLocation = {
			top: targetLocation?.top + 32 || 32,
			left: targetLocation?.left - 200 || 100
		};
	});

	let className: string = '';
	export { className as class };
</script>

<div id={calloutId}>
	<slot name="target" />
</div>

<Portal>
	<div
		class="callout {open ? 'open' : 'closed'} {withArrow
			? 'with-arrow'
			: ''} {location} {className}"
		style="top: {menuLocation?.top + gap || 15}px; left: {menuLocation?.left + gap || 15}px;"
	>
		{#if withArrow}
			<div
				class="arrow"
				style="top: -5px;
            right: 250px;"
			/>
		{/if}
		<slot />
	</div>
</Portal>

<style>
	.callout {
		position: absolute;
		z-index: 1000;
		pointer-events: none;

		padding: 1em;
		border-radius: 2em;

		max-width: 300px;
		min-width: 200px;

		background-color: #161616;
		box-shadow: 0 25.6px 57.6px 0 rgba(0, 0, 0, 0.22), 0 4.8px 14.4px 0 rgba(0, 0, 0, 0.18);
	}

	.callout.open {
		pointer-events: auto;
		opacity: 1;
	}

	.callout.closed {
		display: none;
	}

	.arrow {
		position: absolute;
		background-color: inherit;
		box-shadow: inherit;
		border: inherit;
		box-sizing: border-box;
		transform: rotate(45deg);
		height: 10px;
		width: 10px;
	}
</style>
