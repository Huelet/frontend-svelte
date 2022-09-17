<script lang="ts">
	import Portal from './portal.svelte';

	export let heading: string;
	export let body: string = '';
	export let open: boolean = false;
	export let onClose: () => void;
	export let location: 'top' | 'bottom-right' = 'bottom-right';
	export let type: 'success' | 'error' | 'warning' | 'neutral' = 'neutral';
	export let duration: number | undefined = undefined;

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
			} ${type === 'neutral' ? 'toast-neutral' : null}`}
		>
			<div class="close-icon-container">
				<div class="close-icon">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="white"
						xmlns="http://www.w3.org/2000/svg"
						on:click={onClose}
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L7.71716 6.30294C7.81616 6.40195 7.86566 6.45145 7.92275 6.47C7.97296 6.48631 8.02704 6.48631 8.07725 6.47C8.13434 6.45145 8.18384 6.40195 8.28284 6.30294L13.2929 1.29289C13.6834 0.902369 14.3166 0.902369 14.7071 1.29289C15.0976 1.68342 15.0976 2.31658 14.7071 2.70711L9.69706 7.71716C9.59805 7.81616 9.54855 7.86566 9.53 7.92275C9.51369 7.97296 9.51369 8.02704 9.53 8.07725C9.54855 8.13434 9.59805 8.18384 9.69706 8.28284L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L8.28284 9.69706C8.18384 9.59805 8.13434 9.54855 8.07725 9.53C8.02704 9.51369 7.97296 9.51369 7.92275 9.53C7.86566 9.54855 7.81616 9.59805 7.71716 9.69706L2.70711 14.7071C2.31658 15.0976 1.68342 15.0976 1.29289 14.7071C0.902369 14.3166 0.902369 13.6834 1.29289 13.2929L6.30294 8.28284C6.40195 8.18384 6.45145 8.13434 6.47 8.07725C6.48631 8.02704 6.48631 7.97296 6.47 7.92275C6.45145 7.86566 6.40195 7.81616 6.30294 7.71716L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z"
						/>
					</svg>
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

	.toast-danger {
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
