<script lang="ts">
	import { onMount } from 'svelte';
	import Typography from '../../../../components/typography.svelte';
	import Card from '../../../../components/card.svelte';
	import Toggle from 'svelte-toggle';
	import Meta from '../../../../components/meta.svelte';
	import Toast from '../../../../components/toast.svelte';
	import type { AccessibilitySettings } from '../../../../types/accessibility';
	import type { User } from '../../../../types/account';
	import { Check, WarningFilled } from '../../../../components/icons';

	let success: boolean = false;
	let failure: boolean = false;
	let user: User | string;
	let token: string;
	let accessibility: AccessibilitySettings = {
		sounds: true,
		captions: false,
		motion: true,
		highContrast: false,
		zoom: 'x1',
		invertColors: false,
		grayscale: false,
		autoplay: true
	};

	onMount(async () => {
		user = JSON.parse(localStorage.getItem('huelet:auth:user') as string) as User;
		accessibility = JSON.parse(
			localStorage.getItem('huelet:auth:accessibility') as string
		) as AccessibilitySettings;
		token = localStorage.getItem('huelet:auth:token') as string;

		if (!user || !token) return;
	});

	const handleChange = async (e: any) => {
		const action: string = e.path[3].getAttribute('data-action');
		const value: boolean = e.checked ? true : false;

		localStorage.setItem('huelet:auth:accessibility', JSON.stringify(accessibility));

		const req = await fetch(
			`https://api.huelet.net/auth/accessibility?username=${(user as User).username}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					settings: {
						[action]: value
					}
				})
			}
		);

		if (req.status === 200) success = true;
		else failure = true;
	};
</script>

<Meta title="Settings | Accessibility | Huelet" />

<Card full={true} title="Accessibility Settings">
	<div class="action-list">
		<div class="action" on:click={(e) => handleChange(e)} data-action="sounds">
			<div class="action__option center">
				<Toggle
					toggledColor="#7600ff"
					untoggledColor="#464546"
					hideLabel={true}
					label="Sounds"
					bind:toggled={accessibility.sounds}
				/>
			</div>
			<div
				class="action__title center"
				on:click={() => (accessibility.sounds = !accessibility.sounds)}
			>
				<Typography weight={500}>Sounds</Typography>
			</div>
		</div>
		<span class="divider" />
		<div class="action" on:click={(e) => handleChange(e)} data-action="captions">
			<div class="action__option center">
				<Toggle
					toggledColor="#7600ff"
					untoggledColor="#464546"
					hideLabel={true}
					label="Captions"
					bind:toggled={accessibility.captions}
				/>
			</div>
			<div
				class="action__title center"
				on:click={() => (accessibility.captions = !accessibility.captions)}
			>
				<Typography weight={500}>Captions</Typography>
			</div>
		</div>
		<span class="divider" />
		<div class="action" on:click={(e) => handleChange(e)} data-action="motion">
			<div class="action__option center">
				<Toggle
					toggledColor="#7600ff"
					untoggledColor="#464546"
					hideLabel={true}
					label="Motion"
					bind:toggled={accessibility.motion}
				/>
			</div>
			<div
				class="action__title center"
				on:click={() => (accessibility.motion = !accessibility.motion)}
			>
				<Typography weight={500}>Motion</Typography>
			</div>
		</div>
		<span class="divider" />
		<div class="action" on:click={(e) => handleChange(e)} data-action="highContrast">
			<div class="action__option center">
				<Toggle
					toggledColor="#7600ff"
					untoggledColor="#464546"
					hideLabel={true}
					label="High Contrast"
					bind:toggled={accessibility.highContrast}
				/>
			</div>
			<div
				class="action__title center"
				on:click={() => (accessibility.highContrast = !accessibility.highContrast)}
			>
				<Typography weight={500}>High Contrast</Typography>
			</div>
		</div>
		<span class="divider" />
		<div class="action" on:click={(e) => handleChange(e)} data-action="invertColors">
			<div class="action__option center">
				<Toggle
					toggledColor="#7600ff"
					untoggledColor="#464546"
					hideLabel={true}
					label="Invert Colors"
					bind:toggled={accessibility.invertColors}
				/>
			</div>
			<div
				class="action__title center"
				on:click={() => (accessibility.invertColors = !accessibility.invertColors)}
			>
				<Typography weight={500}>Invert Colors</Typography>
			</div>
		</div>
		<span class="divider" />
		<div class="action" on:click={(e) => handleChange(e)} data-action="grayscale">
			<div class="action__option center">
				<Toggle
					toggledColor="#7600ff"
					untoggledColor="#464546"
					hideLabel={true}
					label="Grayscale"
					bind:toggled={accessibility.grayscale}
				/>
			</div>
			<div
				class="action__title center"
				on:click={() => (accessibility.grayscale = !accessibility.grayscale)}
			>
				<Typography weight={500}>Grayscale</Typography>
			</div>
		</div>
		<span class="divider" />
		<div class="action" on:click={(e) => handleChange(e)} data-action="autoplay">
			<div class="action__option center">
				<Toggle
					toggledColor="#7600ff"
					untoggledColor="#464546"
					hideLabel={true}
					label="Autoplay"
					bind:toggled={accessibility.autoplay}
				/>
			</div>
			<div
				class="action__title center"
				on:click={() => (accessibility.autoplay = !accessibility.autoplay)}
			>
				<Typography weight={500}>Autoplay</Typography>
			</div>
		</div>
		<span class="divider" />
		<div class="action" on:click={(e) => handleChange(e)} data-action="zoom">
			<div class="action__option center">
				<select id="zoom" bind:value={accessibility.zoom}>
					<option value="x1">x1</option>
					<option value="x1.25">x1.25</option>
					<option value="x1.5">x1.5</option>
					<option value="x1.75">x1.75</option>
					<option value="x2">x2</option>
				</select>
			</div>
			<div class="action__title center">
				<Typography weight={500}>Zoom</Typography>
			</div>
		</div>
	</div>
</Card>

<Toast
	open={success}
	onClose={() => (success = false)}
	heading="Success!"
	type="success"
	body="Your accessibility settings were saved."
	duration={2.5}
>
	<Check slot="icon" fill="white" />
</Toast>

<Toast
	open={failure}
	onClose={() => (failure = false)}
	heading="Error!"
	type="error"
	body="There was an error saving your accessibility settings."
	duration={2.5}
>
	<WarningFilled slot="icon" fill="white" />
</Toast>

<style>
	.action-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		background-color: #303032;

		margin: 1em;
		padding: 1em;
		border-radius: 5px;
	}

	.action {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.action__title {
		font-size: 1.5rem;
		font-weight: 500;

		cursor: default;
	}

	.action__option {
		font-size: 1.25rem;
		font-weight: 400;
	}

	.divider {
		height: 1px;
		width: 100%;
		background-color: #605e5c;
	}

	input[type='checkbox'] {
		width: 1.5rem;
		height: 1.5rem;
		background-color: #7600ff;
	}

	select {
		width: 3rem;
		height: 1.5rem;
	}
</style>
