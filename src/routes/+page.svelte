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
  <div class="container-box">
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
  </div> <!-- Closing the container-box div -->
</main>





<style>
/* Modify the CSS for the container-box */
.container-box {
  position: relative;
  width: 473px; /* Set the width to 473px */
  height: 485px; /* Set the height to 485px */
  margin: 0 auto;
  background-color: #252525;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Add CSS for the footer */
footer {
  margin-top: 24px;
  text-align: center;
  width: 536px; /* Set the width to 536px */
  height: 43px; /* Set the height to 43px */
}

/* Add CSS for mobile responsiveness */
@media screen and (max-width: 768px) {
  .container-box {
    max-width: 100%;
    width: auto; /* Adjust width for smaller screens */
    height: auto; /* Adjust height for smaller screens */
    padding: 10px;
  }
}

/* Position the "Welcome to Shards Social!" text at the top */
.center-text {
  text-align: center;
}

/* Remove the absolute positioning for the footer */
footer {
  /* position: absolute;
  left: 697px;
  top: 1114px; */
}

</style>



