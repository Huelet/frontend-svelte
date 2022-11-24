<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Portal from '../../../../../components/portal.svelte';
	import { Close } from '../../../../../components/icons';

	let backgroundColor: string;
	let styles: string;
	let width: string;
	let height: string;

	onMount(() => {
		width = window.innerWidth + 'px';
		height = window.innerHeight / 2 + 'px';

		styles = `width: ${width}; height: ${height}; background-image: url(${
			data.user?.header || data.user?.avatar
		});`;
	});

	export let data: PageData;

	$: backgroundColor = data.user.avatarColor;
</script>

<Portal class="portal full page center">
	<div class="full page center header-viewer" style="background-color: {backgroundColor}e1">
		<div class="close cursor" on:click={() => history.back()} aria-label="Go back">
			<Close fill="white" />
		</div>
		<div class="header" style={styles} />
	</div>
</Portal>

<style>
	:global(body, html) {
		overflow: hidden;
	}

	.header-viewer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;
		padding: 1rem;
	}

	.header {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
