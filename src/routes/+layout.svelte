<slot></slot>

<style>
    /* global styles */
    :root {
        --background-dark: #181718;
        --card-primary-dark: #2b2b2b;
        --card-secondary-dark: rgba(255, 255, 255, 0.2);
        --text-primary-dark: #ffffff;
        --text-secondary-dark: rgba(255, 255, 255, 0.5);
        --accent-primary-dark: #7600ff;
        --accent-100-dark: #b87bff;
        --accent-200-dark: #9c46ff;
        --accent-300-dark: #8421f8;
        --accent-400-dark: #7600ff;
        --accent-500-dark: #8421f8;
        --accent-600-dark: #8421f8;
        --accent-700-dark: #49009d;
        --accent-800-dark: #3b047b;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    :global(body, html, #svelte) {
        height: 100vh;
        width: 100vw;
        background-color: var(--background-dark);
    }
</style>