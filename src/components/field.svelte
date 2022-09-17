<script lang="ts">
	export let placeholder: string = '';
	export let value: string;
</script>

<input class="textbox" type="text" {placeholder} bind:value />

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

	@keyframes focus {
		0% {
			border: 0em solid rgb(0, 140, 255);
		}
		100% {
			border: 0.2em solid rgb(0, 140, 255);
		}
	}
</style>
