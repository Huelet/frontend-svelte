<script lang="ts">
	import Typography from '../../components/typography.svelte';
	import Avatar from '../../components/avatar.svelte';
	import { DateTime } from 'luxon';

	export let data: any;
</script>

<div class="invite-overlay center column">
	<Typography fontSize={2.5} weight={600} element={'h2'}>{data.invite.inviteId}</Typography>
	<Typography size="md">
		Expires {DateTime.fromMillis(data.invite.expires).toRelative()}
	</Typography>
	<span class="row center">
		<Typography size="md">Invited by:</Typography>
		<Avatar
			url={data.invitedBy.avatar}
			forceAltText="{data.invitedBy.username}'s avatar"
			dimensions={24}
		/>
		<Typography size="md">{data.invitedBy.username}</Typography>
	</span>
</div>

<style>
	.invite-overlay {
		background-color: rgba(26, 27, 30, 0.5);
		border-radius: 0.5rem;
		padding: 1rem;
	}
</style>
