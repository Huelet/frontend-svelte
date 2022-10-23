<script lang="ts">
	import Portal from './portal.svelte';
	import { Close } from './icons';

	export let heading: string;
	export let body = '';
	export let open = false;
	export let onClose: () => void;
	export let location: 'top' | 'bottom-right' = 'bottom-right';
	export let type: 'success' | 'error' | 'warning' | 'neutral' = 'neutral';
	export let duration: number | undefined = undefined;

	let className: string = '';
	export { className as class };

	if (typeof duration === 'number') {
		setTimeout(() => {
			open = false;
		}, duration);
	}
</script>

{#if open}
	<Portal>
		<div
			class={`toast-outer ${location === 'top' ? 'toast-top' : 'toast-bottom-right'} ${
				open ? 'toast-open' : 'toast-closed'
			} ${type === 'success' ? 'toast-success' : null} ${type === 'error' ? 'toast-error' : null} ${
				type === 'warning' ? 'toast-warning' : null
			} ${type === 'neutral' ? 'toast-neutral' : null} ${className}`}
		>
			<div class="close-icon-container">
				<div class="close-icon">
					<Close fill="white" on:click={onClose} />
				</div>
			</div>
			<div class="center">
				<div class="icon-container">
					<slot name="icon" />
				</div>
				<div class="column main-content">
					<h3 class="heading">
						{heading}
					</h3>
					{#if typeof body === 'string'}
						<p class="body-text">
							{body}
						</p>
					{:else}
						<div class="body-content">
							<slot />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</Portal>
{/if}

<style>
	.toast-outer {
		position: fixed;
		z-index: 9999;
		backdrop-filter: blur(9px) saturate(200%);
		color: white;
		padding: 1em;
		border-radius: 0.5em;
		box-shadow: 0 0 0.5em 0.5em rgba(0, 0, 0, 0.5);
		animation: openToast 0.5s ease-in-out;
	}

	.toast-outer.toast-closed {
		opacity: 0;
		animation: closeToast 0.5s ease-in-out;
	}

	.toast-outer.toast-opened {
		opacity: 1;
		animation: openToast 0.5s ease-in-out;
	}

	.main-content {
		display: flex;
		flex-direction: column;
		margin-left: 1em;
	}

	.icon-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2em;
		height: 2em;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.2);
	}

	.close-icon-container {
		float: right;
		cursor: pointer;
	}

	.heading {
		margin: 0;
		font-size: 1.5em;
		font-weight: bold;
	}

	.body-text {
		margin: 0;
		font-size: 1em;
		font-weight: normal;
	}

	.body-content {
		margin: 0;
	}

	.close-icon {
		display: flex;
		align-items: center;
		margin-right: 1em;
	}

	.toast-top {
		top: 1em;
		left: 50vw;
	}

	.toast-bottom-right {
		bottom: 1em;
		right: 1em;
	}

	.toast-neutral {
		background: rgba(248, 255, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.125);
	}

	.toast-error {
		background: rgba(255, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.125);
	}

	.toast-success {
		background: rgba(60, 97, 53, 0.73);
		border: 1px solid rgba(255, 255, 255, 0.125);
	}

	@keyframes openToast {
		0% {
			opacity: 0;
			transform: translateY(1em);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes closeToast {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(1em);
		}
	}
</style>
