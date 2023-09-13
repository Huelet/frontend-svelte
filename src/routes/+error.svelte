<script>
    import { page } from '$app/stores';
    import Typography from '../components/typography.svelte';

    console.log($page.error);
</script>

<main>
    <div class="page-content">
        {#if $page.status === 404}
            <Typography size="xl">
                Uh-oh, ShardsSocial.com <code>{$page.url.pathname}</code> doesn't seem to exist
            </Typography>
            <p class="error-message">404 Page not found</p>
        {:else}
            <Typography>Something went wrong</Typography>
            <Typography>Please try refreshing the page</Typography>
            <Typography>If that doesn't work, please report it to a Developer</Typography>

            <section>
                <Typography class="section-title">Details</Typography>
                <pre class="error-stack">
                    {$page.error.stack}
                </pre>
            </section>
        {/if}
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }

    .page-content {
        text-align: center;
    }

    .error-message {
        font-size: 24px;
        color: red;
    }

    .section-title {
        font-weight: bold;
    }

    .error-stack {
        background-color: #363636;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: auto;
        max-height: 300px;
        font-size: 12px;
        white-space: pre-wrap;
    }
</style>

