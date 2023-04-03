<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Card from '../../../components/card.svelte';
	import Typography from '../../../components/typography.svelte';
	import Meta from '../../../components/meta.svelte';
	import InviteOverlay from '../invite-overlay.svelte';
	import SignUp from '../sign-up.svelte';
	import Complete from '../complete.svelte';
	import {api_url} from '../../../env';

	export let data: PageData;

	let step: number = 2;
	let username: string;
	let password: string;
	let email: string;
	let creator: boolean;

	const submit = async () => {
		fetch(`${api_url}/v2/auth/up?inviteId=${data.invite.inviteId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password,
				email,
				creator
			})
		})
			.then((res) => res.json())
			.then((user) => {
				fetch(`${api_url}/auth/user?username=${username}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.data.token}`
					}
				})
					.then((res) => res.json())
					.then((data) => {
						localStorage.setItem(`user`, JSON.stringify(data.data));
						localStorage.setItem(`token`, user.data.token);
						localStorage.setItem(
							'timeAtAuth',
							JSON.stringify({
								time: (Date.now() / 1000) | 0
							})
						);
						step++;
					});
			});
	};
</script>

<Meta
	title="Your invite to Huelet"
	description="Join Huelet, the best place to share your videos and watch your favorite creators."
/>

<Card full={true} title="Use an invite">
	<div class="invite-container">
		{#if step === 0}
			<InviteOverlay {data} />
		{:else if step === 1}
			<SignUp {data} {username} {email} {password} {creator} />
		{:else if step === 2}
			<Complete />
		{/if}
		<div
			class="actions-bar {step > 0 ? 'with-previous-button' : null} row {step === 0
				? 'center'
				: null}"
		>
			<div
				class="button primary"
				on:click={() => {
					if (step === 0) step++;
					else if (step === 1) submit();
				}}
			>
				<Typography size="md">Next</Typography>
			</div>
			{#if step > 0}
				<div class="button secondary" on:click={() => step--}>
					<Typography size="md">Previous</Typography>
				</div>
			{/if}
		</div>
	</div>
</Card>

<style>
	.invite-container {
		margin: 1em;
	}

	.actions-bar {
		display: flex;

		width: 100%;
		margin-top: 1em;
	}

	.actions-bar.with-previous-button {
		justify-content: space-between;
	}
</style>
