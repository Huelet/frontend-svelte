<!-- FeatureUnavailable.svelte -->
<script>
  // You can add any logic here if needed
</script>

<main>
  <div class="container">
    <h1>This Feature is Not Available Yet</h1>
    <p>Check back later for updates or join our Discord server for more information:</p>
    <a href="YOUR_DISCORD_INVITE_LINK" target="_blank" rel="noopener noreferrer">
      <button class="discord-button">Join Our Discord</button>
    </a>
  </div>
</main>

<style>
  /* You can style the page as needed */
  .container {
    text-align: center;
    margin: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
    margin-top: 1rem;
  }

  .discord-button {
    background-color: #7289da;
    color: #fff;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .discord-button:hover {
    background-color: #677bc4;
  }
</style>
