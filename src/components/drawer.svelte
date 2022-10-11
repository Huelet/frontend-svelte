<script lang="ts">
	import { onMount } from 'svelte';
	import Portal from './portal.svelte';
	import Typography from './typography.svelte';

	export let open: boolean;
	export let onClose: () => void;
	export let title: string | undefined = undefined;
	export let color: string | undefined = undefined;
	export let width: number | undefined = undefined;
	export let withBlur: boolean | undefined = undefined;

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
		<div class="drawer">
			<div class="drawer__content-with-title">
				{#if title}
					<div class="title">
						<Typography size="lg" weight={700}>
							{title}
						</Typography>
						<div class="close" on:click={onClose}>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="white"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L7.71716 6.30294C7.81616 6.40195 7.86566 6.45145 7.92275 6.47C7.97296 6.48631 8.02704 6.48631 8.07725 6.47C8.13434 6.45145 8.18384 6.40195 8.28284 6.30294L13.2929 1.29289C13.6834 0.902369 14.3166 0.902369 14.7071 1.29289C15.0976 1.68342 15.0976 2.31658 14.7071 2.70711L9.69706 7.71716C9.59805 7.81616 9.54855 7.86566 9.53 7.92275C9.51369 7.97296 9.51369 8.02704 9.53 8.07725C9.54855 8.13434 9.59805 8.18384 9.69706 8.28284L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L8.28284 9.69706C8.18384 9.59805 8.13434 9.54855 8.07725 9.53C8.02704 9.51369 7.97296 9.51369 7.92275 9.53C7.86566 9.54855 7.81616 9.59805 7.71716 9.69706L2.70711 14.7071C2.31658 15.0976 1.68342 15.0976 1.29289 14.7071C0.902369 14.3166 0.902369 13.6834 1.29289 13.2929L6.30294 8.28284C6.40195 8.18384 6.45145 8.13434 6.47 8.07725C6.48631 8.02704 6.48631 7.97296 6.47 7.92275C6.45145 7.86566 6.40195 7.81616 6.30294 7.71716L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z"
								/>
							</svg>
						</div>
					</div>
					<div class="divider" />
				{:else}
					<div class="close without-title" on:click={onClose}>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="white"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M1.29289 1.29289C1.68342 0.902369 2.31658 0.902369 2.70711 1.29289L7.71716 6.30294C7.81616 6.40195 7.86566 6.45145 7.92275 6.47C7.97296 6.48631 8.02704 6.48631 8.07725 6.47C8.13434 6.45145 8.18384 6.40195 8.28284 6.30294L13.2929 1.29289C13.6834 0.902369 14.3166 0.902369 14.7071 1.29289C15.0976 1.68342 15.0976 2.31658 14.7071 2.70711L9.69706 7.71716C9.59805 7.81616 9.54855 7.86566 9.53 7.92275C9.51369 7.97296 9.51369 8.02704 9.53 8.07725C9.54855 8.13434 9.59805 8.18384 9.69706 8.28284L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L8.28284 9.69706C8.18384 9.59805 8.13434 9.54855 8.07725 9.53C8.02704 9.51369 7.97296 9.51369 7.92275 9.53C7.86566 9.54855 7.81616 9.59805 7.71716 9.69706L2.70711 14.7071C2.31658 15.0976 1.68342 15.0976 1.29289 14.7071C0.902369 14.3166 0.902369 13.6834 1.29289 13.2929L6.30294 8.28284C6.40195 8.18384 6.45145 8.13434 6.47 8.07725C6.48631 8.02704 6.48631 7.97296 6.47 7.92275C6.45145 7.86566 6.40195 7.81616 6.30294 7.71716L1.29289 2.70711C0.902369 2.31658 0.902369 1.68342 1.29289 1.29289Z"
							/>
						</svg>
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
</style>
