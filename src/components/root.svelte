<script lang="ts">
	import { Logger } from '../lib/logger';
	import { onMount } from 'svelte';

	onMount(() => {
		const logger = new Logger('root element');

		logger.neutral('component mounted');

		class RootElement extends HTMLElement {
			constructor() {
				super();
			}

			connectedCallback() {
				this.classList.add('root');
			}
		}

		customElements.define('root', RootElement);
	});
</script>

<root class="root">
	<slot />
</root>

<style>
	:host {
		display: block;
	}

	.root {
		width: 100vw;
	}
</style>
