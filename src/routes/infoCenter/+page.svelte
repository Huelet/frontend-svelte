<!-- +page.svelte -->
<script>
    let count = 0;
  
    function increment() {
      count += 1;
    }
  </script>
  
  <style>
    /* Add your CSS styles here */
    .container {
      text-align: center;
      padding: 20px;
    }
  
    .counter {
      font-size: 24px;
      font-weight: bold;
    }
  
    .button {
      padding: 10px 20px;
      font-size: 18px;
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }
  </style>
  
  <div class="container">
    <h1>Simple + Page</h1>
    <p class="counter">Counter: {count}</p>
    <button class="button" on:click={increment}>+</button>
  </div>

<!-- App.svelte -->
<script>
  import Router from './Router.svelte';
</script>

<Router />
