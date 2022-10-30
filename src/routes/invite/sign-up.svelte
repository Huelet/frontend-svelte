<script lang="ts">
	import Typography from '../../components/typography.svelte';
	import '@fontsource/red-hat-text/400.css';

	export let data: any;
	export let username: string;
	export let password: string;
	export let email: string;
	export let creator: boolean;
</script>

<form class="column center">
	<input type="text" placeholder="Username" bind:value={username} class="textbox" name="username" />
	<input type="password" placeholder="Password" bind:value={password} class="textbox" name="password" />
	<span class="row">
		<input type="checkbox" bind:checked={creator} class="checkbox" name="creator" />
		<label for="creator">
			<Typography size="md">
				I
				<strong>
					do
					{#if !creator}
						not
					{/if}
				</strong> plan to publish content
			</Typography>
		</label>
	</span>
	{#if creator}
		<input type="email" placeholder="Email" bind:value={email} class="textbox" name="email" />
	{/if}
</form>

<style>
	.textbox {
		padding: 4px 20px 0;
		margin: 0.25em;
		width: 15em;

		border-radius: 3em;
		border: 0;
		outline: 0;

		background-color: #303245;
		color: #eee;

		font-size: 18px;
		font-family: 'Red Hat Text';
		font-weight: 400;
	}

	.textbox::placeholder {
		color: #aaa;
	}

	.textbox:focus {
		border: 0.2em solid rgb(0, 140, 255);
		animation: focus 0.2s linear;
	}

	.checkbox {
		width: 1em;
		height: 1em;
		margin: 0.25em;
	}

	.checkbox:checked {
		background-color: rgb(0, 140, 255);
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
