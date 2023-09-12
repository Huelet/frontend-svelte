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
        <div class="button primary rounded">Alpha tester Sign up</div>
      </a>
      <a href="/auth/in">
        <div class="button secondary rounded">I already have an account</div>
      </a>
    </div>
  </div>
<footer>
    <div class="footer-content">
      <p>&copy; 2023 Shards Social</p>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
      </ul>
    </div>
  </footer>
</main>



