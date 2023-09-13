<script>
    import { navigate } from "@sapper/app";
  
    // Function to navigate to the "/infocenter" route
    function goToInfoCenter() {
      navigate("/infocenter");
    }
  </script>
  
  <main>
    <h1>Shards Social Information Center</h1>
    <button on:click={goToInfoCenter}>Button 1</button>
    <button on:click={goToInfoCenter}>Button 2</button>
    <button on:click={goToInfoCenter}>Button 3</button>
    <button on:click={goToInfoCenter}>Button 4</button>
    <button on:click={goToInfoCenter}>Button 5</button>
  </main>
  
  <style>
    /* You can add CSS styles here */
  </style>
  