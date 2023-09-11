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
      <Typography weight={800} fontSize={2}>The Video Platform for Humans.</Typography>
      <Typography>
        Please note that Huelet is currently in alpha and might not be stable or secure.
      </Typography>
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
</main>

<style>
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
    border-radius: 25px; /* Adjust the border-radius to control button roundness */
    margin: 0.5rem;
    cursor: pointer;
  }

  .primary {
    background-color: #007bff; /* Change to your primary button color */
    color: #fff; /* Change to your primary button text color */
  }

  .secondary {
    background-color: #6c757d; /* Change to your secondary button color */
    color: #fff; /* Change to your secondary button text color */
  }

  @media (min-width: 768px) {
    .hero {
      padding: 2rem;
    }
  }
</style>

