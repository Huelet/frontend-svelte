<script lang="ts">
	import { onMount } from 'svelte';
	import { Close } from './icons';
	import Portal from './portal.svelte';

	export let open: boolean;
	export let onClose: () => void;
	export let withCloseIcon: boolean = true;

	onMount(() => {
		// todo make this more efficient
		setInterval(() => {
			open && document.getElementById('main')?.classList.add('modal-open');
			!open && document.getElementById('main')?.classList.remove('modal-open');
		}, 1);
	});
</script>

<Portal>
	<div class="modal-outer {open || 'closed'}">
		<div class="modal-inner">
			{#if withCloseIcon}
				<div class="close-icon center" on:click={onClose}>
					<span class="close-icon-inner">
						<Close fill="white" />
					</span>
				</div>
			{/if}
			<div class="modal-content">
				<slot />
			</div>
		</div>
	</div>
</Portal>

<style>
	:global(.modal-open) {
		filter: blur(1em);
	}

	:global(.modal-outer) {
		filter: blur(0) !important;
	}

	.modal-outer.true {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: auto;
		height: auto;

		background: #000000;

		border-radius: 1em;

		z-index: 1000;
	}

	.modal-outer.closed {
		display: none;
	}

	.modal-content {
		display: flex;
		flex-direction: column;

		padding: 1em;
	}

	.close-icon {
		border: 1px solid white;
		border-radius: 50%;

		padding: 0.5em;
		margin: 0.5em;

		float: right;

		cursor: pointer;
	}

	.close-icon-inner {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
