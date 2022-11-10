<script lang="ts">
	import type { PageData } from './$types';
	import Avatar from '../../../../../components/avatar.svelte';
	import Portal from '../../../../../components/portal.svelte';

	let backgroundColor: string;

	export let data: PageData;

	$: backgroundColor = data.user.avatarColor;
</script>

<Portal class="portal full page center">
	<div class="full page center avatar-viewer" style="background-color: {backgroundColor}e1">
		<Avatar url={data.user.avatar} dimensions={256} />
	</div>
</Portal>

<style>
	:global(body, html) {
		overflow: hidden;
	}

	.avatar-viewer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.avatar {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
