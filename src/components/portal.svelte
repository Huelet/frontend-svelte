<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let target: string = 'body';

	let ref: any;
	let portal: any;
	let className = '';
	export { className as class };

	onMount(() => {
		if (typeof document !== 'undefined') {
			portal = document.createElement('div');
			portal.className = 'portal';

			if (target === 'body') document.body.appendChild(portal);
			if (target.at(0) === '#' || target.at(0) === '.')
				document.querySelector(target)?.appendChild(portal);

			portal.appendChild(ref);
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			if (target === 'body') document.body.removeChild(portal);
			if (target.at(0) === '#' || target.at(0) === '.')
				document.querySelector(target)?.removeChild(portal);
		}
	});
</script>

<div bind:this={ref} class={className}>
	<slot />
</div>
