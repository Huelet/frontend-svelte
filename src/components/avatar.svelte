<script lang="ts">
	export let username = '';
	export let userID = '';
	export let url = '';
	export let dimensions = 64;
	export let forceAltText = '';
	export let styles = '';

	if (url === '') {
		if (userID === '') {
			fetch(`https://api.huelet.net/auth/pfp?username=${username}`)
				.then((response) => response.json())
				.then((data) => {
					url = data.pfp;
				});
		} else if (username === '') {
			fetch(`https://api.huelet.net/auth/pfp?uid=${userID}`)
				.then((response) => response.json())
				.then((data) => {
					url = data.pfp;
				});
		}
	}

	if (dimensions !== 64)
		styles = `width: ${dimensions}px !important; height: ${dimensions}px !important;`;
	else styles = `width: ${dimensions}px !important; height: ${dimensions}px !important;`;

	styles += `box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;`;
</script>

<span
	style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;"
>
	<span
		style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;"
	>
		<img
			src={url}
			alt={forceAltText === '' ? `Profile picture` : forceAltText}
			width={dimensions}
			height={dimensions}
			style={styles}
		/>
	</span>
</span>

<style>
	img {
		padding: 2px !important;
		border-radius: 50% !important;
		border: 2px solid #7600ff !important;
		image-rendering: optimizeSpeed;
	}
</style>
