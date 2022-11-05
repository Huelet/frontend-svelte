<script lang="ts">
	import { DateTime } from 'luxon';
	import Typography from '../../../components/typography.svelte';
	import WarningFilled from '../../../components/icons/WarningFilled.svelte';
	import type { AccountStatus } from '../../../types/account';

	export let accountStatus: AccountStatus;
</script>

<div class="white full center column suspended">
	<div class="warning-icon-red center">
		<WarningFilled fill="white" />
	</div>
	<Typography color="#000000" fontSize={2} weight={900} element="h1"
		>Your account has been permanantly removed</Typography
	>
	<Typography color="#000000" weight={500}>Reason: {@html accountStatus.details?.reason}</Typography
	>

	<div class="spacer" />

	<a href="mailto:hi@huelet.net" target="_blank" class="button-link">
		<div class="button primary">
			<Typography>Submit an appeal</Typography>
		</div>
	</a>

	<a href="https://docs.huelet.net/users/account-expelled" target="_blank" class="button-link">
		<div class="button secondary">
			<Typography color="#000000">Further reading</Typography>
		</div>
	</a>
</div>

<style>
	.white {
		background-color: white;
	}

	.warning-icon-red {
		width: 1em;
		height: 1em;
		padding: 1em;

		background-color: #ff0077;

		border-radius: 50%;
	}

	a.button-link {
		text-decoration: none;
	}
</style>
