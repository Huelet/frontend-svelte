<script lang="ts">
	import { page } from '$app/stores';
	import Toast from '../../../components/toast.svelte';
	import Card from '../../../components/card.svelte';
	import Meta from '../../../components/meta.svelte';

	let username: string;
	let password: string;
	let errorToast = false;
	let error = '';
	let loading = false;
	let success: boolean | null = null;

	const requestLogin = async () => {
		if (!username && !password) {
			errorToast = true;
			error = 'Please enter a username and password';
			return;
		}
		if (!username) {
			errorToast = true;
			error = 'Please enter a username';
			return;
		}
		if (!password) {
			errorToast = true;
			error = 'Please enter a password';
			return;
		}

		loading = true;
		const res = await fetch('https://api.huelet.net/auth/in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});

		const data = await res.json();

		if (res.ok) {
			success = true;

			localStorage.setItem('huelet:auth:token', data.token);

			fetch(`https://api.huelet.net/auth/user?username=${username}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.token}`
				}
			})
				.then((res) => res.json())
				.then((data) => {
					localStorage.setItem('huelet:auth:user', JSON.stringify(data.data));
					localStorage.setItem(
						'huelet:auth:time',
						JSON.stringify({
							time: Date.now() | 0
						})
					);
					location.assign($page.url.searchParams.get('redir') || '/explore');
				});
		} else {
			success = false;
			error = (await res.json()).response;
			errorToast = true;
		}

		loading = false;
	};
</script>

<Meta title="Log in to Huelet, the video platform for humans" />

<Card full={true} title="Sign in">
	<div class="form-container">
		<div class="input-container">
			<input type="text" class="textbox" placeholder="Username" bind:value={username} />
		</div>
		<div class="input-container">
			<input type="password" class="textbox" placeholder="Password" bind:value={password} />
		</div>
	</div>
	<div class="button primary" on:click={requestLogin}>Sign in</div>
	<Toast
		type="error"
		open={errorToast}
		onClose={() => (errorToast = false)}
		heading="Could not sign you in!"
		duration={5000}
		body={error}
	>
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			slot="icon"
		>
			<g clip-path="url(#clip0_1510_470)">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M6.67433 1.50407L0.165688 13.7982C-0.363195 14.7972 0.361009 16 1.49137 16H14.5087C15.639 16 16.3632 14.7972 15.8343 13.7982L9.32569 1.50407C8.76228 0.439844 7.23774 0.439847 6.67433 1.50407ZM7.00001 6.00001C7.00001 5.44772 7.44773 5.00001 8.00001 5.00001C8.5523 5.00001 9.00001 5.44772 9.00001 6.00001V9.00001C9.00001 9.55229 8.5523 10 8.00001 10C7.44773 10 7.00001 9.55229 7.00001 9.00001V6.00001ZM7.00001 13C7.00001 12.4477 7.44773 12 8.00001 12C8.5523 12 9.00001 12.4477 9.00001 13C9.00001 13.5523 8.5523 14 8.00001 14C7.44773 14 7.00001 13.5523 7.00001 13Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1510_470">
					<rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0)" />
				</clipPath>
			</defs>
		</svg>
	</Toast>
</Card>

<style>
	.textbox {
		background-color: #303245;
		border-radius: 12px;
		border: 0;
		box-sizing: border-box;
		color: #eee;
		font-size: 18px;
		outline: 0;
		padding: 4px 20px 0;
		width: 100%;
	}

	.textbox::placeholder {
		color: #aaa;
	}

	.textbox:focus {
		border: 0.2em solid rgb(0, 140, 255);
		animation: focus 0.2s linear;
	}

	.form-container {
		margin: 1em;
	}

	.input-container {
		padding: 0.25em;
	}

	@keyframes focus {
		0% {
			border: 0em solid rgb(0, 140, 255);
		}
		100% {
			border: 0.2em solid rgb(0, 140, 255);
		}
	}
</style>
