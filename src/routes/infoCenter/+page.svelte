<script>
  // Import the `link` function from SvelteKit
  import { link } from '$app/navigation';
</script>

<main>

    <h1>Shards Social Information Center</h1>
  <button on:click={() => link('/infocenter')}>Button 1</button>
  <button on:click={() => link('/infocenter')}>Button 2</button>
  <button on:click={() => link('/infocenter')}>Button 3</button>
  <button on:click={() => link('/infocenter')}>Button 4</button>
  <button on:click={() => link('/infocenter')}>Button 5</button>
</main>

<style>
  /* You can add CSS styles here */
</style>
