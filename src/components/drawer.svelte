<script lang="ts">
	import { onMount } from 'svelte';
	import { Close } from './icons';
	import Portal from './portal.svelte';
	import Typography from './typography.svelte';

	export let open: boolean;
	export let onClose: () => void;
	export let title: string | undefined = undefined;
	export let color: string | undefined = undefined;
	export let width: number | undefined = undefined;
	export let withBlur: boolean | undefined = undefined;

	let className = '';
	export { className as class };

	onMount(() => {
		if (open) {
			document.querySelectorAll('main').forEach((mainElement) => {
				mainElement.classList.add('with-drawer');
			});
		} else {
			document.querySelectorAll('main').forEach((mainElement) => {
				mainElement.classList.remove('with-drawer');
			});
		}
	});
</script>

{#if open}
	<Portal>
		<div class="drawer{open ? ' null' : '-invisible'} {className}">
			<div class="drawer__content-with-title">
				{#if title}
					<div class="title">
						<Typography size="lg" weight={700}>
							{title}
						</Typography>
						<div class="close" on:click={onClose}>
							<Close fill="white" />
						</div>
					</div>
					<div class="divider" />
				{:else}
					<div class="close without-title" on:click={onClose}>
						<Close fill="white" />
					</div>
				{/if}
				<div class="drawer__content">
					<slot />
				</div>
			</div>
		</div>
	</Portal>
{/if}

<style>
	:global(main.with-drawer) {
		overflow: hidden;
		filter: blur(1em);
	}

	:global(.portal) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;

		filter: blur(0) !important;
	}

	.drawer {
		height: 100vh;
		width: 25vw;
		background: #181718;

		filter: blur(0) !important;

		animation: slideIn 0.3s ease-in-out;
	}

	.drawer__content {
		height: 100%;
		overflow-y: auto;
	}

	.drawer__content-with-title {
		padding: 1em;
	}

	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.close {
		display: flex;
		align-items: center;
		justify-content: center;

		cursor: pointer;
	}

	.close.without-title {
		float: right;
	}

	.divider {
		height: 1px;
		width: 100%;
		background: #2f2f2f;
		margin-top: 1em;
		margin-bottom: 1em;
	}

	@keyframes slideIn {
		0% {
			transform: translateX(-25vw);
		}
		100% {
			transform: translateX(0vw);
		}
	}
</style>
