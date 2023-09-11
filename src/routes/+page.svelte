<script lang="ts">
  import { onMount } from 'svelte';
  import Logo from '../components/logo.svelte';
  import Typography from '../components/typography.svelte';
  import Meta from '../components/meta.svelte';
  import '@fontsource/red-hat-display/700.css';

  onMount(() => {
    if (localStorage.getItem('huelet:auth:token') !== null) {
      location.assign('/explore/');
    }
  });
</script>

<Meta />

<main>
  <div class="hero">
    <div class="logo-container">
      <span on:contextmenu={(event) => { event.preventDefault(); }}>
        <Logo dimensions={128} />
      </span>
    </div>
    <div class="text-container">
      <Typography weight={800} fontSize={2} class="center-text"> Welcome to Shards Social! </Typography>
    </div>
    <div class="button-container">
      <a href="https://dsc.gg/huelet">
        <div class="button primary rounded">Join the Alpha tester program!</div>
      </a>
      <a href="/auth/in">
        <div class="button secondary rounded">I already have an account</div>
      </a>
    </div>
  </div>
<footer>
    <div class="footer-content">
      <!-- Add your footer content here, e.g., links, copyright info, etc. -->
    </div>
  </footer>
</main>

<style>

 main {
    display: flex;
    flex-direction: column; /* Change to column layout */
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  /* Add styles for the footer */
  footer {
    background-color: #f0f2f5; /* Background color for the footer */
    padding: 1rem;
    text-align: center;
    width: 100%;
  }

  .footer-content {
    max-width: 1200px; /* Adjust the maximum width as needed */
    margin: 0 auto; /* Center-align content */
    color: #333; /* Text color for the footer */
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  a {
    text-decoration: none;
  }

  a:visited {
    color: var(--text-primary-dark);
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .logo-container {
    margin-bottom: 1rem;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button {
    padding: 0.5rem 1rem;
    border-radius: 25px;
    margin: 0.5rem;
    cursor: pointer;
    text-align: center;
  }

  .primary {
    background-color: #00bfff; /* Light blue color for primary button */
    color: #fff;
  }

  .secondary {
    background-color: #00bfff; /* Light blue color for secondary button */
    color: #fff;
  }

  .center-text {
    text-align: center; /* Center-align text */
  }

  @media (min-width: 768px) {
    .hero {
      padding: 2rem;
    }
  }
</style>


