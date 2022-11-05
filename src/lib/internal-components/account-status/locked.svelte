<script lang="ts">
	import { DateTime } from 'luxon';
	import Typography from '../../../components/typography.svelte';
	import WarningFilled from '../../../components/icons/WarningFilled.svelte';
	import type { AccountStatus } from '../../../types/account';

	export let accountStatus: AccountStatus;
</script>

<div class="white full center column suspended">
	<div class="warning-icon-red center">
		<WarningFilled fill="black" />
	</div>
	<Typography color="#000000" fontSize={2} weight={900} element="h1"
		>Your account has been temporarily locked</Typography
	>
	<Typography color="#000000" weight={500}>Reason: {@html accountStatus.details?.reason}</Typography
	>
	<Typography color="#000000" weight={500}
		>Your account will be unlocked on {DateTime.now()
			.plus({
				milliseconds: accountStatus.details?.actionLength
			})
			.toLocaleString(DateTime.DATETIME_HUGE)}</Typography
	>

	<div
		class="button primary"
		on:click={() => {
			location.assign('/#locked-accepted');
		}}
	>
		<Typography>Return to Huelet</Typography>
	</div>
</div>

<style>
	.white {
		background-color: white;
	}

	.warning-icon-red {
		width: 1em;
		height: 1em;
		padding: 1em;

		background-color: #d3e200;

		border-radius: 50%;
	}

	a.button-link {
		text-decoration: none;
	}
</style>
