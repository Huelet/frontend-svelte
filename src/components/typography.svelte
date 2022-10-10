<script lang="ts">
	import type { Size, FontPreset } from '../types/components';

	export let preset: FontPreset | undefined = undefined;
	export let weight: number | undefined = undefined;
	export let size: Size | undefined = undefined;
	export let color: string | undefined = undefined;

    if (weight !== undefined) {
        import(`@fontsource/red-hat-display/${weight}.css`);
        import(`@fontsource/red-hat-text/${weight}.css`);
    }
</script>

{#if !preset}
	<span class="typography-reset-global {size === 'lg' || 'xl' ? 'typography-use-lg' : 'typography-use-sm'}">
		<p
			class="
            text chonky-{weight || '400'} chonky-{size || 'md'}
        "
			style="
            color: {color || '#ffffff'};
        "
		>
			<slot />
		</p>
	</span>
{/if}

<style>
	.typography-reset-global {
		margin: 0;
		padding: 0;
		border: 0;
	}

    .typography-use-sm {
        font-family: 'Red Hat Text', sans-serif;
    }

    .typography-use-lg {
        font-family: 'Red Hat Display', sans-serif;
    }

	.text {
		margin: 0;
		padding: 0;
		border: 0;
	}

    .chonky-300 {
        font-weight: 300;
    }

    .chonky-400 {
        font-weight: 400;
    }

    .chonky-500 {
        font-weight: 500;
    }

    .chonky-600 {
        font-weight: 600;
    }

    .chonky-700 {
        font-weight: 700;
    }

    .chonky-800 {
        font-weight: 800;
    }

    .chonky-900 {
        font-weight: 900;
    }

    .chonky-xs {
        font-size: 0.75em;
    }

    .chonky-sm {
        font-size: 0.875em;
    }

    .chonky-md {
        font-size: 1em;
    }

    .chonky-lg {
        font-size: 1.25em;
    }

    .chonky-xl {
        font-size: 1.5em;
    }
</style>
