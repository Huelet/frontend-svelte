<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="divider {className}" />

<style>
	.divider {
		width: 100%;
		height: 0px;
		left: calc(50% - 689px / 2 - 334px);
		top: calc(50% - 0px / 2 - 337px);
		border: 2px solid #605e5c;
		margin-top: 2em;
	}

	@media only screen and (max-width: 600px) {
		.divider {
			width: 50%;
			height: 0px;
			left: calc(50% - 680px / 2 - 334px);
			top: calc(50% - 0px / 2 - 337px);
			border: 2px solid #605e5c;
			margin-top: 2em;
		}
	}
</style>
