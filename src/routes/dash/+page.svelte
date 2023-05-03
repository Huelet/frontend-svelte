<script lang="ts">
  // redirect to /dash/profile/me
</script>

<style>
  /* Center the content of the div */
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: 'Red Hat Text', sans-serif;
  }

  h1, h2 {
    text-align: center;
    font-weight: bold;
  }

  /* Style the button */
  button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
</style>

<div>
  <h1 style="font-size: 36px"> <b>Creator dashboard</b></h1>
  <h2>Welcome to the creator dashboard!</h2>
  <button>Press Here (This will do nothing)</button>
</div>

<script>
  // Export the component
  export default {
    name: "IndexPage",
  };
</script>
