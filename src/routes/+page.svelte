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
        <Typography weight={800} fontSize={2} class="center-text"> Welcome to Huelet! </Typography>
      </div>
      <div class="button-container">
        <a href="/auth/up">
          <div class="button primary rounded">Sign up</div>
        </a>
        <a href="/auth/in">
          <div class="button secondary rounded">I already have an account</div>
        </a>
      </div>
    </div>

   <footer>
  <div class="footer-content">
    <ul>
      <li><a href="/infoCenter">Info Center</a></li>
      <li><a href="/contact">Contact Us</a></li>
      <li><a href="/privacy">Privacy Policy</a></li>
    </ul>
    <p>&copy; 2023 Shards Social</p>
  </div>
</footer>

  </div> <!-- Closing the container-box div -->
</main>



<style>
/* Modify the CSS for the container-box */
.container-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 473px; /* Set the width to 473px */
  height: 485px; /* Set the height to 485px */
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
  width: 100%; /* Full width within the container-box */
}

/* Style the list items */
.footer-content ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

.footer-content li {
  margin: 0 10px; /* Add spacing between list items */
}

/* Style the copyright text */
.footer-content p {
  margin: 0; /* Remove default margin */
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


