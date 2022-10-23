<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let ref: any;
	let portal: any;
	let className = '';
	export { className as class };

	onMount(() => {
		if (typeof document !== 'undefined') {
			portal = document.createElement('div');
			portal.className = 'portal';
			document.body.appendChild(portal);
			portal.appendChild(ref);
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.body.removeChild(portal);
		}
	});
</script>

<div bind:this={ref} class={className}>
	<slot />
</div>
