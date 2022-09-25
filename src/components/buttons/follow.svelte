<script lang="ts">
	import Toast from '../toast.svelte';

	export let username: string;

	let loading: boolean = false;
	let justFollowed: boolean = false;
	let user: any;

	const follow = (event: any) => {
		event.stopPropagation();
		event.preventDefault();

		loading = true;

		const userId = localStorage.getItem('userId');
		localStorage.getItem(`user-${userId}`)
			? (user = JSON.parse(localStorage.getItem(`user-${userId}`) as string))
			: (user = null);

		fetch(
			`https://api.huelet.net/users/interact/follow?username=${user.username}&userToFollow=${username}`,
			{
				method: 'POST'
			}
		)
			.then((res) => res.json())
			.then((response: any) => {
				if (response.status === 'success') {
					loading = false;
					justFollowed = true;
					setTimeout(() => {
						justFollowed = false;
					}, 2000);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};
</script>

<div class="follow" on:click={(e) => follow(e)}>
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="white"
		xmlns="http://www.w3.org/2000/svg"
		class:loading
	>
		><path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M8 1C8.48325 1 8.875 1.39175 8.875 1.875V6.725C8.875 6.86501 8.875 6.93502 8.90225 6.9885C8.92622 7.03554 8.96446 7.07378 9.0115 7.09775C9.06498 7.125 9.13499 7.125 9.275 7.125H14.125C14.6082 7.125 15 7.51675 15 8C15 8.48325 14.6082 8.875 14.125 8.875H9.275C9.13499 8.875 9.06498 8.875 9.0115 8.90225C8.96446 8.92622 8.92622 8.96446 8.90225 9.0115C8.875 9.06498 8.875 9.13499 8.875 9.275V14.125C8.875 14.6082 8.48325 15 8 15C7.51675 15 7.125 14.6082 7.125 14.125V9.275C7.125 9.13499 7.125 9.06498 7.09775 9.0115C7.07378 8.96446 7.03554 8.92622 6.9885 8.90225C6.93502 8.875 6.86501 8.875 6.725 8.875H1.875C1.39175 8.875 1 8.48325 1 8C1 7.51675 1.39175 7.125 1.875 7.125H6.725C6.86501 7.125 6.93502 7.125 6.9885 7.09775C7.03554 7.07378 7.07378 7.03554 7.09775 6.9885C7.125 6.93502 7.125 6.86501 7.125 6.725V1.875C7.125 1.39175 7.51675 1 8 1Z"
		/></svg
	>
	<p class="follow__text">Follow</p>
</div>

{#if justFollowed}
	<Toast
		open={justFollowed}
		onClose={() => (justFollowed = false)}
		heading="Followed"
		body={`You are now following ${username}`}
		type="success"
	/>
{/if}

<style>
	.follow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		background-color: transparent;
		border: var(--accent-primary-dark) 1px solid;
		border-radius: 5px;

		padding: 0.75em;

		user-select: none;
		cursor: pointer;
	}

	.loading {
		animation: spin 1s linear infinite;
	}

	.follow__text {
		font-size: 1.2em;
		font-weight: bold;
	}

	p {
		margin: 0;
		padding: 0;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
